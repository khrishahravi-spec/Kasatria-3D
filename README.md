# 3D Data Visualization Assignment

This project is based on the official Three.js CSS3D Periodic Table demo and has been modified to visualize custom data retrieved from a Google Sheet instead of chemical elements.

The application fulfills all requirements stated in the assignment instructions.

---

## 🔗 Live Webpage
https://khrishahravi-spec.github.io/Kasatria-3D/

---

## 📌 Assignment Requirements Fulfilled

### 1. Google Sheet
- The provided CSV file was imported into Google Sheets
- The Google Sheet was shared with **lisa@kasatria.com**
- The sheet was published as a CSV for web access

### 2. Google Login (Image A)
- Google Sign-In is implemented using **Google Identity Services**
- A Google Cloud Project was created
- OAuth Client ID is used for authentication
- Users must sign in with a Google account before accessing the visualization

### 3. Periodic Table Demo Modification
- The original Three.js demo below was used as a reference:
  https://threejs.org/examples/#css3d_periodictable
- The static chemical element data was removed
- Data is dynamically loaded from the Google Sheet (CSV)

### 4. Data Structure (Image B)
Each 3D tile displays:
- Name
- Title / Description
- Net Worth

This replaces the original chemical element structure.

### 5. Tile Color Based on Net Worth
- 🔴 Red: Net Worth < $100,000
- 🟠 Orange: Net Worth ≥ $100,000 and < $200,000
- 🟢 Green: Net Worth ≥ $200,000

### 6. Data Arrangements
The visualization supports four layouts:
- Table
- Sphere
- Helix
- Grid

### 7. Table Layout
- Arranged in **20 × 10** format as required

### 8. Helix Layout
- Implemented as a **Double Helix**
- Modified from the default single helix in the original demo

### 9. Grid Layout (Image C)
- Arranged in **5 × 4 × 10** format

### 10. Online Deployment
- The project is deployed online using **GitHub Pages**
- A public URL is provided for evaluation

---

## 🧰 Technologies Used
- HTML, CSS, JavaScript
- Three.js (CSS3DRenderer, TrackballControls)
- TWEEN.js (for smooth transitions)
- Google Identity Services (OAuth)
- Google Sheets (CSV data source)
- GitHub Pages (hosting)

---

## 📜 Reference
Three.js CSS3D Periodic Table Demo  
https://threejs.org/examples/#css3d_periodictable
