import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddQuiz() {
    const { courseId } = useParams();
    const token = localStorage.getItem('token');
    const navigate = useNavigate()

    const emptyQuestion = () => ({
        questionText: '',
        options: ['', '', '', ''],
        correctOptionIndex: 0,
    });

    const [quiz, setQuiz] = useState({
        title: '',
        questions: [emptyQuestion()],
    });

    const handleTitleChange = (e) =>
        setQuiz((prev) => ({ ...prev, title: e.target.value }));

    const addQuestion = () =>
        setQuiz((prev) => ({
            ...prev,
            questions: [...prev.questions, emptyQuestion()],
        }));

    const removeQuestion = (qIdx) => {
        setQuiz((prev) => ({
            ...prev,
            questions: prev.questions.filter((_, i) => i !== qIdx),
        }));
    };

    const updateQuestionText = (qIdx, value) => {
        setQuiz((prev) => ({
            ...prev,
            questions: prev.questions.map((q, i) =>
                i === qIdx ? { ...q, questionText: value } : q
            ),
        }));
    };

    const updateOption = (qIdx, optIdx, value) => {
        setQuiz((prev) => ({
            ...prev,
            questions: prev.questions.map((q, i) =>
                i === qIdx
                    ? {
                          ...q,
                          options: q.options.map((o, oi) =>
                              oi === optIdx ? value : o
                          ),
                      }
                    : q
            ),
        }));
    };

    const setCorrectOption = (qIdx, optIdx) => {
        setQuiz((prev) => ({
            ...prev,
            questions: prev.questions.map((q, i) =>
                i === qIdx ? { ...q, correctOptionIndex: optIdx } : q
            ),
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:3000/api/v1/mentor/courses/${courseId}/quizzes`,
                quiz,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('created quiz', response.data);
            navigate(`/mentor/course/${courseId}`)
        } catch (error) {
            console.error(error?.response?.data || error.message || error);
        }
    };

    return (
        <div>
            <form className="space-y-4 flex flex-col" onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="Quiz title"
                    value={quiz.title}
                    onChange={handleTitleChange}
                    className="border p-2 w-full rounded-sm"
                />

                {quiz.questions.map((q, qi) => (
                    <div key={qi} className="border p-4 rounded-md space-y-2">
                        <div className="flex justify-between items-start">
                            <h4 className="font-semibold">Question {qi + 1}</h4>
                            <button
                                type="button"
                                onClick={() => removeQuestion(qi)}
                                className="text-red-500"
                            >
                                Remove
                            </button>
                        </div>

                        <input
                            type="text"
                            placeholder="Question text"
                            value={q.questionText}
                            onChange={(e) =>
                                updateQuestionText(qi, e.target.value)
                            }
                            className="border p-2 w-full rounded-sm"
                        />

                        <div className="grid grid-cols-2 gap-2">
                            {q.options.map((opt, oi) => (
                                <label
                                    key={oi}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="radio"
                                        name={`correct-${qi}`}
                                        checked={q.correctOptionIndex === oi}
                                        onChange={() =>
                                            setCorrectOption(qi, oi)
                                        }
                                    />
                                    <input
                                        type="text"
                                        placeholder={`Option ${oi + 1}`}
                                        value={opt}
                                        onChange={(e) =>
                                            updateOption(qi, oi, e.target.value)
                                        }
                                        className="border p-2 w-full rounded-sm"
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={addQuestion}
                        className="py-2 px-4 bg-sky-500 text-white rounded"
                    >
                        Add Question
                    </button>
                    <button
                        type="submit"
                        className="py-2 px-4 bg-amber-500 rounded-lg"
                    >
                        Submit Quiz
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddQuiz;
