const CandidateList = ({ candidates, handleDelete, editCandidates, all }) => {
  return (
    <div className="candidate-list">
      {candidates.map((candidate) => (
        <div className="preview-jobPosting" key={candidate.id}>
          <div className="textHolder">
            <p>Name: {candidate.name}</p>
            <p>CV: {candidate.CV}</p>
            <p>Email: {candidate.email}</p>
            <p>Job: {candidate.jobPostingId}</p>
          </div>
          {!all && (
            <div className="buttonHolder">
              <button
                className="button-62"
                onClick={() => handleDelete(candidate.id)}
              >
                Delete candidate
              </button>
              <button
                className="button-62"
                onClick={() => editCandidates(candidate.id)}
              >
                Modify candidate
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CandidateList;
