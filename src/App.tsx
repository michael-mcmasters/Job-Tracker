import { useEffect } from 'react';
import styles from './styles/App.module.css';
import NewJob from './components/NewJobForm';
import JobEntries from './components/Jobs';
import PDFViewer from './components/PDFViewer';
import useJobsAPI from './hooks/useJobsAPI';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  const { jobsArr, fetchJobs, postJob, getResumeFromS3, postResumeToS3 } = useJobsAPI();
  
  useEffect(() => {
    fetchJobs();
  }, [])
  
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={
              <>
                <NewJob postJob={postJob} postResumeToS3={postResumeToS3} jobsArr={jobsArr} />
                <JobEntries jobsArr={jobsArr} />
              </>
            } />
        </Routes>
        <Routes>
          <Route path='/resume-viewer/:resumeFileName' element={<PDFViewer getResumeFromS3={getResumeFromS3} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
