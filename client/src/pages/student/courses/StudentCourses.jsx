import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentCourses() {
  const navigate = useNavigate();
  useEffect(()=>{
    checkLoggin();
  }, [])
  const checkLoggin = async ()=>{
    const token = localStorage.getItem("Token");
    console.log(token);
    if (typeof token !== "string" || token.trim() === "") {
      navigate('/');
      return;
    }
  }
  return (
    
    <div className="space-y-8 p-6 max-w-full">
      <div>
        <h2 className="text-2xl font-bold mb-4">Enrolled Courses</h2>
        <div className="EnroledCourses overflow-x-auto  no-scrollbar  pb-4">
          <div className="flex gap-6 w-max">
            <div className="w-80 bg-gray-100 shadow-lg rounded-xl p-6 flex-shrink-0">
              <img
                src="https://i.ytimg.com/vi/NeYviOA8kPc/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCFhXInc2mS6rSF6VUMx-PTmLmGFA"
                alt="WebDev"
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold">WebDev</h3>
              <p className="text-gray-600">Duration: 3months</p>
              <p className="text-green-600 font-medium">Enrolled</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                Watch
              </button>
            </div>

            <div className="w-80 bg-gray-100 shadow-lg rounded-xl p-6 flex-shrink-0">
              <img
                src="https://i.ytimg.com/vi/M9O5AjEFzKw/hqdefault.jpg?sqp=-oaymwEnCOADEI4CSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC8ACCpMpGlf3xkb5hZxH0F7zQGvQ"
                alt="React"
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold">React</h3>
              <p className="text-gray-600">Duration: 3months</p>
              <p className="text-green-600 font-medium">Enrolled</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                Watch
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
  <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
  <div className="AvailableBatches overflow-x-auto no-scrollbar pb-4 max-w-full">
    <div className="flex gap-6 w-max">
            <div className="w-80 bg-gray-100 shadow-lg rounded-xl p-6 flex-shrink-0">
              <img
                src="https://i.ytimg.com/vi/_I3YpLe74Qo/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCuynv6ZLzwxuwFqF-eYwndFIseQA"
                alt="Networking"
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold">AI</h3>
              <p className="text-gray-600">Duration: 3months</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                Enroll
              </button>
            </div>
            <div className="w-80 bg-gray-100 shadow-lg rounded-xl p-6 flex-shrink-0">
              <img
                src="https://i.ytimg.com/vi/NeYviOA8kPc/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCFhXInc2mS6rSF6VUMx-PTmLmGFA"
                alt="WebDev"
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold">WebDev</h3>
              <p className="text-gray-600">Duration: 3months</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                Enroll
              </button>
            </div>
            <div className="w-80 bg-gray-100 shadow-lg rounded-xl p-6 flex-shrink-0">
              <img
                src="https://i.ytimg.com/vi/jmS_ZeZNKyQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLA19McWWuMSMdu8bCiRA-VBPxf1uw"
                alt="Networking"
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold">Networking</h3>
              <p className="text-gray-600">Duration: 3months</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                Enroll
              </button>
            </div>
            <div className="w-80 bg-gray-100 shadow-lg rounded-xl p-6 flex-shrink-0">
              <img
                src="https://i.ytimg.com/vi/FTu_KXnUd_A/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCICXVEAoIGhZqkIPTvZWdPqxAywg"
                alt="AI"
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold">AI</h3>
              <p className="text-gray-600">Duration: 3months</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                Enroll
              </button>
            </div>
            <div className="w-80 bg-gray-100 shadow-lg rounded-xl p-6 flex-shrink-0">
              <img
                src="https://i.ytimg.com/vi/_I3YpLe74Qo/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCuynv6ZLzwxuwFqF-eYwndFIseQA"
                alt="Networking"
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold">AI</h3>
              <p className="text-gray-600">Duration: 3months</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                Enroll
              </button>
            </div>
            <div className="w-80 bg-gray-100 shadow-lg rounded-xl p-6 flex-shrink-0">
              <img
                src="https://i.ytimg.com/vi/NeYviOA8kPc/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCFhXInc2mS6rSF6VUMx-PTmLmGFA"
                alt="WebDev"
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold">WebDev</h3>
              <p className="text-gray-600">Duration: 3months</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                Enroll
              </button>
            </div>
            <div className="w-80 bg-gray-100 shadow-lg rounded-xl p-6 flex-shrink-0">
              <img
                src="https://i.ytimg.com/vi/jmS_ZeZNKyQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLA19McWWuMSMdu8bCiRA-VBPxf1uw"
                alt="Networking"
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold">Networking</h3>
              <p className="text-gray-600">Duration: 3months</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                Enroll
              </button>
            </div>
            <div className="w-80 bg-gray-100 shadow-lg rounded-xl p-6 flex-shrink-0">
              <img
                src="https://i.ytimg.com/vi/FTu_KXnUd_A/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCICXVEAoIGhZqkIPTvZWdPqxAywg"
                alt="AI"
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold">AI</h3>
              <p className="text-gray-600">Duration: 3months</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                Enroll
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCourses;
