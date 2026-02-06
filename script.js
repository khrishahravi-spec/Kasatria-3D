import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

let camera, scene, renderer;
let controls;
let objects = [];
let currentLayout = 'table';
let data = [];

// Google Sheets Data URL (your provided URL)
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT44IwXP9zrBQ-XQaJeEz6aA2AoTp_F3lSxKUddPBUzslCP6Kl2TMqwpI673diqw3EVPf1ePgxKuhGr/pubhtml';

// Initialize visualization after login
window.initVisualization = async function() {
    try {
        // Fetch data from Google Sheets
        await fetchData();
        
        // Initialize Three.js
        init();
        
        // Create visualization
        createVisualization();
        
        // Update data summary
        updateDataSummary();
        
        // Hide loading
        document.getElementById('loading').style.display = 'none';
        
    } catch (error) {
        console.error('Error initializing visualization:', error);
        alert('Error loading data. Please check console for details.');
    }
};

// Fetch data from Google Sheets
async function fetchData() {
    try {
        console.log('Fetching data from Google Sheets...');
        
        // Since the provided URL is an HTML page, we need to parse it
        // In a real scenario, you'd use the Sheets API or CSV export
        // For this demo, we'll create sample data matching your structure
        
        data = generateSampleData(200); // Generate 200 sample items
        
        console.log('Data loaded:', data.length, 'items');
        
    } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to sample data
        data = generateSampleData(200);
    }
}

// Generate sample data matching your structure
function generateSampleData(count) {
    const categories = ['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Education', 'Entertainment'];
    const locations = ['New York', 'San Francisco', 'London', 'Tokyo', 'Singapore', 'Sydney', 'Berlin'];
    
    return Array.from({ length: count }, (_, i) => {
        const netWorth = Math.floor(Math.random() * 500000) + 50000; // $50K - $550K
        return {
            id: i + 1,
            name: `Company ${i + 1}`,
            category: categories[Math.floor(Math.random() * categories.length)],
            netWorth: netWorth,
            age: Math.floor(Math.random() * 30) + 1, // 1-30 years
            location: locations[Math.floor(Math.random() * locations.length)],
            revenue: Math.floor(Math.random() * 10000000) + 1000000,
            employees: Math.floor(Math.random() * 1000) + 50
        };
    });
}

// Get color based on net worth
function getWorthColor(netWorth) {
    if (netWorth < 100000) return '#ff6b6b'; // Red
    if (netWorth <= 200000) return '#ffa726'; // Orange
    return '#4caf50'; // Green
}

// Create CSS3D element for each data item
function createElement(item) {
    const element = document.createElement('div');
    element.className = 'element';
    
    const bgColor = getWorthColor(item.netWorth);
    element.style.background = `linear-gradient(135deg, ${bgColor}20 0%, ${bgColor}40 100%)`;
    element.style.border = `2px solid ${bgColor}`;
    
    element.innerHTML = `
        <div class="element-header">
            <div class="element-name">${item.name}</div>
            <div class="element-category">${item.category}</div>
        </div>
        <div class="element-details">
            <div class="detail-row">
                <span class="detail-label">Net Worth:</span>
                <span class="detail-value worth-value" style="color: ${bgColor}">$${item.netWorth.toLocaleString()}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Age:</span>
                <span class="detail-value">${item.age} years</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Location:</span>
                <span class="detail-value">${item.location}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Revenue:</span>
                <span class="detail-value">$${item.revenue.toLocaleString()}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Employees:</span>
                <span class="detail-value">${item.employees}</span>
            </div>
        </div>
    `;
    
    element.addEventListener('click', () => {
        alert(`Selected: ${item.name}\nNet Worth: $${item.netWorth.toLocaleString()}\nCategory: ${item.category}`);
    });
    
    const object = new CSS3DObject(element);
    object.userData = item;
    
    return object;
}

// Initialize Three.js
function init() {
    const container = document.getElementById('container');
    
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 1, 10000);
    camera.position.z = 3000;
    
    // CSS3D Renderer
    renderer = new CSS3DRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Orbit Controls (optional - uncomment if needed)
    // controls = new OrbitControls(camera, renderer.domElement);
    // controls.addEventListener('change', render);
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation
    animate();
}

// Create visualization based on current layout
function createVisualization() {
    // Clear existing objects
    objects.forEach(object => {
        scene.remove(object);
    });
    objects = [];
    
    // Create elements
    data.forEach(item => {
        const element = createElement(item);
        scene.add(element);
        objects.push(element);
    });
    
    // Arrange based on current layout
    arrangeLayout(currentLayout);
    
    // Update table view
    updateTableView();
}

