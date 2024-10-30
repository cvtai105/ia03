import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      console.log(process.env.REACT_APP_API_URL);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      localStorage.setItem('auth', JSON.stringify(data));
      navigate('/'); // Navigate to home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 text-center border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="text-left">
          <label className="font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
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
          className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600"
        >
          Register
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
      <p className="mt-6 text-gray-600">
        Already have an account?{' '}
        <span
          onClick={() => navigate('/login')}
          className="text-green-500 cursor-pointer hover:underline"
        >
          Login here
        </span>
      </p>
    </div>
  );
}

export default Register;
