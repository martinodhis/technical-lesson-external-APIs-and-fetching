// Define the function to display astronauts

// Function to display astronauts data
// Hint: Create a function called displayAstronauts(data)
// Hint: Select the <ul> element with the id "astronaut-list"
// Hint: Loop through the data.people array and create <li> elements for each astronaut's name
// Hint: Append the <li> elements to the <ul> element

// Fetch data from the external API

// Hint: Use fetch() to make an HTTP request to "http://api.open-notify.org/astros.json"
// Hint: Use .then() to process the response and convert it to JSON
// Hint: Call the displayAstronauts() function with the fetched data
// Hint: Use .catch() to handle any errors that occur during the fetch process
/**
 * 🚀 Astronauts in Space - API Fetch Module
 * Fetches and displays astronauts from Open Notify API
 * 
 * API Endpoint: http://api.open-notify.org/astros.json
 */

// 🎯 DOM Element References (cached for performance)
const elements = {
  astronautList: document.getElementById('astronaut-list'),
  loading: document.getElementById('loading'),
  error: document.getElementById('error'),
  refreshBtn: document.getElementById('refresh-btn')
};

// 🔗 API Configuration
const API_URL = 'http://api.open-notify.org/astros.json';

/**
 * 📡 Fetch astronaut data from the external API
 * @returns {Promise<Array>} - Promise resolving to array of astronaut objects
 */
async function fetchAstronautData() {
  try {
    const response = await fetch(API_URL);
    
    // Check if the response was successful (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Parse JSON response
    const data = await response.json();
    
    // Validate data structure
    if (!data.people || !Array.isArray(data.people)) {
      throw new Error('Invalid data format from API');
    }
    
    return data.people;
    
  } catch (error) {
    console.error('❌ Fetch error:', error);
    throw error; // Re-throw to be handled by caller
  }
}

/**
 * 🎨 Display astronauts in the DOM
 * @param {Array} astronauts - Array of astronaut objects with 'name' property
 */
function displayAstronauts(astronauts) {
  // Clear any existing content
  elements.astronautList.innerHTML = '';
  
  // Handle empty data edge case
  if (astronauts.length === 0) {
    elements.astronautList.innerHTML = '<li>🌌 No astronauts currently in space</li>';
    return;
  }
  
  // Create and append list items with staggered animation
  astronauts.forEach((astronaut, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = astronaut.name;
    // Add slight animation delay for visual polish
    listItem.style.animationDelay = `${index * 0.05}s`;
    elements.astronautList.appendChild(listItem);
  });
}

/**
 * 👁️ UI State Management Helpers
 */
function showLoading() {
  elements.loading.hidden = false;
  elements.error.hidden = true;
  elements.astronautList.hidden = true;
  elements.refreshBtn.hidden = true;
}

function showError() {
  elements.loading.hidden = true;
  elements.error.hidden = false;
  elements.astronautList.hidden = true;
  elements.refreshBtn.hidden = false;
}

function showSuccess() {
  elements.loading.hidden = true;
  elements.error.hidden = true;
  elements.astronautList.hidden = false;
  elements.refreshBtn.hidden = false;
}

/**
 * 🔄 Main Function: Load and Display Astronaut Data
 */
async function loadAstronauts() {
  showLoading();
  
  try {
    const astronauts = await fetchAstronautData();
    displayAstronauts(astronauts);
    showSuccess();
    console.log(`✅ Successfully loaded ${astronauts.length} astronauts`);
    
  } catch (error) {
    showError();
    // In a real app, you might log to a monitoring service here
  }
}

/**
 * 🚀 Initialize the Application
 */
function init() {
  // Load data on page load
  loadAstronauts();
  
  // Set up refresh button event listener
  elements.refreshBtn.addEventListener('click', () => {
    // Add visual feedback
    elements.refreshBtn.disabled = true;
    elements.refreshBtn.textContent = '🔄 Loading...';
    
    // Reload data
    loadAstronauts();
    
    // Re-enable button after a short delay
    setTimeout(() => {
      elements.refreshBtn.disabled = false;
      elements.refreshBtn.textContent = '🔄 Refresh Data';
    }, 1000);
  });
}

// Export for testing
module.exports = { displayAstronauts, loadAstronauts, fetchAstronautData };

// 🎬 Start the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
