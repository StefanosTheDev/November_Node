const fs = require('fs');
const path = require('path');

// Function to read data from JSON file
exports.getData = async () => {
  // Specify the path to your JSON file
  const filePath = path.join(__dirname, '../files/ecom.json');

  // Wrap `fs.readFile` in a Promise
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        reject(err);
        return;
      }

      try {
        // Parse and return the JSON data
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        reject(parseError);
      }
    });
  });
};

// Function to list product names
exports.listProductNames = async () => {
  const data = await this.getData();

  // Access the products array within the JSON data
  const products = data.store.products;

  // Use map to iterate over products and log each product name
  const productNames = products.map((product) => {
    console.log(product.name); // Log each product name
    return product.name; // Return each product name for further use
  });

  return productNames; // Return the array of product names
};

exports.totalLoyaltyPoints = async () => {
  const data = await this.getData();

  const points = data.store.customers;

  const totalPoints = points.reduce((acc, point) => {
    // Add each `loyalty_points` value to the accumulator
    return acc + point.loyalty_points;
  }, 0); // Initial accumulator value set to 0

  return totalPoints;
};
