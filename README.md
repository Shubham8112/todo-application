# Full Stack Todo Application

## Project Overview

This is a Full Stack Todo Application built using **React**, **Node.js**, and **Express.js**. The application allows users to create, view, update, and delete todos. It also includes a dedicated Todo Details page that displays information about a selected todo using a query parameter.

---

## Technologies Used

### Frontend

* React
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* CORS
* File System (JSON)

---

## Features

### Frontend

* Display all todos
* Add new todo
* Edit existing todo
* Delete todo
* Todo Details page
* React Router navigation
* Axios API integration

### Backend

* REST API using Express.js
* CRUD Operations
* JSON file storage
* MVC Folder Structure

---

## API Endpoints

| Method | Endpoint   | Description       |
| ------ | ---------- | ----------------- |
| GET    | /todos     | Get all todos     |
| GET    | /todos/:id | Get a single todo |
| POST   | /todos     | Create a new todo |
| PUT    | /todos/:id | Update a todo     |
| DELETE | /todos/:id | Delete a todo     |

---

## Folder Structure

```
Todo_Project
│
├── backend
│   ├── controllers
│   ├── data
│   ├── models
│   ├── routes
│   └── app.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── README.md
└── FEATURES.md
```

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Future Improvements

* Search Todos
* Filter Todos
* Dark Mode
* Due Date
* Priority Levels
* Authentication

---

## Author

**Shubham Pandey**
