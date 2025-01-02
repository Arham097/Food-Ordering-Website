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

exports.getItemByID = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    const error = new CustomError("ID Required for fetching an Item.", 400);
    return next(error);
  };
  const item = await Item.findById(id);
  if (!item) {
    const error = new CustomError("No Items Found with this ID", 404);
    return next(error);
  }
  res.status(200).json({
    status: "success",
    data: {
      item
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

exports.editItem = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const { itemname, description, price } = req.body;
  console.log(req.body);

  if (!id) {
    return next(new CustomError("ID Required for Editing an Item.", 400));
  }

  const item = await Item.findById(id);
  if (!item) {
    return next(new CustomError("No Items Found with this ID", 404));
  }

  let updatedData = { name: itemname, description, price };

  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `Hasan Bites/${itemname}`,
        folder: `Hasan Bites/${item.category}`,
      });
      updatedData.image = result.secure_url; // Add the image URL to the update data
    } catch (err) {
      return next(new CustomError("Failed to upload image to Cloudinary.", 500));
    }
  }

  const updatedItem = await Item.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      item: updatedItem,
    },
  });
});


exports.getBurgers = asyncErrorHandler(async (req, res, next) => {
  const burgers = await Item.find({ category: "Burgers", isDeleted: false });

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
  const pizzas = await Item.find({ category: "Pizzas", isDeleted: false });

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
  const drinks = await Item.find({ category: "Drinks", isDeleted: false });

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
  const chicken = await Item.find({ category: "Chicken", isDeleted: false });

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

exports.toggleActiveItem = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  if (!id) {
    const error = new CustomError("ID Required for Deactivation of an Item.", 400);
    return next(error);
  }
  const item = await Item.findById({ _id: id });
  if (!item) {
    const error = new CustomError("No Items Found with this ID", 404);
    return next(error);
  }
  const newActiveStatus = !item.isActive;

  const updatedItem = await Item.findByIdAndUpdate({ _id: id }, { $set: { isActive: newActiveStatus } }, {
    new: true,
  });
  return res.status(200).json({
    status: "success",
    data: {
      item: updatedItem
    }
  })
})