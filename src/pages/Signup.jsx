import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='h-screen w-full'>
        <img
          className='absolute hidden h-full w-full object-cover sm:block'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
          alt='/'
        />
        <div className='fixed left-0 top-0 h-screen w-full bg-black/60'></div>
        <div className='fixed z-50 w-full px-4 py-24'>
          <div className='mx-auto h-[600px] max-w-[450px] bg-black/75 text-white'>
            <div className='mx-auto max-w-[320px] py-16'>
              <h1 className='text-3xl font-bold'>Sign Up</h1>
              <form onSubmit={handleSubmit} className='flex w-full flex-col py-4'>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className='my-2 rounded bg-gray-600 p-3 '
                  type='email'
                  placeholder='Email'
                  autoComplete='email'
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className='my-2 rounded bg-gray-600 p-3 '
                  type='password'
                  placeholder='Password'
                  autoComplete='password'
                />
                <button className='my-6 rounded bg-red-600 py-3 font-bold'>
                  Sign Up
                </button>
                <div className='flex items-center justify-between text-gray-600'>
                  <p>
                    <input className='mr-2' type='checkbox' />
                    Remember Me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className='py-8'>
                  <span className='text-gray-600'>
                    Already subscribe to Netflix?
                  </span>{" "}
                  <Link to='/login'>Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
