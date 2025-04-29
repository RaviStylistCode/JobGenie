import JobCard from "@/carousels/JobCard";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiserver } from "@/main";
import { Bookmark } from "lucide-react";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Jobs = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    industry: '',
    city: '',
    salary: ''
  });

  const [jobs, setJobs] = useState([]);

  const industryCategory = [
    "FullStack Developer", "Frontend Developer", "Backend Developer", "Devops Engineer", "Data Analyst"
  ];

  const cityCategory = [
    "Delhi ", "Noida", "Kolkata", "Chennai", "Hyderabad", "Banglore", "Patna", "Mumbai"
  ];

  const salaryCategory = [
    "0-20k", "15k-30k", "50k-1lakh", "2lakh-20lakh","5-9 lpa"
  ];

  // Fetch jobs based on selected filters
  const fetchJobs = async () => {
    try {
      const { industry, city, salary } = selectedFilters;
      const query = new URLSearchParams();

      if (industry) query.append('industry', industry);
      if (city) query.append('city', city);
      if (salary) query.append('salary', salary);

      const response = await axios.get(`${apiserver}/jobs/filter/jobs?${query.toString()}`);
      setJobs(response?.data?.jobs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [selectedFilters]);

  const handleFilterChange = (e) => {
    setSelectedFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-3 md:mx-24 my-3">
        <div className="flex gap-5 flex-col md:flex-row p-2">
          
          {/* Filters */}
          <div className=" md:w-auto overflow-scroll md:overflow-hidden">
            <h3 className="font-bold text-lg">Filter</h3>
            <hr className="mb-4 my-3" />

            <div className="flex gap-3 md:flex-col">

              {/* Industry */}
              <div className="font-semibold">
                Industry
                {industryCategory.map((item, index) => (
                  <div className="flex gap-3 items-center justify-start my-2" key={index}>
                    <Input
                      type="radio"
                      name="industry"
                      value={item}
                      onChange={handleFilterChange}
                      className="w-6 h-6"
                    />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* City */}
              <div className="font-semibold mt-4">
                City
                {cityCategory.map((item, index) => (
                  <div className="flex gap-3 items-center my-2" key={index}>
                    <Input
                      type="radio"
                      name="city"
                      value={item}
                      onChange={handleFilterChange}
                      className="w-7 h-7"
                    />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Salary */}
              <div className="font-semibold mt-4">
                Salary
                {salaryCategory.map((item, index) => (
                  <div className="flex gap-3 items-center my-2" key={index}>
                    <Input
                      type="radio"
                      name="salary"
                      value={item}
                      onChange={handleFilterChange}
                      className="w-7 h-7"
                    />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Jobs */}
          <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-3  ">
            {jobs.length > 0 ? (
              jobs.map((item) => (
                <div className="w-full h-fit  border-2 rounded-md border-gray-400  p-5 shadow-sm  " key={item?._id}>
                <div className="flex justify-between w-full p-3">
                  <span>2 days ago</span>
                  <Bookmark className="cursor-pointer" />
                </div>
  
                <div className="flex gap-3  items-center  ">
                  <Avatar className="w-24 h-24 rounded-full">
                    <AvatarImage className="rounded-full" src="https://github.com/shadcn.png" alt="img" />
                  </Avatar>
                  <div>
                    <h3>{item?.company?.name}</h3>
                    <Badge className={"bg-pink-400 hover:bg-pink-500"}>
                      {item?.location.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <h1 className="p-2 font-bold uppercase">{item?.title}</h1>
                <hr className="h-2 my-2 text-blue-700" />
                <p className="line-clamp-4">
                  {item?.description}
                </p>
                <div className="flex  items-center gap-3 my-3">
                  <Badge
                    className={"text-red-600 p-2 text-center"}
                    variant={"ghost"}
                  >
                    {item?.salary}
                  </Badge>
                  <Badge
                    className={"text-blue-600 p-2 text-center"}
                    variant={"ghost"}
                  >
                    {item?.position} Positions
                  </Badge>
                  <Badge
                    className={"text-pink-600 p-2 text-center"}
                    variant={"ghost"}
                  >
                    {item?.jobType}
                  </Badge>
                </div>
                <div>
                  <Link to={`/jobs/${item?._id}`}>
                    <Button variant="ghost">Get details...</Button>
                  </Link>
                </div>
              </div>
              ))
            ) : (
              <p>No Jobs Found</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Jobs;
