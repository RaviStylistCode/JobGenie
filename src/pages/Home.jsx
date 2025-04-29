import { Search } from "lucide-react";
import React, { useState } from "react";
import jobposter from "../assets/job.jpg";
import CategoryCarousel from "@/carousels/CategoryCarousel";
import CompanyCard from "@/carousels/CompanyCard";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

const Home = () => {
  const [keyword,setKeyword]=useState('');
  return (
    <div>
      <Header />
      <div className="w-full flex lg:h-[60vh]  p-4 justify-center items-center gap-3 flex-col">
        <div className="flex flex-col w-full items-center gap-1 md:gap-3">
          <h1 className="text-xl md:text-4xl font-bold">Search, Apply &</h1>
          <h1 className="text-xl md:text-5xl font-bold">
            Get Your <span className="text-blue-700">Dream Jobs</span>{" "}
          </h1>
          <h4 className="font-semibold line-clamp-1 my-3">
            5 lakh+ jobs for you to explore and get and apply !
          </h4>
        </div>

        <div className="flex ">
          <input
            type="text"
            value={keyword}
            placeholder="Search jobs here ... "
            onChange={(e) => setKeyword(e.target.value)}
            className="md:w-96 p-3 outline-none rounded-s-md shadow-2xl bg-white text-black"
          />
          <Link to={`/search?name=${keyword}`}>
            <Search
              className="bg-blue-600 h-full p-2 w-14 rounded-e-md text-white cursor-pointer"
              size={"17px"}
            />
          </Link>
        </div>
      </div>

      <div className=" w-full sm:w-3/2  md:w-3/5 h-64 bg-green-600 flex justify-center items-center mx-auto rounded-lg my-2 cursor-pointer ">
        <img
          src={jobposter}
          className="w-full h-full rounded-md aspect-square"
          alt="poster"
        />
      </div>

      {/* carousel of category */}
      <div className="flex flex-col justify-center items-center my-10 ">
        <span className="font-semibold text-md text-start  underline mb-5">
          Search by category...
        </span>
        <CategoryCarousel />
      </div>

      {/* top comanies */}
      <div>
        <CompanyCard />
      </div>
    </div>
  );
};

export default Home;
