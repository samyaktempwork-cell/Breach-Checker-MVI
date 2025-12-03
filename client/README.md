#  Breach Checker — Client (React + Vite)

This UI is the frontend for the **Breach Checker** OSINT platform.
It provides a clean interface to scan:

- Mobile numbers  
- Email addresses (coming soon)
- Social media usernames (coming soon)

---

##  Current UI Features (v1)

### ✔ Country code selector  
### ✔ Mobile number lookup input  
### ✔ Metadata display  
### ✔ OSINT result panel  
### ✔ Backend feature-flag awareness  
### ✔ Fully responsive UI  

---

# 📁 Client Structure

```
client/
 ├── src/
 │   ├── App.jsx
 │   ├── components/
 │   ├── assets/
 ├── index.html
 ├── tailwind.config.js
 ├── package.json
 ├── README.md
```

---

#  Setup

Install:

```
npm install
```

Run dev server:

```
npm run dev
```

---

#  API Used

The UI communicates with:

```
http://localhost:4000/api/breach/check
```

It sends:
```json
{
  "mobileNumber": "xxxxxxxxxx",
  "countryCode": "IN"
}
```

The backend returns metadata + OSINT + enabled flags.

---

#  Future UI Upgrades

### ☐ Add tabs:
- Phone
- Email
- Username

### ☐ Add toggles for enabled/disabled backend features  
### ☐ Add history page (MongoDB flag)  
### ☐ Add dark mode  
### ☐ Add scan report export (PDF/JSON)  

---

#  Notes

UI logic is intentionally simple — the backend drives all intelligence.

