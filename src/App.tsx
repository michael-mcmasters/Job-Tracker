import { useEffect } from 'react';
import styles from './styles/App.module.css';
import NewJob from './components/NewJobForm';
import JobEntries from './components/Jobs';
import PDFViewer from './components/PDFViewer';
import useJobsAPI from './hooks/useJobsAPI';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  const { jobsArr, fetchJobs, addJob } = useJobsAPI();
  
  useEffect(() => {
    fetchJobs();
  }, [])
  
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={
              <>
                <NewJob addJob={addJob} />
                <JobEntries jobsArr={jobsArr} />
              </>
            } />
        </Routes>
        <Routes>
          <Route path='/pdf-viewer' element={<PDFViewer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
