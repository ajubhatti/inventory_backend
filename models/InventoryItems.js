const mongoose = require("mongoose");

const inventoryItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
});

const ElectronicsItemSchema = inventoryItemSchema.clone();
ElectronicsItemSchema.add({ warrantyPeriod: { type: Number, required: true } });

const GroceryItemSchema = inventoryItemSchema.clone();
GroceryItemSchema.add({ expiryDate: { type: Date, required: true } });

const ClothingItemSchema = inventoryItemSchema.clone();
ClothingItemSchema.add({
  size: { type: String, required: true },
  material: { type: String, required: true },
});

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);
const ElectronicsItem = mongoose.model("ElectronicItem", ElectronicsItemSchema);
const GroceryItem = mongoose.model("GroceryItem", GroceryItemSchema);
const ClothingItem = mongoose.model("ClothingItem", ClothingItemSchema);

module.exports = { InventoryItem, ElectronicsItem, GroceryItem, ClothingItem };
