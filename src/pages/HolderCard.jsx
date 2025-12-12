import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HolderList() {
  const [holders, setHolders] = useState([]);

  const addHolder = async () => {
    const name = prompt("Enter new holder name");
    if (!name) return;

    try {
      const res = await axios.post("http://localhost:3000/addHolder", { name });

      setHolders((prev) => [...prev, res.data.data]);

    } catch (err) {
      console.log("Error creating holder", err);
      alert("Error creating holder");
    }
  };
  useEffect(() => {
    const fetchHolders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getall");
        setHolders(res.data.data);
      } catch (err) {
        console.log("Error fetching holders", err);
      }
    };

    fetchHolders();
  }, []);

  const deleteHolder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this table?")) return;

    try {
      await axios.delete(`http://localhost:3000/deleteHolder/${id}`);
      setHolders((prev) => prev.filter(h => h._id !== id));

    } catch (err) {
      alert("Error deleting holder");
    }
  };

  return (
    <>
      <div className="container">

        <div className=" flex py-20 font-poppins">
          <div className="flex justify-between  gap-5 flex-col">
            <h1 className="text-4xl font-bold text-white  mb-4">
              Selec<span className="text-customTeal">t_Holder</span>
            </h1>

            <div onClick={addHolder} className="flex cursor-pointer items-center text-white gap-5">

              <button
                className="w-[50px] py-2 bg-customTeal text-white rounded-lg "
              >
                +
              </button>
              <span>create table</span>
            </div>
            <div className="grid grid-cols-4 gap-5">
              {holders.map((h) => (
                <Link key={h.id} to={`/table/${h._id}`}>
                  <div className="backdrop-blur-3xl  p-5 rounded-2xl shadow-xl cursor-pointer hover:scale-105 transition">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        deleteHolder(h._id);
                      }}
                      className="absolute top-2 right-2 bg-customTeal text-white px-2 py-0.1 rounded"
                    >
                      -
                    </button>
                    <h2 className="text-xl capitalize text-white font-bold">{h.name}</h2>
                    <p className="text-gray-600">Click to open table</p>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}