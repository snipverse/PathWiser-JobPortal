// ...existing code...
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div className="overflow-x-auto">
            <Table className="bg-white/80 rounded-xl shadow-lg border border-gray-100 glass-effect">
                <TableCaption className="text-gray-500">A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length <= 0 ? (
                        <tr><td colSpan={4} className="text-center py-6 text-gray-400">You haven&apos;t applied any job yet.</td></tr>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className="hover:bg-blue-50 transition-colors duration-200">
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={
                                        appliedJob?.status === "rejected"
                                            ? "bg-red-100 text-red-800 border-red-200 font-semibold rounded-xl px-3 py-1"
                                            : appliedJob.status === 'pending'
                                            ? "bg-gray-100 text-gray-800 border-gray-200 font-semibold rounded-xl px-3 py-1"
                                            : "bg-green-100 text-green-800 border-green-200 font-semibold rounded-xl px-3 py-1"
                                    }>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable