# 🎥 MyTube - A Full-Stack YouTube Clone

Welcome to **MyTube**, a full-stack YouTube clone built with modern web technologies. It lets users upload, like, and organize videos in playlists, manage their profile, and explore content across multiple pages.

## 🚀 Features

- 🔐 **JWT Authentication**
  - User login & signup functionality
  - Protected routes using tokens
- 🏠 **Home Page**
  - Display all public videos
  - Explore what others are watching

<!-- Insert Home page screenshot here -->
![Home Page](./screenshots/home.png)

- 👤 **Dashboard**
  - View and manage user’s channel info
  - Displays stats and uploaded videos

<!-- Insert Dashboard screenshot here -->
![Dashboard](./screenshots/dashboard.png)

- 🎞️ **Playlists**
  - Create custom playlists
  - Add/remove videos
  - Drag and drop videos to reorder

<!-- Insert Playlist screenshot here -->
![Playlists](./screenshots/playlists.png)

- ❤️ **Liked Videos**
  - Automatically stores videos the user likes
  - Only visible to the user

<!-- Insert Liked Videos screenshot here -->
![Liked Videos](./screenshots/liked.png)

- 🐦 **Tweets Page**
  - A creative section to allow YouTube-like social posts
  - Display user tweets or short video updates

<!-- Insert Tweets Page screenshot here -->
![Tweets](./screenshots/tweets.png)

## 🧰 Tech Stack

### Frontend

- React
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- Multer (for uploads)
- JSON Web Tokens (JWT)
- Cloudinary

## 🔐 Authentication

- JWT stored in localStorage for session persistence
- Login/Signup pages validate and securely authenticate users

<!-- Insert Login/Signup screenshots here -->
![Login](./screenshots/login.png)
![Signup](./screenshots/signup.png)

## 🗂️ Folder Structure (Client)

