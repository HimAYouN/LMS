import React from 'react'
import { useNavigate } from 'react-router-dom'

function StudentLogout() {
    const navigate = useNavigate()
    const logout = () =>{
        localStorage.removeItem("Token")
        navigate('/student/login')
    }
  return (
    <div  className="flex flex-col gap-2">
        <button  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700" onClick={logout}>Logout</button>
    </div>
  )
}

export default StudentLogout