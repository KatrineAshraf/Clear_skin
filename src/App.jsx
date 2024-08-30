import React, { useState } from 'react';
import './App.css';

// Define the forbidden ingredients with synonyms and maximum percentages
const forbiddenIngredients = {
  'Beeswax': {
    synonyms: ['Cera alba'],
    maxPercentage: null
  },
  'Flaxseed oil': {synonyms: [], maxPercentage: null},
  'Capric acid': {synonyms: [], maxPercentage: null},
  'Cocoa butter': {synonyms: [], maxPercentage: null},
  'Coconut oil': {
    synonyms: ['Coconut alkanes', 'Coconut butter', 'Cocos nucifera'],
    maxPercentage: null,
  },
  'Corn oil': {synonyms: [], maxPercentage: null},
  'Cotton seed oil': {synonyms: [], maxPercentage: null},
  'Eicosanoic acid': {synonyms: [], maxPercentage: null},
  'Ethylhexyl palmitate': {synonyms: [], maxPercentage: null},
  'Ethylhexyl pelargonate': {synonyms: [], maxPercentage: null},
  'Evening primrose oil': {synonyms: [], maxPercentage: null},
  'Decyl oleate': {synonyms: [], maxPercentage: null},
  'Di (2 ethylhexyl) succinate': {
    synonyms: ['Di succinate', 'Disuccinate', '2 ethylhexyl'],
    maxPercentage: null
  },
  'Dioctyl malate': {synonyms: [], maxPercentage: null},
  'Dioctyl succinate': {synonyms: [], maxPercentage: null},
  'A & D additive': {
    synonyms: ['A additive', 'D additive'],
    maxPercentage: null
  },
  'Acetylated lanolin alcohol': {synonyms: [], maxPercentage: null},
  'Almond oil': {
    synonyms: ['Prunus amygdalus dulcis', 'Prunus dulcis (almond) oil'],
    maxPercentage: null
  },
  'Apricot kernel oil': {synonyms: [], maxPercentage: null},
  'Ascorbyl palmitate': {synonyms: [], maxPercentage: null},
  'Avocado oil': {
    synonyms: ['Persea gratissima (avocado) oil'],
    maxPercentage: null
  },
  'Laneth-10': {synonyms: [], maxPercentage: null},
  'Lanolic acid': {synonyms: [], maxPercentage: null},
  'Lanolin alcohol': {synonyms: [], maxPercentage: null},
  'Laureth-23': {synonyms: [], maxPercentage: null},
  'Laureth-4': {synonyms: [], maxPercentage: null},
  'Lauric acid': {synonyms: [], maxPercentage: null},
  'Linoleic acid': {synonyms: [], maxPercentage: null},
  'Linolenic acid': {synonyms: [], maxPercentage: null},
  'Linseed oil': {synonyms: [], maxPercentage: null},
  'Mineral oil': {synonyms: [], maxPercentage: null},
  'Mink oil': {synonyms: [], maxPercentage: null},
  'Myreth-3 myristate': {synonyms: [], maxPercentage: null},
  'Myristic acid': {synonyms: [], maxPercentage: null},
  'Myristyl alcohol': {synonyms: [], maxPercentage: null},
  'Isocetyl alcohol': {synonyms: [], maxPercentage: null},
  'Isodecyl oleate': {synonyms: [], maxPercentage: null},
  'Isopropyl isostearate': {synonyms: [], maxPercentage: null},
  'Isopropyl lanolate': {synonyms: [], maxPercentage: null},
  'Isopropyl linolate': {synonyms: [], maxPercentage: null},
  'Isopropyl myristate': {synonyms: [], maxPercentage: null},
  'Isopropyl neopentanoate': {synonyms: [], maxPercentage: null},
  'Isopropyl palmitate': {synonyms: [], maxPercentage: null},
  'Isostearic acid': {synonyms: [], maxPercentage: null},
  'Isostearyl alcohol': {synonyms: [], maxPercentage: null},
  'Isostearyl isostearate': {synonyms: [], maxPercentage: null},
  'Isostearyl neopentanoate': {synonyms: [], maxPercentage: null},
  'Glyceryl stearate SE': {synonyms: [], maxPercentage: null},
  'Glyceryl-3-diisostearate': {synonyms: [], maxPercentage: null},
  'Glycine soya (soybean) oil': {
    synonyms: ['Soybean oil', 'Glycine soya oil', 'soya oil'],
    maxPercentage: null
  },
  'Grapeseed oil': {
    synonyms: [
      'Vitis vinifera (grapeseed) oil',
      'Vitis vinifera',
      'Vitis vinifera oil'
    ],
    maxPercentage: null
  },
  'Hexylene glycol': {synonyms: [], maxPercentage: null},
  'Hydrogenated vegetable oil': {synonyms: [], maxPercentage: null},
  'Myristyl lactate': {synonyms: [], maxPercentage: null},
  'Myristyl myristate': {synonyms: [], maxPercentage: null},
  'Palm oil': {synonyms: [], maxPercentage: null},
  'Palmitic acid': {synonyms: [], maxPercentage: null},
  'Peach kernel oil': {synonyms: [], maxPercentage: null},
  'Peanut oil': {synonyms: [], maxPercentage: null},
  'PEG 100 distearate': {synonyms: [], maxPercentage: null},
  'PEG 150 distearate': {synonyms: [], maxPercentage: null},
  'PEG 16 lanolin': {synonyms: [], maxPercentage: null},
  'PEG 200 dilaurate': {synonyms: [], maxPercentage: null},
  'PEG 8 stearate': {synonyms: [], maxPercentage: null},
  'Pentaerythrital tetraisostearate': {synonyms: [], maxPercentage: null},
  'PG caprylate/caprate': {synonyms: [], maxPercentage: null},
  'PG dipelargonate': {synonyms: [], maxPercentage: null},
  'PG monostearate': {synonyms: [], maxPercentage: null},
  'Phytanriol': {synonyms: [], maxPercentage: null},
  'Polyglyceryl-3-diisostearate': {synonyms: [], maxPercentage: null},
  'PPG 10 cetyl ether': {synonyms: [], maxPercentage: null},
  'PPG 12 PEG 65 lanolin oil': {synonyms: [], maxPercentage: null},
  'PPG 2 myristyl propionate': {synonyms: [], maxPercentage: null},
  'PPG 5 Ceteth 10 phosphate': {synonyms: [], maxPercentage: null},
  'Prunus amygdalus dulcis': {
    synonyms: ['Almond oil', 'Prunus dulcis (almond) oil'],
    maxPercentage: null
  },
  'Octyl palmitate': {synonyms: [], maxPercentage: null},
  'Octyl stearate': {synonyms: [], maxPercentage: null},
  'Octyldodecanol': {synonyms: [], maxPercentage: null},
  'Olea europaea (olive) fruit oil': {
    synonyms: ['Olive oil'],
    maxPercentage: null
  },
  'Oleth-10': {synonyms: [], maxPercentage: null},
  'Oleth-3': {synonyms: [], maxPercentage: null},
  'Oleth-3 phosphate': {synonyms: [], maxPercentage: null},
  'Oleth-5': {synonyms: [], maxPercentage: null},
  'Oleyl alcohol': {synonyms: [], maxPercentage: null},
  'Xylene': {synonyms: [], maxPercentage: null},
  'Sandalwood seed oil': {synonyms: [], maxPercentage: null},
  'Sesame oil': {synonyms: [], maxPercentage: null},
  'Shark liver oil': {synonyms: [], maxPercentage: null},
  'Sorbitan isostearate': {synonyms: [], maxPercentage: null},
  'Sorbitan laurate': {synonyms: [], maxPercentage: null},
  'Sorbitan oleate': {synonyms: [], maxPercentage: null},
  'Steareth-10': {synonyms: [], maxPercentage: null},
  'Steareth-20': {synonyms: [], maxPercentage: null},
  'Stearic acid': {synonyms: [], maxPercentage: null},
  'Stearic acid: TEA': {synonyms: [], maxPercentage: null},
  'Stearyl alcohol': {synonyms: [], maxPercentage: null},
  'Stearyl heptanoate': {synonyms: [], maxPercentage: null},
  'Sulfulated jojoba oil': {synonyms: [], maxPercentage: null},
  'Sweet almond oil': {synonyms: [], maxPercentage: null},
  'Water-soluble sulfur': {synonyms: [], maxPercentage: null},
  'Wheat germ glyceride': {synonyms: [], maxPercentage: null},
  'Wheat germ oil': {synonyms: [], maxPercentage: null},
  'Tocopherol': {synonyms: [], maxPercentage: 10},
  'Triethanoleamine': {synonyms: [], maxPercentage: null},
  'Vitamin A palmitate': {synonyms: [], maxPercentage: null},
  'Vitamin E': {synonyms: [], maxPercentage: 10},
  'Vitis vinifera (grapeseed) oil': {
    synonyms: ['Grapeseed oil', 'Vitis vinifera', 'Vitis vinifera oil'],
    maxPercentage: null
  },
};

