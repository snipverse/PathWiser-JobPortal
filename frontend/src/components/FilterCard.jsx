import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
    return (
        <div className="w-full bg-white/80 rounded-xl shadow-lg p-6 border border-gray-100 glass-effect">
            <h1 className="font-bold text-xl mb-4 text-gray-900">Filter Jobs</h1>
            <hr className="mb-6 border-gray-200" />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {fitlerData.map((data) => (
                    <div key={data.fitlerType} className="mb-6">
                        <h2 className="font-semibold text-lg text-gray-800 mb-2">{data.fitlerType}</h2>
                        {data.array.map((item, idx) => {
                            const itemId = `id${data.fitlerType}-${item}`;
                            return (
                                <div key={item} className="flex items-center gap-3 my-2">
                                    <RadioGroupItem value={item} id={itemId} className="border-2 border-blue-300 focus:ring-2 focus:ring-blue-500" />
                                    <Label htmlFor={itemId} className="text-gray-700 cursor-pointer">{item}</Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export default FilterCard