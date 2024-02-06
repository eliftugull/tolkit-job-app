import { useDispatch, useSelector } from "react-redux";
import { setError, setJobs, setLoading } from "../redux/slices/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Filter from "../components/Filter";

const JobList = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.jobSlice);

  const fetchData = () => {
    dispatch(setLoading());

    axios.get("http://localhost:4000/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err.message)));
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="list-page">
<Filter jobs={state.jobs}/>


      {state.isLoading ? (
        <Loader />
      ) : state.isError ? (
        <div className="error">
          <p>
            Üzgünüz veriler yüklenirken bir hata oluştu
            <span>{state.isError}</span>
          </p>

          <button onClick={fetchData} className="button">
            <svg
              viewBox="0 0 16 16"
              className="bi bi-lightning-charge-fill"
              fill="currentColor"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"></path>
            </svg>
            TEKRAR DENE
          </button>
        </div>
      ) : (
        <div className="job-list">
          {state.jobs.map((job) =><Card job={job} key={job.id}/> )}
        </div>
      )}
    </div>
  );
};

export default JobList;
