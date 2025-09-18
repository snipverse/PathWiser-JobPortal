// import React from 'react' // Not needed with React 17+ JSX transform
import { Button } from './ui/button'
// import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

// import { USER_API_END_POINT } from '@/utils/constant';
// import { toast } from 'sonner';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUser } from '@/redux/authSlice';

import PropTypes from 'prop-types';

const Job = ({ job }) => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const { user } = useSelector(store => store.auth);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }



    return (
        <div className="bg-white/80 rounded-2xl shadow-lg border border-gray-100 glass-effect p-4 sm:p-6 flex flex-col justify-between min-h-[340px] sm:min-h-[370px]">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-gray-500 font-medium">{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </div>
                <div>
                    <h2 className="font-semibold text-base sm:text-lg text-gray-900">{job?.company?.name}</h2>
                    <p className="text-xs sm:text-sm text-gray-500">India</p>
                </div>
            </div>
            <div className="mb-2">
                <h1 className="font-bold text-base sm:text-xl text-gray-900 mb-1">{job?.title}</h1>
                <p className="text-xs sm:text-base text-gray-600 line-clamp-2">{job?.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-3 mb-3 sm:mb-4">
                <Badge
                    className="bg-blue-100 text-blue-800 border-blue-200 font-semibold rounded-xl px-2 sm:px-3 py-1 text-xs sm:text-base transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-blue-200/80 hover:shadow-md cursor-pointer"
                    tabIndex={0}
                >
                    {job?.position} Positions
                </Badge>
                <Badge
                    className="bg-orange-100 text-orange-800 border-orange-200 font-semibold rounded-xl px-2 sm:px-3 py-1 text-xs sm:text-base transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-orange-300 hover:bg-orange-200/80 hover:shadow-md cursor-pointer"
                    tabIndex={0}
                >
                    {job?.jobType}
                </Badge>
                <Badge
                    className="bg-purple-100 text-purple-800 border-purple-200 font-semibold rounded-xl px-2 sm:px-3 py-1 text-xs sm:text-base transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-purple-300 hover:bg-purple-200/80 hover:shadow-md cursor-pointer"
                    tabIndex={0}
                >
                    {job?.salary}LPA
                </Badge>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 mt-auto">
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="rounded-xl px-4 sm:px-6 h-10 sm:h-12 font-medium border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-200 w-full sm:w-auto">Details</Button>
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