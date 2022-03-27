import React from 'react';
import styles from "../styles/Job.module.css";

interface Job {
  company: string;
  resume: string;
  applied: string;
  reason: string;
  appUrl: string;
}

const Job = (props: Job) => {
  return (
    <div className={styles.background}>
      
      <span>{props.company}</span>
      <span>{props.resume}</span>
      <span>{props.applied}</span>
      <span>{props.reason}</span>
      <p>
        <span>{props.appUrl}</span>
      </p>
    </div>
  );
};

export default Job;