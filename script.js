// Wait for the DOM content to be loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
  
    // Get references to HTML elements
    const yearForm = document.getElementById('yearForm');
    const yearInput = document.getElementById('yearInput');
    const holidayListElement = document.querySelector('.holiday-list');
    
    // Add event listener for form submission
    yearForm.addEventListener('submit', async function(event) {
      event.preventDefault(); // Prevent form submission
      
      // Get the value of the year input field
      const year = yearInput.value.trim();
      
      // If year is not empty, proceed to fetch holidays
      if (year !== '') {
        try {
          // Fetch holidays for the specified year
          const holidays = await fetchHolidays(year);
          // Display holidays on the webpage
          displayHolidays(holidays);
        } catch (error) {
          // Log error if fetching holidays fails
          console.error('Error fetching holidays:', error);
        }
      }
    });
    
    // Function to fetch holidays for the specified year
    async function fetchHolidays(year) {
      try {
        // Fetch data from the API
        const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/JP`);
        // Check if response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch holidays');
        }
        // Parse JSON response and return holidays data
        return await response.json();
      } catch (error) {
        // Throw error if fetching or parsing fails
        throw error;
      }
    }
    
    // Function to display holidays on the webpage
    function displayHolidays(holidays) {
      // Clear previous holiday list
      holidayListElement.innerHTML = '';
      // If holidays data is available, create HTML elements for each holiday and display them
      if (holidays.length > 0) {
        holidays.forEach(holiday => {
          const holidayElement = createHolidayElement(holiday);
          holidayListElement.appendChild(holidayElement);
        });
      } else {
        // If no holidays data is available, display a message
        holidayListElement.innerHTML = '<p>No holidays found for the specified year.</p>';
      }
    }
    
    // Function to create HTML elements for a holiday
    function createHolidayElement(holiday) {
      const holidayElement = document.createElement('div');
      holidayElement.classList.add('holiday');
      
      const nameElement = document.createElement('h2');
      nameElement.textContent = holiday.name;
    
      const dateElement = document.createElement('p');
      dateElement.textContent = `Date: ${holiday.date}`;
    
      holidayElement.appendChild(nameElement);
      holidayElement.appendChild(dateElement);
    
      return holidayElement;
    }
  });
  