import React from 'react';
import styles from "../styles/Job.module.css";
import Job from "../models/Job"

interface Props {
  job: Job;
}

const JobEntry = (props: Props) => {
  return (
    <div className={styles.background}>
      <span>{props.job.company}</span>
      <span>{props.job.resume}</span>
      <span>{props.job.applied}</span>
      <span>{props.job.reason}</span>
      <p>
        <span>{props.job.appUrl}</span>
      </p>
    </div>
  );
};

export default JobEntry;