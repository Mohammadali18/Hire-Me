import React, { useState } from "react";

function SearchBar({ fetchJobsCustom }) {
  const [jobCriteria, setJobCriteria] = useState({
    title: "",
    location: "",
    experience: "",
    type: "",
    q: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const search = async () => {
    await fetchJobsCustom(jobCriteria);
  };

  const clear = () => {
    const empty = { title: "", location: "", experience: "", type: "", q: "" };
    setJobCriteria(empty);
    fetchJobsCustom(empty);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-wrap gap-4 justify-center">
        <input
          name="q"
          value={jobCriteria.q}
          onChange={handleChange}
          placeholder="Search by title, company or keyword"
          className="w-full md:w-80 p-3 border rounded-md"
        />

        <select name="title" value={jobCriteria.title} onChange={handleChange} className="w-full md:w-64 p-3 border rounded-md">
          <option value="">Job Role</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="UI/UX Designer">UI/UX Designer</option>
          <option value="iOS Developer">iOS Developer</option>
        </select>

        <select name="type" value={jobCriteria.type} onChange={handleChange} className="w-full md:w-48 p-3 border rounded-md">
          <option value="">Job Type</option>
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Contract</option>
        </select>

        <select name="location" value={jobCriteria.location} onChange={handleChange} className="w-full md:w-48 p-3 border rounded-md">
          <option value="">Location</option>
          <option>Remote</option>
          <option>Onsite</option>
          <option>Hybrid</option>
        </select>

        <select name="experience" value={jobCriteria.experience} onChange={handleChange} className="w-full md:w-48 p-3 border rounded-md">
          <option value="">Experience</option>
          <option>Fresher</option>
          <option>Junior Level</option>
          <option>Mid Level</option>
          <option>Senior Level</option>
        </select>

        <div className="flex gap-2 items-center">
          <button onClick={search} className="px-4 py-3 bg-blue-600 text-white rounded-md">🔍 Search</button>
          <button onClick={clear} className="px-4 py-3 border rounded-md">Clear</button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
