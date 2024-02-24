// Select a random color for the square
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Identify the grid's container element
let container = document.querySelector(".container");

// Reference grid dimensions (to be changed for UI later)
let gridDim = 16;

// Create grid according to grid dimensions
for (let i = 0; i < gridDim; i++) {
    // Prepare row
    const row = document.createElement('div');
    row.classList.add("grid-row");
    // Iterate through row's columns
    for (let j = 0; j < gridDim; j++) {
        // Prepare square
        const square = document.createElement('div');
        square.classList.add("grid-square");
        // Change-color-on-hover functionality
        square.addEventListener("mouseover", function() {
            square.style.backgroundColor = getRandomColor();
        });
        row.append(square);
    }
    container.appendChild(row);
}

