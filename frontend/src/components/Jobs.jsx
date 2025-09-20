import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    // Helper to extract min/max from salary string like '₹22,00,000 - ₹35,00,000 per year (Depending on experience)'
    const parseSalaryRange = (salaryStr) => {
        if (!salaryStr) return [null, null];
        const match = salaryStr.replace(/,/g, '').match(/₹(\d+)\s*-\s*₹(\d+)/);
        if (match) {
            return [parseInt(match[1], 10), parseInt(match[2], 10)];
        }
        return [null, null];
    };

    useEffect(() => {
        if (searchedQuery) {
            const query = searchedQuery.toLowerCase();
            let selectedSalaryRange = null;
            // If the query looks like a salary range, parse it
            if (query.includes('₹') && query.includes('-')) {
                selectedSalaryRange = parseSalaryRange(searchedQuery);
            }
            const filteredJobs = allJobs.filter((job) => {
                // Salary range logic
                if (selectedSalaryRange && job.salary) {
                    const [jobMin, jobMax] = parseSalaryRange(job.salary);
                    const [filterMin, filterMax] = selectedSalaryRange;
                    if (jobMin !== null && jobMax !== null && filterMin !== null && filterMax !== null) {
                        // Check if ranges overlap
                        if (jobMax >= filterMin && jobMin <= filterMax) {
                            return true;
                        }
                    }
                }
                // Partial match for location, job role (jobType), title, description
                return (
                    (job.location && job.location.toLowerCase().includes(query)) ||
                    (job.jobType && job.jobType.toLowerCase().includes(query)) ||
                    (job.title && job.title.toLowerCase().includes(query)) ||
                    (job.description && job.description.toLowerCase().includes(query))
                );
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Navbar />
            <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-10">
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-8 text-center sm:text-left">Browse Jobs</h1>
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
                    <aside className="w-full lg:w-1/4 mb-4 lg:mb-0">
                        <FilterCard />
                    </aside>
                    <section className="flex-1">
                        {filterJobs.length <= 0 ? (
                            <span className="block text-base sm:text-lg text-gray-500 mt-8 sm:mt-12">Job not found</span>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        transition={{ duration: 0.4 }}
                                        key={job?._id}
                                        className=""
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    )
}

export default Jobs