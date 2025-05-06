import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useParams, useNavigate } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: '',
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzhjYzM2MDc3YTZkYjNkNjM1MTYxOTVmNGJiMWExNiIsIm5iZiI6MTc0NjI5NjcxNS42NTYsInN1YiI6IjY4MTY1ZjhiMjU2YTRkMzRmMzkxMzBmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8eoOx6GoOCcG59fowdnJ5DhoW82CJaxAWaq24BakNjc',
    },
  };

  useEffect(() => {
    let isMounted = true; // Flag to prevent duplicate alerts

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => {
        console.log("API Response for Video:", res); // Debugging: Check the API response
        if (isMounted) {
          if (res.results && res.results.length > 0) {
            setApiData(res.results[0]);
          } else {
            alert("Movie details are not available.");
            navigate("/"); // Redirect to home or another fallback route
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Error fetching movie details:", err);
          alert("Failed to fetch movie details. Please try again later.");
          navigate("/"); // Redirect to home or another fallback route
        }
      });

    return () => {
      isMounted = false; // Cleanup flag on component unmount
    };
  }, [id, navigate]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back"
        onClick={() => {
          navigate('/');
        }}
      />
          <iframe
            width="90%"
            height="90%"
            src={`https://www.youtube.com/embed/${apiData.key}`}
            title="trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <div className="player-info">
            <p>{apiData.published_at.slice(0, 10)}</p>
            <p>{apiData.name}</p>
            <p>{apiData.type}</p>
          </div>
        
      
    </div>
  );
};

export default Player;
