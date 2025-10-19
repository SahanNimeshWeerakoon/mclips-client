"use client";

import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState("light");

  const bgImage =
    theme === "dark"
      ? "url('/dark-background.jpg')"
      : "url('/light-background.png')";

  const handleSignUp = () => {
    console.log("Sign up with:", { email, username, contactNumber, password });
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
      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm"
      >
        Toggle {theme === "dark" ? "Light" : "Dark"} Mode
      </button>

      {/* Left side - Logo */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white"></h1>
      </div>

      {/* Right side - Sign up form */}
      <div className="w-[30%] min-w-[400px]">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 py-16">
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="text-base text-gray-500 dark:text-gray-400 mb-2">
                Welcome to <span className="text-primary font-semibold">MClips</span>
              </p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Sign up</h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Have an Account?</p>
              <a href="/login" className="text-base text-primary hover:text-primary/80">
                Sign in
              </a>
            </div>
          </div>

          {/* Sign up inputs */}
          <div className="mb-6">
            <label className="block text-base font-medium mb-3 text-gray-700 dark:text-gray-300">
              Enter your username or email address
            </label>
            <input
              type="text"
              placeholder="Username or email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 text-base border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-base font-medium mb-3 text-gray-700 dark:text-gray-300">
                User name
              </label>
              <input
                type="text"
                placeholder="User name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-4 text-base border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-base font-medium mb-3 text-gray-700 dark:text-gray-300">
                Contact Number
              </label>
              <input
                type="tel"
                placeholder="Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full px-4 py-4 text-base border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white transition-colors"
              />
            </div>
          </div>

          <div className="mb-8">
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

          <button
            onClick={handleSignUp}
            className="w-full bg-primary hover:bg-primary/80 text-white font-medium py-4 px-4 rounded-lg transition-colors text-base"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}