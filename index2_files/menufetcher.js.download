let currentDay = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let menuData = {}; // This will be populated with the fetched data.

// Fetch data from Browse AI
const fetchData = async () => {
    try {
        console.log("Fetching data from Browse AI...");
        const response = await fetch(
            'https://api.browse.ai/v2/robots/e1dc2fca-f424-4204-a388-aa2aad4b640e/tasks?page=1&pageSize=1&sort=-startedAt&status=successful',
            {
                headers: {
                    "Authorization": "Bearer e7f60ec6-1fd6-40d0-8ce5-d272c665c9ef:e6aee1d6-2efc-4152-a41f-8db6c506879c"
                }
            }
        );

        console.log(`Response status: ${response.status}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Raw response:", data);

        if (data.result && data.result.robotTasks && data.result.robotTasks.items) {
            menuData = data.result.robotTasks.items[0].capturedTexts;
            console.log("Captured menu data:", menuData);
            displayMenu(currentDay);
        } else {
            document.getElementById('menu').innerText = 'No menu data available.';
        }
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        document.getElementById('menu').innerText = 'Failed to fetch menu data.';
    }
};

// Parse menu HTML into structured data
const parseMenu = (rawHTML) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHTML, 'text/html');
    let entrees = [];
    let fruitsAndVeggies = [];

    // Loop through each `li` containing categories
    doc.querySelectorAll('li.dm-margin-bottom-md').forEach((categoryNode) => {
        const header = categoryNode.querySelector('h3');
        const items = Array.from(categoryNode.querySelectorAll('button')).map((button) =>
            button.textContent.trim()
        );

        if (header && header.textContent.includes('Entree')) {
            entrees.push(...items);
        } else if (header && (header.textContent.includes('Fruit') || header.textContent.includes('Vegetable'))) {
            fruitsAndVeggies.push(...items);
        }
    });

    console.log('Parsed entrees:', entrees);
    console.log('Parsed fruits and veggies:', fruitsAndVeggies);

    return { entrees, fruitsAndVeggies };
};

// Display menu for the selected day
const displayMenu = (day) => {
    const menuElement = document.getElementById('menu');
    const dayName = days[day];
    const dayKey = dayName + 'Lunch';

    console.log(`Displaying menu for day: ${day} ${dayName}`);
    console.log(`Day key: ${dayKey}`);
    console.log("Available keys in menuData:", Object.keys(menuData));

    if (menuData[dayKey]) {
        const { entrees, fruitsAndVeggies } = parseMenu(menuData[dayKey]);

        menuElement.innerHTML = `
            <div class="menuColumn" id="entrees">
                <h3 class="menuHeaders">Entrees</h3>
                <ul class="menuList">${entrees.map(item => `<li>${item}</li>`).join('')}</ul>
            </div>
            <div class="menuColumn" id="sides">
                <h3 class="menuHeaders">Sides</h3>
                <ul class="menuList">${fruitsAndVeggies.map(item => `<li>${item}</li>`).join('')}</ul>
            </div>
        `;
    } else if (day === 0 || day === 6) {
        menuElement.innerHTML = `
            <div class="menuColumn" id="entrees">
                <h2>${dayName}</h2>
                <p>No School Today</p>
            </div>
        `;
    } else {
        menuElement.innerHTML = `
            <div class="menuColumn" id="entrees">
                <h2>${dayName}</h2>
                <p>No menu available for ${dayName}.</p>
            </div>
        `;
    }

    console.log(`Menu rendered for: ${dayName}`);
};

// Change the displayed day (forward/backward)
const changeDay = (increment) => {
    currentDay = (currentDay + increment + 7) % 7; // Wrap around days (0-6)
    displayMenu(currentDay);
};

// Initialize by fetching data
fetchData();
