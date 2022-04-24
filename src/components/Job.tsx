import React from 'react';
import styles from "../styles/Job.module.css";
import {default as JobType} from "../models/job"

interface Props {
  job: JobType;
}

const Job = (props: Props) => {
  return (
    <>  
      {/* <div className="max-w-md px-4 py-2 m-4 mx-auto transition-all duration-100 bg-cyan-400 rounded-2xl h-fit backdrop-blur-3xl hover:bg-pink-600 sm:max-w-xl"> */}
      <div className="max-w-md px-4 py-2 m-4 mx-auto transition-all duration-100 bg-teal-400 border-2 border-teal-500 hover:cursor-pointer rounded-2xl h-fit backdrop-blur-3xl hover:bg-teal-500 sm:max-w-xl">
      {/* <div className="max-w-md px-4 py-2 m-4 mx-auto transition-all duration-100 bg-cyan-500 rounded-2xl h-fit backdrop-blur-3xl hover:bg-pink-600 sm:max-w-xl"> */}
        <div className="text-xl">{props.job.company}</div>
        <div className=""><span className="font-bold text-purple-800">Applied: </span> {props.job.applied}</div>
        <div className=""><span className="font-bold text-purple-800">Resume: </span> {props.job.resume}</div>
        <div className=""><span className="font-bold text-purple-800">Application URL: </span><a href={props.job.appUrl}>{props.job.appUrl}</a></div>
        <div className=""><span className="font-bold text-purple-800">Reason: </span> {props.job.reason}</div>
      </div>
    </>
  );
};

export default Job;