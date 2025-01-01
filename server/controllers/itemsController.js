const Item = require("../models/itemsModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");



exports.getAllItems = asyncErrorHandler(async (req, res, next) => {
  const items = await Item.find();

  if (!items) {
    const err = new CustomError("No items found!");
    return next(err);
  }

  res.status(200).json({
    status: "success",
    data: {
      items
    }
  })
})

exports.getSortedItems = asyncErrorHandler(async (req, res, next) => {
  const customOrders = ['Burgers', 'Pizzas', 'Chicken', 'Drinks'];
  const items = await Item.aggregate([
    {
      $addFields: {
        customSortOrder: {
          $indexOfArray: [customOrders, '$category'],
        },
      },
    },
    {
      $sort: {
        customSortOrder: 1
      },
    },
    {
      $project: {
        customSortOrder: 0,
      },
    }
  ]);

  if (!items) {
    const error = new CustomError("No Items found", 404);
    return next(error);
  };
  res.status(200).json({
    status: 'success',
    data: {
      items
    }
  })
})

exports.getBurgers = asyncErrorHandler(async (req, res, next) => {
  const burgers = await Item.find({ category: "Burgers" });

  if (!burgers) {
    const err = new CustomError("No burger items found!");
    return next(err);
  };
  res.status(200).json({
    status: "success",
    data: {
      burgers
    }
  })
})

exports.getPizzas = asyncErrorHandler(async (req, res, next) => {
  const pizzas = await Item.find({ category: "Pizzas" });

  if (!pizzas) {
    const err = new CustomError("No pizza items found!");
    return next(err);
  };
  res.status(200).json({
    status: "success",
    data: {
      pizzas
    }
  })
});

exports.getDrinks = asyncErrorHandler(async (req, res, next) => {
  const drinks = await Item.find({ category: "Drinks" });

  if (!drinks) {
    const err = new CustomError("No drink Items found!");
    return next(err);
  };
  res.status(200).json({
    status: "success",
    data: {
      drinks
    }
  })
});

exports.getChickens = asyncErrorHandler(async (req, res, next) => {
  const chicken = await Item.find({ category: "Chicken" });

  if (!chicken) {
    const err = new CustomError("No chicken Items found!");
    return next(err);
  };
  res.status(200).json({
    status: "success",
    data: {
      chicken
    }
  })
}
)

