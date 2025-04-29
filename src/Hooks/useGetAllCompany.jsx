import { apiserver } from '@/main';
import { setCompany } from '@/redux/Actions/Useraction';
import axios from 'axios';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const useGetAllCompany = () => {

    const dispatch=useDispatch();
  
    const getMyAllCompany=async()=>{
        try {
          const res=await axios.get(`${apiserver}/company/my`,{withCredentials:true});
            if(res.data.success){
                // dispatch(setCompany(res.data.company));
                console.log(res.data);
            }
          
        } catch (error) {
          toast.error(error?.response?.data?.message);
        }
    
        useEffect(()=>{
          getMyAllCompany();
        },[])
    }
}

export default useGetAllCompany