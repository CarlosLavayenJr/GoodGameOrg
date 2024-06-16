const { JsonDatabase } = require('brackets-json-db');
const { BracketsManager } = require('brackets-manager');
const path = require('path');
const fs = require('fs');

const seedDatabase = async () => {
  const storage = new JsonDatabase();
  const manager = new BracketsManager(storage);

  try {
    const seedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed.json'), 'utf-8'));

    // Assuming seedData.json contains stages and other relevant data
    for (const stage of seedData.stages) {
      await manager.create(stage);
    }

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

seedDatabase();
