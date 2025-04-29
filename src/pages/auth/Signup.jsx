import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye } from "lucide-react";
import { apiserver } from "@/main";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const [eye, setEye] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^_-])[A-Za-z\d@$!%*?#&^_-]{6,}$/;

    if (
      !data.name ||
      !data.email ||
      !data.phone ||
      !data.password ||
      !data.role
    ) {
      return toast.error("Please fill in all fields.");
    }

    if (!data.phone || data.phone.length < 10) {
      return toast.error("Please enter a valid phone number");
    }

    if (!emailRegex.test(data.email)) {
      return toast.error("Please enter a valid email address.");
    }

    if (!passwordRegex.test(data.password)) {
      return toast.error(
        "Password must be 6+ characters long, with uppercase, lowercase, number & special character."
      );
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${apiserver}/users/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Signup successful!");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />

      <div className="flex items-center justify-center max-w-7xl mx-auto p-2">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 border border-gray-400 rounded-md my-5 p-8"
        >
          <h1 className="font-semibold text-lg underline text-gray-400">
            Signup
          </h1>

          <div className="my-3">
            <Label>Name</Label>
            <Input
              type="text"
              value={data.name}
              name="name"
              onChange={handleChange}
              className="focus-visible:ring-transparent"
            />
          </div>

          <div className="my-3">
            <Label>Email</Label>
            <Input
              type="email"
              value={data.email}
              name="email"
              onChange={handleChange}
              className="focus-visible:ring-transparent"
            />
          </div>

          <div className="my-3">
            <Label>Phone</Label>
            <Input
              type="text"
              value={data.phone}
              name="phone"
              onChange={handleChange}
              className="focus-visible:ring-transparent"
            />
          </div>

          <div className="my-3">
            <Label>Password</Label>
            <div className="flex  items-center">
              <Input
                type={eye ? "text" : "password"}
                value={data.password}
                name="password"
                onChange={handleChange}
                className="focus-visible:ring-transparent"
              />
              <Eye
                size={"29px"}
                onClick={() => setEye(!eye)}
                className="cursor-pointer"
              />
            </div>
          </div>

          <div className="my-2 flex justify-start items-center gap-5">
            <Input
              type="radio"
              name="role"
              value="student"
              checked={data.role === "student"}
              onChange={handleChange}
              className="w-6 h-6 cursor-pointer"
            />
            <Label>Student</Label>
            <Input
              type="radio"
              name="role"
              value="recruiter"
              checked={data.role === "recruiter"}
              onChange={handleChange}
              className="w-6 h-6 cursor-pointer"
            />
            <Label>Recruiter</Label>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </Button>
          <p className="text-right  m-2 font-semibold ">Already have an account ? <Link className="text-blue-600" to={"/login"}>Login</Link ></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
