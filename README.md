# ReelBits => (Short-Video Food Discovery & Engagement Platform)

A modern **content-driven full-stack platform** built using **Node.js, Express, MongoDB, and React**, designed to transform food discovery through **short-form video reels uploaded by restaurants**, combined with **interactive user engagement (likes, saves, profiles)**.

This project demonstrates how real-world systems integrate **media handling (CDN), role-based architecture, and modern frontend UX patterns** to simulate a **reel-based content ecosystem similar to Instagram Reels or YouTube Shorts**.

---

## Overview =>

ReelBits is a full-stack system that simulates a **short-video content platform for food discovery**, where:

* Food partners (restaurants) act as **content creators**
* Users act as **consumers and engagers**
* The platform serves as a **reel-based discovery engine**

It leverages :-

* **ImageKit (CDN)** for scalable video storage and delivery
* **MongoDB (Mongoose)** for storing users, food content, and engagement data
* **JWT Authentication (Cookies-based)** for secure access control
* **Multer** for handling video uploads
* **Express.js** for REST API architecture
* **React.js** for dynamic, component-based frontend
* **Intersection Observer API** for reel autoplay experience

It solves a key problem in modern food platforms :-

> *Providing engaging, real-time food discovery through video instead of static images and menus*

ReelBits ensures that **users experience food visually and interactively, increasing engagement and discovery efficiency**.

---

## Features =>

* Role-based system (User & Food Partner)
* Secure JWT-based authentication (cookies)
* Food partner video upload system (Reels)
* CDN-based video storage (ImageKit)
* Scrollable reel feed with autoplay
* Like / Unlike system with toggle logic
* Save / Unsave functionality
* Saved content dashboard
* Food partner profile with uploaded videos
* Viewport-based smart video playback
* Modular MVC backend architecture
* Feature-based scalable frontend architecture

---

## Project Architecture =>

```
Client (React Frontend)
        ↓
User Interaction (Scroll / Like / Save / Upload)
        ↓
HTTP Requests (Auth / Food APIs)
        ↓
Express Server
        ↓
Routes → Controllers
        ↓
Authentication Middleware (JWT Verification)
        ↓
File Upload Middleware (Multer)
        ↓
Business Logic:
   - Video Upload Handling
   - Engagement Logic (Like / Save)
        ↓
Storage Service Layer:
   - Upload to CDN (ImageKit)
        ↓
Database Layer (MongoDB via Mongoose)
        ↓
Models:
   - User
   - Food Partner
   - Food (Video + Metadata)
   - Like
   - Save
        ↓
Response (JSON with Video URLs)
        ↓
Frontend Rendering (ReelFeed with Autoplay)
```

---

## Tech Stack =>

| Technology     | Purpose                   |
| -------------- | ------------------------- |
| Node.js        | Runtime environment       |
| Express.js     | Backend framework         |
| MongoDB        | Database                  |
| Mongoose       | ODM                       |
| React.js       | Frontend UI               |
| React Router   | Client-side routing       |
| Axios          | API communication         |
| ImageKit       | CDN for video storage     |
| Multer         | File upload handling      |
| JSON Web Token | Authentication            |
| bcryptjs       | Password hashing          |
| cookie-parser  | Cookie management         |
| dotenv         | Environment configuration |

---

## Installation & Setup =>

```bash
# Clone the repository
git clone https://github.com/Akshay-Deshmane/ReelBits.git

# Navigate to project
cd ReelBits
```

---

### Setup Environment Variables =>

Create a `.env` file inside Backend:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_url
```

---

### Run Backend =>

```bash
cd Backend
npm install
npm run dev
```

Server runs on:

```
http://localhost:3000
```

---

### Run Frontend =>

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Workflow Of ReelBits =>

### 1. User Registration :-

* User provides credentials
* Password hashed using bcrypt
* Stored in MongoDB

---

### 2. User Login :-

* JWT token generated
* Stored in cookies
* Used for protected routes

---

### 3. Food Partner Registration :-

* Registers with additional details:

  * Name, Phone, Address
* JWT generated with expiry

---

### 4. Video Upload Pipeline :-

* Food partner uploads video
* Multer processes file (buffer)
* File sent to ImageKit CDN
* ImageKit returns URL
* URL stored in MongoDB

---

### 5. Reel Feed Rendering :-

* User fetches food items
* Videos displayed in feed
* Intersection Observer controls autoplay

---

### 6. Engagement System :-

* Like:

  * Toggle logic (like/unlike)
  * Updates `likeCount` using `$inc`

* Save:

  * Toggle logic (save/unsave)
  * Updates `savesCount`

---

### 7. Profile System :-

* Fetch food partner by ID
* Retrieve all uploaded reels
* Combine data in response

---

### 8. Protected Routes :-

```js
Cookie: token=JWT
```

* Middleware verifies token
* Grants access based on role

---

## API Endpoints =>

### Auth Routes

| Method | Endpoint               | Description           |
| ------ | ---------------------- | --------------------- |
| POST   | /user/register         | Register user         |
| POST   | /user/login            | Login user            |
| GET    | /user/logout           | Logout user           |
| POST   | /food-partner/register | Register food partner |
| POST   | /food-partner/login    | Login food partner    |

---

### Food Routes (Protected)

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| POST   | /api/food      | Upload reel     |
| GET    | /api/food      | Get feed        |
| POST   | /api/food/like | Like / Unlike   |
| POST   | /api/food/save | Save / Unsave   |
| GET    | /api/food/save | Get saved items |

---

## Key Engineering Concepts =>

### 1. Media Handling Architecture :-

* Videos stored in CDN (ImageKit)
* Database stores only URLs
* Improves scalability and performance

---

### 2. Reel Playback Engine :-

* Uses Intersection Observer
* Plays video when 60% visible
* Pauses others automatically

---

### 3. Role-Based System Design :-

* User → Consumer
* Food Partner → Content Creator
* Separate authentication flows

---

### 4. Engagement Optimization :-

* Like & Save use toggle logic
* Efficient updates using `$inc`
* Avoids expensive recalculations

---

### 5. Modular Backend Architecture :-

* Routes → Controllers → Services → Models
* Clean separation of concerns

---

### 6. Frontend UX Engineering :-

* Mobile-first reel UI
* Bottom navigation system
* Real-time interaction handling

---

## Project Structure =>

```
ReelBits/
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   ├── db/
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── food-partner/
│   │   │   └── general/
│   │   ├── routes/
│   │   └── styles/
│
└── README.md
```

---

## Example Usage =>

```
POST /api/food

FormData:
  name: "Cheese Burst Pizza"
  description: "Loaded with cheese"
  video: (file)

Response:
{
  "message": "food created successfully",
  "food": {
    "video": "https://cdn.imagekit.io/xyz/video.mp4"
  }
}
```

---

## Limitations Of ReelBits =>

* No pagination in feed (currently loads all data)
* No comment system implemented
* No rate limiting on APIs
* No frontend route protection
* Limited validation handling

---

## Future Enhancements / Future Scope =>

* Infinite scrolling feed
* Comment system with threads
* Real-time notifications
* AI-based food recommendations
* Role-Based Access Control (RBAC)
* Rate limiting & API security improvements
* Video compression & streaming optimization
* Cloud deployment (AWS / GCP)
* Mobile app version

---