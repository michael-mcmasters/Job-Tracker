import React, { useRef, useState } from 'react';
import Job from '../models/Job';
import styles from "../styles/NewJob.module.css";

interface Props {
  addJob(job: Job): void;
}

const NewJob = (props: Props) => {
  
  // This is a quick implementation.
  // In future, put these into 1 object. And don't use useState because page doesn't need to re-render when values update.
  const [companyInput, setCompanyInput] = useState("");
  const [resumeInput, setResumeInput ] = useState("");
  const [appliedInput, setAppliedInput] = useState("");
  const [appUrlInput, setAppUrlInput] = useState("");
  const [reasonInput, setReasonInput] = useState("");
  
  return (
    <div className={styles.background}>
      <div className="input-container">
        <input type="text" placeholder="Company" onChange={e => setCompanyInput(e.target.value)}></input>
        <input type="text" placeholder="Resume" onChange={e => setResumeInput(e.target.value)}></input>
        <input type="text" placeholder="Applied" onChange={e => setAppliedInput(e.target.value)}></input>
        <input type="text" placeholder="App URL" onChange={e => setAppUrlInput(e.target.value)}></input>
      </div>
      <div>
        <input type="text" className="reason" placeholder="Reason" onChange={e => setReasonInput(e.target.value)}></input>
      </div>
      <button onClick={() => props.addJob({
        key: Math.random(),
        company: companyInput,
        resume: resumeInput,
        applied: appliedInput,
        reason: reasonInput,
        appUrl: appUrlInput
      })}>Add</button>
    </div>
  );
};

export default NewJob;