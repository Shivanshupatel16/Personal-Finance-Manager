import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { toast } from 'sonner'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      toast.success('Login successful!');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      //  toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Sign in to CoinKeeper</h2>
          <p className="mt-2 text-sm text-gray-600">Track your finances with ease</p>
        </div>
        {error && <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-lg">{error}</div>}
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>
           <div className="relative">
      <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
        Password
      </label>

      <input
        id="login-password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="mt-1 block w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        required
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 my-3 hover:text-gray-700"
      >
        {showPassword ? <EyeOffIcon size={25} /> : <EyeIcon size={25} />}
      </button>
    </div>
          <button type="submit" className="w-full py-3 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            Sign in
          </button>
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">Don't have an account? </span>
            <Link to="/register" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
