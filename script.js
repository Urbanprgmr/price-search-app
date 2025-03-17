document.addEventListener("DOMContentLoaded", function () {
    fetchData();

    // Search functionality
    document.getElementById("searchInput").addEventListener("input", function () {
        let query = this.value.toLowerCase();
        filterResults(query);
    });
});

let itemsData = [];  // Store fetched items

// Fetch items from the backend API
function fetchData() {
    fetch("https://ecd1f5ca-0d3e-4424-8661-170a36082984-00-1kfpigjiugdng.riker.replit.dev/")  // <-- Replace with your Replit backend URL
        .then(response => response.json())
        .then(data => {
            itemsData = data;
            displayItems(itemsData);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("results").innerHTML = "<p class='text-center text-danger'>Failed to load data. Please try again later.</p>";
        });
}

// Display items in the UI
function displayItems(items) {
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";  // Clear previous results

    if (items.length === 0) {
        resultsDiv.innerHTML = "<p class='text-center'>No items found.</p>";
        return;
    }

    items.forEach(item => {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("item-card");

        itemDiv.innerHTML = `
            <h4>${item.name}</h4>
            <p>Price: <strong>${item.price}</strong></p>
            <p>Store: ${item.store}</p>
            <a href="${item.link}" target="_blank" class="btn btn-primary btn-sm">View Item</a>
        `;

        resultsDiv.appendChild(itemDiv);
    });
}

// Filter items based on search query
function filterResults(query) {
    let filteredItems = itemsData.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.store.toLowerCase().includes(query)
    );
    displayItems(filteredItems);
}
