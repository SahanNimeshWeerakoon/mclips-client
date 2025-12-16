"use client";

import { useState } from "react";
import { GoogleIcon } from "@/components/icons";
import axiosInstance from "@/lib/axios";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState("light");

  const bgImage =
    theme === "dark"
      ? "url('/dark-background.jpg')"
      : "url('/light-background.png')";

  const handleSignIn = () => {
    axiosInstance.post('/auth/signin', { username, password })
      .then(response => {
      })
      .catch((err: any) => console.error(err));
  };

  const handleGoogleSignIn = () => {
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-between px-8 lg:px-16 relative"
      style={{
        backgroundImage: bgImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Left side - Logo */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white"></h1>
      </div>

      {/* Right side - Sign in form */}
      <div className="w-[80%] lg:w-[30%] min-w-[400px]">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 py-16">
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="text-base text-gray-500 dark:text-gray-400 mb-2">
                Welcome to <span className="text-primary font-semibold">MClips</span>
              </p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Sign in</h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">No Account?</p>
              <a href="/register" className="text-base text-primary hover:text-primary/80">
                Sign up
              </a>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full mb-8 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 py-4 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-base"
          >
            <GoogleIcon />
            Sign in with Google
          </button>

          {/* Sign in inputs */}
          <div className="mb-6">
            <label className="block text-base font-medium mb-3 text-gray-700 dark:text-gray-300">
              Enter your username or email address
            </label>
            <input
              type="text"
              placeholder="Username or email address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-4 text-base border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white transition-colors"
            />
          </div>

          <div className="mb-4">
            <label className="block text-base font-medium mb-3 text-gray-700 dark:text-gray-300">
              Enter your Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 text-base border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white transition-colors"
            />
          </div>

          <div className="text-right mb-8">
            <a href="/forgot-password" className="text-base text-blue-500 hover:text-blue-600">
              Forgot Password
            </a>
          </div>

          <button
            onClick={handleSignIn}
            className="w-full bg-primary hover:bg-primary/80 text-white font-medium py-4 px-4 rounded-lg transition-colors text-base"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}