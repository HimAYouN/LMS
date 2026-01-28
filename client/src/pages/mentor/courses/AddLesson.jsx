import React, { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { useState } from 'react';
import axios from 'axios';

const AddLesson = () => {
    const { sectionId, courseId } = useParams();
    const token = localStorage.getItem('token');
    const navigate = useNavigate()

    const [form, setForm] = useState({
        title: '',
        content: '',
        order: 0,
        isPreview: false,
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:3000/api/v1/mentor/sections/${sectionId}/lessons`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('RES FROM ADD Lesson:', response);
            window.alert("Course Added Successfully")
            navigate(`/mentor/course/${courseId}`, { replace: true });
        } catch (error) {
            console.log('ERR FROM ADD Lesson: ', error);
        }finally{
        }
    };

    return (
        <form className="space-y-4">
            {/* Title */}
            <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                    setForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                    }))
                }
                className="border p-2 w-full"
            />

            {/* Content */}
            <input
                type="text"
                placeholder="Content"
                value={form.content}
                onChange={(e) =>
                    setForm((prev) => ({
                        ...prev,
                        content: e.target.value,
                    }))
                }
                className="border p-2 w-full"
            />

            {/* Order (number) */}
            <input
                type="number"
                placeholder="Order"
                value={form.order}
                onChange={(e) =>
                    setForm((prev) => ({
                        ...prev,
                        order: Number(e.target.value),
                    }))
                }
                className="border p-2 w-full"
            />

            {/* Is Preview (boolean) */}
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={form.isPreview}
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            isPreview: e.target.checked,
                        }))
                    }
                />
                Is Preview
            </label>
            <button
                className="py-3 px-5 bg-amber-500 rounded-lg cursor-pointer"
                onClick={submitHandler}
            >
                Submit
            </button>
        </form>
    );
};

export default AddLesson;
