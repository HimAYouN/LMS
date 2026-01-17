import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  //ADMIN dashboard only accessable to admins

  //Check if logged in
  //Check if role is admin

  //get admin data

  //get all users data

  //get all courses data

  //get all mentors data

  //view logs // IDK

  //Leaderboard // Graphs or something

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkLoggin();
  }, []);
  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const checkLoggin = () => {
    const token = localStorage.getItem("adminToken");
    if (typeof token !== "string" || token.trim() === "") {
      navigate("/");
      return;
    }
  };

  const fetchAdminProfile = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/current-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response: " + response.data.data.email);
      setAdmin(response.data.data);
      setLoading(true);
      console.log(response.data);
      console.log(admin);
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <div className="min-h-screen w-full bg-gray-200 px-4 sm:px-6 lg:px-10 py-6">
        {/* Page Header */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        {/* Main Grid – Full Width */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 w-full">
              <h2 className="text-lg font-semibold mb-4">Admin Info</h2>
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Name:</span> Admin Name
                </p>
                <p>
                  <span className="font-medium">ID:</span> {admin.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {admin.email}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 w-full">
              <h2 className="text-lg font-semibold mb-3">Mentors Available</h2>
              <p className="text-sm text-gray-600">
                View and manage all registered mentors.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 w-full">
              <h2 className="text-lg font-semibold mb-3">Courses</h2>
              <p className="text-sm text-gray-600">
                Manage platform courses and assignments.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 w-full">
              <h2 className="text-lg font-semibold mb-3">View Logs</h2>
              <p className="text-sm text-gray-600">
                Track system activity and audit logs.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 w-full">
              <h2 className="text-lg font-semibold mb-3">All Students</h2>
              <p className="text-sm text-gray-600">
                Access and manage student data.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 w-full">
              <h2 className="text-lg font-semibold mb-3">Leaderboard</h2>
              <p className="text-sm text-gray-600">
                View top-performing students.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
