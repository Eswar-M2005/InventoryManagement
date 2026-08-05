# StockVibe - Inventory Management System (MERN Stack)

StockVibe is a production-ready, beautiful, and fully responsive **Inventory Management System** built from scratch using the **MERN (MongoDB, Express, React, Node)** stack. It offers real-time tracking of stock levels, inventory statistics, search capabilities, filtering, sorting, pagination, and a premium dashboard built with Chart.js and pure CSS.

---

## 📂 Project Structure

```
inventory-management-lite/
├── package.json               # Root config (coordinates parallel execution)
├── README.md                  # Manual and system setup instructions
├── backend/
│   ├── .env                   # Server environment variables
│   ├── server.js              # Server entry point
│   ├── package.json           # Server package settings
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── models/
│   │   └── Product.js         # Mongoose Product Schema
│   ├── controllers/
│   │   ├── productController.js # CRUD, searching, pagination logic
│   │   └── dashboardController.js # Aggregations for charts & metrics
│   ├── middleware/
│   │   ├── errorHandler.js    # Centralized JSON error formatting
│   │   └── validators.js      # Input validators (express-validator)
│   └── routes/
│       ├── productRoutes.js   # Product REST endpoints
│       └── dashboardRoutes.js # Dashboard metric endpoints
│
└── frontend/
    ├── index.html             # Document wrapper (Vite React app)
    ├── package.json           # Frontend package settings
    ├── vite.config.js         # Port configuration & dev proxies
    └── src/
        ├── main.jsx           # Mounting logic
        ├── App.jsx            # Router and notification layout wrapper
        ├── services/
        │   └── api.js         # Axios API service client
        ├── context/
        │   └── ProductContext.jsx # Context State Manager
        ├── styles/
        │   ├── variables.css  # Tailored HSL color tokens & shadows
        │   ├── index.css      # Base resets & layout grids
        │   ├── Navbar.css     # Glassmorphic header styles
        │   ├── Sidebar.css    # Sidebar navigation selectors
        │   ├── Dashboard.css  # Stats grid & chart layout styles
        │   ├── Products.css   # Tables, pagination, and search inputs
        │   ├── ProductDetails.css # SKU specification sheet styling
        │   ├── Form.css       # Forms and field error styles
        │   ├── Modal.css      # Delete confirmation overlay animations
        │   └── Loader.css     # Spinners and stock badges
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Sidebar.jsx
        │   ├── DashboardCards.jsx
        │   ├── ProductTable.jsx
        │   ├── ProductForm.jsx
        │   ├── SearchBar.jsx
        │   ├── StockBadge.jsx
        │   ├── Pagination.jsx
        │   ├── ConfirmationModal.jsx
        │   └── Loader.jsx
        └── pages/
            ├── Dashboard.jsx
            ├── ProductList.jsx
            ├── AddProduct.jsx
            ├── EditProduct.jsx
            ├── ProductDetails.jsx
            └── NotFound.jsx
```

---

## 🛠️ Installation & Setup (Run Locally)

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v16+ recommended) and a modern browser.

### Step 1: Install Dependencies
Run the installation command from the **root** folder. This will automatically install packages for the backend, frontend, and root:
```bash
npm run install-all
```

### Step 2: Environment Variables
The application comes pre-configured with a working MongoDB connection string inside the `backend/.env` file:
```env
PORT=5000
MONGO_URI=mongodb+srv://eswar:eswar@cluster0.cikpoi6.mongodb.net/inventory?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=development
```

### Step 3: Run the Application
You can launch both the backend server (on port `5000`) and the Vite React development server (on port `5173`) in parallel using a single root command:
```bash
npm run dev
```

Once running, open your browser and navigate to:
* **Frontend Application**: [http://localhost:5173/](http://localhost:5173/)
* **Backend API Base**: [http://localhost:5000/api](http://localhost:5000/api)

---

## 🍃 MongoDB Atlas Setup (Optional Cluster Customization)

If you'd like to use your own MongoDB Atlas Database instead of the default connection:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in.
2. Click **Create** to deploy a free Shared Cluster. Select your provider and region, then click **Create Cluster**.
3. Go to **Database Access** under Security:
   * Click **Add New Database User**.
   * Choose Password Authentication, enter a username and password (e.g. `eswar` and password `eswar`).
   * Grant them `Read and write to any database` role.
4. Go to **Network Access**:
   * Click **Add IP Address**.
   * Click **Allow Access from Anywhere** (IP: `0.0.0.0/0`) or enter your current IP, and click **Confirm**.
5. Go to **Database / Clusters**:
   * Click **Connect** on your cluster.
   * Choose **Drivers** under Connect to your application.
   * Copy the connection string (looks like `mongodb+srv://<username>:<password>@.../?retryWrites=true&w=majority`).
6. Paste the copied URI into `backend/.env` as `MONGO_URI`, replacing `<username>` and `<password>` with your database user credentials. Add a database name (e.g. `/inventory`) before the query parameters.

---

## 📡 API Endpoints Reference

### Dashboard Metrics
* **`GET /api/dashboard`**: Returns summary numbers (`totalProducts`, `totalStock`, `lowStockProducts`, `outOfStockProducts`), the latest 5 added products, category-wise total stock, and stock status distribution.

### Products Management
* **`GET /api/products`**: Fetch products. Supports query options:
  * `page` (number, default `1`)
  * `limit` (number, default `10`)
  * `search` (keyword matches SKU, Name, or Category)
  * `category` (exact category filter)
  * `sortBy` (field name: `name`, `price`, `quantity`, `createdAt`)
  * `sortOrder` (`asc` or `desc`)
* **`GET /api/products/search?keyword=`**: Dedicated keyword query searching name, SKU, or category.
* **`GET /api/products/low-stock`**: Returns a list of all products with `quantity < 10`.
* **`GET /api/products/:id`**: Returns details for a single product by MongoDB ID.
* **`POST /api/products`**: Creates a new product. Expects body fields validation (no negative values, unique SKU).
* **`PUT /api/products/:id`**: Updates an existing product attributes.
* **`DELETE /api/products/:id`**: Removes a product from inventory.

---

## 🎨 Design System & UX Highlights
* **HSL Color System**: The CSS variables map color tokens specifically designed to provide high-end, smooth contrast across cards and indicators.
* **Real-time Badges**: Units are visually tracked through color badges:
  * 🟢 **In Stock** (Quantity > 20)
  * 🟡 **Moderate** (Quantity 10–20)
  * 🔴 **Low Stock** (Quantity 1–9)
  * ⚪ **Out of Stock** (Quantity = 0)
* **Toast Feedback**: Every insert, update, or deletion displays animated status messages.
* **Safety Dialogs**: Accidental deletions are prevented via custom confirmation overlays.
