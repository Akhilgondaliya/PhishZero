# PhishZero 🛡️

Advanced Full-Stack Phishing & QR Code Malicious Threat Detector

PhishZero is a complete next-generation cybersecurity screening application designed to protect users from deceptive domains and QR-code-based phishing (Quishing). Running on a React frontend (Vite/Tailwind) and a Flask backend, PhishZero evaluates hostnames using 13+ local heuristics, queries SSL certificate authorities, checks registrar WHOIS age, decodes QR images/webcams, and compiles downloadable ReportLab PDF reports.

---

## 🛠️ Technology Stack

### Frontend (Client)

- **Framework**: React.js + Vite (Single Page App)
- **Styling**: Tailwind CSS (Tailored dark & light mode systems)
- **Routing**: React Router DOM v6
- **State & API**: Redux Toolkit (RTK Query integration)
- **Animations**: Framer Motion (Page loads, scale-ins, floating widgets)
- **Icons**: React Icons (Feather Icons pack)
- **Alerts**: React Toastify (Notifications interface)

### Backend (Server)

- **Framework**: Python + Flask REST API
- **CORS**: Flask-CORS (Cross-Origin Resource Sharing)
- **QR Decoding**: pyzbar + OpenCV (Double-pass image decoding)
- **Domain age**: python-whois (Direct registry socket lookups)
- **URL Parsing**: tldextract (Robust registrar domain extraction)
- **PDF Reports**: ReportLab PDF library (Flowable styling tables)
- **QR Gen**: qrcode (Serves sample phishing QR codes)

---

## 🚀 Run Locally

### 1. Prerequisite Installations

- **Node.js** (v18 or higher recommended)
- **Python** (v3.9 or higher recommended)
- **ZBar Shared Library** (On Windows, `pyzbar` includes DLLs. On Unix systems, you might need to install `zbar-tools` or `libzbar-dev` via your package manager if you run into zbar loading errors).

---

### 2. Startup Backend Server

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment (optional but recommended)
python -m venv venv
# Activate virtual environment:
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install Python requirements
pip install -r requirements.txt

# Start Flask server
python app.py
```

- **Local API Endpoint**: `http://localhost:5000`

---

### 3. Startup Frontend Client

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install NPM packages
npm install

# Start Vite dev server
npm run dev
```

- **Local Application URL**: `http://localhost:5173`

---

## 🔒 Security Sandbox Heuristic Breakdown

PhishZero aggregates points for the following indicators (capped at a max score of 100):

1. **No HTTPS**: Site doesn't run secure SSL protocols (+20 points)
2. **IP as Host**: Uses numeric IP address instead of domain name (+25 points)
3. **Suspicious TLD**: Hosting on TLDs like .tk, .ml, .xyz, .top (+20 points)
4. **Brand Impersonation**: Spoofs keywords like paypal/google (+30 points)
5. **Phishing Keywords**: Contains login, verify, secure, update (+20 points)
6. **@ Symbol**: Includes `@` characters which bypass preceding hostnames (+15 points)
7. **URL Shortener**: Links from bit.ly, tinyurl, t.co (+15 points)
8. **Deep Subdomain**: 3+ subdomain levels (+15 points)
9. **Long URL**: Characters count exceeding 100 (+10 points)
10. **Hex Encoding**: Percent-encoded obfuscations (+10 points)
11. **Domain Age < 30 days**: Very new WHOIS registration (+25 points)
12. **Domain Age < 180 days**: Relatively new WHOIS registration (+10 points)
13. **Hyphen in Domain**: Domain utilizes hyphen separators (+5 points)
14. **Digits in Domain**: Domain utilizes numerical digits (+5 points)
15. **Double Slash in Path**: Path contains illegal redirection slashes (+8 points)

**Verdict Categories:**

- **SAFE** (0 - 39 Score)
- **SUSPICIOUS** (40 - 69 Score)
- **PHISHING** (70 - 100 Score)

---

## ⚡ Deployment

- **Frontend SPA**: Deploy directly on Vercel or Netlify. Make sure to specify the production backend URL in `client/.env.production` as `VITE_API_URL`.
- **Backend API**: Deploy to Render, Heroku, or railway. Custom Zbar binaries are loaded natively by `pyzbar` on Windows. On Linux instances (e.g. Render), you can add `zbar` packages via custom dockerfiles or Render package managers if needed.
- **Monorepo**: Host both `client/` and `server/` folders in a single GitHub repository.
