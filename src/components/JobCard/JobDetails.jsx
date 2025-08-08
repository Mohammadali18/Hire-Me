import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/jobs/${id}`).then((r) => setJob(r.data)).catch(console.error);
  }, [id]);

  if (!job) return <div className="py-8 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
      <div className="text-sm text-gray-600 mb-4">{job.company} • {job.location} • {job.type}</div>
      <p className="mb-4">{job.description}</p>
      <div className="flex gap-3">
        <a href={job.job_link} target="_blank" rel="noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded">Apply Externally</a>
        <Link to="/" className="px-4 py-2 border rounded">Back to jobs</Link>
      </div>
    </div>
  );
}
