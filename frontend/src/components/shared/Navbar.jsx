import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { persistor } from '@/redux/persistor'
const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`);
            if (res.data.success) {
                dispatch(setUser(null));
                // Purge persisted state to clear user from localStorage
                persistor.purge();
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <nav className="flex items-center justify-between mx-auto max-w-7xl h-20 px-4 sm:px-6 lg:px-8">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                        {/* Brand Icon: Briefcase or similar Lucide icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-7-8h8a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2z" /></svg>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">Path<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Wiser</span></span>
                </Link>
                <div className="flex items-center gap-10">
                    <ul className="flex font-medium items-center gap-6">
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className="hover:text-blue-600 transition-colors duration-200">Companies</Link></li>
                                    <li><Link to="/admin/jobs" className="hover:text-blue-600 transition-colors duration-200">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className="hover:text-blue-600 transition-colors duration-200">Home</Link></li>
                                    <li><Link to="/jobs" className="hover:text-blue-600 transition-colors duration-200">Jobs</Link></li>
                                    <li><Link to="/browse" className="hover:text-blue-600 transition-colors duration-200">Browse</Link></li>
                                </>
                            )
                        }


                    </ul>
                    {/* Always show Login/Signup when user is not logged in */}
                    {!user || user === null ? (
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button variant="outline" className="rounded-xl px-6 h-12 font-medium border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-200">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl rounded-xl px-6 h-12 transition-all duration-300">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className=''>
                                    <div className='flex gap-2 space-y-2'>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2 text-gray-600'>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 />
                                            <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                        </div>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}

                </div>
            </nav>
        </header>
    )
}

export default Navbar