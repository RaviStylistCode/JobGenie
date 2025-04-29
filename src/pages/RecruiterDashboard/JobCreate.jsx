import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast"; // For showing error messages
import axios from "axios";
import { apiserver } from "@/main";
import { useNavigate } from "react-router-dom";

const JobCreate = () => {
  const { company } = useSelector((store) => store.auth);
  const navigate=useNavigate();

  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
    salary: "",
    requirements: "",
    experience: "",
    position: "",
    companyId: "",
    locationType: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    // Validation - check if any field is empty
    for (let key in job) {
      if (job[key].trim() === "") {
        toast.error(`Please fill the ${key} field`);
        return;
      }
    }

    try {
        const res=await axios.post(`${apiserver}/jobs/create`,job,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        if(res?.data){
            toast.success(res?.data?.message);
            navigate("/recruiter/main/home/job")
        }

    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setJob({
        title: "",
        description: "",
        location: "",
        jobType: "",
        salary: "",
        requirements: "",
        experience: "",
        position: "",
        company: "",
        locationType: "",
      });
    }
  };

  return (
    <div className="ml-[20%] p-3">
      <div className="max-w-7xl shadow-2xl rounded-md p-2">
        <h1 className="my-2 font-bold md:text-2xl md:p-2">
          Create a Job Here....
        </h1>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:p-5"
          onSubmit={submitHandler}
        >
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="Title here..."
              value={job.title}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              placeholder="Location here..."
              value={job.location}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <Label>Job Type</Label>
            <Input
              type="text"
              name="jobType"
              placeholder="Job type here..."
              value={job.jobType}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <Label>Salary</Label>
            <Input
              type="text"
              name="salary"
              placeholder="Salary here..."
              value={job.salary}
              onChange={onChangeHandler}
            />
          </div>

          <div className="md:col-span-2">
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              placeholder="Description here..."
              value={job.description}
              onChange={onChangeHandler}
            />
          </div>

          <div className="md:col-span-2">
            <Label>Requirements</Label>
            <Input
              type="text"
              name="requirements"
              placeholder="Requirements here..."
              value={job.requirements}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <Label>Experience</Label>
            <Input
              type="text"
              name="experience"
              placeholder="Experience here..."
              value={job.experience}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <Label>Position</Label>
            <Input
              type="number"
              name="position"
              placeholder="Position here..."
              value={job.position}
              onChange={onChangeHandler}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Company</Label>
            <select
              className="bg-white text-black p-2 cursor-pointer p-5"
              name="companyId"
              value={job.companyId}
              onChange={onChangeHandler}
            >
              <option value="">Select Company</option>
              {company?.map((data) => (
                <option key={data?._id} value={data?._id}>
                  {data?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Location Type</Label>
            <select
              className="p-2 cursor-pointer"
              name="locationType"
              value={job.locationType}
              onChange={onChangeHandler}
            >
              <option value="">Select Location Type</option>
              <option value="Remote">Remote</option>
              <option value="on-site">On-Site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="md:col-span-2 flex gap-4">
            <Button type="reset" className="w-1/2 bg-orange-400">
              Reset
            </Button>
            <Button type="submit" className="w-1/2 bg-blue-400">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobCreate;
