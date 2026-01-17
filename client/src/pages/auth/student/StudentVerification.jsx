import React from 'react'
import { useNavigate } from 'react-router-dom';

function StudentVerification() {

    
const navigate =useNavigate();

    return (
    <div className="flex items-center justify-center min-h-screen ">
        <div className=" rounded-lg shadow-lg p-8 w-full max-w-md">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Verify</h1>
            </div>
            <div className="space-y-4">
                <input 
                    type="text" 
                    placeholder="Enter verification code"
                    className="w-full px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                    onClick={()=> navigate('/student/dashboard')}
                >
                    Verify
                </button>
            </div>
        </div>
    </div>
    
)
}

export default StudentVerification