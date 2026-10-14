const steps = document.querySelectorAll(".step");
const nextBtn = document.querySelector("#nextBtn");
const previousBtn = document.querySelector("#previousBtn");
const progressBar = document.querySelector("#progressBar");
const currentStepText = document.querySelector("#currentStep");
const form = document.querySelector("#multiStepForm")
const summary = document.querySelector("#summary");

let currentStep = 0;

window.addEventListener("load", function () {

    const savedData = JSON.parse(
        localStorage.getItem("formData")
    );
    if (savedData) {
        document.querySelector("#name").value =
            savedData.name || "";
        document.querySelector("#email").value =
            savedData.email || "";
        document.querySelector("#phone").value =
            savedData.phone || "";
        document.querySelector("#city").value =
            savedData.city || "";
        document.querySelector("#course").value =
            savedData.course || "";
        document.querySelector("#message").value =
            savedData.message || "";
    }
    updateStep();
});

function nextStep() {
    if (!validateStep()) {
        return;
    }
    saveData();
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateStep();
    } else {
        showSummary();
    }
}

function previousStep() {
    if (currentStep > 0) {
        currentStep--;
         updateStep();
    }
}

function updateStep() {
    steps.forEach(function (step, index) {
        step.classList.toggle(
            "active",
            index === currentStep
        );
    });
    const progress =
        ((currentStep + 1) / steps.length) * 100;
    progressBar.style.width = progress + "%";
    currentStepText.textContent =
        currentStep + 1;
    if (currentStep === 0) {
       previousBtn.style.display = "none";
    } else {
        previousBtn.style.display = "block";
    }
    if (currentStep === steps.length - 1) {
        nextBtn.textContent = "Review";
    } else {
        nextBtn.textContent = "Next";
    }
}
function validateStep() {
    const inputs =
        steps[currentStep].querySelectorAll(
            "input, select, textarea"
        );
    for (let input of inputs) {
        if (!input.checkValidity()) {
            input.reportValidity();
            return false;
        }
    }
    return true;
}

function saveData() {
    const formData = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        phone: document.querySelector("#phone").value,
        city: document.querySelector("#city").value,
        course: document.querySelector("#course").value,
        message: document.querySelector("#message").value
    };
    localStorage.setItem(
        "formData",
        JSON.stringify(formData)
    );
}

function showSummary() {
    saveData();
    document.querySelector("#summaryName").textContent =
        document.querySelector("#name").value;
    document.querySelector("#summaryEmail").textContent =
        document.querySelector("#email").value;
    document.querySelector("#summaryPhone").textContent =
        document.querySelector("#phone").value;
    document.querySelector("#summaryCity").textContent =
        document.querySelector("#city").value;
    document.querySelector("#summaryCourse").textContent =
        document.querySelector("#course").value;
    document.querySelector("#summaryMessage").textContent =
        document.querySelector("#message").value;
    form.style.display = "none";
    summary.style.display = "block";
}

function submitForm() {
    alert("Form submitted successfully!");
    localStorage.removeItem("formData");
    location.reload();
}