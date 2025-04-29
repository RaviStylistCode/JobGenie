import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const JobCard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-items-center mx-5 my-5  ">
      {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
        return (
          <div className="  border-2 border-slate-500 p-10 shadow-2xl">
            <div className="flex justify-between  p-3">
              <span>2 days ago</span>
              <Bookmark className="cursor-pointer" />
            </div>

            <div className="flex gap-3  items-center  ">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="img" />
              </Avatar>
              <div>
                <h3>Microsoft</h3>
                <Badge className={"bg-pink-400 hover:bg-pink-500"}>Patna</Badge>
              </div>
            </div>
            <hr className="h-2 my-2 text-blue-700" />
            <p className="line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              expedita consectetur quasi possimus autem, quia unde distinctio
              dolores quod esse placeat vel recusandae dolore culpa quam
              perferendis ullam dicta? Voluptate, suscipit quos, recusandae
              nesciunt error quibusdam, dolore odio ab ipsa similique labore
              ipsam est! Inventore ab iure officiis qui debitis?
            </p>
            <div className="flex  items-center gap-3 my-3">
              <Badge
                className={"text-red-600 p-2 text-center"}
                variant={"ghost"}
              >
                12L
              </Badge>
              <Badge
                className={"text-blue-600 p-2 text-center"}
                variant={"ghost"}
              >
                Full Stack Developer
              </Badge>
              <Badge
                className={"text-pink-600 p-2 text-center"}
                variant={"ghost"}
              >
                Full Time
              </Badge>
            </div>
            <div>
              <Link to={`/jobs/${1}`}>
                <Button variant="ghost">Get details...</Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JobCard;
