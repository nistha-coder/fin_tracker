🚀 FinTrack — Modern Personal Finance Tracker
FinTrack is a comprehensive finance management web app designed to help you track income, expenses, and analyze your financial habits securely and efficiently. Built with the MERN stack for a smooth user experience and robust backend.


🌟 Key Features
User Authentication & Security
Secure signup and login with JWT tokens

User-specific encrypted data storage

Dynamic Dashboard
Real-time statistics on income, expenses, and savings

Category-wise and trend-wise financial analysis

Transaction Management
Add, update, view, and delete income/expense transactions

Filter transactions by category, date, and type

Category Organization
Manage customizable categories to organize your finances

Categories linked uniquely to user accounts

Responsive UI
Mobile-friendly interface built with React and Tailwind CSS

Seamless experience across all devices

RESTful Backend API
Secure Node.js + Express backend with MongoDB database

Endpoints for authentication, transactions, categories, and dashboard data

Cloud Hosting
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
Create a .env file inside /server with:

text
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
PORT=5001
Start backend server:

bash
npm start
# Default URL: http://localhost:5001
3. Frontend Setup
bash
cd ../client
npm install
(Optional) Create .env in client with:

text
REACT_APP_API_URL=http://localhost:5001/api
Start frontend:

bash
npm start
# Default URL: http://localhost:3000
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

