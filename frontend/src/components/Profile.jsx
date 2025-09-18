// ...existing code...
// ...existing code...
import { useState } from 'react'
// ...existing code...
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { useLocation } from 'react-router-dom';

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    const location = useLocation();
    useGetAppliedJobs(location);
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-4 p-4 sm:p-8'>
                <div className='flex flex-col sm:flex-row justify-between gap-4 sm:gap-0'>
                    <div className='flex flex-col sm:flex-row items-center gap-4'>
                        <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div className='text-center sm:text-left'>
                            <h1 className='font-medium text-lg sm:text-xl'>{user?.fullname}</h1>
                            <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right w-full sm:w-auto mt-2 sm:mt-0" variant="outline"><Pen /></Button>
                </div>
                <div className='my-4 sm:my-5'>
                    <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-4 sm:my-5'>
                    <h1 className='font-semibold text-base sm:text-lg'>Skills</h1>
                    <div className='flex flex-wrap items-center gap-1 mt-1'>
                        {Array.isArray(user?.profile?.skills) && user.profile.skills.length > 0 ? user.profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>}
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        user?.profile?.resume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer break-all'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl p-4 sm:p-8'>
                <h1 className='font-bold text-base sm:text-lg my-4 sm:my-5'>Applied Jobs</h1>
                {/* Applied Job Table   */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile