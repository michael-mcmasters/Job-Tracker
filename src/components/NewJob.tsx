import React from 'react';
import Job from '../models/Job';
import styles from "../styles/NewJob.module.css";

interface Props {
  addJob(job: Job): void;
}

const NewJob = (props: Props) => {
  
  return (
    <div className={styles.background}>
      <div className="input-container">
        <input type="text" placeholder="Company"></input>
        <input type="text" placeholder="Resume"></input>
        <input type="text" placeholder="Applied"></input>
        <input type="text" placeholder="App URL"></input>
      </div>
      <div>
        <input type="text" className="reason" placeholder="Reason"></input>
      </div>
      <button onClick={() => props.addJob({
        key: Math.random(),
        company: '',
        resume: '',
        applied: '',
        reason: '',
        appUrl: ''
      })}>Add</button>
    </div>
  );
};

export default NewJob;