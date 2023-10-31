import React, { useState } from 'react';

const TagForm = () => {
  const [name, setName] = useState('');
  const [rfidTags, setRfidTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a POST request to your backend to save data to MongoDB.
    const data = { name, rfidTags };
    try {
      const response = await fetch('/api/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        // Handle success
      } else {
        // Handle error
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          RFID Tags (comma-separated):
          <input type="text" value={rfidTags} onChange={(e) => setRfidTags(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TagForm;
