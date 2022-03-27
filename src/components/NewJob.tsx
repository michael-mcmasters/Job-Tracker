import React, { useRef } from 'react';
import Job from '../models/Job';
import styles from "../styles/NewJob.module.css";

interface Props {
  addJob(job: Job): void;
}

class UserInput {
  company: string = '';
  resume: string = '';
  applied: string = '';
  appUrl: string = '';
  reason: string = '';
}

const NewJob = (props: Props) => {
  
  const userInput = useRef<UserInput>(new UserInput());
  
  return (
    <div className={styles.background}>
      <div className="input-container">
        <input type="text" placeholder="Company" onChange={e => userInput.current.company = e.target.value}></input>
        <input type="text" placeholder="Resume" onChange={e => userInput.current.resume = e.target.value}></input>
        <input type="text" placeholder="Applied" onChange={e => userInput.current.applied = e.target.value}></input>
        <input type="text" placeholder="App URL" onChange={e => userInput.current.appUrl = e.target.value}></input>
      </div>
      <div>
        <input type="text" className="reason" placeholder="Reason" onChange={e => userInput.current.reason = e.target.value}></input>
      </div>
      <button onClick={() => props.addJob({
        key: Math.random(),
        company: userInput.current.company,
        resume: userInput.current.resume,
        applied: userInput.current.applied,
        reason: userInput.current.reason,
        appUrl: userInput.current.appUrl
      })}>Add</button>
    </div>
  );
};

export default NewJob;