const App = () => {
  const [ingredients, setIngredients] = useState('');
  const [violations, setViolations] = useState([]);

  // Function to validate ingredients and percentages
  const validateIngredients = (ingredientList) => {
    const violations = [];
    
    // Splitting and parsing input to extract ingredient names and their percentages if available
    const ingredientArray = ingredientList.split(',').map(item => item.trim());
    ingredientArray.forEach(entry => {
      const [ingredient, percentage] = entry.split(/\s+/);
      const percentageValue = parseFloat(percentage);

      // Check exact matches and synonyms, and handle presence without specific percentage
      checkIngredientViolation(ingredient, percentageValue, violations);
    });

    return violations;
  };

  const checkIngredientViolation = (ingredient, percentageValue, violations) => {
    // Check exact matches
    if (forbiddenIngredients[ingredient]) {
      const { maxPercentage } = forbiddenIngredients[ingredient];
      if (maxPercentage !== null && !isNaN(percentageValue) && percentageValue > maxPercentage) {
        violations.push(`${ingredient} exceeds the allowed limit of ${maxPercentage}%`);
      } else if (maxPercentage === null) {
        violations.push(`${ingredient} is not allowed`);
      }
    }

    // Check synonyms
    Object.entries(forbiddenIngredients).forEach(([key, value]) => {
      if (value.synonyms.includes(ingredient)) {
        const { maxPercentage } = value;
        if (maxPercentage !== null && !isNaN(percentageValue) && percentageValue > maxPercentage) {
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