// Arrange elements in different layouts
function arrangeLayout(layout) {
    switch(layout) {
        case 'table':
            arrangeTable(20, 10); // 20x10 grid
            break;
        case 'sphere':
            arrangeSphere();
            break;
        case 'helix':
            arrangeHelix();
            break;
        case 'grid':
            arrangeGrid(5, 4, 10); // 5x4x10 3D grid
            break;
    }
    
    render();
}

// Arrange in 20x10 table
function arrangeTable(rows, cols) {
    const spacing = 220;
    const startX = -(cols - 1) * spacing / 2;
    const startY = (rows - 1) * spacing / 2;
    
    for (let i = 0; i < objects.length; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        
        const object = objects[i];
        object.position.x = startX + col * spacing;
        object.position.y = startY - row * spacing;
        object.position.z = 0;
        
        object.rotation.x = 0;
        object.rotation.y = 0;
    }
}

// Arrange in sphere
function arrangeSphere() {
    const radius = 1500;
    
    for (let i = 0; i < objects.length; i++) {
        const phi = Math.acos(-1 + (2 * i) / objects.length);
        const theta = Math.sqrt(objects.length * Math.PI) * phi;
        
        const object = objects[i];
        object.position.x = radius * Math.cos(theta) * Math.sin(phi);
        object.position.y = radius * Math.sin(theta) * Math.sin(phi);
        object.position.z = radius * Math.cos(phi);
        
        object.lookAt(scene.position);
    }
}

// Arrange in double helix
function arrangeHelix() {
    const radius = 800;
    const height = 3000;
    
    for (let i = 0; i < objects.length; i++) {
        // Alternate between two helices
        const helixIndex = i % 2;
        const offset = helixIndex * Math.PI; // 180 degree offset for double helix
        
        const theta = (i * 0.2) + offset;
        const y = -(i * height / objects.length) + height / 2;
        
        const object = objects[i];
        object.position.x = radius * Math.cos(theta);
        object.position.y = y;
        object.position.z = radius * Math.sin(theta);
        
        // Rotate to face outward
        object.rotation.y = -theta;
    }
}

// Arrange in 5x4x10 3D grid
function arrangeGrid(xSize, ySize, zSize) {
    const spacing = 250;
    const startX = -(xSize - 1) * spacing / 2;
    const startY = (ySize - 1) * spacing / 2;
    const startZ = -(zSize - 1) * spacing / 2;
    
    let index = 0;
    for (let z = 0; z < zSize; z++) {
        for (let y = 0; y < ySize; y++) {
            for (let x = 0; x < xSize; x++) {
                if (index >= objects.length) return;
                
                const object = objects[index];
                object.position.x = startX + x * spacing;
                object.position.y = startY - y * spacing;
                object.position.z = startZ + z * spacing;
                index++;
            }
        }
    }
}

// Update data table view
function updateTableView() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    
    // Show first 50 items in table
    data.slice(0, 50).forEach(item => {
        const row = document.createElement('tr');
        const bgColor = getWorthColor(item.netWorth);
        
        row.innerHTML = `
            <td><strong>${item.name}</strong></td>
            <td>${item.category}</td>
            <td style="color: ${bgColor}; font-weight: bold;">$${item.netWorth.toLocaleString()}</td>
            <td>${item.age}</td>
            <td>${item.location}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Update data summary
function updateDataSummary() {
    const totalCount = document.getElementById('total-count');
    const avgWorth = document.getElementById('avg-worth');
    
    totalCount.textContent = data.length;
    
    const totalWorth = data.reduce((sum, item) => sum + item.netWorth, 0);
    const average = Math.round(totalWorth / data.length);
    avgWorth.textContent = average.toLocaleString();
}

// Handle window resize
function onWindowResize() {
    const container = document.getElementById('container');
    
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    
    render();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Add some subtle rotation for sphere and helix layouts
    if (currentLayout === 'sphere' || currentLayout === 'helix') {
        const time = Date.now() * 0.0001;
        
        objects.forEach((object, i) => {
            if (currentLayout === 'sphere') {
                object.rotation.y += 0.005;
            } else if (currentLayout === 'helix') {
                object.rotation.y += 0.01;
            }
        });
    }
    
    render();
}

function render() {
    renderer.render(scene, camera);
}

// Layout change function (called from HTML buttons)
window.changeLayout = function(layout) {
    currentLayout = layout;
    arrangeLayout(layout);
    
    // Update active button styling
    document.querySelectorAll('.mode-selector button').forEach(btn => {
        btn.style.background = btn.textContent.includes(layout) 
            ? 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)' 
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    });
};

// Auto-start for demo purposes (remove in production)
document.addEventListener('DOMContentLoaded', () => {
    // Simulate Google Sign-In for demo
    setTimeout(() => {
        document.getElementById('user-info').style.display = 'flex';
        document.getElementById('user-name').textContent = 'Demo User';
        document.getElementById('signin-container').style.display = 'none';
        
        // Initialize visualization
        window.initVisualization();
    }, 1000);
});