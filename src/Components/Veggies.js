import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Veggies = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    try {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`,
        {
          headers: {
            Authorization: "REACT_APP_API_KEY",
          },
        }
      );

      if (!api.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await api.json();
      setPopular(data.recipes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Wrapper>
        <h2>Top Trending</h2>
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {popular.map((recipe, index) => (
            <SplideSlide key={index}>
              <Card>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
                <Grad />
              </Card>
            </SplideSlide>
          ))}
        </Splide>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 2rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  height: 200px;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    transform: translate(-50%, 0%);
    bottom: 0%;
    width: 100%;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Grad = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Veggies;
