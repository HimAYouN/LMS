import './App.css'
import AppRoutes from './routes'
import Register from './components/Register'
// import Student from './pages/student'
// import StudentAuth from './pages/auth/student/StudentAuth'
import RoleSelection from './pages/role-selection/RoleSelection'
import StudentAuth from './pages/auth/student/StudentAuth'
import Dashboard from './pages/student/dashboard/Dashboard'

function App() {
  

  return (
    <div className='bg-gray-200 text-black min-h-screen flex items-center justify-center'>
     

    <AppRoutes></AppRoutes>
      {/* <MainPage></MainPage>  */}
      {/* <Login></Login> */}
      {/* <Student></Student> */}
      {/* <Register></Register> */}
      {/* <StudentAuth></StudentAuth> */}
      {/* <RoleSelection></RoleSelection> */}
      {/* <StudentAuth></StudentAuth> */}
      {/* <Dashboard></Dashboard> */}
    </div>
  )
}

export default App
