// RoleSelection.jsx
import { useNavigate } from "react-router-dom";
import { PiStudentDuotone } from "react-icons/pi";
import { SiCodementor } from "react-icons/si";
import { MdAdminPanelSettings } from "react-icons/md";
import Logo from "../../assets/Logo.png";
import BGImage from "../../assets/Flowic.jpeg";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleStudentClick = (role) => {
    navigate(`/${role}/login`);
  };

  return (
    <div className="flex flex-col h-screen w-full">

      <div className="h-1/2  flex items-center justify-center rounded-md relative overflow-hidden">
        <div className="relative rounded-md">
          <img src={BGImage} alt="Background" className="w-[30rem] h-auto " />
          <img
            src={Logo}
            alt="Logo"
            className="w-32 h-auto absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      {/* Middle section - 60% */}
      <div className="h-1/2 flex items-center justify-center gap-8 px-8">
        <div>
          <button
          className="h-32 w-64 mt-2 flex flex-col items-center justify-center p-8 rounded-lg border-2 border-gray-700 hover:border-blue-500 hover:bg-blue-50 hover:text-gray-950 transition-all gap-3"
          onClick={() => handleStudentClick("student")}
        >
          <PiStudentDuotone className="text-4xl text-blue-600" />
          <span className="font-semibold">Login as Student</span>
        </button>
        <button
          className="h-32 w-64 mt-2 flex flex-col items-center justify-center p-8 rounded-lg border-2 border-gray-700 hover:border-green-500 hover:bg-green-50 hover:text-gray-950 transition-all gap-3"
          onClick={() => handleStudentClick("mentor")}
        >
          <SiCodementor className="text-4xl text-green-600" />
          <span className="font-semibold">Login as Mentor</span>
        </button>
        </div>
        <div>
          <button
          className="h-32 w-64 mt-2 flex flex-col items-center justify-center p-8 rounded-lg border-2 border-gray-700 hover:border-purple-500 hover:bg-purple-50 hover:text-gray-950 transition-all gap-3"
          onClick={() => handleStudentClick("admin")}
        >
          <MdAdminPanelSettings className="text-4xl text-purple-600" />
          <span className="font-semibold">Login as Admin</span>
        </button>
        <button
          className="h-32 w-64 mt-2 flex flex-col items-center justify-center p-8 rounded-lg border-2 border-gray-700 hover:border-purple-500 hover:bg-purple-50 hover:text-gray-950 transition-all gap-3"
          onClick={() => handleStudentClick("adminStaff")}
        >
          <MdAdminPanelSettings className="text-4xl text-purple-600" />
          <span className="font-semibold">Admin Staff</span>
        </button>
        </div>
      </div>

      {/* Footer - 5% */}
      <footer className="h-[5%] bg-gray-200 flex items-center justify-center">
        <span className="text-sm text-gray-600">
          © 2024 All rights reserved
        </span>
      </footer>
    </div>
  );
};

export default RoleSelection;
