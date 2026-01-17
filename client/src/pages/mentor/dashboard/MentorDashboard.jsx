import React from 'react'

function MentorDashboard() {
  return (
    <div>
      <div className="min-h-screen bg-gray-200 p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-6">

        {/* LEFT SIDEBAR */}
        <aside className="md:w-1/4 w-full space-y-6">

          {/* Mentor Info */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-lg font-semibold mb-4">Mentor Dashboard</h2>
            <div className="text-sm text-gray-700 space-y-1">
              <p><span className="font-medium">Name:</span> John Doe</p>
              <p><span className="font-medium">ID:</span> MTR102</p>
              <p><span className="font-medium">Email:</span> mentor@mail.com</p>
            </div>
          </div>

          {/* Watch Hours */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="text-sm text-gray-500 mb-2">Watch Hours</h3>
            <p className="text-3xl font-semibold text-gray-800">124</p>
          </div>

          {/* Create Actions */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-semibold mb-3">Create</h3>
            <div className="flex flex-col gap-2 text-sm">
              <button className="text-left px-3 py-2 rounded-lg hover:bg-gray-100">
                Create Quiz
              </button>
              <button className="text-left px-3 py-2 rounded-lg hover:bg-gray-100">
                Create Course
              </button>
              <button className="text-left px-3 py-2 rounded-lg hover:bg-gray-100">
                Create Assignment
              </button>
            </div>
          </div>

        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Courses</h2>

          {/* Course Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4].map((course) => (
              <div
                key={course}
                className="border rounded-lg p-4 hover:shadow-md transition"
              >
                <h3 className="font-semibold mb-2">Course Title</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Short description of the course content.
                </p>
                <button className="text-sm text-blue-600 font-medium">
                  View Course →
                </button>
              </div>
            ))}
          </div>
        </main>

      </div>
    </div>
    </div>
  )
}

export default MentorDashboard