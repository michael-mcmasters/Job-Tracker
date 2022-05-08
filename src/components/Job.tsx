import React, { useState } from 'react';
import {default as JobType} from "../models/Job"

interface Props {
  job: JobType;
}

const Job = (props: Props) => {
  
  // AWS s3 replaces slashes (/) with colons (:), so they need be replaced here too before fetching. Also the slashes break React Router anyway so it's just better overall to replace them with colons.
  function formatResumeName() {
    const formatted = props.job.resume.replaceAll("/", ":");
    return `${formatted}.pdf`
  }
  
  return (
    <>  
      <a className="flex flex-col max-w-md px-4 py-2 m-4 mx-auto transition-all duration-100 bg-teal-400 border-2 border-teal-500 hover:cursor-pointer rounded-2xl h-fit backdrop-blur-3xl hover:bg-teal-500 sm:max-w-xl" href={props.job.appUrl} target="_blank">
        <div className="flex">
          {/* Left flex box */}
          <div className="w-10/12">
            <div className="text-xl">{props.job.company}</div>
            <div><span className="font-bold text-purple-800">Applied: </span>{props.job.applied}</div>
            <div className="truncate">
              <span className="font-bold text-purple-800">Application URL: </span>{props.job.appUrl}
            </div>
          </div>
          
          {/* Right flex box */}
          <div className="ml-auto text-xs font-bold text-white bg-purple-500 border-2 border-purple-600 rounded-lg w-14">
            <a className="flex flex-col justify-center inline-block h-full" href={`/resume-viewer/${formatResumeName()}`} target="_blank" rel="noreferrer">
              <div className="pb-1 mx-auto">
                {props.job.resume}
              </div>
            </a>
          </div>
        </div>
        
        {/* Reason */}
        <div className=""><span className="font-bold text-purple-800">Reason: </span> {props.job.reason}</div>
      </a>
    </>
  );
};

export default Job;