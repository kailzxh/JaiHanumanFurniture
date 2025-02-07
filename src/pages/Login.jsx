// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { useAuth } from '../contexts/AuthContext'; 
// import { supabase } from '../lib/supabase'; // Adjust according to your setup
// // Import your auth context

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [resetEmail, setResetEmail] = useState('');  // For forgot password
//   const [otp, setOtp] = useState('');  // For OTP input
//   const [newPassword, setNewPassword] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false); // To toggle the reset password modal
//   const [isVerificationSent, setIsVerificationSent] = useState(false); // Flag for whether OTP is sent
//   const [isOTPVerified, setIsOTPVerified] = useState(false); // Flag for OTP verification success
//   const navigate = useNavigate();

//   // Accessing functions from useAuth context
//   const { signIn, signInWithGoogle, resetPasswordForEmail, verifyOtp } = useAuth();

//   // Handle login
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       await signIn(email, password);
//       toast.success('Successfully logged in!');
//       navigate('/products');
//     } catch (error) {
//       toast.error(error.message || 'Failed to log in');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Google Sign In
//   const handleGoogleSignIn = async () => {
//     try {
//       setLoading(true);
//       await signInWithGoogle();
//       toast.success('Successfully signed in with Google!');
//       navigate('/products');
//     } catch (error) {
//       toast.error(error.message || 'Google sign-in failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Forgot Password (Send OTP)
//   const handleForgotPassword = async () => {
//     try {
//       setLoading(true);
//       await resetPasswordForEmail(resetEmail); // Call resetPasswordForEmail from context
//       setIsVerificationSent(true); // Show a message that the OTP has been sent
//       toast.success('OTP has been sent to your email!');
//     } catch (error) {
//       toast.error(error.message || 'Failed to send OTP for password reset');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Verify OTP
//   const handleVerifyOTP = async () => {
//     try {
//       setLoading(true);
//       const { error } = await supabase.auth.verifyOtp({ token: otp, type: 'email' });
//       if (error) throw new Error(error.message);
//       setIsOTPVerified(true); // OTP verified successfully
//       toast.success('OTP verified successfully!');
//     } catch (error) {
//       toast.error(error.message || 'Failed to verify OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Password Reset after OTP Verification
//   const handleResetPassword = async () => {
//     try {
//       setLoading(true);
//       const { error } = await supabase.auth.updateUser({ password: newPassword });
//       if (error) throw new Error(error.message);
//       toast.success('Password has been successfully reset!');
//       setIsModalOpen(false);
//     } catch (error) {
//       toast.error(error.message || 'Failed to reset password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to your account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Or{' '}
//             <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
//               create a new account
//             </Link>
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="email-address" className="sr-only">Email address</label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">Password</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               {loading ? 'Signing in...' : 'Sign in'}
//             </button>
//           </div>
//         </form>

//         {/* Forgot Password section */}
//         <div className="mt-4">
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="text-sm text-indigo-600 hover:text-indigo-500"
//           >
//             Forgot Password?
//           </button>
//         </div>

//         {/* Google Sign-In */}
//         <div className="mt-4">
//           <button
//             onClick={handleGoogleSignIn}
//             disabled={loading}
//             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//           >
//             {loading ? 'Signing in...' : 'Sign in with Google'}
//           </button>
//         </div>

//         {/* Modal for Forgot Password */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//               <h3 className="text-xl font-semibold">Reset Your Password</h3>
//               {!isVerificationSent ? (
//                 <div>
//                   <input
//                     type="email"
//                     placeholder="Enter email to reset password"
//                     value={resetEmail}
//                     onChange={(e) => setResetEmail(e.target.value)}
//                     className="border p-2 w-full mb-4"
//                   />
//                   <button
//                     onClick={handleForgotPassword}
//                     className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
//                   >
//                     Send OTP
//                   </button>
//                 </div>
//               ) : (
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     className="border p-2 w-full mb-4"
//                   />
//                   <button
//                     onClick={handleVerifyOTP}
//                     className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
//                   >
//                     Verify OTP
//                   </button>
//                   <input
//                     type="password"
//                     placeholder="New Password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     className="border p-2 w-full mb-4"
//                   />
//                   <button
//                     onClick={handleResetPassword}
//                     className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
//                   >
//                     Reset Password
//                   </button>
//                 </div>
//               )}
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="mt-4 w-full bg-gray-300 text-gray-800 p-2 rounded-md"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext'; 
import { supabase } from '../lib/supabase'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const navigate = useNavigate();

  const { signIn, signInWithGoogle, resetPasswordForEmail } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signIn(email, password);
      toast.success('Successfully logged in!');
      navigate('/products');
    } catch (error) {
      toast.error(error.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      toast.success('Successfully signed in with Google!');
      navigate('/products');
    } catch (error) {
      toast.error(error.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      await resetPasswordForEmail(resetEmail);
      setIsVerificationSent(true);
      toast.success('OTP has been sent to your email!');
    } catch (error) {
      toast.error(error.message || 'Failed to send OTP for password reset');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.verifyOtp({
        email: resetEmail,
        token: otp,
        type: 'recovery', // ✅ Fixed: Use 'recovery' for password reset
      });

      if (error) throw new Error(error.message);
      setIsOTPVerified(true);
      toast.success('OTP verified successfully! You can now reset your password.');
    } catch (error) {
      toast.error(error.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw new Error(error.message);
      toast.success('Password has been successfully reset! Please log in with your new password.');
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Forgot Password?
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-xl font-semibold">Reset Your Password</h3>
              {!isVerificationSent ? (
                <div>
                  <input
                    type="email"
                    placeholder="Enter email to reset password"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="border p-2 w-full mb-4"
                  />
                  <button onClick={handleForgotPassword} className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
                    Send OTP
                  </button>
                </div>
              ) : (
                <div>
                  <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="border p-2 w-full mb-4" />
                  <button onClick={handleVerifyOTP} className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
                    Verify OTP
                  </button>
                  {isOTPVerified && <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="border p-2 w-full mb-4" />}
                  <button onClick={handleResetPassword} className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700">
                    Reset Password
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
