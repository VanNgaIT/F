import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const UserRegistrationBarChart = () => {
  const [registrationData, setRegistrationData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users/stats')
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          setRegistrationData(response.data);
        } else {
          console.error('Dữ liệu thống kê không đúng:', response.data);
        }
      })
      .catch(error => console.error(error));
  }, []);


  return (
    <div>
      <h1>User Registration Bar Chart</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={registrationData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottomRight', offset: 0 }} />
          <YAxis label={{ value: 'Users', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="newUsers" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserRegistrationBarChart;
