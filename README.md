# 3D Data Visualization Assignment

## Description
This project visualizes data from Google Sheets in a 3D environment using Three.js CSS3DRenderer.
Users can switch between Table, Sphere, Helix, and Grid layouts.

## Features
- Google Login authentication
- Data loaded dynamically from Google Sheets
- Interactive 3D layouts (Table, Sphere, Helix, Grid)
- Color-coded data visualization based on Net Worth
- Responsive design
- Smooth animations between layouts

## Setup (Localhost)

1. **Clone or download** this repository
2. **Open** `index.html` in a browser
3. **Sign in** with Google
4. **Use buttons** to switch between layouts

## Layout Specifications
- **Table**: 20 columns × 10 rows grid
- **Sphere**: 3D spherical arrangement
- **Double Helix**: Two intertwined spirals
- **Grid**: 5×4×10 3D grid arrangement

## Color Coding
- **Red**: Net Worth < $100,000
- **Orange**: Net Worth $100,000 - $200,000
- **Green**: Net Worth > $200,000

## Data Source
Data is loaded from Google Sheets CSV export:
`https://docs.google.com/spreadsheets/d/1crSTk74mXX6i11vDQpUAqSJMEZITInkgYw2QK76Vaec/export?format=csv`

## Technologies Used
- Three.js (CSS3DRenderer)
- Google Identity Services
- Tween.js for animations
- Google Sheets API (CSV export)

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Deployment
Deployed using GitHub Pages or any static hosting service.

## Assignment Requirements Checklist
- [x] Google Sheet integration
- [x] Google Login with OAuth
- [x] 4 visualization layouts
- [x] 20×10 table arrangement
- [x] Double helix implementation
- [x] 5×4×10 grid arrangement
- [x] Color coding by net worth
- [x] Interactive elements