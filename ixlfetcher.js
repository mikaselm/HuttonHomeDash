async function fetchParseurData() {
    const url = 'https://api.parseur.com/parser_field/oHrqfi3oOuMez39cW2_jyk_0A4KM03rt0eRmOlRwTMt7qA6r3wF0OjQEXuqdKm1D/download/IXLAssignments.json?last_document_only=true';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const container = document.getElementById('assignments');

        // Check for valid assignments
        const hasValidAssignments = data.some(item => 
            (item["Must Do"] && item["Must Do"].trim() !== "null") || 
            (item["May Do"] && item["May Do"].trim() !== "null") || 
            (item["May Do New"] && item["May Do New"].trim() !== "null")
        );

        // Display message if no valid assignments exist
        if (!hasValidAssignments) {
            container.innerHTML = `<p>No assignments this week! Enjoy your break 🎉</p>`;
        } else {
            // Build the table structure
            let tableHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Must Do</th>
                            <th>May Do</th>
                            <th>New</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            // Add rows dynamically
            data.forEach(item => {
                tableHTML += `
                    <tr>
                        <td>${(item["Must Do"] && item["Must Do"].trim() !== "null") ? item["Must Do"] : ''}</td>
                        <td>${(item["May Do"] && item["May Do"].trim() !== "null") ? item["May Do"] : ''}</td>
                        <td>${(item["May Do New"] && item["May Do New"].trim() !== "null") ? item["May Do New"] : ''}</td>
                    </tr>
                `;
            });

            // Close table tags
            tableHTML += `
                    </tbody>
                </table>
            `;

            // Insert table into the div
            container.innerHTML = tableHTML;
        }

    } catch (error) {
        console.error('Failed to fetch Parseur data:', error);
        document.getElementById('assignments').innerHTML = '<p>Failed to load assignments.</p>';
    }
}

// Fetch data when the page loads
fetchParseurData();
