import React, { useState } from 'react';
import {default as JobType} from "../models/Job"
import useJobsAPI from '../hooks/useJobsAPI';


interface Props {
  job: JobType;
}

const Job = (props: Props) => {
  
  return (
    <>  
      <div className="max-w-md px-4 py-2 m-4 mx-auto transition-all duration-100 bg-teal-400 border-2 border-teal-500 hover:cursor-pointer rounded-2xl h-fit backdrop-blur-3xl hover:bg-teal-500 sm:max-w-xl">
        <div className="text-xl">{props.job.company}</div>
        <div className=""><span className="font-bold text-purple-800">Applied: </span> {props.job.applied}</div>
        <div className=""><span className="font-bold text-purple-800">Resume: </span> {props.job.resume}</div>
        <div className=""><span className="font-bold text-purple-800">Application URL: </span><a href={props.job.appUrl}>{props.job.appUrl}</a></div>
        <div className=""><span className="font-bold text-purple-800">Reason: </span> {props.job.reason}</div>
        
        <a href={'/resume-viewer/first-file.pdf'} target="_blank" rel="noreferrer">Show Resume</a>
      </div>
    </>
  );
};

export default Job;