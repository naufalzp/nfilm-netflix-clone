import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userSavedShows, setUserSavedShows] = useState([]);
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);

  useEffect(() => {
    async function fetchUserSavedShows() {
      if (user?.email) {
        const docSnap = await getDoc(movieID);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserSavedShows(data?.saveShow || []);
        }
      }
    }
    fetchUserSavedShows();
  }, [movieID, user?.email]);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        saveShow: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  return (
    <div className='relative inline-block w-[160px] cursor-pointer p-2 transition-transform duration-200 ease-in-out hover:z-10 hover:scale-110  hover:p-0 sm:w-[240px] lg:w-[280px]'>
      <img
        className='block h-auto w-full rounded-xl '
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className='absolute left-0 top-0 h-full w-full rounded-xl text-white opacity-0 transition-opacity duration-200 ease-in-out hover:bg-black/50 hover:opacity-100'>
        <p className='flex h-full items-center justify-center whitespace-normal text-center text-xs font-bold md:text-sm'>
          {item?.title}
        </p>
        <p onClick={saveShow}>
          {userSavedShows.find((movie) => movie.id === item?.id) ? (
            <FaHeart className='absolute left-4 top-4 text-gray-300' />
          ) : (
            <FaRegHeart className='absolute left-4 top-4 text-gray-300' />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;
