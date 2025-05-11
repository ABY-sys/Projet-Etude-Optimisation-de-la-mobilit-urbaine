import React from 'react';

const AddressInput = ({ label, value, onChange, autocompleteList, onSelect }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <input
      type="text"
      className="form-control"
      value={value}
      onChange={onChange}
    />
    <ul className="autocomplete-list">
      {autocompleteList.map((place) => (
        <li key={place.place_id} onClick={() => onSelect(place.description)}>
          {place.description}
        </li>
      ))}
    </ul>
  </div>
);

export default AddressInput;
