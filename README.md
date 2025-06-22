# ✒️ QuillBase

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
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=quillbase
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
│   │   ├── auth/
│   │   ├── components/
│   │   ├── guards/
│   │   ├── interceptor/
│   │   └── services/
├── backend/           # Node + Express Backend
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── .env
│   ├── db.js
│   ├── server.js
```

## 🧰 Built Using

<p>
  <img alt="html5" src="https://img.shields.io/badge/-HTML5-e34f26?style=flat-square&logo=html5&logoColor=white" />
  <img alt="CSS3" src="https://img.shields.io/badge/-CSS3-264de4?style=flat-square&logo=css3&logoColor=white" />
  <img alt="Bootstrap" src="https://img.shields.io/badge/-Bootstrap-59287a?style=flat-square&logo=bootstrap&logoColor=white" />
  <img alt="Angular" src="https://img.shields.io/badge/Angular-DD0031?style=flat-square&logo=angular&logoColor=white" />
  <img alt="Node.JS" src="https://img.shields.io/badge/node.js-339933?style=flat-square&logo=Node.js&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/express.js-000000?style=flat-square&logo=express&logoColor=white" />
  <img alt="Postman" src="https://img.shields.io/badge/-Postman-fb7505?style=flat-square&logo=postman&logoColor=white" />
  <img alt="Visual Studio Code" src="https://img.shields.io/badge/-Visual%20Studio%20Code-0078d7?style=flat-square&logo=visualstudiocode&logoColor=white" />
  <img alt="git" src="https://img.shields.io/badge/-Git-f34f29?style=flat-square&logo=git&logoColor=white" />
  <img alt="Github" src="https://img.shields.io/badge/-Github-14232c?style=flat-square&logo=github&logoColor=white" />
</p>

## ✍️ Authors

*Initial work* – [grandeurkoe](https://github.com/grandeurkoe)
