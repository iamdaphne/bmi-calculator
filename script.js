'use strict';

// Synchronizing range and value for weight, height and age
const weightRange = document.getElementById('range-weight');
const weightInput = document.getElementById('weight');
weightInput.value = weightRange.value;

weightRange.addEventListener('input', (e) => {
    weightInput.value = e.target.value;
});

weightInput.addEventListener('input', (e) => {
    weightRange.value = e.target.value;
});

const heightRange = document.getElementById('range-height');
const heightInput = document.getElementById('height');
heightInput.value = heightRange.value;

heightRange.addEventListener('input', (e) => {
    heightInput.value = e.target.value;
});

heightInput.addEventListener('input', (e) => {
    heightRange.value = e.target.value;
});

const ageRange = document.getElementById('range-age');
const ageInput = document.getElementById('age');
ageInput.value = ageRange.value;

ageRange.addEventListener('input', (e) => {
    ageInput.value = e.target.value;
});

ageInput.addEventListener('input', (e) => {
    ageRange.value = e.target.value;
});


//Hide accordion on page load
const accordionBMI = document.getElementById('accordion');
window.onload = function () {
    accordionBMI.style.display = 'none';
}

// Event listener for form submission
document.getElementById('form-bmi').addEventListener('submit', calculateBMI);


function calculateBMI(e) {
    e.preventDefault(); //prevents page from reloading

    // If someone types in commas instead of dots exchange automatically
    const weight = document.getElementById('weight').value.replace(',', '.');
    const height = document.getElementById('height').value.replace(',', '.');
    const age = document.getElementById('age').value.replace(',', '.');

    const explanationBMI = document.getElementById('explanation-bmi');
    const errorMessage = 'Please enter valid numbers for weight, height, and age.'
    const errorTooLong = 'You can only calculate with a maximum of 3 digits.'
    const error = document.getElementById('error');

    if (weight <= 0 || height <= 0 || age <= 0) {
        return error.textContent = errorMessage;

    } else if (age < 18 && age > 0) {
        return error.textContent = 'This BMI can only be calculated for adults. Please check out a BMI calculator for children and teenagers.';
    } else if (weight.toString().length > 3 || height.toString().length > 3 || age.toString().length > 3) {
        return error.textContent = errorTooLong;
    } else {
        error.textContent = '';
    }

    const formulaBMI = weight / (height / 100) ** 2;
    const formulaBMIRounded = formulaBMI.toFixed(1);
    const resultContent = formulaBMIRounded;
    const valueBMI = document.getElementById('value-bmi');

    valueBMI.textContent = resultContent;
    explanationBMI.textContent = categoryBMI(formulaBMIRounded);
    accordionBMI.style.display = 'block';

    // Collapse the corresponding category
    collapseCategory(formulaBMIRounded);
}


function categoryBMI(bmi) {
    if (bmi < 16) {
        return 'You are in the severe underweight range.'
    } else if (bmi >= 16 && bmi < 18.5) {
        return 'You are in the underweight range.'
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'You are in the Healthy Weight range.'
    } else if (bmi >= 25 && bmi < 30) {
        return 'You are in the overweight range.'
    } else {
        return 'You are in the obese range.'
    }
}
// removes standard outline from accordion elements
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
        button.blur();
    });
});

function collapseCategory(bmi) {
    const collapseOne = new bootstrap.Collapse(document.getElementById('collapseOne'), { toggle: false });
    const collapseTwo = new bootstrap.Collapse(document.getElementById('collapseTwo'), { toggle: false });
    const collapseThree = new bootstrap.Collapse(document.getElementById('collapseThree'), {
        toggle: false
    });
    const collapseFour = new bootstrap.Collapse(document.getElementById('collapseFour'), { toggle: false });
    const collapseFive = new bootstrap.Collapse(document.getElementById('collapseFive'), { toggle: false });

    const headings = {
        collapseOne: document.querySelector('#headingOne .accordion-button'),
        collapseTwo: document.querySelector('#headingTwo .accordion-button'),
        collapseThree: document.querySelector('#headingThree .accordion-button'),
        collapseFour: document.querySelector('#headingFour .accordion-button'),
        collapseFive: document.querySelector('#headingFive .accordion-button'),
    };

    function hideAllExcept(current) {
        if (current !== 'collapseOne') collapseOne.hide();
        if (current !== 'collapseTwo') collapseTwo.hide();
        if (current !== 'collapseThree') collapseThree.hide();
        if (current !== 'collapseFour') collapseFour.hide();
        if (current !== 'collapseFive') collapseFive.hide();
    }

    //adds style class "custom-focus" for focused accordion headings
    function addCustomFocus(current) {
        if (headings[current]) {
            headings[current].classList.add('custom-focus');
        }
    }

    //removes style class "custom-focus" for not focused accordion headings
    function removeCustomFocus() {
        Object.values(headings).forEach(button => {
            button.classList.remove('custom-focus');
        });
    }

    //remove style "custom-focus" from all accordion headings
    removeCustomFocus();

    if (bmi < 16) {
        hideAllExcept('collapseOne');
        collapseOne.show();
        addCustomFocus('collapseOne');
    } else if (bmi >= 16 && bmi < 18.5) {
        hideAllExcept('collapseTwo');
        collapseTwo.show();
        addCustomFocus('collapseTwo');
    } else if (bmi >= 18.5 && bmi < 25) {
        hideAllExcept('collapseThree');
        collapseThree.show();
        addCustomFocus('collapseThree');
    } else if (bmi >= 25 && bmi < 30) {
        hideAllExcept('collapseFour');
        collapseFour.show();
        addCustomFocus('collapseFour');
    } else {
        hideAllExcept('collapseFive');
        collapseFive.show();
        addCustomFocus('collapseFive');
    }
}