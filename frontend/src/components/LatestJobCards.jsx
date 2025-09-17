// ...existing code...
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types';

const LatestJobCards = ({ job }) => {
LatestJobCards.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string,
        company: PropTypes.shape({
            name: PropTypes.string,
        }),
        title: PropTypes.string,
        description: PropTypes.string,
        position: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        jobType: PropTypes.string,
        salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
};
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className="bg-white/80 rounded-2xl shadow-lg border border-gray-100 glass-effect p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 min-h-[220px] flex flex-col justify-between"
        >
            <div>
                <h1 className="font-semibold text-lg text-gray-900">{job?.company?.name}</h1>
                <p className="text-sm text-gray-500">India</p>
            </div>
            <div className="my-2">
                <h1 className="font-bold text-xl text-gray-900 mb-1">{job?.title}</h1>
                <p className="text-base text-gray-600">{job?.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-3">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-semibold rounded-xl px-3 py-1">{job?.position} Positions</Badge>
                <Badge className="bg-orange-100 text-orange-800 border-orange-200 font-semibold rounded-xl px-3 py-1">{job?.jobType}</Badge>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200 font-semibold rounded-xl px-3 py-1">{job?.salary}LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards