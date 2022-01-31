const JobPostingList = ({
  jobPostings,
  handleDelete,
  editJobPosting,
  viewCandidates,
}) => {
  return (
    <div className="jobPosting-list">
      {jobPostings.map((jobPosting) => (
        <div className="preview-jobPosting" key={jobPosting.id}>
          <div className="textHolder">
            <p>Job Id: {jobPosting.id}</p>
            <p>Description: {jobPosting.description}</p>
            <p>Deadline: {jobPosting.deadline}</p>
          </div>
          <div className="buttonHolder">
            <button
              className="button-62"
              onClick={() => handleDelete(jobPosting.id)}
            >
              Delete jobPosting
            </button>
            <button
              className="button-62"
              onClick={() => editJobPosting(jobPosting.id)}
            >
              Modify jobPosting
            </button>
            <button
              className="button-62"
              onClick={() => viewCandidates(jobPosting.id)}
            >
              View Candidates
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobPostingList;
