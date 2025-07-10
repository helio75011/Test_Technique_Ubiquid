import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobList from './components/JobList/JobList';
import Stats from './components/Stats/Stats';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;