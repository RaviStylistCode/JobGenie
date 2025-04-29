import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { apiserver } from '@/main'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const CompanyCreate = () => {
    const [company,setCompany]=useState('');
    const companyName=company;

    const navigate=useNavigate();

    const handleCompanysubmit=async(e)=>{
        e.preventDefault();
        if(!company || company.length < 4){
            return toast.error('Company name is required and must be unique')
        }

        try{
            const res=await axios.post(`${apiserver}/company/add`,{companyName},{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            });

            if(res?.data?.success){
                toast.success(res?.data?.message);
                navigate("/recruiter/main/home/company");
            }

        }catch(error){
            toast.error(error?.response?.data?.message);
        }finally{
            setCompany("");
        }
    }
  return (
    <div className='ml-[20%] p-8 '>
        <div className='flex flex-col justify-center my-10  max-w-4xl mx-auto md:p-4 rounded-md shadow-2xl'>
            <h1 className='text-center font-bold text-2xl p-2 rounded-md'>Create your Company</h1>
            <form className='md:p-8' onSubmit={handleCompanysubmit} >
                <div className='p-8 flex flex-col gap-5'>
                    <Label>Company Name</Label>
                    <Input
                    type="text"
                    value={company}
                    onChange={(e)=>setCompany(e.target.value)}
                    placeholder="Name of your company"
                    />
                </div>
                <div className='p-4 flex gap-5'>
                    <Button type="reset">Cancel</Button>
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </div>
        </div>
  )
}

export default CompanyCreate