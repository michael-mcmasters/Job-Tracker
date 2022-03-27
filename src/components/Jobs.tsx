import React from 'react';
import Job from './Job';

const Jobs = () => {
  //const [jobs, setJobs] = useState([]);
  
  // Fetch jobs from API and then show them
  
  return (
    <>
      <Job company="Zillow" resume={'3.27.22'} applied={'3.27.22'} reason={'Cool company'} appUrl={"zillow.com"} />
      <Job company="Nvidia" resume={'1.1.22'} applied={'2.2.22'} reason={'Twosday lol'} appUrl={"nvidia.com"}/>
    </>
  );
};

export default Jobs;