import React, { useState } from "react";

const FirstTask = () => {

  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { name, status };
    setTasks([...tasks, newTask]);
    setName("");
  };

  const filterTasks = () => {
    if (status === "All") {
      return tasks.sort((a, b) => (a.status === "Active" ? -1 : 1));
    } else {
      return tasks.filter((task) => task.status === status);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold mb-1">Order Name:</span>
          </div>
          <input
            type="text"
            placeholder="Type here Order Name"
            className="input input-bordered w-full max-w-xs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="form-control w-full text-start mt-3">
          <span className="text-gray-700 font-bold mb-1">Status:</span>
          <select
            className="select w-full max-w-xs"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option disabled selected>
              Select your option
            </option>
            <option>Complete</option>
            <option>Pending</option>
            <option>Active</option>
            <option>All</option>
          </select>
        </label>

        <label className="form-control w-full max-w-xs mt-3">
          <div className="label">
            <span className="label-text font-bold">Upload File</span>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            accept=".pdf, .doc, .docx,.png"
            onChange={(e) => handleFileChange(e)}
          />

        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 md:ml-[-1120px] mt-3"
        >
          Submit
        </button>
      </form>


      <table className="table w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-black">Name</th>
            <th className="px-4 py-2 text-black">Status</th>
          </tr>
        </thead>
        <tbody>
          {filterTasks().map((task, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{task.name}</td>
              <td className="border px-4 py-2">{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FirstTask;
