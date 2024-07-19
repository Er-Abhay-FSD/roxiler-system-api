# Roxiler System MERN Stack Coding Challenge API

## 📚 Overview

Welcome to the Roxiler System MERN Stack Coding Challenge API documentation! This API provides endpoints for managing transactions, retrieving statistics, and generating charts in the Roxiler system.

## 🚀 Getting Started

These instructions will help you set up and run the project locally.

### Prerequisites

- **Node.js** (v14 or later)
- **MongoDB** (Ensure you have a running MongoDB instance)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Er-Abhay-FSD/roxiler-system-api.git
   cd roxiler-system-api
   ```
2. **Install dependencies**

```bash
npm install
```

 3. **Set up environment variables**

Create a .env file in the root directory and add your MongoDB connection string:

```bash
MONGODB_URI=mongodb://localhost:27017/roxiler
PORT=3000
```
4. **Run the application**

```bash
npm start
```
The server will start on port 3000 (or the port defined in your .env file).

# 🛠️ API Endpoints
## Base URL
The base URL for all endpoints is:

```bash
http://localhost:3000/api
Transaction Management
GET /transactions
```

## Retrieve a list of transactions.

Query Parameters:

startYear (YYYY)
startMonth (MM)
endYear (YYYY)
endMonth (MM)
Responses:

200 OK: Returns a list of transactions.
400 Bad Request: Missing or invalid query parameters.
500 Internal Server Error: If an error occurs.
Statistics
Bar Chart Data
GET /charts/barchart

Retrieve data for the bar chart.

Query Parameters:

startYear (YYYY)
startMonth (MM)
endYear (YYYY)
endMonth (MM)
Responses:

200 OK: Returns data for the bar chart.
400 Bad Request: Missing or invalid query parameters.
500 Internal Server Error: If an error occurs.
Pie Chart Data
GET /charts/piechart

Retrieve data for the pie chart.

Query Parameters:

startYear (YYYY)
startMonth (MM)
endYear (YYYY)
endMonth (MM)
Responses:

200 OK: Returns data for the pie chart.
400 Bad Request: Missing or invalid query parameters.
500 Internal Server Error: If an error occurs.

# 🧩 Example Requests
Bar Chart Data
Request:
