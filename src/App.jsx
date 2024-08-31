import React, { useState } from 'react';
import './App.css';

// Define the forbidden ingredients with synonyms and maximum percentages
const forbiddenIngredients = {
  'beeswax': {synonyms: ['cera alba'], maxPercentage: null},
  'flaxseed oil': {synonyms: [], maxPercentage: null},
  'capric acid': {synonyms: [], maxPercentage: null},
  'cocoa butter': {synonyms: [], maxPercentage: null},
  'coconut oil': {synonyms: ['coconut alkanes', 'coconut butter', 'cocos nucifera'], maxPercentage: null},
  'corn oil': {synonyms: [], maxPercentage: null},
  'cotton seed oil': {synonyms: [], maxPercentage: null},
  'eicosanoic acid': {synonyms: [], maxPercentage: null},
  'ethylhexyl palmitate': {synonyms: [], maxPercentage: null},
  'ethylhexyl pelargonate': {synonyms: [], maxPercentage: null},
  'evening primrose oil': {synonyms: [], maxPercentage: null},
  'decyl oleate': {synonyms: [], maxPercentage: null},
  'di (2 ethylhexyl) succinate': {synonyms: ['di succinate', 'disuccinate', '2 ethylhexyl'], maxPercentage: null},
  'dioctyl malate': {synonyms: [], maxPercentage: null},
  'dioctyl succinate': {synonyms: [], maxPercentage: null},
  'a & d additive': {synonyms: ['a additive', 'd additive'], maxPercentage: null},
  'acetylated lanolin alcohol': {synonyms: [], maxPercentage: null},
  'almond oil': {synonyms: ['prunus amygdalus dulcis', 'prunus dulcis (almond) oil'], maxPercentage: null},
  'apricot kernel oil': {synonyms: [], maxPercentage: null},
  'ascorbyl palmitate': {synonyms: [], maxPercentage: null},
  'avocado oil': {synonyms: ['persea gratissima (avocado) oil'], maxPercentage: null},
  'laneth-10': {synonyms: [], maxPercentage: null},
  'lanolic acid': {synonyms: [], maxPercentage: null},
  'lanolin alcohol': {synonyms: [], maxPercentage: null},
  'laureth-23': {synonyms: [], maxPercentage: null},
  'laureth-4': {synonyms: [], maxPercentage: null},
  'lauric acid': {synonyms: [], maxPercentage: null},
  'linoleic acid': {synonyms: [], maxPercentage: null},
  'linolenic acid': {synonyms: [], maxPercentage: null},
  'linseed oil': {synonyms: [], maxPercentage: null},
  'mineral oil': {synonyms: [], maxPercentage: null},
  'mink oil': {synonyms: [], maxPercentage: null},
  'myreth-3 myristate': {synonyms: [], maxPercentage: null},
  'myristic acid': {synonyms: [], maxPercentage: null},
  'myristyl alcohol': {synonyms: [], maxPercentage: null},
  'isocetyl alcohol': {synonyms: [], maxPercentage: null},
  'isodecyl oleate': {synonyms: [], maxPercentage: null},
  'isopropyl isostearate': {synonyms: [], maxPercentage: null},
  'isopropyl lanolate': {synonyms: [], maxPercentage: null},
  'isopropyl linolate': {synonyms: [], maxPercentage: null},
  'isopropyl myristate': {synonyms: [], maxPercentage: null},
  'isopropyl neopentanoate': {synonyms: [], maxPercentage: null},
  'isopropyl palmitate': {synonyms: [], maxPercentage: null},
  'isostearic acid': {synonyms: [], maxPercentage: null},
  'isostearyl alcohol': {synonyms: [], maxPercentage: null},
  'isostearyl isostearate': {synonyms: [], maxPercentage: null},
  'isostearyl neopentanoate': {synonyms: [], maxPercentage: null},
  'glyceryl stearate se': {synonyms: [], maxPercentage: null},
  'glyceryl-3-diisostearate': {synonyms: [], maxPercentage: null},
  'glycine soya (soybean) oil': {synonyms: ['soybean oil', 'glycine soya oil', 'soya oil'], maxPercentage: null},
  'grapeseed oil': {synonyms: ['vitis vinifera (grapeseed) oil', 'vitis vinifera', 'vitis vinifera oil'], maxPercentage: null},
  'hexylene glycol': {synonyms: [], maxPercentage: null},
  'hydrogenated vegetable oil': {synonyms: [], maxPercentage: null},
  'myristyl lactate': {synonyms: [], maxPercentage: null},
  'myristyl myristate': {synonyms: [], maxPercentage: null},
  'palm oil': {synonyms: [], maxPercentage: null},
  'palmitic acid': {synonyms: [], maxPercentage: null},
  'peach kernel oil': {synonyms: [], maxPercentage: null},
  'peanut oil': {synonyms: [], maxPercentage: null},
  'peg 100 distearate': {synonyms: [], maxPercentage: null},
  'peg 150 distearate': {synonyms: [], maxPercentage: null},
  'peg 16 lanolin': {synonyms: [], maxPercentage: null},
  'peg 200 dilaurate': {synonyms: [], maxPercentage: null},
  'peg 8 stearate': {synonyms: [], maxPercentage: null},
  'pentaerythrital tetraisostearate': {synonyms: [], maxPercentage: null},
  'pg caprylate/caprate': {synonyms: [], maxPercentage: null},
  'pg dipelargonate': {synonyms: [], maxPercentage: null},
  'pg monostearate': {synonyms: [], maxPercentage: null},
  'phytanriol': {synonyms: [], maxPercentage: null},
  'polyglyceryl-3-diisostearate': {synonyms: [], maxPercentage: null},
  'ppg 10 cetyl ether': {synonyms: [], maxPercentage: null},
  'ppg 12 peg 65 lanolin oil': {synonyms: [], maxPercentage: null},
  'ppg 2 myristyl propionate': {synonyms: [], maxPercentage: null},
  'ppg 5 ceteth 10 phosphate': {synonyms: [], maxPercentage: null},
  'prunus amygdalus dulcis': {synonyms: ['almond oil', 'prunus dulcis (almond) oil'], maxPercentage: null},
  'octyl palmitate': {synonyms: [], maxPercentage: null},
  'octyl stearate': {synonyms: [], maxPercentage: null},
  'octyldodecanol': {synonyms: [], maxPercentage: null},
  'olea europaea (olive) fruit oil': {synonyms: ['olive oil','olea europaea','olea europaea fruit', 'olea europaea fruit oil'], maxPercentage: null},
  'oleth-10': {synonyms: [], maxPercentage: null},
  'oleth-3': {synonyms: [], maxPercentage: null},
  'oleth-3 phosphate': {synonyms: [], maxPercentage: null},
  'oleth-5': {synonyms: [], maxPercentage: null},
  'oleyl alcohol': {synonyms: [], maxPercentage: null},
  'xylene': {synonyms: [], maxPercentage: null},
  'sandalwood seed oil': {synonyms: [], maxPercentage: null},
  'sesame oil': {synonyms: [], maxPercentage: null},
  'shark liver oil': {synonyms: [], maxPercentage: null},
  'sorbitan isostearate': {synonyms: [], maxPercentage: null},
  'sorbitan laurate': {synonyms: [], maxPercentage: null},
  'sorbitan oleate': {synonyms: [], maxPercentage: null},
  'steareth-10': {synonyms: [], maxPercentage: null},
  'steareth-20': {synonyms: [], maxPercentage: null},
  'stearic acid': {synonyms: [], maxPercentage: null},
  'stearic acid: tea': {synonyms: [], maxPercentage: null},
  'stearyl alcohol': {synonyms: [], maxPercentage: null},
  'stearyl heptanoate': {synonyms: [], maxPercentage: null},
  'sulfulated jojoba oil': {synonyms: [], maxPercentage: null},
  'sweet almond oil': {synonyms: [], maxPercentage: null},
  'water-soluble sulfur': {synonyms: [], maxPercentage: null},
  'wheat germ glyceride': {synonyms: [], maxPercentage: null},
  'wheat germ oil': {synonyms: [], maxPercentage: null},
  'tocopherol': {synonyms: [], maxPercentage: 10},
  'triethanoleamine': {synonyms: [], maxPercentage: null},
  'vitamin a palmitate': {synonyms: [], maxPercentage: null},
  'vitamin e': {synonyms: [], maxPercentage: 10},
  'vitis vinifera (grapeseed) oil': {synonyms: ['grapeseed oil', 'vitis vinifera', 'vitis vinifera oil'], maxPercentage: null}
};

