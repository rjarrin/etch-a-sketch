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
}

function toggleEraserMode() {
    eraserMode = !eraserMode;
    const eraserButton = document.getElementById("Eraser");
    if (eraserMode) {
        eraserButton.classList.add("highlighted");
    } else {
        eraserButton.classList.remove("highlighted");
    }
}

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

generateGrid(gridDim);

let eraserMode = false;
