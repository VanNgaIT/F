const express = require('express');
const cors = require('cors');
const { faker } = require('@faker-js/faker');
const http = require('http'); // Import http module
const WebSocket = require('ws'); // Import WebSocket module

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

const generateUser = (id) => ({
  id,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  status: faker.helpers.arrayElement(['active', 'inactive', 'delay']),
  location: faker.location.country(),
  role: faker.helpers.arrayElement(['Admin', 'User', 'Guest']),
  activity: faker.helpers.arrayElement(['Online', 'Offline']),
  registrationDate: faker.date.between({ from: '2024-01-01', to: '2024-12-01' }).toISOString().split('T')[0],
});

const usersOnline = Array.from({ length: 2000 }, (_, i) => generateUser(i + 1));

app.get('/users/online', (req, res) => {
  res.json(usersOnline);
});

app.get('/users/stats', (req, res) => {
  const stats = [];
  const daysInPast = 30;
  const dateNow = new Date();

  for (let i = 0; i < daysInPast; i++) {
    const date = new Date(dateNow);
    date.setDate(date.getDate() - i);
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD

    const newUsersCount = usersOnline.filter(user => user.registrationDate === formattedDate).length;

    if (newUsersCount > 0) {
      stats.push({ date: formattedDate, newUsers: newUsersCount });
    }
  }

  res.json(stats);
});

app.get('/users/status', (req, res) => {
  const statusCounts = usersOnline.reduce((acc, user) => {
    acc[user.status] = (acc[user.status] || 0) + 1;
    return acc;
  }, {});

  const statusStats = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status],
  }));

  res.json(statusStats);
});

app.post('/login', (req, res) => {
  const { email } = req.body;

  const user = usersOnline.find(u => u.email === email);
  if (user) {
    return res.json({ user });
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');

  const userLocations = usersOnline.map(user => ({
    name: user.name,
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude()
  }));

  setInterval(() => {
    ws.send(JSON.stringify(userLocations));
  }, 5000);

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.get('/users/activity', (req, res) => {
  const activityCounts = usersOnline.reduce((acc, user) => {
    acc[user.activity] = (acc[user.activity] || 0) + 1;
    return acc;
  }, {});

  res.json(activityCounts);
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
