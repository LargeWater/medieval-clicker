import React from 'react';
import { Card } from '@sumup/circuit-ui';

const ResourceDisplay = ({ resources }) => {
  return (
    <div className="resource-display">
      {/* <p>Wood: {resources.wood}</p>
      <p>Stone: {resources.stone}</p>
      <p>Iron: {resources.iron}</p>
      <p>Food: {resources.food}</p>
      <p>Wool: {resources.wool}</p> */}
      <Card>Wood: {resources.wood}</Card>
      <Card>Stone: {resources.stone}</Card>
      <Card>Iron: {resources.iron}</Card>
      <Card>Food: {resources.food}</Card>
      <Card>Wool: {resources.wool}</Card>
    </div>
  );
};

export default ResourceDisplay;

