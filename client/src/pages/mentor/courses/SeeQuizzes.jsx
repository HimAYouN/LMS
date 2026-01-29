import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SeeQuizzes() {
    const [allQuizzes, setAllQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {courseId} = useParams()

    const token = localStorage.getItem("token");
    useEffect(() => {
        getQuizzes()
    }, [courseId, token]);

    const getQuizzes = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:3000/api/v1/mentor/courses/${courseId}/quizzes`, 
                    {headers: {
                        Authorization: `Bearer ${token}`
                    }}
                );
                setAllQuizzes(response.data.data || []);
                setError(null);
            } catch (error) {
                console.error(error);
                setError(error.response?.data?.message || "Failed to load quizzes");
            } finally {
                setLoading(false);
            }
        };

    const deleteQuiz = async(quizId)=>{
        console.log(quizId);
        try {
            await axios.delete(`http://localhost:3000/api/v1/mentor/quizzes/${quizId}`, {headers: {Authorization: `Bearer ${token}`}})
            getQuizzes()
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) return <div className="p-4 text-center">Loading quizzes...</div>;
    if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
    if (!allQuizzes.length) return <div className="p-4 text-gray-500">No quizzes found</div>;

    return (
        <div className="p-4 space-y-6 w-screen">
            <h2 className="text-2xl font-bold mb-6">Quizzes</h2>
            {allQuizzes.map((quiz, quizIdx) => (
                <div key={quizIdx} className="border rounded-lg p-6 bg-gray-50">
                    <h3 className="text-xl font-semibold mb-4">{quiz.title}</h3>
                    <div className="space-y-4">
                        {quiz.questions && quiz.questions.map((question, qIdx) => (
                            <div key={qIdx} className="bg-white border-l-4 border-blue-500 p-4 rounded">
                                <p className="font-semibold text-gray-800 mb-3">Q{qIdx + 1}. {question.questionText}</p>
                                <div className="space-y-2 ml-4">
                                    {question.options && question.options.map((option, oIdx) => (
                                        <div
                                            key={oIdx}
                                            className={`p-2 rounded ${
                                                oIdx === question.correctOptionIndex
                                                    ? 'bg-green-100 border-l-4 border-green-500 font-semibold text-green-800'
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}
                                        >
                                            {oIdx === question.correctOptionIndex && <span className="text-green-600 mr-2">✓</span>}
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-end'><button onClick={()=>deleteQuiz(quiz._id)} className='w-30 m-4 px-4 py-2 rounded-lg border bg-red-300 text-red-800 hover:bg-red-800 hover:text-gray-50'>Delete Quiz</button></div>
                </div>
            ))}
        </div>
    );
}

export default SeeQuizzes;
