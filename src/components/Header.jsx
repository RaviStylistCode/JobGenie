import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { ModeToggle } from "./Toggle";
import { useSelector } from "react-redux";
// import useGetLogoutuser from "@/Hooks/useGetLogoutuser";

const Header = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="w-full h-[70px] rounded backdrop-blur-3xl top-0  sticky md:bg-transparent z-10 ">
      <div className="flex justify-evenly items-center h-full ">
        <h1 className="text-2xl font-bold font-xl p-3 rounded-2xl">
          <span className="text-red-600">j</span>ob
          <span className="text-blue-700 font-bold text-3xl">G</span>enie
        </h1>

        <div className="hidden md:block">
          <div className="flex gap-4 font-semibold ">
            <Link to={"/"}>
              <span>Home</span>
            </Link>
            <Link to={"/jobs"}>
              <span>Jobs</span>
            </Link>
            <Link to={`/search`}>
              <span>Browse</span>
            </Link>
          </div>
        </div>

        <div>
          {user ? (
            <div className="flex gap-4 items-center">
              <h3>
                <ModeToggle />
              </h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="img" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="bg-white ">
                  <Link title="profile">
                    <div className="flex gap-5 items-center">
                      <Avatar className="w-7 h-7">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="img"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-gray-600">{user?.name}</h3>
                    </div>
                  </Link>

                  {
                    user?.role == "student" &&
                    (

                  <Link to={"/user/dashboard"}>
                    <div className="flex gap-5 my-3 items-center px-1">
                      <User2 />
                      <span className="font-bold text-gray-600">Dashboard</span>
                    </div>
                  </Link>
                    )
                  }


                  {
                    user?.role=="recruiter" &&
                    (

                  <Link to={"/recruiter/main/home"}>
                    <div className="flex gap-5 my-3 items-center px-1">
                      <User2 />
                      <span className="font-bold text-gray-600">
                        Recruiter Dashboard
                      </span>
                    </div>
                  </Link>
                    )
                  }


                  {/* <Link onClick={()=>useGetLogoutuser()}>
                    <div className="flex gap-5 my-3 items-center px-1">
                      <LogOut />
                      <span className="font-bold text-gray-600">Logout</span>
                    </div>
                  </Link> */}

                </PopoverContent>
              </Popover>
            </div>
          ) :

           (
            <div className="py-3 px-6 bg-blue-700 rounded-md text-white ">
              <Link to={"/login"} className="font-semibold">
                Login
              </Link>
            </div>
          )

          }
        </div>
      </div>
    </div>
  );
};

export default Header;
