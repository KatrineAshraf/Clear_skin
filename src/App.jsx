import React, { useState } from 'react';
import './App.css';

// Define the forbidden ingredients with synonyms and maximum percentages
const forbiddenIngredients = {
  Beeswax: { synonyms: ['Cera alba'], maxPercentage: null },
  'Flaxseed oil': { synonyms: [], maxPercentage: null },
  'Capric acid': { synonyms: [], maxPercentage: null },
  'Cocoa butter': { synonyms: [], maxPercentage: null },
  'Coconut oil': {
    synonyms: ['Coconut alkanes', 'Coconut butter', 'Cocos nucifera'],
    maxPercentage: null,
  },
  Tocopherol: { synonyms: [], maxPercentage: 10 },
  'Vitamin E': { synonyms: [], maxPercentage: 10 },
  // Add more ingredients here...
};

const App = () => {
  const [ingredients, setIngredients] = useState('');
  const [percentages, setPercentages] = useState('');
  const [violations, setViolations] = useState([]);

  const validateIngredients = (ingredientList, percentageList) => {
    const ingredientArray = ingredientList
      .split(',')
      .map((item) => item.trim());
    const percentageObj = JSON.parse(percentageList);
    const violations = [];

    ingredientArray.forEach((ingredient) => {
      // Check exact match
      if (forbiddenIngredients[ingredient]) {
        const info = forbiddenIngredients[ingredient];
        const maxPercentage = info.maxPercentage;
        if (ingredient in percentageObj) {
          if (
            maxPercentage === null ||
            percentageObj[ingredient] > maxPercentage
          ) {
            violations.push(ingredient);
          }
        }
      }

      // Check synonyms
      Object.entries(forbiddenIngredients).forEach(([key, value]) => {
        if (value.synonyms.includes(ingredient)) {
          const maxPercentage = value.maxPercentage;
          if (key in percentageObj) {
            if (maxPercentage === null || percentageObj[key] > maxPercentage) {
              violations.push(ingredient);
            }
          }
        }
      });
    });

    return violations;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const violationsList = validateIngredients(ingredients, percentages);
    setViolations(violationsList);
  };

  return (
    <div className="App">
      <h1>Ingredient Checker</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ingredients (comma separated): </label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. Cera alba, Coconut butter, Vitamin E"
          />
        </div>
        <div>
          <label>Percentages (JSON format): </label>
          <input
            type="text"
            value={percentages}
            onChange={(e) => setPercentages(e.target.value)}
            placeholder='e.g. {"Cera alba": 5, "Coconut butter": 12, "Vitamin E": 15}'
          />
        </div>
        <button type="submit">Check</button>
      </form>
      {violations.length > 0 && (
        <div>
          <h2>Violations:</h2>
          <ul>
            {violations.map((violation, index) => (
              <li key={index}>{violation}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
