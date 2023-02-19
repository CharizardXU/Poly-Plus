// Get the id and price from the URL
const url = window.location.href;
const id = url.substring(url.lastIndexOf('/') + 1);
let price = 0;

// Get the price element
let priceElement = document.getElementById('purchaseButton');

// Check if the price is in a button
if (priceElement.tagName.toLowerCase() === 'button') {
  price = parseInt(priceElement.innerText.match(/\d+/)[0]);
} 
// Check if the price is in a paragraph
else if (priceElement.tagName.toLowerCase() === 'p') {
  price = parseInt(priceElement.innerText.match(/\d+/)[0]);
  price = Math.floor(price / 100);
}

// Get the conversion option from local storage or use the default value
let conversionOption = parseInt(localStorage.getItem('conversionOption')) || 100;

// Define the conversion rates
const conversionRates = {
  100: 0.99,
  500: 4.99,
  1000: 9.59,
  2000: 18.99,
  5000: 46.99,
  10000: 88.99,
};

// Calculate the price in dollars based on the selected conversion option
const priceInDollars = price / conversionOption * conversionRates[conversionOption];
const formattedPrice = priceInDollars.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

// Update the existing button to include the price in dollars
priceElement.innerText = `Buy for ${price} bricks (${formattedPrice})`;

// Create a new button element for the asset URL
const assetButton = document.createElement('button');
assetButton.setAttribute('type', 'button');
assetButton.setAttribute('class', 'btn btn-block btn-primary mb-4');
assetButton.setAttribute('id', 'assetButton');
assetButton.innerText = `Download Texture`;

// Insert the new asset button after the existing button
priceElement.parentNode.insertBefore(assetButton, priceElement.nextSibling);

// Add a click event listener to the asset button
assetButton.addEventListener('click', () => {
  // Redirect the user to the asset URL
  window.location.href = `https://polytoria.com/assets/catalog/${id}.png`;
});

// Add click event listeners to the conversion options
const conversionOptionButtons = document.querySelectorAll('.conversion-option');
conversionOptionButtons.forEach(button => {
  button.addEventListener('click', () => {
    conversionOption = parseInt(button.dataset.option);
    localStorage.setItem('conversionOption', conversionOption);
    const conversionRate = conversionRates[conversionOption];
    const newPriceInDollars = price / conversionOption * conversionRate;
    const newFormattedPrice = newPriceInDollars.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    priceElement.innerText = `Buy for ${price} bricks (${newFormattedPrice})`;
  });
});

// Set the active conversion option button based on the stored option
const activeConversionOptionButton = document.querySelector(`button[data-option="${conversionOption}"]`);
activeConversionOptionButton.classList.add('active');
