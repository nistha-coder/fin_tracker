#🚀 FinTrack — Modern Personal Finance Tracker

FinTrack is a comprehensive finance management web app designed to help you track income, expenses, and analyze your financial habits securely and efficiently. Built with the MERN stack for a smooth user experience and robust backend.


🌟 Key Features

1.User Authentication & Security

2.Secure signup and login with JWT tokens

3.User-specific encrypted data storage

4.Dynamic Dashboard
Real-time statistics on income, expenses, and savings

5.Category-wise and trend-wise financial analysis

6.Transaction Management
Add, update, view, and delete income/expense transactions

7.Filter transactions by category, date, and type

8.Category Organization
Manage customizable categories to organize your finances

9.Categories linked uniquely to user accounts

10.Responsive UI
Mobile-friendly interface built with React and Tailwind CSS

11.Seamless experience across all devices

12.RESTful Backend API
Secure Node.js + Express backend with MongoDB database

13.Endpoints for authentication, transactions, categories, and dashboard data

14.Cloud Hosting

Frontend deployed on Netlify

Backend API hosted on Render

Database powered by MongoDB Atlas


🛠️ Technology Stack

Layer           |  Technologies Used    

----------------+---------------------------------------
Frontend        |  React, Axios, Tailwind CSS, Netlify  
Backend         |  Node.js, Express.js, JWT             
Database        |  MongoDB Atlas with Mongoose          
Deployment      |  Netlify (frontend), Render (backend) 
Authentication  |  JWT tokens, bcrypt (password hashing)


💻 Getting Started — Local Development

1. Clone Repository
bash
git clone https://github.com/nistha-coder/fin_tracker.git
cd fin_tracker

2. Backend Setup
bash
cd server
npm install

3.Create a .env file inside /server with:
text
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
PORT=5001

4.Start backend server:
bash
npm start
Default URL: http://localhost:5001

5. Frontend Setup
bash
cd ../client
npm install

6.(Optional) Create .env in client with:
text
REACT_APP_API_URL=http://localhost:5001/api

7.Start frontend:
bash
npm start
Default URL: http://localhost:3000


🌱 Initial Data — Seed Default Categories
To use the categories feature, create initial categories via API or directly in MongoDB Atlas:

bash
# Example: Add expense category "Food"
curl -X POST https://YOUR_BACKEND_URL/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Food","type":"expense"}'

# Add income category "Salary"
curl -X POST https://YOUR_BACKEND_URL/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Salary","type":"income"}'

  
🗂️ Project Structure

text
fin_tracker/
│
├── client/               # React frontend app
│   ├── src/
│   │   ├── pages/        # All pages
│   │   ├── components/   # Shared components
│   │   └── api/          # API calls using Axios
│   └── public/           # Static files
│
└── server/               # Express backend API
    ├── routes/           # Express routers
    ├── controllers/      # API logic
    ├── models/           # Mongoose database schemas
    ├── config/           # Database and app config
    └── server.js         # Main server entry point


    
🔒 Security & Environment

Passwords hashed securely with bcrypt

JSON Web Tokens (JWT) used for authentication and session protection

Sensitive configs managed via .env files


🌍 Live Deployment

Frontend (Netlify): https://fintract-3.netlify.app

Backend API (Render): https://fin-tracker-2-odkq.onrender.com


🤝 Contributing

We welcome contributions!

Open an Issue for bugs or feature requests

Submit Pull Requests for improvements or fixes


📜 License
This project is open source under the MIT License.


👤 Author
Developed by Nistha Coder
If you find FinTrack useful, please star ⭐ the repository or share feedback.

