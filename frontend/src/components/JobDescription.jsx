import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        if (!user) {
            toast.error("Please login to apply for jobs");
            navigate("/login");
            return;
        }
        try {
            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/apply/${jobId}`,
                {}
            );            
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

    useEffect(() => {
        setLoading(true);
        setError(null);
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`);
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                    setLoading(false);
                } else {
                    setError('Job not found.');
                    setLoading(false);
                }
            } catch (error) {
                setError('Job not found or failed to load.');
                setLoading(false);
            }
        };
        fetchSingleJob();
        // Only clear on unmount
        return () => dispatch(setSingleJob(null));
    }, [jobId, dispatch, user?._id]);

    if (loading) {
        return null;
    }
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
                <div className="text-lg text-red-500">{error}</div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 sm:py-10">
            <div className="w-full max-w-md sm:max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-lg p-3 sm:p-8 border border-gray-100 glass-effect">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-6 w-full">
                    <div className="w-full">
                        <h1 className="text-lg sm:text-3xl font-bold text-gray-900 mb-2 break-words">{singleJob?.title || '-'}</h1>
                        <div className="flex flex-col xs:flex-row flex-wrap items-center gap-2 sm:gap-3 mt-2 w-full">
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-semibold rounded-xl px-3 sm:px-4 py-1 text-xs sm:text-base w-full xs:w-auto text-center">{singleJob?.position ? `${singleJob.position} Positions` : 'Positions'}</Badge>
                            <Badge className="bg-orange-100 text-orange-800 border-orange-200 font-semibold rounded-xl px-3 sm:px-4 py-1 text-xs sm:text-base w-full xs:w-auto text-center">{singleJob?.jobType || 'Type'}</Badge>
                            {singleJob?.salary ? (
                                <Badge className="bg-purple-100 text-purple-800 border-purple-200 font-semibold rounded-xl px-3 sm:px-4 py-1 text-xs sm:text-base w-full xs:w-auto text-center">{singleJob.salary}</Badge>
                            ) : null}
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`w-full sm:w-auto rounded-xl px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold shadow-lg transition-all duration-300 ${isApplied ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'}`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
                <h2 className="border-b border-gray-200 font-semibold text-base sm:text-xl py-3 sm:py-4 text-gray-800 mb-4">Job Description</h2>
                <div className="space-y-3 sm:space-y-4 text-xs sm:text-base">
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 w-full"><span className="font-bold text-gray-700 w-28 sm:w-40">Role:</span> <span className="text-gray-800 break-words flex-1">{singleJob?.title || '-'}</span></div>
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 w-full"><span className="font-bold text-gray-700 w-28 sm:w-40">Location:</span> <span className="text-gray-800 break-words flex-1">{singleJob?.location || '-'}</span></div>
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 w-full"><span className="font-bold text-gray-700 w-28 sm:w-40">Description:</span> <span className="text-gray-800 break-words flex-1">{singleJob?.description || '-'}</span></div>
                    {singleJob?.experience && (
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 w-full"><span className="font-bold text-gray-700 w-28 sm:w-40">Experience:</span> <span className="text-gray-800 flex-1">{singleJob.experience}</span></div>
                    )}
                    {singleJob?.salary && (
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 w-full"><span className="font-bold text-gray-700 w-28 sm:w-40">Salary:</span> <span className="text-gray-800 flex-1">{singleJob.salary}</span></div>
                    )}
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 w-full"><span className="font-bold text-gray-700 w-28 sm:w-40">Total Applicants:</span> <span className="text-gray-800 flex-1">{singleJob?.applications?.length ?? 0}</span></div>
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 w-full"><span className="font-bold text-gray-700 w-28 sm:w-40">Posted Date:</span> <span className="text-gray-800 flex-1">{singleJob?.createdAt ? singleJob.createdAt.split("T")[0] : '-'}</span></div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription