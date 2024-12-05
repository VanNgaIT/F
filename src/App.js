import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import Header from './components/Header';
import UserRegistrationBarChart from './components/UserRegistrationBarChart';
import StatusChart from './components/StatusChart';
import LocationMap from './components/LocationMap';
import LoginForm from './components/LoginForm';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import OnlineChart from './components/OnlineChart';
const App = () => {
  return (
    <AuthProvider>  {/* Bao bọc ứng dụng với AuthProvider */}
      <Router>
        <Header />
        <Routes>
          <Route path="/userlist" element={<UserList />} />
          <Route path="/distribution" element={<UserRegistrationBarChart />} />
          <Route path="/status" element={<StatusChart />} />
          <Route path="/maps" element={<LocationMap />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/online" element={<OnlineChart />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
