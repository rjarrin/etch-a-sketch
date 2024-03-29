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
    const containerWidth = 560;
    const containerHeight = 560;
    console.log(container.offsetHeight);
    console.log(container.offsetWidth);

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
                if (eraserMode) {
                    square.style.backgroundColor = "white";
                } else {
                    square.style.backgroundColor = getRandomColor();
                }
            });
            row.append(square);
        }
        container.append(row);
    }
    addKnobs();
}

// Include knobs and toy text to border
function addKnobs() {
    const container = document.querySelector(".container");
    // Prepare div wrapper below the grid
    const gridWrapper = document.createElement("div");
    gridWrapper.classList.add("grid-wrapper");
    // Append left knob
    const left = document.createElement("div");
    left.classList.add("knob", "knob-right");
    gridWrapper.append(left);
    // Add toy name
    const text = document.createElement("h2");
    text.classList.add("name");
    text.textContent = "Etch-A-Sketch";
    gridWrapper.append(text);
    // Append right knob
    const right = document.createElement("div");
    right.classList.add("knob", "knob-left");
    gridWrapper.append(right);
    // Append grid to container
    container.append(gridWrapper);
}

// Toggle erase function for grid hovering
function toggleEraserMode() {
    eraserMode = !eraserMode;
    const eraserButton = document.getElementById("Eraser");
    if (eraserMode) {
        eraserButton.classList.add("highlighted");
    } else {
        eraserButton.classList.remove("highlighted");
    }
}

// Save grid image to PDF format
function saveGridAsPDF() {
    const container = document.querySelector(".container");
    console.log("here");
    html2canvas(container, {
        scale: 1
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("etch-a-sketch.pdf");
    });
}

// Identify the grid's container element
let container = document.querySelector(".container");
// Reference grid dimensions
let gridDim = 16;
// Generate default grid (16x16)
generateGrid(gridDim);
// Set erase mode to default settings
let eraserMode = false;
