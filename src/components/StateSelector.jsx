import React from 'react';
import indianStatesData from '../data/indianStatesData.json';

export default function StateSelector({ selectedState, onStateChange }) {
  return (
    <div className="selector-container">
      <select 
        className="state-select"
        value={selectedState?.id || ''} 
        onChange={(e) => {
          const stateObj = indianStatesData.find(s => s.id === e.target.value);
          onStateChange(stateObj);
        }}
      >
        <option value="" disabled>Select an Indian State...</option>
        {indianStatesData.map(state => (
          <option key={state.id} value={state.id}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
  );
}
