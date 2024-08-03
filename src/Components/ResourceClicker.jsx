import React from 'react';
import { Button } from './Button';

const ResourceClicker = ({ resource, onClick }) => {
  return (
    <Button onClick={onClick} className="resource-clicker">
      Collect {resource.charAt(0).toUpperCase() + resource.slice(1)}
    </Button>
  );
};

export default ResourceClicker;

