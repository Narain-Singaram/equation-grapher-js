const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");

// Set canvas size to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const equationInput = document.getElementById("equation");
const graphButton = document.getElementById("graph-button");

const scaleX = 20;
const scaleY = 20;

graphButton.addEventListener("click", () => {
    const equationText = equationInput.value;
    
    try {
        // Replace ^ with ** and x with x*x
        const cleanedEquationText = equationText.replace(/\^/g, '**').replace(/x/g, 'x*x');
        
        const parsedEquation = math.compile(cleanedEquationText);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        
        for (let x = -canvas.width / 2; x < canvas.width / 2; x += 1 / scaleX) {
            const y = parsedEquation.evaluate({ x }) * scaleY;
            ctx.lineTo(canvas.width / 2 + x * scaleX, canvas.height / 2 - y);
        }
        
        ctx.stroke();
    } catch (error) {
        console.error(error);
        alert("Invalid equation.");
    }
});
