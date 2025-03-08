import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import Login from './components/Login';
import { AppContext } from './context/AppContext';
import { ToastContainer } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AppContext);
  return token ? children : <Navigate to="/" />;
};

const App = () => {
  const { showLogin } = useContext(AppContext);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 px-4 sm:px-10 md:px-14 lg:px-28 xl:px-36">
        {showLogin && <Login/>}
        <ToastContainer position='top-right'/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
