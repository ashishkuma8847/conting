import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HolderList() {
  const [holders, setHolders] = useState([
    { id: 1, name: "Ashish" },
    { id: 2, name: "Rohan" },
    { id: 3, name: "Simran" }
  ]);

  const addHolder = () => {
    const name = prompt("Enter new holder name");
    if (!name) return;
    const newHolder = { id: Date.now(), name };
    setHolders([...holders, newHolder]);
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
                <Link key={h.id} to={`/table/${h.id}`}>
                  <div className="backdrop-blur-3xl  p-5 rounded-2xl shadow-xl cursor-pointer hover:scale-105 transition">
                    <h2 className="text-xl text-white font-bold">{h.name}</h2>
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