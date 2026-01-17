import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentAuth() {
  useEffect(() => {
    alredyLoggedIn();
  }, []);

  /// IF We already have JWT token
  const alredyLoggedIn = async () => {
    const token = localStorage.getItem("Token");
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
        navigate(`/student/dashboard`);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [loading, setLoading] = useState(false);
  const PORT = 3000;

  const authUsingAPI = async () => {
    console.log("Inside auth BLOCK");

    try {
      console.log("Before response");
      const response = await axios.post(
        `http://localhost:3000/api/v1/users/login`,
        { email, password }
      );
      console.log();
      console.log("After response");
      if (!response) {
        throw console.error("User Not found");
        return;
      }
      const token = await response.data.data.accessToken;
      localStorage.setItem("Token", token);

      navigate(`/student/dashboard`);
    } catch (err) {
      console.log("Inside catch BLOCK");
      console.log("Error: " + err);
      // setError(err.message)
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // authentication logic here
    authUsingAPI();
  };

  if(loading) return (<>Loading</>)
    
  return (
    <div className=" min-h-screen w-1/2 flex flex-col items-center justify-center ">
      <form
        onSubmit={handleSubmit}
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
