import Header from "./components/Header";
import JobCard from "./components/JobCard";
import Navbar from "./components/NavBar";
import Searchbar from "./components/Searchbar";
import dummyData from "./dummyData";

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <Searchbar />
      {dummyData.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </>
  );
}

export default App;
