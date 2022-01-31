import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const jobPostingForm = () => {
    navigate("/jobPosting");
  };

  const candidateForm = () => {
    navigate("/candidate");
  };

  return (
    <div className="home">
      <div className="div1">
        <button className="button-62" onClick={jobPostingForm}>
          Job Postings
        </button>
      </div>
      <div className="div1">
        <button className="button-62" onClick={candidateForm}>
          Candidates
        </button>
      </div>
    </div>
  );
};
