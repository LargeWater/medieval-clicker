import React from 'react';

const ResourceDisplay = ({ resources }) => {
  return (
    <div className="resource-display">
      <p>Wood: {resources.wood}</p>
      <p>Stone: {resources.stone}</p>
      <p>Iron: {resources.iron}</p>
      <p>Food: {resources.food}</p>
      <p>Wool: {resources.wool}</p>
    </div>
  );
};

export default ResourceDisplay;

