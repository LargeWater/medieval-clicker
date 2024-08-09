import '@sumup/design-tokens/dark.css';
import '@sumup/circuit-ui/styles.css';
import React, { useState, useEffect } from 'react';
import ResourceClicker from './Components/ResourceClicker';
// import ResourceDisplay from './Components/ResourceDisplay';
import Buildings from './Components/Buildings';
import './App.css';
import { Display } from './Components/Display';

const App = () => {
  const [resources, setResources] = useState({
    wood: 0,
    stone: 0,
    iron: 0,
    food: 0,
    wool: 0,
  });

  const [upgrades, setUpgrades] = useState({
    stoneUnlocked: false,
    ironUnlocked: false,
    foodUnlocked: false,
    woolUnlocked: false,
  });

  const [buildings, setBuildings] = useState({
    autoLogger: 0,
    autoMiner: 0,
    autoIron: 0,
    autoFarmer: 0,
    autoShepherd: 0,
  });

  const [costs] = useState({
    autoLogger: { wood: 50, stone: 20 },
    autoMiner: { stone: 50, iron: 20 },
    autoIron: { wood: 50, stone: 50, iron: 20 },
    autoFarmer: { food: 50, wood: 20 },
    autoShepherd: { wool: 50, food: 20 },
  });

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('medievalSettlerGameState'));
    if (savedState) {
      setResources(savedState.resources);
      setUpgrades(savedState.upgrades);
      setBuildings(savedState.buildings);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('medievalSettlerGameState', JSON.stringify({ resources, buildings, upgrades }));
  }, [resources, buildings, upgrades]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setResources((prev) => ({
        wood: prev.wood + buildings.autoLogger,
        stone: prev.stone + buildings.autoMiner,
        iron: prev.iron + buildings.autoIron,
        food: prev.food + buildings.autoFarmer,
        wool: prev.wool + buildings.autoShepherd,
      }));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [buildings]);

  const handleResourceClick = (resource) => {
    setResources((prev) => ({ ...prev, [resource]: prev[resource] + 1 }));

    if (resource === 'wood' && resources.wood + 1 >= 50 && !upgrades.stoneUnlocked) {
      setUpgrades((prev) => ({ ...prev, stoneUnlocked: true }));
    } else if (resource === 'stone' && resources.stone + 1 >= 50 && !upgrades.ironUnlocked) {
      setUpgrades((prev) => ({ ...prev, ironUnlocked: true }));
    } else if (resource === 'iron' && resources.iron + 1 >= 50 && !upgrades.foodUnlocked) {
      setUpgrades((prev) => ({ ...prev, foodUnlocked: true }));
    } else if (resource === 'food' && resources.food + 1 >= 50 && !upgrades.woolUnlocked) {
      setUpgrades((prev) => ({ ...prev, woolUnlocked: true }));
    }
  };

  const handleBuildingPurchase = (building) => {
    if (building === 'autoLogger' && resources.wood >= costs.autoLogger.wood && resources.stone >= costs.autoLogger.stone) {
      setResources((prev) => ({
        wood: prev.wood - costs.autoLogger.wood,
        stone: prev.stone - costs.autoLogger.stone,
        iron: prev.iron,
        food: prev.food,
        wool: prev.wool,
      }));
      setBuildings((prev) => ({ ...prev, autoLogger: buildings.autoLogger + 1 }));
    }

    if (building === 'autoMiner' && resources.stone >= costs.autoMiner.stone && resources.iron >= costs.autoMiner.iron) {
      setResources((prev) => ({
        wood: prev.wood,
        stone: prev.stone - costs.autoMiner.stone,
        iron: prev.iron - costs.autoMiner.iron,
        food: prev.food,
        wool: prev.wool,
      }));
      setBuildings((prev) => ({ ...prev, autoMiner: buildings.autoMiner + 1 }));
    }

    if (building === 'autoIron' && resources.stone >= costs.autoIron.stone && resources.iron >= costs.autoIron.iron && resources.wood >= costs.autoIron.wood) {
      setResources((prev) => ({
        wood: prev.wood - costs.autoIron.wood,
        stone: prev.stone - costs.autoIron.stone,
        iron: prev.iron - costs.autoIron.iron,
        food: prev.food,
        wool: prev.wool,
      }));
      setBuildings((prev) => ({ ...prev, autoIron: buildings.autoIron + 1 }));
    }

    if (building === 'autoFarmer' && resources.food >= costs.autoFarmer.food && resources.wood >= costs.autoFarmer.wood) {
      setResources((prev) => ({
        wood: prev.wood - costs.autoFarmer.wood,
        stone: prev.stone,
        iron: prev.iron,
        food: prev.food - costs.autoFarmer.food,
        wool: prev.wool,
      }));
      setBuildings((prev) => ({ ...prev, autoFarmer: buildings.autoFarmer + 1 }));
    }

    if (building === 'autoShepherd' && resources.wool >= costs.autoShepherd.wool && resources.food >= costs.autoShepherd.food) {
      setResources((prev) => ({
        wood: prev.wood,
        stone: prev.stone,
        iron: prev.iron,
        food: prev.food - costs.autoShepherd.food,
        wool: prev.wool - costs.autoShepherd.wool,
      }));
      setBuildings((prev) => ({ ...prev, autoShepherd: buildings.autoShepherd + 1 }));
    }
  };

  return (
    <div className="game-container">
      <h1>Medieval Clicker</h1>
      <div className="resource-clickers">
        <ResourceClicker resource="wood" onClick={() => handleResourceClick('wood')} />
        {upgrades.stoneUnlocked && <ResourceClicker resource="stone" onClick={() => handleResourceClick('stone')} />}
        {upgrades.ironUnlocked && <ResourceClicker resource="iron" onClick={() => handleResourceClick('iron')} />}
        {upgrades.foodUnlocked && <ResourceClicker resource="food" onClick={() => handleResourceClick('food')} />}
        {upgrades.woolUnlocked && <ResourceClicker resource="wool" onClick={() => handleResourceClick('wool')} />}
      </div>
      {/* <ResourceDisplay resources={resources} /> */}
      <Display resources={resources} />
      <Buildings resources={resources} upgrades={upgrades} buildings={buildings} onBuildingPurchase={handleBuildingPurchase} costs={costs} />
    </div>
  );
};

export default App;
