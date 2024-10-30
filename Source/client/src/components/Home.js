import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      const storedUserData = JSON.parse(auth);
      if (storedUserData) {
        setUserData(storedUserData);
      }
    }
  }, []);

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  const handleRegisterClick = () => {
    navigate('/register'); 
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('auth'); 
    setUserData(null); 
    navigate('/login'); 
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-10 text-center border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to the Home Page</h1>
      {userData ? (
        <div className="p-6 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Hello, {userData.name}!</h2>
          <button
            onClick={handleLogoutClick}
            className="px-5 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 mt-4"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p className="text-lg text-gray-600 mb-6">Please log in or register to access more features.</p>
          <button
            onClick={handleLoginClick}
            className="px-5 py-2 mr-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Login
          </button>
          <button
            onClick={handleRegisterClick}
            className="px-5 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
