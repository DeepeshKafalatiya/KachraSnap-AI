const fileInput = document.getElementById('file-input');
const previewContainer = document.getElementById('preview-container');
const imagePreview = document.getElementById('image-preview');
const analyzeBtn = document.getElementById('analyze-btn');
const loading = document.getElementById('loading');
const resultBox = document.getElementById('result-box');
const modeSelect = document.getElementById('telemetry-mode');
let base64Image = "";
let fileWeight = 0;

fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        fileWeight = file.size; 
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
        const selectedMode = modeSelect.value;
        let mockData = {};
        
        if (selectedMode === "clean") {
            mockData = {
                hazard_level: "0/10 Clear Status",
                primary_waste_type: "No Environmental Waste Material Identified",
                estimated_volunteers_needed: "0 Personnel (Zone Monitored)",
                safety_precautions: ["Maintain standard regional green protocols", "Eco-friendly matrix parameters validated"],
                action_plan_summary: "Pristine telemetry data verified. The scanned hyperlocal grid points showcase optimal environmental health, high cleanliness indexes, and zero civic blockages."
            };
        } else {
            const determinator = fileWeight % 3; 

            if (determinator === 0) {
                mockData = {
                    hazard_level: "9/10 Critical Threat",
                    primary_waste_type: "Toxic Electronic Debris & Heavy Metal Scraps",
                    estimated_volunteers_needed: "9-12 Trained Community Members",
                    safety_precautions: ["Wear industrial thick rubber gloves", "Use specialized respiratory masks", "Keep sharp metal containers ready"],
                    action_plan_summary: "Severe electronic and complex industrial waste accumulation blocking residential drainage corridors. Immediate technical segregation and high-priority sanitation drive deployment recommended."
                };
            } else if (determinator === 1) {
                mockData = {
                    hazard_level: "7/10 High Alert",
                    primary_waste_type: "Non-Biodegradable Commercial Polymers & Plastic Heaps",
                    estimated_volunteers_needed: "5-7 Campus Volunteers",
                    safety_precautions: ["Wear puncture-proof lightweight gloves", "Bring large-scale community recycling bags"],
                    action_plan_summary: "High concentration of single-use plastics and packaging material cluttering local green belts. Fleet-based collection mechanism triggered for optimization routing."
                };
            } else {
                mockData = {
                    hazard_level: "5/10 Moderate Hazard",
                    primary_waste_type: "Organic Bio-Waste & Household Litter Dumping",
                    estimated_volunteers_needed: "3-4 Local Volunteers",
                    safety_precautions: ["Wear standard protective masks", "Use mechanical grabbers for collection"],
                    action_plan_summary: "Domestic organic waste overflowing due to local municipal delays. Immediate disposal coordination and composting alignment drive recommended."
                };
            }
        }
        renderUI(mockData);
    }, 1200);
});

function renderUI(data) {
    document.getElementById('res-hazard').innerText = data.hazard_level;
    document.getElementById('res-waste').innerText = data.primary_waste_type;
    document.getElementById('res-volunteers').innerText = data.estimated_volunteers_needed;
    document.getElementById('res-summary').innerText = data.action_plan_summary;
    
    if(data.hazard_level.startsWith("0/10")) {
        document.getElementById('res-hazard').className = "text-xl font-black text-green-400";
    } else if(data.hazard_level.startsWith("5/10")) {
        document.getElementById('res-hazard').className = "text-xl font-black text-amber-400";
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
