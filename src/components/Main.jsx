import React, { useEffect, useState } from "react";
import requests from "../Requests";
import axios from "axios";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);

  useEffect(() => {
    axios
      .request(requests.requestPopular)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
      });
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setRandomMovie(movies[randomIndex]);
    }
  }, [movies]);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className=' h-[600px] w-full text-white'>
      <div className='h-full w-full '>
        <div className='absolute h-[600px] w-full bg-gradient-to-r from-black '></div>
        <div className='absolute h-[600px] w-full bg-gradient-to-t from-black '></div>
        {randomMovie && randomMovie.backdrop_path ? (
          <img
            className='h-full w-full object-cover'
            src={`https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}`}
            alt={randomMovie?.title}
          />
        ) : (
          <div className='h-full w-full bg-gray-500'>
            <p className='p-4 text-center text-white'>No Poster Available</p>
          </div>
        )}
        <div className='absolute top-[20%] w-full p-4 md:p-8'>
          {randomMovie && (
            <>
              <h1 className='text-3xl font-bold md:text-5xl'>
                {randomMovie?.title}
              </h1>
              <div className='my-4 '>
                <button className=' rounded border border-gray-300 bg-gray-300 px-5 py-2 text-black'>
                  Play
                </button>
                <button className='ml-4 rounded border border-gray-300 px-5 py-2 text-white'>
                  Watch Later
                </button>
              </div>
              <p className='text-sm text-gray-400'>
                Released: {randomMovie?.release_date}
              </p>
              <p className='w-full text-gray-200 md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]'>
                {truncateString(randomMovie?.overview, 150)}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
