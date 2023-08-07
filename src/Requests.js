const key = process.env.REACT_APP_IMDB_API_KEY;
const requests = {
  requestNowPlaying: {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/now_playing",
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${key}`,
    },
  },
  requestPopular: {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/popular",
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${key}`,
    },
  },
  requestTopRated: {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/top_rated",
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${key}`,
    },
  },
  requestUpcoming: {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/upcoming",
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${key}`,
    },
  },
};

export default requests;
