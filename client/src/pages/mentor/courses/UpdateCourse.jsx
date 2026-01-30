import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';

function UpdateCourse() {
    const initialCourseState = {
        title: '',
        description: '',
        category: '',
        level: '',
    };

    const navigate = useNavigate()
    const { courseId } = useParams();
    const [courseDetails, setCourseDetails] = useState(initialCourseState);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        getCourseDetails();

    }, []);

    const getCourseDetails = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/v1/mentor/courses/${courseId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('AEK  COURSE KA RES: ', response);
            setCourseDetails(response.data.data.course);
        } catch (error) {
            console.error('Failed to fetch course', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCourseDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const updateCourse = async (e)=>{
        e.preventDefault()
        try {
            const response = await axios.patch(`http://localhost:3000/api/v1/mentor/courses/${courseId}`, courseDetails, {headers:{Authorization: `Bearer ${token}`}})
            console.log("RES AYA FROM UPDATE COURSE: ", response);
            navigate(`/mentor/course/${courseId}`, {replace:true})
        } catch (error) {
            console.log(error);
        }
    }
    if (loading) return <Loading></Loading>;
    
    return (
        <div className="min-h-screen w-full bg-gray-200 flex items-start justify-center px-4 py-10">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-sm p-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-1">
                    Update Course
                </h1>
                <p className="text-sm text-gray-600 mb-6">
                    Please enter the updated course details below
                </p>

                <div className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Course Title"
                        value={courseDetails?.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={courseDetails?.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={courseDetails?.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        name="level"
                        placeholder="Level"
                        value={courseDetails?.level}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        onClick={updateCourse}
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
                    >
                        Update Course
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateCourse;
