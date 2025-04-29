import React, { useState } from "react";
import axios from "axios";
import { apiserver } from "@/main";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateResume = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  console.log(file)

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.put(
        `${apiserver}/users/resume/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="p-8 ml-[20%] max-w-4xl">
      <div className="flex flex-col gap-4 justify-center border-gray-400 rounded-md border-2 items-center h-[100vh] p-8">
        <div className="p-2 flex flex-col items-center">
          <Input
            type="file"
            onChange={handleFileChange}
            className="mb-2 px-4"
          />
          <h3>{file?.name}</h3>
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateResume;
