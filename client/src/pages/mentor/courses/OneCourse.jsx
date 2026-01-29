import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { replace, useNavigate, useParams } from 'react-router-dom';

function OneCourse() {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const token = localStorage.getItem('token');
    console.log(courseId);
    const [course, setCourse] = useState(null);
    const [sections, setSection] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourse();
    }, [courseId, token]);

    const fetchCourse = async () => {
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
            setCourse(response.data.data.course);
            setSection(response.data.data.sections);
            setData(response.data.data);
        } catch (error) {
            console.error('Failed to fetch course', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteLesson = async (lessonId) => {
        setLoading(true);
        console.log('LESSON ID: ', lessonId);
        try {
            await axios.delete(
                `http://localhost:3000/api/v1/mentor/lessons/${lessonId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchCourse();
        } catch (error) {
            console.error('Failed to delete course', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteSection = async (sectionId) => {
        setLoading(true);
        try {
            await axios.delete(
                `http://localhost:3000/api/v1/mentor/sections/${sectionId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchCourse();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteCourse = async (courseId) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this course?'
        );

        if (!confirmed) return;
        setLoading(true);
        console.log(courseId);
        try {
            await axios.delete(
                `http://localhost:3000/api/v1/mentor/courses/${courseId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Course Deleted');
            setLoading(false);
            navigate(`/mentor/dashboard`, { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <p className="p-6">Loading course...</p>;
    }
    console.log('DATA: ', data);

    return (
        <div className="min-h-screen w-full bg-gray-200 px-4 sm:px-6 lg:px-10 py-6">
            {/* COURSE HEADER */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    {course.title}
                </h1>

                <p className="text-gray-600 mb-4">{course.description}</p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-3 text-sm mb-4">
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                        Category: {course.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                        Level: {course.level}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
                        Status: {course.status}
                    </span>
                </div>

                <div className="text-sm text-gray-500">
                    Created by{' '}
                    <span className="font-medium">{course.mentorId.name}</span>{' '}
                    · Created on{' '}
                    {new Date(course.createdAt).toLocaleDateString()}
                </div>
            </div>

            {/* SECTIONS & LESSONS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT: COURSE CONTENT */}
                <div className="lg:col-span-2 space-y-6">
                    {sections?.map((section) => (
                        <div
                            key={section._id}
                            className="bg-white rounded-xl shadow-sm p-6 "
                        >
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                {section.order}. {section.title}
                            </h2>
                            <button
                                className="w-full px-4 py-2 mb-1 rounded-lg border bg-blue-50 hover:bg-blue-200"
                                onClick={() =>
                                    navigate(
                                        `/mentor/course/${courseId}/addlesson/${section._id}`
                                    )
                                }
                            >
                                Add Lesson
                            </button>
                            <div className="space-y-3">
                                {section.lessons?.map((lesson) => (
                                    <div
                                        key={lesson._id}
                                        className="flex items-center justify-between border rounded-lg p-4"
                                    >
                                        <div>
                                            <h3 className="font-medium text-gray-800">
                                                {lesson.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Order: {lesson.order}
                                            </p>
                                        </div>
                                        <div className="flex justify-end gap-3">
                                            {lesson.isPreview && (
                                                <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 cursor-pointer">
                                                    Preview
                                                </span>
                                            )}
                                            <span
                                                className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-700 hover:text-gray-200 cursor-pointer"
                                                onClick={() =>
                                                    deleteLesson(lesson._id)
                                                }
                                            >
                                                Delete
                                            </span>
                                        </div>
                                    </div>
                                ))}

                                {section.lessons?.length === 0 && (
                                    <p className="text-sm text-gray-500">
                                        No lessons added yet.
                                    </p>
                                )}
                            </div>
                            <button
                                className="w-full px-4 py-2 mb-1 mt-4 rounded-lg border bg-red-100 text-red-700 hover:bg-red-700 hover:text-gray-200"
                                onClick={() => deleteSection(section._id)}
                            >
                                Delete Section
                            </button>
                        </div>
                    ))}
                </div>

                {/* RIGHT: COURSE STATS / ACTIONS */}
                <div className="space-y-6">
                    {/* Stats */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Course Stats
                        </h2>

                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="text-2xl font-semibold text-gray-800">
                                    {sections?.length}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Sections
                                </p>
                            </div>
                            <div>
                                <p className="text-2xl font-semibold text-gray-800">
                                    {sections?.reduce(
                                        (acc, sec) => acc + sec.lessons.length,
                                        0
                                    )}
                                </p>
                                <p className="text-sm text-gray-500">Lessons</p>
                            </div>
                            <div>
                                <p className="text-2xl font-semibold text-gray-800">
                                    ₹ {course?.price}
                                </p>
                                <p className="text-sm text-gray-500">Price</p>
                            </div>
                            <div>
                                <p className="text-2xl font-semibold text-gray-800">
                                    {course.level}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Difficulty
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold mb-4">Actions</h2>

                        <div className="flex flex-col gap-2">
                            <button
                                className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                onClick={() =>
                                    navigate(
                                        `/mentor/course/addsection/${courseId}`
                                    )
                                }
                            >
                                Add Section
                            </button>

                            <button
                                className="w-full px-4 py-2 rounded-lg border hover:bg-gray-100"
                                onClick={() =>
                                    navigate(
                                        `/mentor/course/updatecourse/${courseId}`
                                    )
                                }
                            >
                                Edit Course
                            </button>
                            <div className="flex gap-2">
                                <button
                                    className="w-full px-4 py-2 rounded-lg border hover:bg-gray-100"
                                    onClick={() =>
                                        navigate(
                                            `/mentor/course/${courseId}/addquiz`
                                        )
                                    }
                                >
                                    Add Quiz
                                </button>
                                <button
                                    className="w-full px-4 py-2 rounded-lg border hover:bg-gray-100"
                                    onClick={() => navigate(
                                            `/mentor/course/${courseId}/seequizzes`
                                        )}
                                >
                                    See Quizzes
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="w-full px-4 py-2 rounded-lg border hover:bg-gray-100"
                                    onClick={() => addAssignment(courseId)}
                                >
                                    Add Assignment
                                </button>
                                <button
                                    className="w-full px-4 py-2 rounded-lg border hover:bg-gray-100"
                                    onClick={() => seeAssignment(courseId)}
                                >
                                    See Assigments
                                </button>
                            </div>
                            <button
                                    className="w-full px-4 py-2 rounded-lg border hover:bg-green-300 bg-green-100"
                                    onClick={() => navigate(`/mentor/course/${courseId}/enrollments`)}
                                >
                                    See Enrollments
                                </button>
                            <button
                                className="w-full px-4 py-2 rounded-lg border bg-red-300 text-red-800 hover:bg-red-800 hover:text-gray-50"
                                onClick={() => deleteCourse(courseId)}
                            >
                                Delete Course
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OneCourse;
