import { useState } from 'react'
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
    const [menuOpen, setMenuOpen] = useState(false);

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
            <nav className="flex items-center justify-between mx-auto max-w-7xl h-16 px-2 sm:px-6 lg:px-8">
                <Link to="/" className="flex items-center gap-2 sm:gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                        {/* Brand Icon: Briefcase or similar Lucide icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-7-8h8a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2z" /></svg>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">Path<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Wiser</span></span>
                </Link>
                {/* Hamburger for mobile */}
                <button className="sm:hidden flex items-center ml-2 p-2 rounded-md hover:bg-blue-50 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    <svg className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                        )}
                    </svg>
                </button>
                {/* Desktop nav */}
                <div className="hidden sm:flex items-center gap-6">
                    <ul className="flex font-medium items-center gap-4">
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
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="outline" className="rounded-xl px-4 h-10 font-medium border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-200 text-sm">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl rounded-xl px-4 h-10 transition-all duration-300 text-sm">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer w-9 h-9">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-64">
                                <div className=''>
                                    <div className='flex gap-2 items-center'>
                                        <Avatar className="cursor-pointer w-9 h-9">
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
                {/* Mobile nav menu */}
                {menuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-md flex flex-col items-start px-4 py-4 gap-4 sm:hidden z-40 animate-fade-in">
                        <ul className="flex flex-col font-medium gap-3 w-full">
                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <li><Link to="/admin/companies" className="block py-2 px-2 rounded hover:bg-blue-50 w-full" onClick={() => setMenuOpen(false)}>Companies</Link></li>
                                        <li><Link to="/admin/jobs" className="block py-2 px-2 rounded hover:bg-blue-50 w-full" onClick={() => setMenuOpen(false)}>Jobs</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="/" className="block py-2 px-2 rounded hover:bg-blue-50 w-full" onClick={() => setMenuOpen(false)}>Home</Link></li>
                                        <li><Link to="/jobs" className="block py-2 px-2 rounded hover:bg-blue-50 w-full" onClick={() => setMenuOpen(false)}>Jobs</Link></li>
                                        <li><Link to="/browse" className="block py-2 px-2 rounded hover:bg-blue-50 w-full" onClick={() => setMenuOpen(false)}>Browse</Link></li>
                                    </>
                                )
                            }
                        </ul>
                        <div className="flex flex-col gap-2 w-full mt-2">
                            {!user || user === null ? (
                                <>
                                    <Link to="/login" className="w-full" onClick={() => setMenuOpen(false)}>
                                        <Button variant="outline" className="rounded-xl px-4 h-10 w-full font-medium border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-200 text-sm">Login</Button>
                                    </Link>
                                    <Link to="/signup" className="w-full" onClick={() => setMenuOpen(false)}>
                                        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl rounded-xl px-4 h-10 w-full transition-all duration-300 text-sm">Signup</Button>
                                    </Link>
                                </>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Avatar className="cursor-pointer w-9 h-9">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>{user?.fullname}</h4>
                                        <Button variant="link" className="p-0"><Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link></Button>
                                        <Button onClick={() => { logoutHandler(); setMenuOpen(false); }} variant="link" className="p-0">Logout</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
    </header>
    )
}

export default Navbar