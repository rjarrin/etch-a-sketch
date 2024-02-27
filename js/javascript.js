// Select a random color for the square
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Clears grid to initial view
function clearGrid() {
    const squares = container.querySelectorAll(".grid-square");
    squares.forEach(square => {
        square.style.backgroundColor = "white";
    });
}

// Creates a new grid based on user dimensions
function createNewGrid() {
    // Prompt the user for the new dimensions
    let gridSize = prompt("Enter the number of squares per side (1-100)");
    // Validate input
    if (gridSize < 1 || gridSize > 100) {
        alert("Invalid input. Please enter a number between 1 and 100.");
        return;
    }
    // Convert user input to integer
    gridSize = parseInt(gridSize, 10);
    // Remove the existing grid
    const container = document.querySelector(".container");
    container.innerHTML = '';
    // Generate the new grid
    generateGrid(gridSize);
}

// Generate validated grid
function generateGrid(size) {
    const container = document.querySelector(".container");
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Calculate the size of each square
    const squareSize = Math.min(containerWidth / size, containerHeight / size);

    // Clear the container
    container.innerHTML = '';

    for (let i =  0; i < size; i++) {
        const row = document.createElement('div');
        row.classList.add("grid-row");
        for (let j =  0; j < size; j++) {
            const square = document.createElement('div');
            square.classList.add("grid-square");
            square.style.width = `${squareSize}px`;
            square.style.height = `${squareSize}px`;
            square.addEventListener("mouseover", function() {
                square.style.backgroundColor = getRandomColor();
            });
            row.append(square);
        }
        container.append(row);
    }
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