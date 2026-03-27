async function fetchPaperHomework() {
    const url = 'https://api.parseur.com/parser_field/oHrqfi3oOuMez39cW2_jyk_0A4KM03rt0eRmOlRwTMt7qA6r3wF0OjQEXuqdKm1D/download/IXLAssignments.json?last_document_only=true';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        // Debug: Log the data to verify
        console.log('Fetched data:', data);

        // Handle Paper Homework
        const paperWorkDiv = document.getElementById('paperWork');
        if (data.length > 0 && data[0]["Paper Homework"]) {
            paperWorkDiv.textContent = data[0]["Paper Homework"];
        } else {
            paperWorkDiv.textContent = "API Returned Empty.";
        }
    } catch (error) {
        console.error('Failed to fetch paper homework:', error);
        const paperWorkDiv = document.getElementById('paperWork');
        paperWorkDiv.textContent = "Failed to load paper homework.";
    }
}

// Fetch data when the page loads
fetchPaperHomework();
