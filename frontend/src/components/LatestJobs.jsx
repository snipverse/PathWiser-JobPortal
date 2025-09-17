
import LatestJobCards from './LatestJobCards';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
    useEffect(() => { AOS.init({ duration: 600, once: true, easing: 'ease-out-cubic' }); }, []);
    return (
        <section className="max-w-xs xs:max-w-md sm:max-w-2xl lg:max-w-7xl mx-auto my-10 sm:my-20 px-2 sm:px-4">
            <h1 className="text-2xl xs:text-3xl sm:text-5xl font-bold text-center mb-6 sm:mb-10">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Latest & Top</span>
                <span className="text-gray-900"> Job Openings</span>
            </h1>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 justify-items-center">
                {allJobs.length <= 0 ? (
                    <span className="text-base sm:text-lg text-gray-500">No Job Available</span>
                ) : (
                    allJobs.slice(0, 6).map((job, idx) => <div data-aos="fade-up" data-aos-delay={idx*80} key={job._id}><LatestJobCards job={job} /></div>)
                )}
            </div>
        </section>
    )
}

export default LatestJobs