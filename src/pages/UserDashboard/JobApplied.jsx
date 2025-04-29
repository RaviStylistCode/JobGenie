import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { apiserver } from '@/main';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const JobApplied = () => {
  const [appliedjobs,setAppliedjobs]=useState();
  const [loading,setLoading]=useState(false);

  const GetAllappliedJob=async()=>{
    try {
      const res=await axios.get(`${apiserver}/applications/all/applied/application`,{withCredentials:true});
      if(res?.data?.success){
        toast.success(res?.data?.message);
        setAppliedjobs([...res?.data?.application]);
        console.log(res.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    GetAllappliedJob();
  },[])
  return (
    <div className='ml-[20%] p-4'>
        <h1 className='bg-slate-400 p-10 rounded-md text-2xl font-semibold'>Your Applied Jobs</h1>
        <div>
          {
            loading ? (
              <div className="w-full h-[200px] flex justify-center items-center bg-blue-600 text-white"><Loader2 className="w-4 h-4 animate-spin "/> Loading....</div>
            ):
            (
              <Table>
              <TableCaption>A list of your recent applied jobs.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ApplicationId</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applied_Date</TableHead>
                  
                </TableRow>
              </TableHeader>
              <TableBody>
                {appliedjobs?.map((job) => {
                  return(
                  <TableRow key={job?._id}>
                    <TableCell className="font-medium">{job?._id}</TableCell>
                    <TableCell>{job?.job?.title}</TableCell>
                    <TableCell>{job?.job?.company?.name}</TableCell>
                    <TableCell>{job?.job?.location}</TableCell>
                    <TableCell><Badge className={'p-3 bg-pink-600 '}>{job?.status}</Badge></TableCell>
                    <TableCell>{job?.createdAt}</TableCell>

                  </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            )
          }

        </div>
    </div>
  )
}

export default JobApplied