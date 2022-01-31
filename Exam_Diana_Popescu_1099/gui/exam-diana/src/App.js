import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { JobPosting } from "./components/JobPosting";
import { Candidate } from "./components/Candidate";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/jobPosting" exact element={<JobPosting />}></Route>
          <Route path="/candidate" exact element={<Candidate />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
