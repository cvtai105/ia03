import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      console.log(data);
      setUserData(data);

      localStorage.setItem('auth', JSON.stringify(data));
      navigate('/'); // Navigate to home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 text-center border border-gray-300 rounded-lg shadow-md">
      {userData ? (
        <div>
          <h2 className="text-xl font-semibold text-green-600 mt-4">Hello again, {userData.name}!</h2>
          <p className="mt-2 text-gray-600">You are already logged in.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-green-500 text-white font-medium rounded hover:bg-green-600"
          >
            Go to Home
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-gray-700 mb-6">Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="text-left">
              <label className="font-medium text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="text-left">
              <label className="font-medium text-gray-700">Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white font-medium rounded hover:bg-green-600"
            >
              Login
            </button>
          </form>
          {error && <p className="mt-4 text-red-500">{error}</p>}
          <p className="mt-6 text-gray-600">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              className="text-green-500 cursor-pointer hover:underline"
            >
              Register here
            </span>
          </p>
        </>
      )}
    </div>
  );
}

export default Login;
