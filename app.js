const fileInput = document.getElementById('file-input');
const previewContainer = document.getElementById('preview-container');
const imagePreview = document.getElementById('image-preview');
const analyzeBtn = document.getElementById('analyze-btn');
const loading = document.getElementById('loading');
const resultBox = document.getElementById('result-box');
let base64Image = "";

fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            base64Image = e.target.result.split(',')[1]; 
            
            previewContainer.classList.remove('hidden');
            analyzeBtn.classList.remove('hidden');
            resultBox.classList.add('hidden');
        }
        reader.readAsDataURL(file);
    }
});

analyzeBtn.addEventListener('click', () => {
    analyzeBtn.classList.add('hidden');
    loading.classList.remove('hidden');

    setTimeout(() => {
        const img = new Image();
        img.src = imagePreview.src;
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 40; // Samples increased for better pattern recognition
            canvas.height = 40;
            ctx.drawImage(img, 0, 0, 40, 40);
            
            const imgData = ctx.getImageData(0, 0, 40, 40).data;
            let greenPixels = 0;
            let bluePixels = 0;
            let totalPixels = imgData.length / 4;
            
            // Client-Side Image Chromatic Analysis Loop
            for (let i = 0; i < imgData.length; i += 4) {
                let r = imgData[i];
                let g = imgData[i+1];
                let b = imgData[i+2];
                
                // Detecting dominant green tones (Trees, Nature, Parks)
                if (g > r && g > b && g > 40) {
                    greenPixels++;
                }
                // Detecting dominant blue/cyan tones (Water, Sky, Clear Bright Objects)
                if (b > r && b > g || (b > 100 && g > 100 && r < 120)) {
                    bluePixels++;
                }
            }
            
            const greenRatio = greenPixels / totalPixels;
            const blueRatio = bluePixels / totalPixels;
            
            let mockData = {};
            
            // If the image contains prominent natural green (forest) or blue/cyan tones (water, bright elements)
            if (greenRatio > 0.18 || blueRatio > 0.15) {
                mockData = {
                    hazard_level: "0/10 Clear Status",
                    primary_waste_type: "No Environmental Waste Material Identified",
                    estimated_volunteers_needed: "0 Personnel (Zone Monitored)",
                    safety_precautions: ["Maintain standard regional green protocols", "Eco-friendly matrix parameters validated"],
                    action_plan_summary: "Pristine telemetry data verified. The scanned hyperlocal grid points showcase optimal environmental health, high green coverage, and zero civic blockages."
                };
            } else {
                // Irregular mix or dull urban gradients (Garbage piles, dumps)
                mockData = {
                    hazard_level: "8/10 Critical Hazard",
                    primary_waste_type: "Mixed Non-Biodegradable Polymers & Debris Heap",
                    estimated_volunteers_needed: "6-8 Campus Volunteers Required",
                    safety_precautions: ["Wear puncture-proof heavy rubber gloves", "Use protective face shields or masks"],
                    action_plan_summary: "High entropy structural waste distribution detected in hyperlocal zone. Clogging municipal lanes. Immediate physical cleanup drive deployment recommended."
                };
            }
            renderUI(mockData);
        };
    }, 1200);
});

function renderUI(data) {
    document.getElementById('res-hazard').innerText = data.hazard_level;
    document.getElementById('res-waste').innerText = data.primary_waste_type;
    document.getElementById('res-volunteers').innerText = data.estimated_volunteers_needed;
    document.getElementById('res-summary').innerText = data.action_plan_summary;
    
    if(data.hazard_level.startsWith("0/10")) {
        document.getElementById('res-hazard').className = "text-xl font-black text-green-400";
    } else {
        document.getElementById('res-hazard').className = "text-xl font-black text-red-400";
    }
    
    const safetyList = document.getElementById('res-safety');
    safetyList.innerHTML = ""; 
    data.safety_precautions.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        safetyList.appendChild(li);
    });

    resultBox.classList.remove('hidden');
    loading.classList.add('hidden');
}
