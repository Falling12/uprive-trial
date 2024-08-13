let currentStep = 1;
let email = '';

async function handleSubmission() {
    if (!validateStep(currentStep)) {
        return;
    }

    const form = document.getElementById('mainForm');
    const formData = new FormData(form);
    const data = {};

    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    email = data.email;

    const mainContainer = document.querySelector('.main-container');
    const successContainer = document.querySelector('.success-container');
    const successEmail = successContainer.querySelector('.success-email');

    // Helyes email cím beállítása
    successEmail.textContent = email;

    // Alap pozíciók beállítása
    successContainer.style.display = 'flex';
    successContainer.style.opacity = 0;
    successContainer.style.transform = 'translateY(30px)';

    // Animációk beállítása
    mainContainer.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';
    successContainer.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';

    mainContainer.style.opacity = 0;
    mainContainer.style.transform = 'translateY(-30px)';

    setTimeout(() => {
        successContainer.style.opacity = 1;
        successContainer.style.transform = 'translateY(0)';
        document.querySelector('.lottie').style.display = 'block';
    }, 600);

    setTimeout(() => {
        mainContainer.style.display = 'none';
    }, 500);
}

function showError(input, message) {
    const error = document.getElementsByClassName('error-message')[0];
    input.classList.add('border-red-500');
    error.textContent = message;
    error.style.display = 'block';

    setTimeout(() => {
        error.style.display = 'none';
    }, 3000);
}

function validateName(input) {
    const name = input.value;
    if (name.split(' ').length < 2) {
        showError(input, 'Kérjük, adja meg a teljes nevét!');
        return false;
    }
    return true;
}

function validateEmail(input) {
    const email = input.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        showError(input, 'Kérjük, adjon meg egy érvényes e-mail címet!');
        return false;
    }
    return true;
}

function validatePhone(input) {
    const phone = input.value;
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (phone.length > 0 && !phoneRegex.test(phone)) {
        showError(input, 'Kérjük, adjon meg egy érvényes telefonszámot!');
        return false;
    }
    return true;
}

function validateIdea(input) {
    const idea = input.value;
    if (idea.length < 10) {
        showError(input, 'Kérjük, írjon legalább 10 karaktert!');
        return false;
    }
    return true;
}

function validateCheckboxes(checkboxes) {
    let checked = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checked++;
        }
    });
    if (checked < 2) {
        showError(checkboxes[0], 'Kérjük, fogadja el az ÁSZF-et!');
        return false;
    }
    return true;
}

function validateStep(currentStep) {
    const form = document.getElementById('mainForm');
    const inputs = form.querySelectorAll('.formStep').item(currentStep - 1).querySelectorAll('input');

    switch (currentStep) {
        case 1:
            return validateName(inputs.item(0));
        case 2:
            return validateEmail(inputs.item(0));
        case 3:
            return validatePhone(inputs.item(0));
        case 4:
            return validateIdea(inputs.item(0));
        case 5:
            if (!validateIdea(inputs.item(0))) return false;
            const checkboxes = form.querySelectorAll('.formStep').item(4).querySelectorAll('input[type="checkbox"]');
            return validateCheckboxes(checkboxes);
        default:
            return true;
    }
}

// Következő lépésre lépés
function nextStep() {
    // Ha nem valid az adott lépés, ne lépjen tovább
    if (!validateStep(currentStep)) {
        return;
    }
    currentStep++;
    const formContainer = document.getElementById('mainForm');
    const steps = document.querySelectorAll('.step');

    steps[currentStep - 1].classList.add('bg-blue-500');

    if (currentStep === 5) {
        document.querySelector('.next-button').style.display = 'none';
        document.querySelectorAll('.check').forEach(button => button.style.display = 'block');
        document.querySelector('.submit-button').style.display = 'block';
    }

    const translateValue = -100 * (currentStep - 1);
    formContainer.style.transform = `translateX(${translateValue}%)`;
}
