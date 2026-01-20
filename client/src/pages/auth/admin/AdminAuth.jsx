import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

function AdminAuth() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const { login } = useAuth();

    const handleLogin = async (e)=>{
    e.preventDefault();
    setLoading(true)
    console.log("Inside Admin auth");
    try {
      // console.log("Inside try");
      const response = await axios.post("http://localhost:3000/api/v1/users/login", { email, password});
      // setLoading(true)
      console.log("Response: " ,  response.data.data.user.role);
      if (response.data.data.user.role !== "admin") {
      alert("You are not authorized");
      logout();
      navigate('/', { replace: true });
      return;
      }
      login(response.data.data.user, response.data.data.accessToken)
// 
      // console.log("After login");
      setLoading(false)
      navigate('/admin/dashboard', { replace: true}); 
    } catch (err) {
      alert("Login Failed: " + err.response?.data?.message );
    }
    setLoading(false)
  }

    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Admin Login
                </h2>

                <form onSubmit={handleLogin} className="space-y-5">
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
