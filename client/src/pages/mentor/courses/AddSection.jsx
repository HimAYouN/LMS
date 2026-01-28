import React, { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { useState } from 'react';
import axios from 'axios';

const AddSection = () => {
    const { courseId } = useParams();
    const token = localStorage.getItem('token');
    const navigate = useNavigate()
    // console.log(courseId);

    const [form, setForm] = useState({
        title: '',
        order: 0,
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(token);
        console.log(form);
        console.log(courseId);
        try {
            const response = await axios.post(
                `http://localhost:3000/api/v1/mentor/courses/${courseId}/sections`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('RES FROM ADD SECTION:', response);
            navigate(`/mentor/course/${courseId}`, {replace:true})
        } catch (error) {
            console.log('ERR FROM ADD SECTION: ', error);
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

            <button
                className="py-3 px-5 bg-amber-500 rounded-lg cursor-pointer"
                onClick={submitHandler}
            >
                Submit
            </button>
        </form>
    );
};

export default AddSection;
