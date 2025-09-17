// import React from 'react' // Not needed with React 17+ JSX transform
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';

import PropTypes from 'prop-types';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }

    const handleSaveJob = async () => {
        if (!user) {
            toast.error('Please login to save jobs.');
            return;
        }
        try {
            const res = await axios.post(`${USER_API_END_POINT}/savejob/${job._id}`, {}, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                // Optionally update user in Redux to reflect savedJobs
                dispatch(setUser({ ...user, savedJobs: res.data.savedJobs }));
            } else {
                toast.error(res.data.message || 'Failed to save job.');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to save job.');
        }
    };

    return (
        <div className="bg-white/80 rounded-2xl shadow-lg border border-gray-100 glass-effect p-6 flex flex-col justify-between min-h-[370px]">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 font-medium">{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</span>
                <Button variant="ghost" className="rounded-full p-2 hover:bg-blue-100 transition-colors" size="icon" onClick={handleSaveJob} aria-label="Save job">
                    <Bookmark className="w-5 h-5 text-blue-600" />
                </Button>
            </div>
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </div>
                <div>
                    <h2 className="font-semibold text-lg text-gray-900">{job?.company?.name}</h2>
                    <p className="text-sm text-gray-500">India</p>
                </div>
            </div>
            <div className="mb-2">
                <h1 className="font-bold text-xl text-gray-900 mb-1">{job?.title}</h1>
                <p className="text-base text-gray-600">{job?.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-3 mb-4">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-semibold rounded-xl px-3 py-1">{job?.position} Positions</Badge>
                <Badge className="bg-orange-100 text-orange-800 border-orange-200 font-semibold rounded-xl px-3 py-1">{job?.jobType}</Badge>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200 font-semibold rounded-xl px-3 py-1">{job?.salary}LPA</Badge>
            </div>
            <div className="flex items-center gap-3 mt-auto">
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="rounded-xl px-6 h-12 font-medium border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-200">Details</Button>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl rounded-xl px-6 h-12 transition-all duration-300" onClick={handleSaveJob}>Save For Later</Button>
            </div>
        </div>
    )
}

Job.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string,
        createdAt: PropTypes.string,
        company: PropTypes.shape({
            logo: PropTypes.string,
            name: PropTypes.string,
        }),
        title: PropTypes.string,
        description: PropTypes.string,
        position: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        jobType: PropTypes.string,
        salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
};

export default Job