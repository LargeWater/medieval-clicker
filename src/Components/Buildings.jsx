import React from 'react';

const Buildings = ({ resources, buildings, upgrades, onBuildingPurchase, costs }) => {
  return (
    <div className="buildings">
      <h2>Buildings</h2>
      <button
        onClick={() => onBuildingPurchase('autoLogger')}
        disabled={resources.wood < costs.autoLogger.wood || resources.stone < costs.autoLogger.stone}
      >
        Build Woodcutter (Cost: 50 Wood, 20 Stone)
      </button>
      <button
        onClick={() => onBuildingPurchase('autoMiner')}
        disabled={resources.stone < costs.autoMiner.stone || resources.iron < costs.autoMiner.iron}
      >
        Build Quarry (Cost: 50 Stone, 20 Iron)
      </button>
      <button
        onClick={() => onBuildingPurchase('autoIron')}
        disabled={resources.stone < costs.autoIron.stone || resources.iron < costs.autoIron.iron || resources.wood < costs.autoIron.wood}
      >
        Build Iron Deposit (Cost: 50 Stone, 50 Wood, 20 Iron)
      </button>
      <button
        onClick={() => onBuildingPurchase('autoFarmer')}
        disabled={resources.food < costs.autoFarmer.food || resources.wood < costs.autoFarmer.wood}
      >
        Build Farm (Cost: 50 Food, 20 Wood)
      </button>
      <button
        onClick={() => onBuildingPurchase('autoShepherd')}
        disabled={resources.wool < costs.autoShepherd.wool || resources.food < costs.autoShepherd.food}
      >
        Build Sheep Pasture (Cost: 50 Wool, 20 Food)
      </button>
    </div>
  );
};

export default Buildings;
