import React, { useRef } from 'react';
import Job from '../models/Job';
import styles from "../styles/NewJob.module.css";

interface Props {
  addJob(job: Job): void;
}

interface UserInput {
  company: string;
  resume: string;
  applied: string;
  appUrl: string;
  reason: string;
}

const NewJob = (props: Props) => {
  
  const userInputRef = useRef<UserInput>({
    company: '',
    resume: '',
    applied: '',
    appUrl: '',
    reason: ''
  });
  
  return (
    <div className={styles.background}>
      <div className="input-container">
        <input type="text" placeholder="Company" onChange={e => userInputRef.current.company = e.target.value}></input>
        <input type="text" placeholder="Resume" onChange={e => userInputRef.current.resume = e.target.value}></input>
        <input type="text" placeholder="Applied" onChange={e => userInputRef.current.applied = e.target.value}></input>
        <input type="text" placeholder="App URL" onChange={e => userInputRef.current.appUrl = e.target.value}></input>
      </div>
      <div>
        <input type="text" className="reason" placeholder="Reason" onChange={e => userInputRef.current.reason = e.target.value}></input>
      </div>
      <button onClick={() => props.addJob({
        key: Math.random(),
        company: userInputRef.current.company,
        resume: userInputRef.current.resume,
        applied: userInputRef.current.applied,
        reason: userInputRef.current.reason,
        appUrl: userInputRef.current.appUrl
      })}>Add</button>
    </div>
  );
};

export default NewJob;