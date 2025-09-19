import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        role: "student",
        file: null
    });
    const [errors, setErrors] = useState({});
    const {user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
    const fileChangeHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        // Validation
        const newErrors = {};
        if (!input.fullname.trim()) newErrors.fullname = "Please enter your full name.";
        if (!input.email.trim()) newErrors.email = "Email address is required.";
        if (!input.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required.";
        if (!input.password) newErrors.password = "Password cannot be empty.";
        if (!input.confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
        if (input.password && input.confirmPassword && input.password !== input.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
        if (!input.file) newErrors.file = "Profile photo is required.";
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("resume", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [navigate, user]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Navbar />
            <div className="flex items-center justify-center min-h-[80vh] px-2">
                <form onSubmit={submitHandler} className="w-full max-w-xs sm:max-w-md bg-white/80 rounded-2xl shadow-lg p-4 sm:p-8 border border-gray-100 glass-effect">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Signup</h2>
                    <h1 className='font-bold text-lg sm:text-xl mb-3 sm:mb-5 text-center sm:text-left'>Signup</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder=""
                        />
                        {errors.fullname && <div className="text-red-500 text-xs mt-1">{errors.fullname}</div>}
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder=""
                        />
                        {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder=""
                        />
                        {errors.phoneNumber && <div className="text-red-500 text-xs mt-1">{errors.phoneNumber}</div>}
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder=""
                        />
                        {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
                    </div>
                    <div className='my-2'>
                        <Label>Confirm Password</Label>
                        <Input
                            type="password"
                            value={input.confirmPassword}
                            name="confirmPassword"
                            onChange={changeEventHandler}
                            placeholder=""
                        />
                        {errors.confirmPassword && <div className="text-red-500 text-xs mt-1">{errors.confirmPassword}</div>}
                    </div>
                    <div className='my-2'>
                        <Label>Profile Photo</Label>
                        <Input
                            type="file"
                            name="file"
                            accept="image/*"
                            onChange={fileChangeHandler}
                        />
                        {errors.file && <div className="text-red-500 text-xs mt-1">{errors.file}</div>}
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signup