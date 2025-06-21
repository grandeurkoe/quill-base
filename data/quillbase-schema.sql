CREATE DATABASE quillbase;

USE quillbase;

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
	id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
	id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    author VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

INSERT INTO posts (title, content, author, created_at) VALUES
('Mastering Angular Services', 'Learn how to create and use Angular services to share data and logic across components efficiently.', 'Emily', '2025-06-01 10:23:00'),
('Express.js Routing Fundamentals', 'Express.js provides a powerful way to define routes and middleware for handling web requests.', 'John', '2025-06-02 11:15:00'),
('Top 5 Bootstrap Components You Should Know', 'Explore powerful Bootstrap components like cards, modals, alerts, and more for building beautiful UIs.', 'Sophia', '2025-06-03 09:45:00'),
('Angular Lifecycle Hooks Explained', 'Angular components go through several lifecycle phases. Learn what ngOnInit, ngAfterViewInit, and others do.', 'Liam', '2025-06-04 12:10:00'),
('Securing Node.js APIs with JWT', 'JSON Web Tokens (JWT) are a common method for handling secure token-based authentication in APIs.', 'Vishal', '2025-06-05 14:00:00'),
('Migrating from AngularJS to Angular', 'A step-by-step guide to modernizing legacy AngularJS applications using the latest Angular features.', 'Ella', '2025-06-17 10:00:00');
