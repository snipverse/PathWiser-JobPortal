import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <section className="max-w-7xl mx-auto my-20 px-4">
            <h1 className="text-5xl font-bold text-center mb-10">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Latest & Top</span>
                <span className="text-gray-900"> Job Openings</span>
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {allJobs.length <= 0 ? (
                    <span className="text-lg text-gray-500">No Job Available</span>
                ) : (
                    allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                )}
            </div>
        </section>
    )
}

export default LatestJobs