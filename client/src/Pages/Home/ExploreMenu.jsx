import { useGSAP } from "@gsap/react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid2,
  ThemeProvider,
  Typography,
} from "@mui/material";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../Config/axios";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExploreMenu = () => {
  const [category, setCategory] = useState("Pizzas");
  const [burgerCards, setBurgerCards] = useState([]);
  const [pizzaCards, setPizzaCards] = useState([]);
  const [drinkCards, setDrinkCards] = useState([]);
  const [chickenCards, setChickenCards] = useState([]);
  const [categoryCard, setCategoryCard] = useState([]);
  const categoryItemsContaner = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const burgers = await axiosInstance.get("/items/burgers");
      const pizzas = await axiosInstance.get("/items/pizzas");
      const drinks = await axiosInstance.get("/items/drinks");
      const chickens = await axiosInstance.get("/items/chickens");
      setBurgerCards(burgers?.data?.data?.burgers);
      setPizzaCards(pizzas?.data?.data?.pizzas);
      setDrinkCards(drinks?.data?.data?.drinks);
      setChickenCards(chickens?.data?.data?.chicken);
      setCategoryCard(pizzas?.data?.data?.pizzas);
      console.log(burgers?.data?.data);
      console.log(pizzas?.data?.data);
      console.log(drinks?.data?.data);
      console.log(chickens?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(category);
  const arr = [
    {
      id: 1,
      src: "./pizza.png",
      alt: "Pizza",
      title: "Pizzas",
    },
    {
      id: 2,
      src: "./burger.png",
      alt: "Burger",
      title: "Burgers",
    },
    {
      id: 3,
      src: "./drink.webp",
      alt: "Drink",
      title: "Drinks",
    },
    {
      id: 4,
      src: "./chicken.png",
      alt: "Chicken",
      title: "Chicken",
    },
  ];

  const handleCategory = (category, index) => {
    setCategory(category);
    setIndex(index);
    switch (category) {
      case "Pizzas":
        setCategoryCard(pizzaCards);
        break;
      case "Burgers":
        setCategoryCard(burgerCards);
        break;
      case "Drinks":
        setCategoryCard(drinkCards);
        break;
      case "Chicken":
        setCategoryCard(chickenCards);
        break;
      default:
        setCategoryCard(pizzaCards);
    }
  };
  useGSAP(() => {
    const children = gsap.utils.toArray(categoryItemsContaner.current.children);
    gsap.from(children, {
      opacity: 0,
      stagger: 0.3,
      duration: 2,
      y: 250,
      ease: "power4.out",
    });
  }, [category]);
  return (
    <div className="flex flex-col gap-6">
      <h1 className="max-sm:text-2xl sm:text-3xl md:text-4xl font-semibold  text-center text-white">
        Tasty Meals at Reasonable Prices
      </h1>
      <div className="w-full h-32 grid grid-cols-4 pl-10">
        {arr.map((item, index) => {
          return (
            <div
              className={`h-full w-10/12 flex flex-col justify-center items-center border-2 ${
                category === item.title ? "bg-orange-600" : "bg-slate-600"
              } border-slate-600`}
              key={index}
              onClick={() => handleCategory(item.title, index)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-16 h-16 color-slate-600"
              />
              <h4 className="max-sm:text-sm sm:text-sm font-semibold text-slate-300">
                {item.title}
              </h4>
            </div>
          );
        })}
      </div>
      <div
        className="w-full min-h-96  grid max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-[4%] max-sm:ml-[5%]"
        ref={categoryItemsContaner}
      >
        {categoryCard.map((item, index) => {
          return (
            <Card
              sx={{
                maxWidth: "95%",
                marginBottom: "35px",
                backgroundColor: "#374151",
                color: "white",
                border: "2px solid #374151",
              }}
              key={index}
            >
              <CardActionArea>
                <div className="w-full bg-slate-200 h-72">
                  <img src={item.image} alt="" className="w-full h-full " />
                </div>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontWeight="bold"
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    {item.description}
                  </Typography>
                  <Typography
                    variant="body3"
                    sx={{
                      color: "orangered",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    Rs. {item.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <div>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ bgcolor: "orangered" }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardActions>
              </CardActionArea>
            </Card>
          );
        })}
        ;
      </div>
    </div>
  );
};

export default ExploreMenu;