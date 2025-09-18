import { useEffect, useState } from 'react'
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
    },[input, dispatch]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Navbar />
            <main className="max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
                <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Companies</span>
                </h1>
                <div className="bg-white/80 rounded-2xl shadow-lg border border-gray-100 glass-effect p-4 sm:p-8 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 w-full">
                        <Input
                            className="w-full sm:w-1/2 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
                            placeholder="Filter by name"
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button onClick={() => navigate("/admin/companies/create")}
                            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg rounded-xl px-6 sm:px-8 py-2 sm:py-3 h-11 sm:h-12 transition-all duration-300"
                        >New Company</Button>
                    </div>
                    <div className="overflow-x-auto">
                        <CompaniesTable/>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Companies