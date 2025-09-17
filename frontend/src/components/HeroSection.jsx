import React, { useState } from 'react'
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
        <section className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-100 py-16 px-4">
            <span className="px-4 py-2 rounded-full bg-white/80 text-blue-600 font-semibold shadow mb-6 inline-block">No. 1 Job Hunt Website</span>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-4 leading-tight text-center">
                Find Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Dream Job</span>
                <span className="block text-3xl lg:text-4xl font-bold text-gray-900 mt-2">in India</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">Connect with top companies and discover opportunities that match your skills. Your next career move is just one search away.</p>
            <div className="w-full max-w-2xl flex flex-col gap-0">
                <div className="flex items-center bg-white/80 rounded-xl px-6 py-4 gap-4 shadow-sm border border-gray-100" style={{boxShadow: '0 2px 16px 0 rgba(25, 118, 210, 0.06)'}}>
                    <Search className="w-6 h-6 text-blue-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Job title, keyword"
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full h-12 text-base bg-transparent"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl px-8 py-3 h-12 transition-all duration-300 shadow-none"
                    >
                        Search Jobs
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default HeroSection