import React, { useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const LocationPicker = () => {
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');

  return (
    <div>
      <h2>Pick your location:</h2>
      <CountryDropdown
        value={country}
        onChange={(val) => setCountry(val)}
        className="form-control"
      />
      <RegionDropdown
        country={country}
        value={region}
        onChange={(val) => setRegion(val)}
        className="form-control mt-2"
      />
    </div>
  );
};

export default LocationPicker;
