import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminAuth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Check if already loggedIn

  useEffect(()=>{
    checkIfLoggedIn()
  })
  const checkIfLoggedIn = async ()=>{
    const token = localStorage.getItem("adminToken");
    if(!token){ return}
    if (token) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/current-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate(`/admin/dashboard`);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  }
  const APIusingAuth = async () => {
    try {
      console.log(email + password);
      const response = await axios.post(
        `http://localhost:3000/api/v1/users/login`,
        { email, password }
      );
      console.log(response.data.data.accessToken);
      console.log("Loged In");
      localStorage.setItem("adminToken", response.data.data.accessToken)

      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic
    //Auth Logic
    APIusingAuth();
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminAuth;
