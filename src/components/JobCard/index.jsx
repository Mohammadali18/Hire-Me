import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function JobCard({ job }) {
  const posted = dayjs().diff(dayjs(job.postedOn), "day");

  return (
    <article className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition">
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <p className="text-gray-600">{job.company} • {job.location}</p>
          <p className="text-sm text-gray-500 mt-2">{job.type} • {job.experience}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            {job.skills?.map((s, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded border text-gray-600">{s}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end justify-between">
          <div className="text-sm text-gray-500">Posted {posted <= 0 ? "today" : `${posted} day${posted>1?'s':''} ago`}</div>

          <div className="mt-3 flex gap-2">
            <Link to={`/jobs/${job.id}`} className="px-3 py-2 border rounded text-sm">View</Link>
            <a href={job.job_link} target="_blank" rel="noreferrer" className="px-3 py-2 bg-blue-600 text-white rounded text-sm">Apply</a>
          </div>
        </div>
      </div>
    </article>
  );
}
