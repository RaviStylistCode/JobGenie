import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Delete, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGetAllCompany from "@/Hooks/useGetAllCompany";
import { apiserver } from "@/main";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCompany } from "@/redux/Actions/Useraction";



const Company = () => {


  // const [company,setCompany]=useState([]);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const {company}=useSelector(store=>store.auth);

  const getMyAllCompany=async()=>{
    try {
      const res=await axios.get(`${apiserver}/company/my`,{withCredentials:true});
        if(res.data.success){
          dispatch(setCompany(res?.data?.company));
           
            // console.log(res.data);
        }
      
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  useEffect(()=>{

    getMyAllCompany();
  },[])
    
  

  return (
    <div className="ml-[20%] p-4">
      <div className="grid grid-cols-2 p-4 border border-green-500 rounded-md">
        <h1 className="md:text-2xl font-bold text-blue-600">
          Create a Company
        </h1>
        <Button className="bg-green-600" onClick={()=>navigate("/recruiter/main/home/company/create")}>Create</Button>
      </div>

      <h1 className="my-5 p-4 font-bold">All Companies</h1>

      <div>
        <Table>
          <TableCaption>A list of your recent created company.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">CompanyId</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
        {
          company?.map((data)=>{
            return(
              <TableRow key={data._id}>
              <TableCell className="font-medium">{data._id}</TableCell>
              <TableCell>img</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell className="">
                <Button className="bg-blue-500">
                  <Edit />
                </Button>{" "}
                <Button className="bg-red-500">
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
            )
          })
        }
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Company;
