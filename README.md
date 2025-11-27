



  
##  Tech Stack — EmployeeTaskForge

###  Frontend

- React.js (SPA Frontend)
- Tailwind CSS (Utility-first UI styling)
- DaisyUI (Component styling + Theme support)
- Axios (API communication)
- LocalStorage for JWT session handling

 ###  Backend

- Node.js
- Express.js (RESTful API)
- MongoDB Atlas (Cloud Database)
- Mongoose ODM (Schema & validation)
- JSON Web Tokens (JWT) (Authentication middleware)
- dotenv for environment config
- CORS support for frontend-backend communication



##  Deployed Versions

- 🔗 **Frontend Live**: [https://employee-task-forge.netlify.app/](https://employee-task-forge.netlify.app/)  
- 🔗 **Backend API**: [https://employeetaskforgeapi.onrender.com](https://employeetaskforgeapi.onrender.com)

---

###  Development Tools & Libraries

- Visual Studio Code
- npm for package management
- Postman for API testing
- Chrome DevTools
- Git & GitHub for version control
- Nodemon (development server auto-reload)
- Deployment
- **[Render](https://render.com/)** → Backend API hosting
- **[Netlify](https://app.netlify.com/)**  → Frontend hosting
- MongoDB Atlas → Database cloud hosting

###  Features Delivered
- Authentication: Login & Register (JWT)
- Manage Employees → CRUD
- Manage Tasks → CRUD with filters
- Due date validation (no past dates)
- Protected Routes (Role-based access can be extended)
- Dashboard overview
- Fully responsive UI (Dark theme business styled)
---

## 📄 License
This project is currently unlicensed.  
Feel free to contact me for any questions regarding usage or contributions.

---

## 🤝 Contributing
Contributions are welcome! Please open issues or pull requests for improvements or bug fixes.

---

## 📬 Contact

<p align="center">
  Created by <strong>Harshavardhan Sai Divvala</strong> — <br/><br/>
  <a href="https://portfolio-harsha-three.vercel.app/">
    <img src="https://img.shields.io/badge/-Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
  <a href="https://www.linkedin.com/in/d-harshavardhan-sai" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" width="30" style="margin-right:10px;" />
  </a>
  <a href="https://www.instagram.com/ha_darling_ha?igsh=djhlbWp4Y2p2aTU5" target="_blank">
    <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="30" />
  </a>
</p>

<p align="center">
  — feel free to reach out!
</p>

 ---



## ⚡ Quick Start

Follow these steps to run the project locally:

```bash
1) Create a directory and open it in vscode or in terminal
 > git clone https://github.com/d-harshavardhan-sai/EmployeeTaskForgeAPI.git
 > cd EmployeeTaskForgeAPI
2) Install Backend Dependencies
 > cd backend
 > npm install
3) Install Frontend Dependencies
 > cd frontend
 > npm install
4) Create a .env file in chat_app directory and add MONGO_URI, JWT_SECRET, PORT make sure to give port as 5000
5) Start Backend server
 > cd backend
 > npm run dev
6) Start Frontend server
 > cd frontend
 > npm run dev
7) Open “http://localhost:5173” in your server

---
 
## 📁 Folder Structure (Basic Overview)

```bash
EmployeeTaskForgeAPI/
├── 📂 backend/                    
│   ├── 📂 config/                 
│   ├── 📂 controllers/            
│   ├── 📂 middlewares/            
│   ├── 📂 models/                 
│   ├── 📂 routes/                 
│   ├── 📄 server.js              
│   ├── 📄 package.json            
│   └── 📄 .env                   
│
├── 📂 frontend/              
│   ├── 📂 public/             
│   ├── 📂 src/
│   │   ├── 📂 components/        
│   │   ├── 📂 pages/            
│   │   ├── 📂 services/        
│   │   ├── 📂 hooks/             
│   │   ├── 📄 App.jsx            
│   │   └── 📄 main.jsx        
│   ├── 📄 index.html             
│   ├── 📄 package.json           
│   ├── 📄 tailwind.config.js     
│   └── 📄 postcss.config.js     
│
└── 📄 README.md                
