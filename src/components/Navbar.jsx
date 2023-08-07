import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  // console.log(user);
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='absolute z-[100] flex w-full items-center justify-between p-4'>
      <div className='flex items-center'>
        <Link to='/'>
          <h1 className='mr-7 cursor-pointer text-4xl font-bold text-red-600'>
            NETFLIX
          </h1>
        </Link>
        <h5 className='mr-7 text-red-600'>Home</h5>
        <h5 className='mr-7 text-white'>TV Show</h5>
        <h5 className='mr-7 text-white'>Movies</h5>
        <h5 className='mr-7 text-white'>New & Popular</h5>
      </div>
      {user?.email ? (
        <div>
          <Link to='/account'>
            <button className='pr-4 text-white'>Account</button>
          </Link>
          <button
            onClick={handleLogout}
            className='cursor-pointer rounded bg-red-600 px-6 py-2 text-white'
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to='/login'>
            <button className='pr-4 text-white'>Sign In</button>
          </Link>
          <Link to='/signup'>
            <button className='cursor-pointer rounded bg-red-600 px-6 py-2 text-white'>
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
