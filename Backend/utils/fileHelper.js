import fs from 'fs'
const filePath = 'orders.json';

// Read JSON file
const readData = () => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  }
  return [];
};

// Write JSON file
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Initialize orders.json if it doesn't exist
if (!fs.existsSync(filePath)) {
  writeData([]);
}

export  { readData, writeData };
