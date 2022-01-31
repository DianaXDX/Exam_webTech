import { useEffect, useState } from "react";
import CandidateList from "./CandidateList";
import JobPostingList from "./JobPostingList";
import { useNavigate } from "react-router-dom";

export const JobPosting = () => {
  const navigate = useNavigate();

  const backHome = () => {
    navigate("/");
  };
  const [jobPostings, setJobPostings] = useState([]);
  const [job, setJobPosting] = useState({
    id: -1,
    description: "",
    deadline: "",
  });
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState();
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    getJobPostings();
  }, [job]);

  const getJobPostings = () => {
    const req = `http://localhost:8080/jobPosting`;
    fetch(req).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          setJobPostings(json);
        });
      } else {
        setJobPostings([]);
      }
    });
  };

  const createJobPosting = (e) => {
    e.preventDefault();

    const description = e.target.description.value;
    const deadline = e.target.deadline.value;

    if (description.length > 0) {
      const req = `http://localhost:8080/jobPosting`;
      fetch(req, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          description: description,
          deadline: deadline,
        }),
      }).then((response) => {
        if (response.status === 201) {
          console.log("jobPosting was inserted");
          getJobPostings();
        } else if (response.status === 500) {
          console.log("jobPosting was not inserted");
        }
      });
    }
  };

  const deleteJobPosting = (id) => {
    const req = `http://localhost:8080/jobPosting/${id}/`;
    fetch(req, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 201) {
        console.log("jobPosting was deleted");
      } else if (response.status === 500) {
        console.log("jobPosting was not deleted");
      } else if (response.status === 204) {
        console.log("jobPosting was deleted");
        getJobPostings();
      }
    });
  };

  const fetchData = (id) => {
    const req = `http://localhost:8080/jobPosting/${id}`;
    fetch(req).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          setJobPosting(json);
          setDescription(json.description);
          setDeadline(json.deadline);
        });
      }
    });
  };

  const editJobPosting = (e) => {
    const description2 = e.target.modifyDescription.value;
    const deadline2 = e.target.modifyDeadline.value;

    const req = `http://localhost:8080/jobPosting/${job.id}/`;
    fetch(req, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        description: description2,
        deadline: deadline2,
      }),
    }).then((response) => {
      if (response.status === 201) {
        console.log("jobPosting was modified");
        getJobPostings();
      } else if (response.status === 500) {
        console.log("jobPosting was not modified");
      }
    });
  };

  const handleView = (id) => {
    const req = `http://localhost:8080/candidate/job/${id}`;
    fetch(req).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          setCandidates(json);
        });
      }
    });
  };

  return (
    <div>
      <div className="left">
        <button className="button-62" onClick={backHome}>
          Back Home
        </button>
        <form className="form" onSubmit={createJobPosting}>
          <label className="description">Description of the job</label>
          <input type="text" name="description" placeholder="Description" />
          <label className="description">Deadline of the job</label>
          <input type="date" name="deadline" placeholder="Deadline" />
          <button className="button-62">Create Job Posting</button>
        </form>

        <form className="form2" onSubmit={editJobPosting}>
          <label className="description">
            Modify the description of the job
          </label>
          <input
            type="text"
            name="modifyDescription"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="description">Modify the deadline of the job</label>
          <input
            type="date"
            name="modifyDeadline"
            placeholder="Deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <button className="button-62">Modify Job Posting</button>
        </form>
      </div>

      <div className="right">
        <JobPostingList
          jobPostings={jobPostings}
          handleDelete={deleteJobPosting}
          editJobPosting={fetchData}
          viewCandidates={handleView}
        />
      </div>
      <div className="right">
        <CandidateList candidates={candidates} all={true} />
      </div>
    </div>
  );
};
