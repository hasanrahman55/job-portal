import { useEffect, useState } from "react";
import Header from "./components/Header";
import JobCard from "./components/JobCard";
import Navbar from "./components/NavBar";
import Searchbar from "./components/Searchbar";
import { db } from "./firebase.config";
import { collection, query, getDocs } from "firebase/firestore";

function App() {
  const [jobs, setJobs] = useState([]);

  const fetchJobsData = async () => {
    const jobsData = query(collection(db, "jobs"));
    const quarySnapshot = await getDocs(jobsData);
    quarySnapshot.forEach((doc) => {
      console.log(doc.data());

      setJobs([...jobs, { id: doc.id, ...doc.data() }]);
    });
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
