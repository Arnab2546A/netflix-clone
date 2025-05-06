import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category, className }) => {
  const [ApiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzhjYzM2MDc3YTZkYjNkNjM1MTYxOTVmNGJiMWExNiIsIm5iZiI6MTc0NjI5NjcxNS42NTYsInN1YiI6IjY4MTY1ZjhiMjU2YTRkMzRmMzkxMzBmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8eoOx6GoOCcG59fowdnJ5DhoW82CJaxAWaq24BakNjc",
    },
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
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, [category]);

  return (
    <div className={`title-cards ${className}`} >
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {ApiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="cards" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
              alt=""
            />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
