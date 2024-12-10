import { useEffect, useState } from "react";
import Header from "./components/Header";
import JobCard from "./components/JobCard";
import Navbar from "./components/NavBar";
import Searchbar from "./components/Searchbar";
import { db } from "./firebase.config";
import { collection, query, getDocs, orderBy } from "firebase/firestore";

function App() {
  const [jobs, setJobs] = useState([]);

  const fetchJobsData = async () => {
    const tempJobs = [];
    const jobsData = query(collection(db, "jobs"));
    const quaryOrder = query(jobsData, orderBy("postedOn", "desc"));
    const quarySnapshot = await getDocs(quaryOrder);
    quarySnapshot.forEach((doc) => {
      console.log(doc.data());
      tempJobs.push({ ...doc.data(), id: doc.id });
    });

    setJobs(tempJobs);
  };

  useEffect(() => {
    fetchJobsData();
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      <Searchbar />
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </>
  );
}

export default App;