const App = () => {
  const [ingredients, setIngredients] = useState('');
  const [violations, setViolations] = useState([]);
  const [clicked, setClicked] = useState(false); // Use state for handling click

  const validateIngredients = (ingredientList) => {
    const violations = [];
    
    // Splitting and parsing input to extract ingredient names and their percentages if available
    const ingredientArray = ingredientList.split(',').map(item => item.trim());
  
    
    ingredientArray.forEach(entry => {
      // Update regex to handle percentages with or without the '%' symbol
      const match = entry.match(/(.+?)\s*([\d.]+%?)$/);
      
      if (match) {
        const ingredient = match[1].trim().toLowerCase();
        // Extract percentage value and convert to number, default to null if not present
        const percentageValue = match[2] ? parseFloat(match[2].replace('%', '')) : null;
        
        // Check exact matches and synonyms, and handle presence without specific percentage
        checkIngredientViolation(ingredient, percentageValue, violations);
      }
      else {
        const ingredient = entry.trim().toLowerCase();
        const percentageValue = null;
        checkIngredientViolation(ingredient, percentageValue, violations);
      }
    });
    
    return violations;
  };
  
  
  
  const capitalizeEachWord = (sentence) => {
    return sentence
      .split(' ') // Split the sentence into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word and make the rest lowercase
      .join(' '); // Join the words back into a sentence
  };

  const checkIngredientViolation = (ingredient, percentageValue, violations) => {
    // Check exact matches, converting keys to lowercase for case-insensitive match
    const normalizedIngredient = ingredient.toLowerCase();
    
    if (forbiddenIngredients[normalizedIngredient]) {
      const { maxPercentage } = forbiddenIngredients[normalizedIngredient];
      
      if (maxPercentage !== null) {
        // Only perform percentage check if maxPercentage is not null
        if (percentageValue !== null && percentageValue > maxPercentage) {
          violations.push(`${capitalizeEachWord(ingredient)} exceeds the allowed limit of ${maxPercentage}%`);
        } else if (percentageValue === null) {
          violations.push(`${capitalizeEachWord(ingredient)} is not allowed`);
        }
      } else {
        // If maxPercentage is null, the ingredient is not allowed regardless of percentage
        violations.push(`${capitalizeEachWord(ingredient)} is not allowed`);
      }
    }
    
    // Check synonyms, ensuring case-insensitivity
    Object.entries(forbiddenIngredients).forEach(([key, value]) => {
      const normalizedKey = key.toLowerCase();
      if (value.synonyms.map(s => s.toLowerCase()).includes(normalizedIngredient)) {
        const { maxPercentage } = value;
        if (maxPercentage !== null) {
          if (percentageValue !== null && percentageValue > maxPercentage) {
            violations.push(`${capitalizeEachWord(ingredient)} exceeds the allowed limit of ${maxPercentage}%`);
          } else if (percentageValue === null) {
            violations.push(`${capitalizeEachWord(ingredient)} is not allowed`);
          }
        } else {
          // If maxPercentage is null, the ingredient is not allowed regardless of percentage
          violations.push(`${capitalizeEachWord(ingredient)} is not allowed`);
        }
      }
    });
  };
  
  

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const violationsList = validateIngredients(ingredients);
    setViolations(violationsList);
    setClicked(true); // Use state update
  };

  return (
    <div className="App">
      <div className='main'>
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
      </div>
      <div className='results'>
        {clicked && (violations.length > 0 ? (
          <div className="violations">
            <h2>Found not-safe ingredients:</h2>
            <ul>
              {violations.map((violation, index) => (
                <li key={index}>{violation}</li>
              ))}
            </ul>
          </div>
        ) : (
          ingredients && (
            <div className="no-violations">
              <h2>Safe Product</h2>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default App;