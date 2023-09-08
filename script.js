const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");

// Set canvas size to match the container
canvas.width = document.getElementById("graph-container").offsetWidth - 40; // Adjusted for padding
canvas.height = 400; // Adjust the height as needed

const equationInput = document.getElementById("equation");
const graphButton = document.getElementById("graph-button");

const scaleX = 50; // Adjusted for a finer grid
const scaleY = 50; // Adjusted for a finer grid

graphButton.addEventListener("click", () => {
    const equationText = equationInput.value;
    
    try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Define graph area within the container
        const graphWidth = canvas.width;
        const graphHeight = canvas.height;
        const graphX = 0;
        const graphY = 0;
        
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
            const labelX = graphX + graphWidth / 2 + x * scaleX;
            const labelText = x;
            ctx.fillText(labelText, labelX, graphHeight / 2 + 15);
        }
        
        // Y-axis labels
        for (let y = -5; y <= 5; y++) {
            const labelY = graphHeight / 2 - y * scaleY;
            const labelText = y;
            ctx.fillText(labelText, graphWidth / 2 - 15, labelY);
        }
        
        const expr = math.compile(equationText);
        
        // Plot the equation with a finer grid and range
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        
        for (let x = -10; x < 10; x += 1 / scaleX) {
            const y = expr.evaluate({ x }) * scaleY;
            const plotX = graphX + graphWidth / 2 + x * scaleX;
            const plotY = graphHeight / 2 - y;
            ctx.lineTo(plotX, plotY);
        }
        
        ctx.stroke();
    } catch (error) {
        console.error(error);
        alert("Invalid equation.");
    }
});
