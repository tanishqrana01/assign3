// script.js

function orderSmoothie() {
    const size = document.getElementById('size').value;
    const ingredients = document.querySelectorAll('input[name="ingredients"]:checked');
    const addOns = document.querySelectorAll('input[name="addOns"]:checked');
    const sweetener = document.getElementById('sweetener');
    
    let ingredientList = [];
    let addOnList = [];
    let totalPrice = 0;

    ingredients.forEach((ingredient) => {
        const price = parseFloat(ingredient.getAttribute('data-price'));
        ingredientList.push(ingredient.value);
        totalPrice += price;
    });

    addOns.forEach((addOn) => {
        const price = parseFloat(addOn.getAttribute('data-price'));
        addOnList.push(addOn.value);
        totalPrice += price;
    });

    const sizePrices = {
        small: 5,
        medium: 7,
        large: 9
    };

    totalPrice += sizePrices[size];

    const sweetenerPrice = parseFloat(sweetener.options[sweetener.selectedIndex].getAttribute('data-price')) || 0;
    totalPrice += sweetenerPrice;

    const smoothieDescription = `You have ordered a ${size} smoothie with: ${ingredientList.join(', ')}. Add-Ons: ${addOnList.join(', ')}. Sweetener: ${sweetener.options[sweetener.selectedIndex].text}.`;
    const smoothieTotal = `Total Price: $${totalPrice.toFixed(2)}`;

    document.getElementById('smoothieDescription').innerText = smoothieDescription;
    document.getElementById('smoothieTotal').innerText = smoothieTotal;

    displaySmoothieImage(ingredientList);
}



function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const description = document.getElementById('smoothieDescription').innerText;
    const total = document.getElementById('smoothieTotal').innerText;

    doc.text('Smoothie Order Bill', 10, 10);
    doc.text(description, 10, 20);
    doc.text(total, 10, 30);

    doc.save('smoothie_order_bill.pdf');
}
