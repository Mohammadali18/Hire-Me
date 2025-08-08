import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
import JobDetails from "./components/JobCard/JobDetails";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 6;
  const [total, setTotal] = useState(0);
  const [criteria, setCriteria] = useState({});

  useEffect(() => {
    fetchJobs(page, criteria);
    // eslint-disable-next-line
  }, [page]);

  async function fetchJobs(pageNumber = 1, criteriaObj = {}) {
    setLoading(true);
    try {
      const params = { _page: pageNumber, _limit: limit };

      if (criteriaObj.title) params.title = criteriaObj.title;
      if (criteriaObj.type) params.type = criteriaObj.type;
      if (criteriaObj.location) params.location = criteriaObj.location;
      if (criteriaObj.experience) params.experience = criteriaObj.experience;
      if (criteriaObj.q) params.q = criteriaObj.q; // general search

      const res = await axios.get(`${API_BASE}/jobs`, { params });
      setJobs(res.data);
      const totalCount = res.headers["x-total-count"]
        ? parseInt(res.headers["x-total-count"], 10)
        : res.data.length;
      setTotal(totalCount);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  }

  // called from SearchBar
  function fetchJobsCustom(newCriteria) {
    setCriteria(newCriteria);
    setPage(1);
    fetchJobs(1, newCriteria);
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <SearchBar fetchJobsCustom={fetchJobsCustom} />
                {loading ? (
                  <div className="text-center py-12">Loading jobs...</div>
                ) : (
                  <>
                    {jobs.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">No jobs found</div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                          <JobCard key={job.id} job={job} />
                        ))}
                      </div>
                    )}

                    {/* Pagination */}
                    <div className="mt-8 flex justify-center items-center gap-3">
                      <button
                        className="px-3 py-1 border rounded disabled:opacity-50"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                      >
                        Prev
                      </button>
                      <div>
                        Page {page} of {totalPages}
                      </div>
                      <button
                        className="px-3 py-1 border rounded disabled:opacity-50"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
              </>
            }
          />

          <Route path="/jobs/:id" element={<JobDetails />} />
        </Routes>
      </main>

      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">© HireMe 2025</div>
      </footer>
    </div>
  );
}
