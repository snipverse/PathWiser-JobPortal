import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => { 
    const {allAdminJobs} = useSelector(store=>store.job);
    const navigate = useNavigate();

    return (
        <div className="overflow-x-auto">
            <Table className="bg-white/80 rounded-xl shadow-lg border border-gray-100 glass-effect text-xs sm:text-base min-w-[500px]">
                <TableCaption className="text-gray-500">A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="whitespace-nowrap">Company Name</TableHead>
                        <TableHead className="whitespace-nowrap">Role</TableHead>
                        <TableHead className="whitespace-nowrap">Date</TableHead>
                        <TableHead className="text-right whitespace-nowrap">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAdminJobs?.map((job) => (
                        <TableRow key={job._id} className="hover:bg-blue-50 transition-colors duration-200">
                            <TableCell className="font-semibold text-gray-900 whitespace-nowrap">{job?.company?.name}</TableCell>
                            <TableCell className="text-gray-700 whitespace-nowrap">{job?.title}</TableCell>
                            <TableCell className="text-gray-700 whitespace-nowrap">{job?.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer whitespace-nowrap">
                                <Popover>
                                    <PopoverTrigger><MoreHorizontal className="hover:text-blue-600 transition-colors" /></PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        <div onClick={()=> navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer hover:text-blue-600'>
                                            <Edit2 className='w-4' />
                                            <span>Edit</span>
                                        </div>
                                        <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2 hover:text-blue-600'>
                                            <Eye className='w-4'/>
                                            <span>Applicants</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable