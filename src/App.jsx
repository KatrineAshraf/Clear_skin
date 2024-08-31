import React, { useState } from 'react';
import './App.css';

// Define the forbidden ingredients with synonyms and maximum percentages
const forbiddenIngredients = {
  'beeswax': {synonyms: ['cera alba'], maxPercentage: None},
  'flaxseed oil': {synonyms: [], maxPercentage: None},
  'capric acid': {synonyms: [], maxPercentage: None},
  'cocoa butter': {synonyms: [], maxPercentage: None},
  'coconut oil': {synonyms: ['coconut alkanes', 'coconut butter', 'cocos nucifera'], maxPercentage: None},
  'corn oil': {synonyms: [], maxPercentage: None},
  'cotton seed oil': {synonyms: [], maxPercentage: None},
  'eicosanoic acid': {synonyms: [], maxPercentage: None},
  'ethylhexyl palmitate': {synonyms: [], maxPercentage: None},
  'ethylhexyl pelargonate': {synonyms: [], maxPercentage: None},
  'evening primrose oil': {synonyms: [], maxPercentage: None},
  'decyl oleate': {synonyms: [], maxPercentage: None},
  'di (2 ethylhexyl) succinate': {synonyms: ['di succinate', 'disuccinate', '2 ethylhexyl'], maxPercentage: None},
  'dioctyl malate': {synonyms: [], maxPercentage: None},
  'dioctyl succinate': {synonyms: [], maxPercentage: None},
  'a & d additive': {synonyms: ['a additive', 'd additive'], maxPercentage: None},
  'acetylated lanolin alcohol': {synonyms: [], maxPercentage: None},
  'almond oil': {synonyms: ['prunus amygdalus dulcis', 'prunus dulcis (almond) oil'], maxPercentage: None},
  'apricot kernel oil': {synonyms: [], maxPercentage: None},
  'ascorbyl palmitate': {synonyms: [], maxPercentage: None},
  'avocado oil': {synonyms: ['persea gratissima (avocado) oil'], maxPercentage: None},
  'laneth-10': {synonyms: [], maxPercentage: None},
  'lanolic acid': {synonyms: [], maxPercentage: None},
  'lanolin alcohol': {synonyms: [], maxPercentage: None},
  'laureth-23': {synonyms: [], maxPercentage: None},
  'laureth-4': {synonyms: [], maxPercentage: None},
  'lauric acid': {synonyms: [], maxPercentage: None},
  'linoleic acid': {synonyms: [], maxPercentage: None},
  'linolenic acid': {synonyms: [], maxPercentage: None},
  'linseed oil': {synonyms: [], maxPercentage: None},
  'mineral oil': {synonyms: [], maxPercentage: None},
  'mink oil': {synonyms: [], maxPercentage: None},
  'myreth-3 myristate': {synonyms: [], maxPercentage: None},
  'myristic acid': {synonyms: [], maxPercentage: None},
  'myristyl alcohol': {synonyms: [], maxPercentage: None},
  'isocetyl alcohol': {synonyms: [], maxPercentage: None},
  'isodecyl oleate': {synonyms: [], maxPercentage: None},
  'isopropyl isostearate': {synonyms: [], maxPercentage: None},
  'isopropyl lanolate': {synonyms: [], maxPercentage: None},
  'isopropyl linolate': {synonyms: [], maxPercentage: None},
  'isopropyl myristate': {synonyms: [], maxPercentage: None},
  'isopropyl neopentanoate': {synonyms: [], maxPercentage: None},
  'isopropyl palmitate': {synonyms: [], maxPercentage: None},
  'isostearic acid': {synonyms: [], maxPercentage: None},
  'isostearyl alcohol': {synonyms: [], maxPercentage: None},
  'isostearyl isostearate': {synonyms: [], maxPercentage: None},
  'isostearyl neopentanoate': {synonyms: [], maxPercentage: None},
  'glyceryl stearate se': {synonyms: [], maxPercentage: None},
  'glyceryl-3-diisostearate': {synonyms: [], maxPercentage: None},
  'glycine soya (soybean) oil': {synonyms: ['soybean oil', 'glycine soya oil', 'soya oil'], maxPercentage: None},
  'grapeseed oil': {synonyms: ['vitis vinifera (grapeseed) oil', 'vitis vinifera', 'vitis vinifera oil'], maxPercentage: None},
  'hexylene glycol': {synonyms: [], maxPercentage: None},
  'hydrogenated vegetable oil': {synonyms: [], maxPercentage: None},
  'myristyl lactate': {synonyms: [], maxPercentage: None},
  'myristyl myristate': {synonyms: [], maxPercentage: None},
  'palm oil': {synonyms: [], maxPercentage: None},
  'palmitic acid': {synonyms: [], maxPercentage: None},
  'peach kernel oil': {synonyms: [], maxPercentage: None},
  'peanut oil': {synonyms: [], maxPercentage: None},
  'peg 100 distearate': {synonyms: [], maxPercentage: None},
  'peg 150 distearate': {synonyms: [], maxPercentage: None},
  'peg 16 lanolin': {synonyms: [], maxPercentage: None},
  'peg 200 dilaurate': {synonyms: [], maxPercentage: None},
  'peg 8 stearate': {synonyms: [], maxPercentage: None},
  'pentaerythrital tetraisostearate': {synonyms: [], maxPercentage: None},
  'pg caprylate/caprate': {synonyms: [], maxPercentage: None},
  'pg dipelargonate': {synonyms: [], maxPercentage: None},
  'pg monostearate': {synonyms: [], maxPercentage: None},
  'phytanriol': {synonyms: [], maxPercentage: None},
  'polyglyceryl-3-diisostearate': {synonyms: [], maxPercentage: None},
  'ppg 10 cetyl ether': {synonyms: [], maxPercentage: None},
  'ppg 12 peg 65 lanolin oil': {synonyms: [], maxPercentage: None},
  'ppg 2 myristyl propionate': {synonyms: [], maxPercentage: None},
  'ppg 5 ceteth 10 phosphate': {synonyms: [], maxPercentage: None},
  'prunus amygdalus dulcis': {synonyms: ['almond oil', 'prunus dulcis (almond) oil'], maxPercentage: None},
  'octyl palmitate': {synonyms: [], maxPercentage: None},
  'octyl stearate': {synonyms: [], maxPercentage: None},
  'octyldodecanol': {synonyms: [], maxPercentage: None},
  'olea europaea (olive) fruit oil': {synonyms: ['olive oil'], maxPercentage: None},
  'oleth-10': {synonyms: [], maxPercentage: None},
  'oleth-3': {synonyms: [], maxPercentage: None},
  'oleth-3 phosphate': {synonyms: [], maxPercentage: None},
  'oleth-5': {synonyms: [], maxPercentage: None},
  'oleyl alcohol': {synonyms: [], maxPercentage: None},
  'xylene': {synonyms: [], maxPercentage: None},
  'sandalwood seed oil': {synonyms: [], maxPercentage: None},
  'sesame oil': {synonyms: [], maxPercentage: None},
  'shark liver oil': {synonyms: [], maxPercentage: None},
  'sorbitan isostearate': {synonyms: [], maxPercentage: None},
  'sorbitan laurate': {synonyms: [], maxPercentage: None},
  'sorbitan oleate': {synonyms: [], maxPercentage: None},
  'steareth-10': {synonyms: [], maxPercentage: None},
  'steareth-20': {synonyms: [], maxPercentage: None},
  'stearic acid': {synonyms: [], maxPercentage: None},
  'stearic acid: tea': {synonyms: [], maxPercentage: None},
  'stearyl alcohol': {synonyms: [], maxPercentage: None},
  'stearyl heptanoate': {synonyms: [], maxPercentage: None},
  'sulfulated jojoba oil': {synonyms: [], maxPercentage: None},
  'sweet almond oil': {synonyms: [], maxPercentage: None},
  'water-soluble sulfur': {synonyms: [], maxPercentage: None},
  'wheat germ glyceride': {synonyms: [], maxPercentage: None},
  'wheat germ oil': {synonyms: [], maxPercentage: None},
  'tocopherol': {synonyms: [], maxPercentage: 10},
  'triethanoleamine': {synonyms: [], maxPercentage: None},
  'vitamin a palmitate': {synonyms: [], maxPercentage: None},
  'vitamin e': {synonyms: [], maxPercentage: 10},
  'vitis vinifera (grapeseed) oil': {synonyms: ['grapeseed oil', 'vitis vinifera', 'vitis vinifera oil'], maxPercentage: None}
};

const App = () => {
  const [ingredients, setIngredients] = useState('');
  const [violations, setViolations] = useState([]);

  // Function to validate ingredients and percentages
// Function to validate ingredients and percentages
const validateIngredients = (ingredientList) => {
  const violations = [];

  // Splitting and parsing input to extract ingredient names and their percentages if available
  const ingredientArray = ingredientList.split(',').map(item => item.trim());
  console.log(ingredientArray)
  ingredientArray.forEach(entry => {
    // Check for percentages; assumes format like "IngredientName 5%" or just "IngredientName"
    const match = entry.match(/(.+?)\s*([\d.]+%)?$/);
    if (match) {
      const ingredient = match[1].trim().toLowerCase();
      const percentageValue = match[2] ? parseFloat(match[2]) : null;

      // Check exact matches and synonyms, and handle presence without specific percentage
      checkIngredientViolation(ingredient, percentageValue, violations);
    }
  });

  return violations;
};

const checkIngredientViolation = (ingredient, percentageValue, violations) => {
  // Check exact matches, converting keys to lowercase for case-insensitive match
  const normalizedIngredient = ingredient.toLowerCase();
  
  if (forbiddenIngredients[normalizedIngredient]) {
    const { maxPercentage } = forbiddenIngredients[normalizedIngredient];
    if (maxPercentage !== null && percentageValue !== null && percentageValue > maxPercentage) {
      violations.push(`${ingredient} exceeds the allowed limit of ${maxPercentage}%`);
    } else if (maxPercentage === null) {
      violations.push(`${ingredient} is not allowed`);
    }
  }

  // Check synonyms, ensuring case-insensitivity
  Object.entries(forbiddenIngredients).forEach(([key, value]) => {
    const normalizedKey = key.toLowerCase();
    if (value.synonyms.map(s => s.toLowerCase()).includes(normalizedIngredient)) {
      const { maxPercentage } = value;
      if (maxPercentage !== null && percentageValue !== null && percentageValue > maxPercentage) {
        violations.push(`${ingredient} (synonym for ${key}) exceeds the allowed limit of ${maxPercentage}%`);
      } else if (maxPercentage === null) {
        violations.push(`${ingredient} (synonym for ${key}) is not allowed`);
      }
    }
  });
};


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const violationsList = validateIngredients(ingredients);
    setViolations(violationsList);
  };

  return (
    <div className="App">
      <h2>Ingredient Checker</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Ingredients in product:</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. Cera alba 5%, Coconut butter, Vitamin E 15"
          />
        </div>
        <button type="submit">Check Ingredients</button>
      </form>
      {violations.length > 0 ? (
        <div className="violations">
          <h2>Violations Found:</h2>
          <ul>
            {violations.map((violation, index) => (
              <li key={index}>{violation}</li>
            ))}
          </ul>
        </div>
      ) : (
        ingredients && (
          <div className="no-violations">
            <h2>No Violations Detected</h2>
          </div>
        )
      )}
    </div>
  );
};

export default App;