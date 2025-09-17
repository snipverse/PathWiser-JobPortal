import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-8 text-center">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Companies</span>
                </h1>
                <div className="bg-white/80 rounded-2xl shadow-lg border border-gray-100 glass-effect p-8 mb-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                        <Input
                            className="w-full sm:w-1/2 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-3"
                            placeholder="Filter by name"
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button onClick={() => navigate("/admin/companies/create")}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg rounded-xl px-8 py-3 h-12 transition-all duration-300"
                        >New Company</Button>
                    </div>
                    <CompaniesTable/>
                </div>
            </main>
        </div>
    )
}

export default Companies