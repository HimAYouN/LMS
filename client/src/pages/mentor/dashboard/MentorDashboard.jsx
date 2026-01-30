import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';


function MentorDashboard() {
    const navigate = useNavigate();
    const { user , logout} = useAuth();
    const token = localStorage.getItem('token');
    const [mentorsCourses, setMentorCourses] = useState([]);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/api/v1/mentor/courses',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("GETTING MENTOR'S COURSES", response.data.data);
                setMentorCourses(response.data.data)
            } catch (error) {
                console.log(
                    'ERR SOMETHING WENT WRONG INSIDE MENTOR DASH: FETCHCOURSES: ',
                    error
                );
            }
          };
          fetchCourses();
    }, []);

    const courseClick = (courseId) => {
      console.log(courseId);
        navigate(`/mentor/course/${courseId}`);
    };


    return (
        <div>
            <div className="min-h-screen bg-gray-200 p-4 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* LEFT SIDEBAR */}
                    <aside className="md:w-1/4 w-full space-y-6">
                        {/* Mentor Info */}
                        <div className="bg-white rounded-xl shadow-sm p-5">
                            <h2 className="text-lg font-semibold mb-4">
                                Mentor Dashboard
                            </h2>
                            <div className="text-sm text-gray-700 space-y-1">
                                <p>
                                    <span className="font-medium">Name:</span>
                                    {user.name}
                                </p>
                                <p>
                                    <span className="font-medium">ID:</span>
                                    {user._id}
                                </p>
                                <p>
                                    <span className="font-medium">Email:</span>{' '}
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        {/* Watch Hours */}
                        <div className="bg-white rounded-xl shadow-sm p-5">
                            <h3 className="text-sm text-gray-500 mb-2">
                                Watch Hours
                            </h3>
                            <p className="text-3xl font-semibold text-gray-800">
                                124
                            </p>
                        </div>

                        {/* Create Actions */}
                        <div className="bg-white rounded-xl shadow-sm p-5">
                            <h3 className="text-lg font-semibold mb-3">
                                ACTIONS
                            </h3>
                            <div className="flex flex-col gap-2 text-sm">
                                
                                <button
                                    className="text-left px-3 py-2 rounded-lg bg-blue-600 text-gray-100 hover:bg-blue-800"
                                    onClick={() =>
                                        navigate('/mentor/createCourse')
                                    }
                                >
                                    Create Course
                                </button>
                                
                                <button className="text-left px-3 py-2 rounded-lg bg-red-500 text-white  hover:bg-red-700" onClick={logout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* MAIN CONTENT */}
                    <main className="flex-1 bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-6">Courses</h2>

                        {/* Course Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {mentorsCourses.length==0 ? <div>No Courses Created</div>:
                            mentorsCourses.map((course) => (
                                <div
                                    key={course._id}
                                    className="border rounded-lg p-4 hover:shadow-md transition"
                                >
                                    <h3 className="font-semibold mb-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">
                                        {course.description}
                                    </p>
                                    <button
                                        className="text-sm text-blue-600 font-medium"
                                        onClick={()=>courseClick(course._id)}
                                    >
                                        View Course →
                                    </button>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default MentorDashboard;
