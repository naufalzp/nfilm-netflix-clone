import React, { useEffect, useState } from "react";
import SavedShow from "../components/SavedShow";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
const Account = () => {
  const [hasSavedShow, setHasSavedShow] = useState(false);
  const { user } = UserAuth();
  const movieID = doc(db, "users", `${user?.email}`);

  useEffect(() => {
    async function checkSavedShow() {
      if (user?.email) {
        const docSnap = await getDoc(movieID);
        if (docSnap.exists() && docSnap.data().saveShow) {
          // Check if "saveShow" property exists and is truthy
          setHasSavedShow(true);
        }
      }
    }
    checkSavedShow();
  }, [movieID, user?.email]);
  return (
    <>
      <div className='w-full text-white'>
        <img
          className='h-[400px] w-full object-cover'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
          alt='/'
        />
        <div className='fixed left-0 top-0 h-[550px] w-full bg-black/60'></div>
        <div className='absolute top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl font-bold md:text-5xl'>My Shows</h1>
        </div>
      </div>
      {hasSavedShow ? (
        <SavedShow />
      ) : (
        <h2 className='p-4 font-bold text-white md:text-xl'>No saved show</h2>
      )}
    </>
  );
};

export default Account;
