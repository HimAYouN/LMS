import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Loading from '../../../components/Loading';
import axios from 'axios';

function StudentCourses() {
    const navigate = useNavigate();

    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [allCourse, setAllCourse] = useState([]);
    const [enrolledCourse, setEnrolledCourse] = useState([]);

    useEffect(() => {
        const getCourses = async () => {
            const token = localStorage.getItem('token');

            try {
                setLoading(true);
                const response = await axios.get(
                    'http://localhost:3000/api/v1/courses',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setAllCourse(response.data.data);
                console.log('Get Courses', response.data.data);
            } catch (err) {
                console.log('ERROR', err);
            } finally {
                setLoading(false);
            }
        };
        getCourses();
    }, []);

    useEffect(() => {
        const enroledCourse = async () => {
            const token = localStorage.getItem('token');
            try {
                setLoading(true);
                const response = await axios.get(
                    'http://localhost:3000/api/v1/my-enrollments',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setEnrolledCourse(response.data.data);
                console.log('Get Enrollments', response.data.data);
            } catch (err) {
                console.log('ERROR', err);
            } finally {
                setLoading(false);
            }
        };
        enroledCourse();
    }, []);

    const handleEnrollCourse = async (courseId) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await axios.post(
                `http://localhost:3000/api/v1/courses/${courseId}/enroll`,
                {}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            window.alert("Course added successfully")
            // setEnrolledCourse(response.data.data);
            console.log('RESPONSE FROM HANDLEENROLCOURSE', response.data.data);
          } catch (err) {
            console.log('ERROR: ', err);
            window.alert("Something went wrong")

        }
    };

    const WatchCourse = (courseId)=>{
        navigate(`/student/courses/watch/${courseId}`)
    }
    if (loading) return <Loading />;
    return (
        <div className="space-y-8 p-6 max-w-full">
            {enrolledCourse.length === 0 ? (
                <p className="text-gray-500">No enrolled available</p>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        Enrolled Courses
                    </h2>
                    <div className="AvailableBatches overflow-x-auto no-scrollbar pb-4 max-w-full">
                        <div className="flex gap-6 w-max">
                            {enrolledCourse.map((course) => (
                                <div
                                    key={course.courseId_id}
                                    className="w-80 bg-gray-100 shadow-lg rounded-xl p-6 flex-shrink-0"
                                >
                                    <img
                                        src="https://i.ytimg.com/vi/_I3YpLe74Qo/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCuynv6ZLzwxuwFqF-eYwndFIseQA"
                                        alt="Networking"
                                        className="w-full h-48 object-cover rounded-lg mb-2"
                                    />
                                    <h3 className="text-lg font-semibold">
                                        {course.courseId.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        Description:{' '}
                                        {course?.courseId.description}
                                    </p>
                                    <p className="text-gray-600">
                                        Category: {course?.courseId.category}
                                    </p>
                                    <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded" onClick={()=> navigate(`/student/courses/watch/${course.courseId._id}`)}>
                                        Watch
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {allCourse.length === 0 ? (
                <p className="text-gray-500">No courses available</p>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold mb-4">All Courses</h2>
                    <div className="AvailableBatches overflow-x-auto no-scrollbar pb-4 max-w-full">
                        <div className="flex gap-6 w-max">
                            {allCourse.map((course, index) => (
                                <div
                                    key={course._id}
                                    className="w-80 bg-gray-100 shadow-lg rounded-xl p-6 flex-shrink-0"
                                >
                                    <img
                                        src="https://i.ytimg.com/vi/_I3YpLe74Qo/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCuynv6ZLzwxuwFqF-eYwndFIseQA"
                                        alt="Networking"
                                        className="w-full h-48 object-cover rounded-lg mb-2"
                                    />
                                    <h3 className="text-lg font-semibold">
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        Description: {course?.description}
                                    </p>
                                    <p className="text-gray-600">
                                        Price: {course?.price}
                                    </p>
                                    <button
                                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                                        onClick={() =>
                                            handleEnrollCourse(course._id)
                                        }
                                    >
                                        Enroll
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StudentCourses;
