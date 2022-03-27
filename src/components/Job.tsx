import React from 'react';
import "../styles/Job.css"

interface Job {
  company: string;
  resume: string;
  applied: string;
  reason: string;
  appUrl: string;
}

const Job = (props: Job) => {
  return (
    <div className="background">
      {props.company}
      {props.resume}
      {props.applied}
      {props.reason}
      {props.appUrl}
    </div>
  );
};

export default Job;