const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const equationInput = document.getElementById("equation");
const graphButton = document.getElementById("graph-button");

const scaleX = 20;
const scaleY = 20;

graphButton.addEventListener("click", () => {
    const equationText = equationInput.value;
    
    try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        
        const expr = math.compile(equationText);
        
        for (let x = -canvas.width / 2; x < canvas.width / 2; x += 1 / scaleX) {
            const y = expr.evaluate({ x }) * scaleY;
            ctx.lineTo(canvas.width / 2 + x * scaleX, canvas.height / 2 - y);
        }
        
        ctx.stroke();
    } catch (error) {
        console.error(error);
        alert("Invalid equation.");
    }
});
