
import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

function AddQuiz() {
    const {courseId} = useParams()
    const token = localStorage.getItem("token")
    console.log("courseId:", courseId);
    const [form, setForm] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        order: 0
    });
    const submitHandler = async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/mentor/courses/${courseId}/quizzes`, form, {headers: {Authorization: `Bearer ${token}`}})
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <form className="space-y-4  flex flex-col ">
            {/* Title */}
            <input
                type="text"
                placeholder="Question"
                value={form.question}
                onChange={(e) =>
                    setForm((prev) => ({
                        ...prev,
                        question: e.target.value,
                    }))
                }
                className="border p-2 w-full rounded-sm"
            />
            <div className='flex gap-3'>
                <input
                type="text"
                placeholder="Option 01"
                value={form.option1}
                onChange={(e) =>
                    setForm((prev) => ({
                        ...prev,
                        option1: e.target.value,
                    }))
                }
                className="border p-2 w-full rounded-sm"
            />
            <input
                type="text"
                placeholder="Option 02"
                value={form.option2}
                onChange={(e) =>
                    setForm((prev) => ({
                        ...prev,
                        option2: e.target.value,
                    }))
                }
                className="border p-2 w-full rounded-sm"
            />
            </div>
            <div className='flex gap-3'>
            <input
                type="text"
                placeholder="Option 03"
                value={form.option3}
                onChange={(e) =>
                    setForm((prev) => ({
                        ...prev,
                        option3: e.target.value,
                    }))
                }
                className="border p-2 w-full rounded-sm"
            />
            <input
                type="text"
                placeholder="Option 04"
                value={form.option4}
                onChange={(e) =>
                    setForm((prev) => ({
                        ...prev,
                        option4: e.target.value,
                    }))
                }
                className="border p-2 w-full rounded-sm"
            />
            </div>

            {/* Order (number) */}
            <div className='flex gap-3'>
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
                className="border p-2 w-full rounded-sm"
            />

            <button
                className="py-3 px-5 bg-amber-500 rounded-lg cursor-pointer"
                onClick={submitHandler}
            >
                Submit
            </button>
            </div>
        </form>
    </div>
  )
}

export default AddQuiz