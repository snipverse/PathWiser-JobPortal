import { useEffect, useState } from 'react'
// ...existing code...
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10">
            <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-lg p-8 border border-gray-100 glass-effect">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{singleJob?.title}</h1>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-semibold rounded-xl px-4 py-1">{singleJob?.position} Positions</Badge>
                            <Badge className="bg-orange-100 text-orange-800 border-orange-200 font-semibold rounded-xl px-4 py-1">{singleJob?.jobType}</Badge>
                            <Badge className="bg-purple-100 text-purple-800 border-purple-200 font-semibold rounded-xl px-4 py-1">{singleJob?.salary}LPA</Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-xl px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-300 ${isApplied ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'}`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
                <h2 className="border-b border-gray-200 font-semibold text-xl py-4 text-gray-800 mb-4">Job Description</h2>
                <div className="space-y-4">
                    <div className="flex gap-2"><span className="font-bold text-gray-700 w-40">Role:</span> <span className="text-gray-800">{singleJob?.title}</span></div>
                    <div className="flex gap-2"><span className="font-bold text-gray-700 w-40">Location:</span> <span className="text-gray-800">{singleJob?.location}</span></div>
                    <div className="flex gap-2"><span className="font-bold text-gray-700 w-40">Description:</span> <span className="text-gray-800">{singleJob?.description}</span></div>
                    <div className="flex gap-2"><span className="font-bold text-gray-700 w-40">Experience:</span> <span className="text-gray-800">{singleJob?.experience} yrs</span></div>
                    <div className="flex gap-2"><span className="font-bold text-gray-700 w-40">Salary:</span> <span className="text-gray-800">{singleJob?.salary}LPA</span></div>
                    <div className="flex gap-2"><span className="font-bold text-gray-700 w-40">Total Applicants:</span> <span className="text-gray-800">{singleJob?.applications?.length}</span></div>
                    <div className="flex gap-2"><span className="font-bold text-gray-700 w-40">Posted Date:</span> <span className="text-gray-800">{singleJob?.createdAt?.split("T")[0]}</span></div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription