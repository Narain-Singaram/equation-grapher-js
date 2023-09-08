const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");

// Set canvas size to match the container
canvas.width = document.getElementById("graph-container").offsetWidth - 40; // Adjusted for padding
canvas.height = 400; // Adjust the height as needed

const equationInput = document.getElementById("equation");
const scaleXInput = document.getElementById("scaleX");
const scaleYInput = document.getElementById("scaleY");
const graphButton = document.getElementById("graph-button");
const panLeftButton = document.getElementById("pan-left");
const panRightButton = document.getElementById("pan-right");
const panUpButton = document.getElementById("pan-up");
const panDownButton = document.getElementById("pan-down");

let panX = 0;
let panY = 0;
let customScaleX = 50;
let customScaleY = 50;

function drawGraph() {
    const equationText = equationInput.value;

    try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Define graph area within the container
        const graphWidth = canvas.width;
        const graphHeight = canvas.height;
        const graphX = panX;
        const graphY = panY;

        // Draw axes
        ctx.beginPath();
        ctx.moveTo(graphX, graphHeight / 2);
        ctx.lineTo(graphX + graphWidth, graphHeight / 2);
        ctx.moveTo(graphWidth / 2, graphY);
        ctx.lineTo(graphWidth / 2, graphY + graphHeight);
        ctx.strokeStyle = "#000";
        ctx.stroke();

        // Label the axes with ticks and values
        ctx.font = "12px Arial";
        ctx.textAlign = "center";

        // X-axis labels
        for (let x = -5; x <= 5; x++) {
            const labelX = graphX + graphWidth / 2 + x * customScaleX;
            const labelText = x;
            ctx.fillText(labelText, labelX, graphHeight / 2 + 15);
        }

        // Y-axis labels
        for (let y = -5; y <= 5; y++) {
            const labelY = graphHeight / 2 - y * customScaleY;
            const labelText = y;
            ctx.fillText(labelText, graphWidth / 2 - 15, labelY);
        }

        const expr = math.compile(equationText);

        // Plot the equation with custom scales
        ctx.beginPath();
        ctx.strokeStyle = "blue";

        for (let x = -10; x < 10; x += 1 / customScaleX) {
            const y = expr.evaluate({ x }) * customScaleY;
            const plotX = graphX + graphWidth / 2 + x * customScaleX;
            const plotY = graphHeight / 2 - y;
            ctx.lineTo(plotX, plotY);
        }

        ctx.stroke();
    } catch (error) {
        console.error(error);
        alert("Invalid equation.");
    }
}

graphButton.addEventListener("click", drawGraph);

// Panning buttons
panLeftButton.addEventListener("click", () => {
    panX -= 20; // Adjust the panning distance as needed
    drawGraph();
});

panRightButton.addEventListener("click", () => {
    panX += 20; // Adjust the panning distance as needed
    drawGraph();
});

panUpButton.addEventListener("click", () => {
    panY -= 20; // Adjust the panning distance as needed
    drawGraph();
});

panDownButton.addEventListener("click", () => {
    panY += 20; // Adjust the panning distance as needed
    drawGraph();
});

// Update customScaleX and customScaleY when the input values change
scaleXInput.addEventListener("change", () => {
    customScaleX = parseFloat(scaleXInput.value);
    drawGraph();
});

scaleYInput.addEventListener("change", () => {
    customScaleY = parseFloat(scaleYInput.value);
    drawGraph();
});

// Initial graph drawing
drawGraph();
