# 🖋️ QuillBase

**QuillBase** is a modern blogging system that enables users to publish articles, interact via comments, and manage their content seamlessly. Built using Angular for the frontend and Node.js with Express and MySQL for the backend, it supports user authentication with JWT and role-based access for a clean author experience.

## 🚀 Features

- 📝 **Create, edit, and delete posts**
- 🔐 **User authentication** using JWT
- 💬 **Comment system** with delete permissions for comment owners
- 📋 **My Posts** view for filtering user-specific posts
- 🎨 Responsive and clean UI with **Bootstrap 5**
- 📅 Sorted post & comment feeds with timestamp
- ✅ Route guards and authorization checks

## 🛠️ Tech Stack

### Frontend
- **Angular 17**
- **Bootstrap 5**
- TypeScript, RxJS, FormsModule, RouterModule

### Backend
- **Node.js + Express.js**
- **MySQL** (via `mysql2`)
- JWT-based authentication
- RESTful API structure

## ⚙️ Setup Instructions

### 📁 Clone the Repository

```bash
git clone https://github.com/yourusername/quillbase.git
cd quillbase
```

### 🧩 Install Dependencies

**Backend (/backend)**

```bash
cd backend
npm install
```

**Frontend (/frontend)**

```bash
cd frontend
npm install
```

### 🛢️ Configure the Database

1. Use MySQL Workbench or your preferred client.
2.  Run the SQL schema (provided in /data) to create tables.
3.  Set your DB credentials in /backend/db.js.

### 🔑 JWT Secret

In /backend/.env:

```env
JWT_SECRET=your_super_secret_key
```
### ▶️ Run the Application

**Backend**
```bash
cd backend
npm start
```

**Frontend**
```bash
cd frontend
ng serve
```

App will be available at: http://localhost:4200

## 📸 Screenshots

## 🧩 Folder Structure Overview

```bash
quillbase/
├── frontend/           # Angular Frontend
│   ├── src/app/
│   │   ├── components/
│   │   ├── services/
│   │   └── guards/
├── backend/           # Node + Express Backend
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── db.js
│   └── index.js
```

## 🧰 Built Using

<p>
  <img alt="Java" src="https://img.shields.io/badge/-Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white" />
  <img alt="MySQL" src="https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white" />
  <img alt="Eclipse" src="https://img.shields.io/badge/-Eclipse-2C2255?style=flat-square&logo=eclipseide&logoColor=white" />
  <img alt="Git" src="https://img.shields.io/badge/-Git-f34f29?style=flat-square&logo=git&logoColor=white" />
  <img alt="GitHub" src="https://img.shields.io/badge/-Github-24292e?style=flat-square&logo=github&logoColor=white" />
</p>

## ✍️ Authors

*Initial work* – [grandeurkoe](https://github.com/grandeurkoe)
