import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";

const SavedShow = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.saveShow);
    });
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        saveShow: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className='p-4 font-bold text-white md:text-xl'>My Shows</h2>
      <div className='group relative flex items-center'>
        <MdChevronLeft
          onClick={slideLeft}
          className='absolute left-0 z-10 hidden cursor-pointer rounded-full bg-white opacity-50 hover:opacity-100 group-hover:block'
          size={40}
        />
        <div
          id={"slider"}
          className='h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide'
        >
          {movies.map((item, id) => (
            <div
              key={id}
              className='relative inline-block w-[160px] cursor-pointer p-2 sm:w-[240px] lg:w-[280px]'
            >
              <img
                className='block h-auto w-full'
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
              />
              <div className='absolute left-0 top-0 h-full w-full text-white opacity-0 transition-opacity duration-200 ease-in-out hover:bg-black/80 hover:opacity-100'>
                <p className='flex h-full items-center justify-center whitespace-normal text-center text-xs font-bold md:text-sm'>
                  {item?.title}
                </p>
                <p
                  onClick={() => deleteShow(item.id)}
                  className='absolute right-4 top-4 to-gray-300'
                >
                  <AiOutlineClose />
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className='absolute right-0 z-10 hidden cursor-pointer rounded-full bg-white opacity-50 hover:opacity-100 group-hover:block'
          size={40}
        />
      </div>
    </>
  );
};

export default SavedShow;
