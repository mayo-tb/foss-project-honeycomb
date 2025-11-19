import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (role: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Registration form state
  const [regForm, setRegForm] = useState({
    name: '',
    regEmail: '',
    phone: '',
    regPassword: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      const role = email.includes('admin') ? 'admin' : 'student';
      onLogin(role);
      navigate(role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    }
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegForm({ ...regForm, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Account Created:", regForm);

    // Close modal after submit
    setShowModal(false);

    // Clear form
    setRegForm({ name: '', regEmail: '', phone: '', regPassword: '' });
  };

  return (
    <>
      {/* LOGIN SCREEN */}
      <div className="bg-cover bg-center h-screen flex items-center justify-center p-4" style={{
        background: 'url(https://via.placeholder.com/1200x800?text=City+Skyline+with+Fog) no-repeat center center',
        backgroundSize: 'cover'
      }}>
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg w-full max-w-sm">
          <h1 className="font-bold text-2xl md:text-3xl mb-6">
            Campus<span className="text-yellow-400">Go</span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-6 relative">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-4 top-3">👤</span>
            </div>

            <div className="mb-6 relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-4 top-3">👁️</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg cursor-pointer font-bold text-sm hover:bg-blue-50"
            >
              LOGIN
            </button>
          </form>

          <div className="text-center mt-4 text-xs md:text-sm">
            <a href="#" className="text-gray-700 underline">Forgot password?</a>
          </div>

          {/* CREATE ACCOUNT BUTTON */}
          <div className="text-center mt-3 text-xs md:text-sm">
            <button
              onClick={() => setShowModal(true)}
              className="mt-2 bg-transparent border-none text-blue-600 underline cursor-pointer text-sm"
            >
              Create an account
            </button>
          </div>
        </div>
      </div>

      {/* MODAL POPUP */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 md:p-8 rounded-lg w-full max-w-sm shadow-lg">
            <h2 className="text-center mb-6 font-bold text-lg md:text-xl">Create Account</h2>

            <form onSubmit={handleRegister}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={regForm.name}
                onChange={handleRegisterChange}
                className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="email"
                name="regEmail"
                placeholder="Email Address"
                value={regForm.regEmail}
                onChange={handleRegisterChange}
                className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={regForm.phone}
                onChange={handleRegisterChange}
                className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="password"
                name="regPassword"
                placeholder="Password"
                value={regForm.regPassword}
                onChange={handleRegisterChange}
                className="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white border-none rounded-lg cursor-pointer font-bold mt-2 hover:bg-blue-700"
              >
                Create Account
              </button>
            </form>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full py-2 rounded-lg border border-gray-400 bg-gray-200 cursor-pointer hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
