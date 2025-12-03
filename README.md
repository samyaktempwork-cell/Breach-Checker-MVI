# Breach-Checker-MVI
Build a simple UI tool where users enter a mobile number, email or social media handles and the system checks if that number appears in any online breach databases or OSINT sources using APIs.
#  Breach Checker — Multi-Source OSINT & Breach Intelligence Tool

Breach Checker is a modular OSINT tool designed to detect data exposure
for **mobile numbers, email addresses, and social media accounts**.

It supports multiple data sources using a **feature-flag architecture** so
you can enable or disable modules without changing code.

---

##  Current Features (v1)

### ✅ Mobile Number Breach Check
- NumVerify API integration (configurable)
- Metadata extraction:
  - Country
  - Location
  - Carrier
  - Line Type
- OSINT placeholder for PhoneInfoga (Docker support coming soon)
- Flag-based control:
  - `USE_NUMVERIFY`
  - `USE_OSINT`
  - `USE_PHONEINFOGA`
  - `USE_MONGO_HISTORY`

---

##  Tech Stack

### **Frontend**
- React (Vite)
- Tailwind CSS
- Fetch API

### **Backend**
- Node.js (Express)
- Feature Flag System
- NumVerify API (Apilayer)
- Modular service-based backend
- MongoDB (optional, flag-controlled)

---

## 📁 Project Structure

```
breach-checker/
 ├── client/           # React + Vite UI
 ├── server/           # Node.js API services
 ├── .gitignore
 ├── README.md         # Global project documentation
```

---

#  Setup Instructions

## 1️⃣ Clone the repo

```
git clone https://github.com/your-user/breach-checker
cd breach-checker
```

## 2️⃣ Install dependencies

### Client:
```
cd client
npm install
```

### Server:
```
cd ../server
npm install
```

---

## 3️⃣ Environment Variables

Create `/server/.env`:

```
NUMVERIFY_KEY=your_api_key_here

USE_NUMVERIFY=true
USE_OSINT=true
USE_PHONEINFOGA=false
USE_MONGO_HISTORY=false

MONGO_URI=mongodb+srv://...
```

---

## 4️⃣ Start the App

### Start backend:
```
cd server
npm start
```

### Start frontend:
```
cd client
npm run dev
```

---

#  Future Roadmap

### 📌 Email Breach Checker
- HaveIBeenPwned API integration
- Disposable email detection
- Breach categories (passwords, DOB, phone, etc.)

### 📌 Social Media Username OSINT
- Instagram availability
- GitHub OSINT
- Telegram lookup
- Twitter breach dataset checks

### 📌 PhoneInfoga Docker Integration
- Live OSINT scanning
- Report generation
- Region mapping

### 📌 Multi-Scan Mode
- Scan phone + email + username together
- Unified risk score

---

#  Maintainers

Breach Checker is part of your **DevOps + AI Automation suite**, designed for integration with:
- Kestra Workflows  
- Cline Automation  
- Multi-Agent frameworks  

---

#  License  
MIT
