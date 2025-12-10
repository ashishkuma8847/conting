import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function TablePage() {
  const { holderId } = useParams();

  // ▼ In future → fetch holder data using holderId

  const [inputFields, setInputFields] = useState([
    { label: "Name", value: "" },
    { label: "Time", value: "" }
  ]);

  const [rows, setRows] = useState([]);

  const addInputField = () => {
    const label = prompt("Enter field label");
    if (!label) return;
    setInputFields([...inputFields, { label, value: "" }]);
  };

  const addRow = () => {
    const empty = inputFields.some((x) => !x.value.trim());
    if (empty) return alert("Fill all fields");

    const newRow = {
      id: rows.length + 1,
      values: inputFields.map((f) => f.value)
    };

    setRows([...rows, newRow]);
    setInputFields(inputFields.map((f) => ({ ...f, value: "" })));
  };

  const removeRow = (id) => {
    setRows(rows.filter((r) => r.id !== id));
  };

  return (
    <div className="container  font-poppins">
      <div className="backdrop-blur-3xl mt-20 flex flex-col gap-5 text-white  p-6 rounded-2xl shadow-xl">
        <Link to="/">
          <button className=" px-4 py-2   text-white rounded-lg">
          -
          </button>
        </Link>

        <h1 className="text-4xl font-bold mb-4 ">{holderId}<span className="text-customTeal">Table</span></h1>

         <div onClick={addInputField} className="flex cursor-pointer items-center text-white gap-5">

              <button
                className="w-[50px] py-2 bg-customTeal text-white rounded-lg "
              >
                +
              </button>
              <span>Create Input</span>
            </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          {inputFields.map((f, index) => (
            <input
              key={index}
              className="px-4 py-2 outline-none border-none placeholder-white w-[200px] backdrop-blur-xl bg-customTeal rounded-lg"
              placeholder={`Enter ${f.label}`}
              value={f.value}
              onChange={(e) => {
                const updated = [...inputFields];
                updated[index].value = e.target.value;
                setInputFields(updated);
              }}
            />
          ))}
        </div>

        <button
          onClick={addRow}
          className="w-[300px] py-2 bg-customTeal text-white rounded-lg"
        >
          Submit
        </button>

        <div className="mt-6 overflow-auto">
          <table className="w-full bg-gray-50 rounded-xl overflow-hidden ">
            <thead>
              <tr className="bg-customTeal">
                <th className="p-2">S.No</th>
                {inputFields.map((f, i) => (
                  <th className="p-2" key={i}>{f.label}</th>
                ))}
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="p-2 text-customBlack text-center">{row.id}</td>
                  {row.values.map((v, i) => (
                    <td key={i} className="p-2 text-customBlack text-center">{v}</td>
                  ))}
                  <td className="p-2 flex justify-center items-center">
                    <button
                      onClick={() => removeRow(row.id)}
                      className="px-3 py-1  bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
