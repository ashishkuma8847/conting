import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function TablePage() {
  const { holderId } = useParams();

  const [inputFields, setInputFields] = useState([]);
  const [name, setname] = useState();
  const [rows, setRows] = useState([]);
  console.log(rows)
  useEffect(() => {
    const fetchHolder = async () => {
      const res = await axios.get(`http://localhost:3000/holder/${holderId}`);

      setInputFields(res.data.fields.map(f => ({ label: f, value: "" })));
      setRows(res.data.rows);
      setname(res.data.name)
    };
    fetchHolder();
  }, []);
  // ------------------------------------------
  // ADD INPUT FIELD
  // ------------------------------------------
  const addInputField = async () => {
    const label = prompt("Enter field label");
    if (!label) return;

    await axios.post(`http://localhost:3000/addField/${holderId}`, {
      field: label
    });

    setInputFields([...inputFields, { label, value: "" }]);
  };

  // ------------------------------------------
  // DELETE INPUT FIELD
  // ------------------------------------------


  // ------------------------------------------
  // ADD ROW
  // ------------------------------------------
  const addRow = async () => {
    const empty = inputFields.some((x) => !x.value.trim());
    if (empty) return alert("Fill all fields");

    const values = inputFields.map((f) => f.value);

    const res = await axios.post(
      `http://localhost:3000/addRow/${holderId}`,
      { values }
    );

    setRows(res.data.rows); // always use backend rows
    setInputFields(inputFields.map(f => ({ ...f, value: "" })));
  };

  // ------------------------------------------
  // DELETE ROW
  // ------------------------------------------
  const removeRow = async (index) => {
    const sure = window.confirm("Delete this row?");
    if (!sure) return;

    const res = await axios.delete(
      `http://localhost:3000/deleteRow/${holderId}/${index}`
    );

    setRows(res.data.rows);
  };

  const deleteField = async (index) => {
    const sure = window.confirm("Delete this input field?");
    if (!sure) return;

    const res = await axios.delete(
      `http://localhost:3000/deleteField/${holderId}/${index}`
    );

    // Update UI with new updated backend data
    setInputFields(res.data.fields.map(f => ({ label: f, value: "" })));
    setRows(res.data.rows);
  };


  const downloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(`${name} Table`, 14, 20);

  const headers = ["S.No", ...inputFields.map(f => f.label), "Created At"];

  const data = rows.map((row, idx) => [
    idx + 1,
    ...row.values,
    row.createdAt || "-"
  ]);

  autoTable(doc, {
    head: [headers],
    body: data,
    startY: 30,
  });

  doc.save(`${name}-table.pdf`);
};

  return (
    <div className="container font-poppins">
      <div className="backdrop-blur-3xl mt-20 flex flex-col gap-5 text-white p-6 rounded-2xl shadow-xl">

        <Link to="/">
          <button className="px-4 py-2 text-white  rounded-lg"><FaArrowLeftLong className="text-[30px]" /></button>
        </Link>

        <h1 className="text-4xl capitalize font-bold mb-4 ">
          {name}
          <span className="text-customTeal"> Table</span>
        </h1>

        {/* ADD INPUT */}
        <div onClick={addInputField} className="flex cursor-pointer items-center text-white gap-5">
          <button className="w-[50px] py-2 bg-customTeal text-white rounded-lg">+</button>
          <span>Create Input</span>
        </div>

        {/* INPUT FIELDS */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          {inputFields.map((f, index) => (
            <div key={index} className="relative">
              <input
                className="px-4 py-2 outline-none placeholder-white border-none w-[200px] backdrop-blur-xl bg-customTeal rounded-lg"
                placeholder={`Enter ${f.label}`}
                value={f.value}
                onChange={(e) => {
                  const updated = [...inputFields];
                  updated[index].value = e.target.value;
                  setInputFields(updated);
                }}
              />

              {/* Delete input */}
              <button
                onClick={() => deleteField(index)}
                className="absolute top-[5px] right-[0px] bg-customTeal text-white px-2 py-0.5 rounded-full"
              >
                -
              </button>
            </div>
          ))}
        </div>

        {/* ADD ROW */}
        {
          inputFields.length === 0 ? null : <button
            onClick={addRow}
            className="w-[300px] py-2 bg-customTeal text-white rounded-lg"
          >
            Submit
          </button>
        }
       



        {/* TABLE */}
        <div className="mt-6 overflow-auto">
          <table className="w-full bg-gray-50 rounded-xl overflow-hidden ">
            {
               rows.length===0 ? null :

            <thead>
              <tr className="bg-customTeal">
                <th className="p-2">S.No</th>

                {inputFields.map((f, i) => (
                  <th className="p-2 relative" key={i}>
                    {f.label}
                  </th>
                ))}

                <th className="p-2">Actions</th>
              </tr>
            </thead>
            }


            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b">
                  <td className="p-2 w-[300px]  text-black text-center">{row.createdAt}</td>

                  {row.values.map((v, i) => (
                    <td key={i} className="p-2 text-black text-center">{v}</td>
                  ))}

                  <td className="p-2 text-center">
                    <button
                      onClick={() => removeRow(rowIndex)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
          {
            rows.length===0 ? null : <button
          onClick={downloadPDF}
          className="w-[200px] mt-[30px] py-2 bg-customTeal text-white rounded-lg"
        >
          Download PDF
        </button>
          }
          
        </div>
      </div>
    </div>
  );
}
