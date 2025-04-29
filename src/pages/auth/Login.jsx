import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, Loader2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { setAuthuser } from "@/redux/Actions/Useraction";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiserver } from "@/main";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [eye, setEye] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^_-])[A-Za-z\d@$!%*?#&^_-]{6,}$/;

    if (!data.email || !data.password) {
      return toast.error("All fields are required");
    }

    if (!emailRegex.test(data.email)) {
      return toast.error("Please enter a valid email with @ symbol");
    }
    if (!passwordRegex.test(data.password)) {
      return toast.error(
        "Password must be 6+ characters long, with uppercase, lowercase, number & special character."
      );
    }

    try {
      setLoading(true);
      const res = await axios.post(`${apiserver}/users/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(`${res?.data?.message}`);
        dispatch(setAuthuser(res?.data?.mainuser));
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center max-w-6xl mx-auto p-2">
        <form
          className="w-full md:w-1/2 border rounded-md border-gray-400 my-10 p-8"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-lg underline text-gray-400">Login</h1>
          <div className="my-5">
            <Label>Email</Label>
            <Input
              type="text"
              name="email"
              value={data.email}
              onChange={handlechange}
              placeholder="example@gmail.com"
              className="focus-visible:ring-transparent"
            />
          </div>
          <div className="my-5">
            <Label>Password</Label>
            <div className="flex items-center">
              <Input
                type={eye ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handlechange}
                placeholder="*****"
                className="focus-visible:ring-transparent"
              />
              <Eye
                size={"29px"}
                className="cursor-pointer"
                onClick={() => setEye(!eye)}
              />
            </div>
          </div>

          <Button type="submit" disabled={loading}>Login</Button>
          <p className="font-bold text-right">
            Don't have an account ?{" "}
            <Link className="text-blue-600" to={"/signup"}>
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
