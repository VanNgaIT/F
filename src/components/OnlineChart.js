import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const OnlineChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Gọi API để lấy dữ liệu số lượng người dùng online theo thời gian
        axios.get('http://localhost:5000/users/stats')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    console.error('Dữ liệu không hợp lệ:', response.data);
                }
            })
            .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
    }, []);
      
    return (
        <div style={{ width: '100%', height: 400 }}>
            <h1>User Online Line Chart</h1>
            <ResponsiveContainer>   
                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(tick) => tick.split('-').reverse().join('/')} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="newUsers" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default OnlineChart;
