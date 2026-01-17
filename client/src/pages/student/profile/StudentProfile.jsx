import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentProfile() {
  const navigate = useNavigate();
  useEffect(()=>{
    checkLoggin();
  }, [])
  const checkLoggin =  ()=>{
    const token = localStorage.getItem("Token");
    console.log(token);
    if (typeof token !== "string" || token.trim() === "") {
      navigate('/');
      return;
    }
  }

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  const fetchStudentProfile = async () => {
    try {
      console.log("I'm IN TRY");
      const token = localStorage.getItem("Token")
      console.log(token);
      const response = await axios.get(
        "http://localhost:3000/api/v1/users/current-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("After response");
      console.log("After response " + response.data.data);
      setStudent(response.data.data);
      console.log("After response " + student);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Unauthorized");
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Profile Image */}
        <div className="flex flex-col items-center justify-center border-r md:col-span-1">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
            <img
              src={student.avatar || "/default-avatar.png"}
              alt="user.jpg"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="mt-4 text-lg font-semibold text-gray-800">
            {student.name}
          </p>
          <p className="text-sm text-gray-500">Student</p>
        </div>

        {/* Right: Student Details */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProfileField label="Full Name" value={student.name} />
          <ProfileField label="Email" value={student.email} />
          <ProfileField label="Department" value={student.department} />
          <ProfileField label="Phone" value={student.phone} />
        </div>
      </div>
      <div></div>
    </div>
  );
}

const ProfileField = ({ label, value }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <p className="text-xs text-gray-500 uppercase">{label}</p>
      <p className="text-gray-800 font-medium mt-1">{value || "—"}</p>
    </div>
  );
};

export default StudentProfile;
