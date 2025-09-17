import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-100 py-10 px-2 sm:py-16 sm:px-4"
        >
            <motion.span
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="px-3 py-1.5 rounded-full bg-white/80 text-blue-600 font-semibold shadow mb-4 sm:mb-6 text-xs sm:text-base inline-block"
            >No. 1 Job Hunt Website</motion.span>
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-3xl xs:text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight text-center"
            >
                Find Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Dream Job</span>
                <span className="block text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-1 sm:mt-2">in India</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-sm xs:text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 text-center max-w-xs xs:max-w-md sm:max-w-2xl"
            >Connect with top companies and discover opportunities that match your skills. Your next career move is just one search away.</motion.p>
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="w-full max-w-xs xs:max-w-md sm:max-w-2xl flex flex-col gap-0"
            >
                <div className="flex flex-col xs:flex-row items-stretch xs:items-center bg-white/80 rounded-xl px-3 xs:px-6 py-3 xs:py-4 gap-2 xs:gap-4 shadow-sm border border-gray-100" style={{boxShadow: '0 2px 16px 0 rgba(25, 118, 210, 0.06)'}}>
                    <div className="flex items-center mb-2 xs:mb-0">
                        <Search className="w-5 h-5 xs:w-6 xs:h-6 text-blue-500 mr-2" />
                    </div>
                    <input
                        type="text"
                        placeholder="Job title, keyword"
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full h-10 xs:h-12 text-sm xs:text-base bg-transparent"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl px-4 xs:px-8 py-2 xs:py-3 h-10 xs:h-12 transition-all duration-300 shadow-none mt-2 xs:mt-0"
                    >
                        Search Jobs
                    </Button>
                </div>
            </motion.div>
        </motion.section>
    )
}

export default HeroSection