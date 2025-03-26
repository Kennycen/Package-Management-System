# 📦 Package Management System  

A modern web application designed to streamline the process of **receiving, notifying, and managing packages** in residential or commercial buildings. This system allows front desk staff to efficiently **log, track, and update package statuses**, ensuring seamless communication with tenants.  

## 🚀 Features  

- **📬 Package Tracking** – Log and track incoming packages for tenants.  
- **🔔 Notification System** – Send email and (optional) SMS alerts when a package is received.  
- **👤 User Authentication** – Secure login system for front desk staff.  
- **📊 Package Status Management** – Three status stages: **Arrived, Notified, Picked Up**.  
- **🔍 Search & Filter** – Locate packages by tenant, date, carrier, or status.  
- **📜 Package History** – View past package deliveries and pickups for reference.  
- **💡 Responsive UI** – Works on desktops, tablets, and mobile devices.  

## 🔄 System Workflow  

1. **Package Arrival** – The front desk receives a package and logs it into the system.  
2. **Notifying the Tenant** – The staff clicks the “Notified” button, moving the package to the **Notified** section and triggering an email/SMS notification.  
3. **Package Pickup** – When the tenant collects their package, the staff marks it as **Picked Up**, finalizing the process.  
4. **Package Management** – Completed pickups are stored for records and can be deleted if needed.  

## 🛠️ Tech Stack  

### Backend  
- **Node.js** with **Express.js**  
- **MongoDB** with **Mongoose** for database management  
- **JWT** for authentication  
- **Nodemailer** for email notifications  
- **Twilio (optional)** for SMS alerts  
- **CORS enabled**  
- **Environment variables support**  

### Frontend  
- **React.js** with **Vite**  
- **React Router** for navigation  
- **Tailwind CSS** for styling  
- **Axios** for API requests  
- **React Toastify** for real-time notifications  
- **Framer Motion** for smooth animations  
- **Fully responsive design** 

### Testing
- **Vitest** for fast unit testing for Vite projects
- **React Testing Library** ensuring components render correctly

## 📦 Installation  

### Prerequisites  
- **Node.js (v16 or higher)**  
- **MongoDB** installed locally or hosted (MongoDB Atlas)  
- **npm or yarn**  

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   EMAIL_SERVICE=your_email_service
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   ```
4. Start the server:
   ```bash
   npm run server
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file with:
   ```
   VITE_API_URL=your_backend_url
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🧪 Testing

- Frontend tests can be run with:
  ```bash
  npm run test
  ```

## 🚀 Deployment

The application is configured for deployment with:
- Backend: Vercel
- Frontend: Any static hosting service (Vercel, Netlify, Render, etc.)

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 
