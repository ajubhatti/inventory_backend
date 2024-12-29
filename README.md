# **README.md for Inventory Backend Project**

## **Features**

- **CRUD Operations**: Create, Read, Update, and Delete inventory items.
- **Category Management**: Supports multiple categories with specific attributes.
- **Data Validation**: Ensures that all required fields are provided and valid.
- **Sorting and Filtering**: Allows users to filter items based on price, stock, and category.
- **Database Connection**: Connects to MongoDB using Mongoose.

## **Technologies Used**

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing inventory data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
- **Nodemon**: Development tool for automatically restarting the server during development.

## **Installation**

Clone the repository:

```bash
git clone https://github.com/ajubhatti/inventory_backend.git
cd inventory_backend
```

Installation

```bash
npm install
```

Start the server

```bash
npm run dev
```

## API Details

### Add Item

- Endpoint: /api/inventory/create
- Method: POST,
- Description: Creates an item based on its category (Electronics, Grocery, Clothing).
- Request Body :

```javascript
{
  "id": "string",
  "name": "string",
  "quantity": number,
  "price": number,
  "category": "string",
  "warrantyPeriod": number, // for Electronics
  "expiryDate": "date", // for Grocery
  "size": "string", // for Clothing
  "material": "string" // for Clothing
}
```

### Update Item

- Endpoint: /api/inventory/:id
- Method: POST,
- Description: Updates an existing item by its ID.
- Request Body : Same as Add Item.

### Delete Item

- Endpoint: /api/inventory/:id
- Method: DELETE,
- Description: Deletes an item from the inventory by its ID.
- Request Body :

```javascript
{
  "id": "string",
  "name": "string",
  "quantity": number,
  "price": number,
  "category": "string"
}
```

### Get All Items

- Endpoint: /api/inventory,
- Method: GET,
- Description: Retrieves all items in the inventory with optional filtering.
- Query Parameters :
  - **category** : Filter by item category.
  - **price_lt** : Filter items with price less than the specified value.
  - **price_gt** : Filter items with price greater than the specified value.
  - **sort_by** : Sort items by a specified field (default is "id").
  - **sort_order** : Sort order (asc or desc, default is "desc").
  - **stock** : Filter items based on quantity in stock.
