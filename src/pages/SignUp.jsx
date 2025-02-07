import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { supabase } from "../lib/supabase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // Phone number input
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(""); // OTP input
  const [isOtpSent, setIsOtpSent] = useState(false); // Flag for OTP sent
  const [isOtpVerified, setIsOtpVerified] = useState(false); // Flag for OTP verification success
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Step 1: Send OTP for email verification
  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      // Send OTP to the email for verification (do not create user yet)
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true }, // Do not create user yet
      });

      if (error) throw new Error(error.message);

      setIsOtpSent(true);
      toast.success("OTP sent! Please check your email.");
    } catch (error) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async () => {
    try {
      setLoading(true);

      // Verify OTP with Supabase
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) throw new Error(error.message);

      setIsOtpVerified(true);
      toast.success("OTP verified successfully!");

      // After OTP verification, proceed to create the user
      const { user } = data;

      // Step 3: Create user account and store phone number in profile table
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { phone } }, // Store phone in user metadata
      });

      if (signUpError) throw new Error(signUpError.message);

      // Store additional data (email, phone) in the profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: user.id, // Use user.id to link profile to user
          email, // Store email in the profile table
          phone, // Store phone in the profile table
          full_name: "", // Optional field, can add if you want
          created_at: new Date(),
          updated_at: new Date(),
        });

      if (profileError) throw new Error(profileError.message);

      navigate("/");

    } catch (error) {
      toast.error(error.message || "Failed to verify OTP and create account");
    } finally {
      setLoading(false);
    }
  };

  // Step 4: Google Sign-up
  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      await supabase.auth.signInWithOAuth({ provider: "google" });
      toast.success("Successfully signed up with Google!");
      navigate("/products");
    } catch (error) {
      toast.error(error.message || "Google sign-up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to your existing account
            </Link>
          </p>
        </div>

        {/* Step 1: Request OTP */}
        {!isOtpSent ? (
          <form className="mt-8 space-y-6" onSubmit={handleSendOTP}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">Phone number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

            {/* Google sign-up button */}
            <div className="mt-4">
              <button
                onClick={handleGoogleSignUp}
                disabled={loading || isOtpSent} // Prevent Google sign-up while OTP is being sent or verified
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {loading ? 'Signing up...' : 'Sign up with Google'}
              </button>
            </div>
          </form>
        ) : (
          /* Step 2: Verify OTP */
          <div className="mt-8">
            <p className="text-center text-sm text-gray-600">Enter the OTP sent to your email.</p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 w-full mb-4"
            />
            <button onClick={handleVerifyOTP} className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
