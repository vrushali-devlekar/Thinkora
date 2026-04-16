import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
      console.log("Login:", { email, password });
      
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-950 to-slate-800 flex items-center justify-center">
      <div className="bg-transparent border border-slate-500/40 p-8 rounded-3xl shadow-2xl shadow-slate-800/50 w-full max-w-md backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-orange-400 mb-6 text-left tracking-wide">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-300 text-center">
          New here?{" "}
          <Link
            to="/register"
            className="text-red-400 hover:text-red-300 font-semibold"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
