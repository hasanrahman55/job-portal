import { useEffect, useState } from "react";
import Header from "./components/Header";
import JobCard from "./components/JobCard";
import Searchbar from "./components/Searchbar";
import { db } from "./firebase.config";
import { collection, query, getDocs, orderBy, where } from "firebase/firestore";

function App() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);

  const fetchJobs = async () => {
    setCustomSearch(false);
    const tempJobs = [];
    const jobsRef = query(collection(db, "jobs"));
    const q = query(jobsRef, orderBy("postedOn", "desc"));
    const req = await getDocs(q);

    req.forEach((job) => {
      // console.log(doc.id, " => ", doc.data());
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      });
    });
    setJobs(tempJobs);
  };

  // Fetch jobs with custom filters applied
  const fetchJobsCustom = async (jobCriteria) => {
    try {
      setCustomSearch(true);

      // Fetch all jobs
      const req = await getDocs(collection(db, "jobs"));
      const tempJobs = req.docs
        .map((job) => ({
          ...job.data(),
          id: job.id,
          postedOn: job.data().postedOn.toDate(),
        }))
        .filter(
          (job) =>
            (!jobCriteria.type || job.type === jobCriteria.type) &&
            (!jobCriteria.title || job.title === jobCriteria.title) &&
            (!jobCriteria.experience ||
              job.experience === jobCriteria.experience) &&
            (!jobCriteria.location || job.location === jobCriteria.location)
        );

      setJobs(tempJobs);
    } catch (error) {
      console.error("Error applying custom filters:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <Header />
      <Searchbar fetchJobsCustom={fetchJobsCustom} />
      {customSearch && (
        <button onClick={fetchJobs} className="flex pl-[1250px] mb-2">
          <p className="bg-blue-500 px-10 py-2 rounded-md text-white">
            Clear Filters
          </p>
        </button>
      )}
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
}

export default App;
