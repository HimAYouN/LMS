import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SeeEnrollments() {
    const { courseId } = useParams();
    const token = localStorage.getItem('token');
    const [enrolled, setEnrolled] = useState([])
    const getEnrollment = async () => {
        try {
          console.log("MAI YAHA HU");
            const response = await axios.get(
                `http://localhost:3000/api/v1/courses/${courseId}/enrollments`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setEnrolled(response.data.data)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getEnrollment();
    }, []);

    return <div>{JSON.stringify(enrolled)}</div>;
}

export default SeeEnrollments;
