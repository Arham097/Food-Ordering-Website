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
import React, { useRef, useState } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExploreMenu = () => {
  const [category, setCategory] = useState("Pizzas");

  const [index, setIndex] = useState(0);

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
  const burgerCards = [
    {
      image: "./Burgers/burger1.jpg",
      price: "$8.99",
      name: "Classic Burger",
      description:
        "A classic beef burger with lettuce, tomato, and cheese, served with fries.",
    },
    {
      image: "./Burgers/burger2.webp",
      price: "$9.99",
      name: "Cheese Burger",
      description:
        "Juicy beef patty topped with melted cheddar cheese, pickles, and onions.",
    },
    {
      image: "./Burgers/burger3.avif",
      price: "$8.49",
      name: "Chicken Burger",
      description:
        "Grilled chicken breast with lettuce, tomato, and mayo on a toasted bun.",
    },
    {
      image: "./Burgers/burger4.webp",
      price: "$7.99",
      name: "Veggie Burger",
      description:
        "A delicious meat-free patty with fresh vegetables and vegan mayo.",
    },
    {
      image: "./Burgers/burger5.webp",
      price: "$9.49",
      name: "Spicy Jalapeño Burger",
      description:
        "A spicy kick with jalapeños, pepper jack cheese, and chipotle mayo.",
    },
  ];
  const pizzaCards = [
    {
      image: "./Pizzas/fajita.jpg",
      price: "$11.99",
      name: "Fajita Pizza",
      description:
        "A spicy twist with Mexican flavors, topped with grilled fajita chicken or beef, bell peppers, onions, and jalapeños.",
    },
    {
      image: "./Pizzas/pepperoni.jpg",
      price: "$10.99",
      name: "Pepperoni Pizza",
      description:
        "A classic pizza with thin slices of spicy pepperoni, mozzarella cheese, and a rich tomato sauce.",
    },
    {
      image: "./Pizzas/phantom.webp",
      price: "$13.49",
      name: "Phantom Pizza",
      description:
        "A unique specialty pizza with mushrooms, olives, chicken, and a bold, savory sauce.",
    },
    {
      image: "./Pizzas/bbq.jpg",
      price: "$12.49",
      name: "BBQ Pizza",
      description:
        "Sweet and smoky barbecue sauce with grilled chicken or beef, red onions, and mozzarella cheese.",
    },
    // {
    //   image: "./Pizzas/malai-boti.jpg",
    //   price: "$12.99",
    //   name: "Malai Boti Pizza",
    //   description:
    //     "A Pakistani-inspired pizza with creamy malai boti chicken, onions, green peppers, and mozzarella cheese.",
    // },
  ];
  const drinkCards = [
    {
      image: "./Drinks/cola-next.webp",
      price: "$1.49",
      name: "Cola Next",
      description:
        "A refreshing cola drink with a bold, crisp flavor, perfect for quenching your thirst.",
    },
    {
      image: "./Drinks/pakola.webp",
      price: "$1.29",
      name: "Pakola",
      description:
        "A unique, creamy soda with a rich flavor, an iconic taste of Pakistan for generations.",
    },
    {
      image: "./Drinks/buzz-up.webp",
      price: "$1.39",
      name: "Buzz Up",
      description:
        "A lemon-lime flavored soda that offers a tangy, refreshing kick, ideal for hot days.",
    },
    {
      image: "./Drinks/pakola-mineral-water.webp", // Update with the correct image path
      price: "$1.19", // Set a new price for mineral water
      name: "Pakola Mineral Water",
      description:
        "Pure and refreshing mineral water, perfect for hydration anytime, anywhere.",
    },
  ];
  const chickenCards = [
    {
      image: "./Chicken/single-chicken-piece.jpg", // Path to the image for a single chicken
      price: "$5.99", // Price for a single chicken
      name: "Single Chicken",
      description:
        "A delicious, juicy single piece of fried chicken, seasoned to perfection.",
    },
    {
      image: "./Chicken/double-chicken-pieces.jpg", // Path to the image for double chicken
      price: "$10.99", // Price for double chicken
      name: "Double Chicken",
      description:
        "Two pieces of our crispy fried chicken, perfect for a satisfying meal.",
    },
    {
      image: "./Chicken/three-chicken-pieces.jpg", // Path to the image for three pieces of chicken
      price: "$14.99", // Price for three pieces of chicken
      name: "Three-Piece Chicken",
      description:
        "Three pieces of our tender fried chicken, served with your choice of sides.",
    },
    {
      image: "./Chicken/bucket-chicken.avif", // Path to the image for a bucket of chicken
      price: "$24.99", // Price for a bucket of chicken
      name: "Bucket of Chicken",
      description:
        "A bucket filled with our delicious fried chicken, perfect for sharing with family and friends.",
    },
  ];

  const [categoryCard, setCategoryCard] = useState(pizzaCards);
  const categoryContainer = useRef(null);
  const categoryItemsContaner = useRef(null);

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
    const children = gsap.utils.toArray(categoryContainer.current.children);
    gsap.from(children, {
      opacity: 0,
      stagger: 0.3,
      duration: 2,
      y: 250,
      ease: "power4.out",
      scrollTrigger: {
        trigger: categoryContainer.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
        markers: true,
      },
    });
  }, []);
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
      <div
        className="w-full h-32 grid grid-cols-4 pl-10"
        ref={categoryContainer}
      >
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
        {categoryCard.map((burger, index) => {
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
                  <img src={burger.image} alt="" className="w-full h-full " />
                </div>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontWeight="bold"
                  >
                    {burger.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    {burger.description}
                  </Typography>
                  <Typography
                    variant="body3"
                    sx={{
                      color: "orangered",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    {burger.price}
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
