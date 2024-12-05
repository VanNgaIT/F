import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const StatusChart = () => {
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users/online')
      .then(response => {
        const users = response.data;

        const statusCounts = users.reduce((acc, user) => {
          acc[user.status] = (acc[user.status] || 0) + 1;
          return acc;
        }, {});

        const totalUsers = users.length;

        const chartData = Object.keys(statusCounts).map(status => ({
          name: status,
          value: statusCounts[status],
          percentage: ((statusCounts[status] / totalUsers) * 100).toFixed(1)
        }));

        setStatusData(chartData);
      })
      .catch(error => console.error(error));
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

  const customTooltip = ({ payload }) => {
    if (payload && payload.length) {
      const { percentage, name } = payload[0].payload;
      return (
        <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}>
          <p>{name}: {percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h1>User Status Pie Chart</h1>

      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            data={statusData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={100}
            fill="#8884d8"
            label={false}
          >
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          {statusData.map((entry, index) => (
            <Label
              key={`label-${index}`}
              value={`${entry.percentage}%`}
              position="center"
              fill="#000"
              fontSize={18}
              fontWeight="bold"
              textAnchor="middle"
            />
          ))}

          <Tooltip content={customTooltip} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusChart;
