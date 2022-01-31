import { useEffect, useState } from "react";
import CandidateList from "./CandidateList";
import { useNavigate } from "react-router-dom";

export const Candidate = () => {
  const navigate = useNavigate();

  const backHome = () => {
    navigate("/");
  };
  const [candidates, setCandidates] = useState([]);
  const [candidate, setCandidate] = useState({
    id: -1,
    name: "",
    CV: "",
    email: "",
  });
  const [name, setName] = useState("");
  const [CV, setCV] = useState();
  const [email, setEmail] = useState();
  const [jobPosting, setJobPostings] = useState([]);

  useEffect(() => {
    getCandidates();
    getJobPostings();
  }, [candidate]);

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

  const getCandidates = () => {
    const req = `http://localhost:8080/candidate`;
    fetch(req).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          setCandidates(json);
        });
      } else {
        setCandidates([]);
      }
    });
  };

  const createCandidate = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const CV = e.target.CV.value;
    const email = e.target.email.value;
    const job = e.target.jobPost.value;

    console.log(job);

    if (name.length > 0) {
      const req = `http://localhost:8080/candidate`;
      fetch(req, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          name: name,
          CV: CV,
          email: email,
          jobPostingId: job,
        }),
      }).then((response) => {
        if (response.status === 201) {
          console.log("Candidate was inserted");
          getCandidates();
        } else if (response.status === 500) {
          console.log("Candidate was not inserted");
        }
      });
    }
  };

  const deleteJobPosting = (id) => {
    const req = `http://localhost:8080/candidate/${id}/`;
    fetch(req, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      console.log(response);
      if (response.status === 201) {
        console.log("Candidate was deleted");
      } else if (response.status === 500) {
        console.log("Candidate was not deleted");
      } else if (response.status === 204) {
        getCandidates();
        console.log("Candidate was deleted");
      }
    });
  };

  const fetchData = (id) => {
    const req = `http://localhost:8080/candidate/${id}`;
    fetch(req).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          setCandidate(json);
          setName(json.name);
          setCV(json.CV);
          setEmail(json.email);
        });
      }
    });
  };

  const editJobPosting = (e) => {
    const name2 = e.target.modifyName.value;
    const CV2 = e.target.modifyCV.value;
    const email2 = e.target.modifyEmail.value;

    const req = `http://localhost:8080/candidate/${candidate.id}/`;
    fetch(req, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: name2,
        CV: CV2,
        email: email2,
      }),
    }).then((response) => {
      if (response.status === 201) {
        console.log("Candidate was modified");
        getCandidates();
      } else if (response.status === 500) {
        console.log("Candidate was not modified");
      }
    });
  };

  return (
    <div>
      <div className="left">
        <button className="button-62" onClick={backHome}>
          Back Home
        </button>
        <form className="form" onSubmit={createCandidate}>
          <input type="text" name="name" placeholder="name" />
          <input type="text" name="CV" placeholder="CV" />
          <input type="email" name="email" placeholder="email" />
          <select id="jobs" name="jobPost">
            {jobPosting.map((job) => (
              <option value={job.id} key={job.id}>
                {job.description}
              </option>
            ))}
          </select>
          <button className="button-62">Create candidate</button>
        </form>

        <form className="form2" onSubmit={editJobPosting}>
          <input
            type="text"
            name="modifyName"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            name="modifyCV"
            placeholder="CV"
            value={CV}
            onChange={(e) => setCV(e.target.value)}
          />
          <input
            type="email"
            name="modifyEmail"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="button-62">Modify candidate</button>
        </form>
      </div>

      <div className="right">
        <CandidateList
          candidates={candidates}
          handleDelete={deleteJobPosting}
          editCandidates={fetchData}
          all={false}
        />
      </div>
    </div>
  );
};
