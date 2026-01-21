import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function OneCourse() {
    let params = useParams();
    
    const courseId = params.courseId
    const token = localStorage.getItem("token")
    console.log(courseId);
    const [course, setCourse] = useState({})

    useEffect(() => {
        const fetchCourse = async () => {
            const response = await axios.get(
                    `http://localhost:3000/api/v1/mentor/courses/:${courseId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                  );
                  console.log(response);
                  setCourse(response)
        };
        fetchCourse();
    }, []);

  return (
    <div>
        {}
    </div>
  )
}

export default OneCourse