# CareerGenie Web App 🧞‍♂️

CareerGenie is a full-stack platform designed to bridge the gap between students looking for opportunities and recruiters searching for the perfect candidates. With features like job posting, application tracking, and an intelligent candidate matching system, CareerGenie streamlines the hiring process.

## 🚀 Features

### For Students
- **Browse & Apply for Jobs**: View available opportunities and apply seamlessly.
- **Track Applications**: Check the status of submitted applications.
- **Profile Management**: Build and maintain an updated profile showcasing skills and resumes.
- **Notifications**: Receive updates on application status and new job postings.

### For Recruiters
- **Job Postings**: Create, edit, and manage job listings.
- **Candidate Panel**: View applicants for each job role.
- **Match Scoring**: Quickly identify top candidates using the built-in skill matching percentage.
- **Direct Contact**: Contact promising candidates directly via email with one click.

### Admin Panel
- Comprehensive dashboard to oversee users, jobs, and platform activity.

---

## 🛠️ Tech Stack

**Frontend:**
- [React](https://reactjs.org/) (with [Vite](https://vitejs.dev/))
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [React Router](https://reactrouter.com/) for navigation

**Backend:**
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) for the database
- [JSON Web Tokens (JWT)](https://jwt.io/) & [Bcrypt](https://www.npmjs.com/package/bcrypt) for secure authentication
- [Jest](https://jestjs.io/) & [Supertest](https://www.npmjs.com/package/supertest) for backend testing

---

## 💻 Getting Started (Local Development)

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or a cluster via MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/apeksha-05/career_genie.git
cd career_genie
```

### 2. Backend Setup
Navigate to the `backend` folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the following variables:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/careergenie
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server:
```bash
npm start 
# Or use `node server.js`
```

### 3. Frontend Setup
Open a new terminal window, navigate to the `frontend` folder and install dependencies:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application will be running at `http://localhost:5173`.

---

## 🧪 Testing

The backend includes a suite of automated unit and integration tests.
To run the tests:
```bash
cd backend
npm test
```

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! 
Feel free to check out the [issues page](https://github.com/apeksha-05/career_genie/issues) if you want to contribute.

## 📝 License
This project is open-source and available under the [ISC License](LICENSE).
