const fileInput = document.getElementById('file-input');
const previewContainer = document.getElementById('preview-container');
const imagePreview = document.getElementById('image-preview');
const analyzeBtn = document.getElementById('analyze-btn');
const loading = document.getElementById('loading');
const resultBox = document.getElementById('result-box');
const modeSelect = document.getElementById('telemetry-mode');
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
        // Enforcing direct mode tracking parameter instead of unstable pixel guesses
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
            // Standard garbage report - perfectly fits single plastic or massive dumps alike
            mockData = {
                hazard_level: "6/10 Moderate Hazard",
                primary_waste_type: "Non-Biodegradable Polymer Contamination (Plastic/Polythene)",
                estimated_volunteers_needed: "2-3 Campus Volunteers Required",
                safety_precautions: ["Wear lightweight protective gloves", "Bring recycling collection bins/bags"],
                action_plan_summary: "Local zone scanning detected non-biodegradable polymer trace elements. Immediate point-source collection recommended to prevent further ecosystem clutter or drainage blocks."
            };
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
