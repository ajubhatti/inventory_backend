const { default: mongoose } = require("mongoose");
const {
  InventoryItem,
  ElectronicsItem,
  GroceryItem,
  ClothingItem,
} = require("../models/InventoryItems");

const createItems = async (req, res) => {
  try {
    const { category } = req.body;
    const itemData = req.body;

    const validCategories = ["Electronics", "Grocery", "Clothing"];

    if (!validCategories.includes(category)) {
      return res.status(400).send("Invalid category");
    }

    let item;
    switch (category) {
      case "Electronics":
        item = new ElectronicsItem(itemData);
        break;
      case "Grocery":
        item = new GroceryItem(itemData);
        break;
      case "Clothing":
        item = new ClothingItem(itemData);
        break;
      default:
        return res.status(400).send("Invalid category");
    }

    await item.save();
    res.status(201).send({ message: "Created Successfully.", data: item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addItem = async (req, res) => {
  try {
    const item = new InventoryItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const clothItem = await ClothingItem.findById(id);
    if (!clothItem) {
      const electronicsItem = await ElectronicsItem.findById(id);
      if (!electronicsItem) {
        const groceryItem = await GroceryItem.findById(id);
        if (!groceryItem) {
          return res.status(404).json({ message: "Item not found" });
        } else {
          const updatedItem = await GroceryItem.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
          );
          return res
            .status(200)
            .json({ message: "Updated Successfully.", data: updatedItem });
        }
      } else {
        const updatedItem = await ElectronicsItem.findByIdAndUpdate(
          id,
          req.body,
          { new: true }
        );
        return res
          .status(200)
          .json({ message: "Updated Successfully.", data: updatedItem });
      }
    } else {
      const updatedItem = await ClothingItem.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res
        .status(200)
        .json({ message: "Updated Successfully.", data: updatedItem });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const clothItem = await ClothingItem.findById(id);
    if (!clothItem) {
      const electronicsItem = await ElectronicsItem.findById(id);
      if (!electronicsItem) {
        const groceryItem = await GroceryItem.findById(id);
        if (!groceryItem) {
          return res.status(404).json({ message: "Item not found" });
        } else {
          const item = await GroceryItem.findByIdAndDelete(id);
          return res.json({ message: "Item deleted" });
        }
      } else {
        const item = await ElectronicsItem.findByIdAndDelete(id);
        return res.json({ message: "Item deleted" });
      }
    } else {
      const item = await ClothingItem.findByIdAndDelete(id);
      return res.json({ message: "Item deleted" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllItems = async (req, res) => {
  try {
    const {
      category,
      price_lt,
      price_gt,
      sort_by = "id",
      sort_order = "desc",
      stock,
    } = req.query;

    const electronicsItems = await ElectronicsItem.find();
    const groceryItems = await GroceryItem.find();
    const clothingItems = await ClothingItem.find();

    let filteredData = [...electronicsItems, ...groceryItems, ...clothingItems];
    let allItems = filteredData;

    if (category) {
      filteredData = filteredData.filter((item) => item.category === category);
    }
    if (price_lt) {
      filteredData = filteredData.filter(
        (item) => item.price < Number(price_lt)
      );
    }
    if (price_gt) {
      filteredData = filteredData.filter(
        (item) => item.price > Number(price_gt)
      );
    }
    if (stock) {
      filteredData = filteredData.filter(
        (item) => item.quantity <= Number(stock)
      );
    }

    filteredData.sort((a, b) => {
      if (sort_order === "desc") {
        return b[sort_by] - a[sort_by];
      }
      return a[sort_by] - b[sort_by];
    });

    let inventoryInfo = {
      electronics: {
        total: electronicsItems.length,
        items: electronicsItems,
        totalPrice: electronicsItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      },
      grocery: {
        total: groceryItems.length,
        items: groceryItems,
        totalPrice: groceryItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      },
      clothing: {
        total: clothingItems.length,
        items: clothingItems,
        totalPrice: clothingItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      },
    };

    let totalValue = allItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    res.json({ filteredData, allItems, inventoryInfo, totalValue });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addItem,
  updateItem,
  deleteItem,
  createItems,
  getAllItems,
};
