import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";


const TitleCards = ({ title, category, className }) => {
  const [ApiData, setApiData] = useState([]);
  const navigate = useNavigate();
  const [check, setCheck] = React.useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
   setCheck(true)// Redirect to home if the user is authenticated
      } else {
       setCheck(false)// Redirect to login if the user is not authenticated
      }
    });
  }, [navigate, location.pathname]);

  const cardsRef = useRef();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzhjYzM2MDc3YTZkYjNkNjM1MTYxOTVmNGJiMWExNiIsIm5iZiI6MTc0NjI5NjcxNS42NTYsInN1YiI6IjY4MTY1ZjhiMjU2YTRkMzRmMzkxMzBmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8eoOx6GoOCcG59fowdnJ5DhoW82CJaxAWaq24BakNjc",
    },
  };

  const handlePlayer = (id) => {
    console.log(id);
    if(!check) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }
    navigate(`/player/${id}`);
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.results && Array.isArray(res.results)) {
          setApiData(res.results);
        } else {
          setApiData([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
      });

    const currentRef = cardsRef.current;
    currentRef.addEventListener("wheel", handleWheel);

    // Cleanup event listener on unmount
    return () => {
      currentRef.removeEventListener("wheel", handleWheel);
    };
  }, [category]);

  return (
    <div className={`title-cards ${className}`}>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {ApiData.map((card, index) => (
          <div
            className="cards"
            key={index}
            onClick={() => handlePlayer(card.id)} // Pass function reference
          >
            <img
              src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
              alt={card.original_title}
            />
            <p>{card.original_title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;