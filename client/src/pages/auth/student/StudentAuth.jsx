import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import Loading from "../../../components/Loading";

function StudentAuth() {
  // console.log("Student Auth.jsx");
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  // console.log(email +  password);

  const { login, logout  }  = useAuth();
  const navigate = useNavigate();
  // console.log("Above handleLogin");
  const handleLogin = async (e)=>{
    e.preventDefault();
    setLoading(true)
    try {
      // console.log("Inside try");
      const response = await axios.post("http://localhost:3000/api/v1/users/login", { email, password});
      // setLoading(true)
      console.log("Response: " ,  response.data.data.user.role);
      if (response.data.data.user.role !== "student") {
      alert("You are not authorized");
      logout();
      navigate('/', { replace: true });
      return;
    }
      login(response.data.data.user, response.data.data.accessToken)
// 
      // console.log("After login");
      setLoading(false)
      navigate('/student/dashboard', { replace: true}); 
    } catch (err) {
      alert("Login Failed: " + err.response?.data?.message );
    }
    setLoading(false)
  }
  // console.log("Below handleLogin");
  if(loading) return <Loading />
  return (
    <div className=" min-h-screen w-1/2 flex flex-col items-center justify-center ThhisIsWhereIAm ">
     
      <form
        onSubmit={handleLogin}
        className="bg-gray-50 p-6 rounded shadow-xl w-3/4 "
      >
        <h2 className="text-3xl mb-3  font-semibold">Login </h2>
        <label htmlFor="email">Enter your Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="border p-2 mb-4 w-full rounded-lg"
        />
        <label htmlFor="password"> Enter your Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="border p-2 mb-4 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700  transition-all text-white p-2 rounded w-full"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Not registered?
          <button
            onClick={() => navigate("/student/register")}
            className="text-blue-500 hover:underline ml-2"
          >
            Click here to register
          </button>
        </p>
      </div>
    </div>
  );

}

export default StudentAuth;
