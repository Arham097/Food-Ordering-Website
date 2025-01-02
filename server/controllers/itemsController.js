const Item = require("../models/itemsModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const cloudinary = require('../utils/cloudinary');



exports.getAllItems = asyncErrorHandler(async (req, res, next) => {
  const items = await Item.find({ isDeleted: false, isActive: true });

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
    },
    {
      $match: {
        isDeleted: false,
        isActive: true,
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
  const burgers = await Item.find({ category: "Burgers", isDeleted: false, isActive: true });

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
  const pizzas = await Item.find({ category: "Pizzas", isDeleted: false, isActive: true });

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
  const drinks = await Item.find({ category: "Drinks", isDeleted: false, isActive: true });

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
  const chicken = await Item.find({ category: "Chicken", isDeleted: false, isActive: true });

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

exports.addItem = asyncErrorHandler(async (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  const { itemname, description, price, category } = req.body;

  const result = await cloudinary.uploader.upload(req.file.path, {
    public_id: `Hasan Bites/${itemname}`,
    folder: `Hasan Bites/${category}`,
  })

  const image = result.secure_url;

  const item = await Item.create({ image, price, name: itemname, description, category });

  res.status(201).json({
    status: "success",
    data: {
      item
    }
  })

});

exports.deleteItem = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  if (!id) {
    const error = new CustomError("ID Required for Deletion of an Item.", 400);
    return next(error);
  }
  const item = await Item.findByIdAndUpdate({ _id: id }, { isDeleted: true });
  if (!item) {
    const error = new CustomError("No Items Found with this ID", 404);
    return next(error);
  }

  return res.status(204).json({
    status: "success",
    data: null
  })
})

exports.inActiveItem = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  if (!id) {
    const error = new CustomError("ID Required for Deactivation of an Item.", 400);
    return next(error);
  }
  const item = await Item.findByIdAndUpdate({ _id: id }, { isActive: false }, { new: true });
  if (!item) {
    const error = new CustomError("No Items Found with this ID", 404);
    return next(error);
  }
  return res.status(200).json({
    status: "success",
    data: {
      item
    }
  })
})