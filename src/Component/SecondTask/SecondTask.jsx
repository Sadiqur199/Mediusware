import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SecondTask = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [usContacts, setUsContacts] = useState([]);
  const [showAllContactsModal, setShowAllContactsModal] = useState(false);
  const [showUsContactsModal, setShowUsContactsModal] = useState(false);
  const [showContactDetailsModal, setShowContactDetailsModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [onlyEven, setOnlyEven] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://contact.mediusware.com/api/contacts').then((response) => {
      setAllContacts(response.data);
    });

    axios.get('https://contact.mediusware.com/api/country-contacts/bangladesh').then((response) => {
      setUsContacts(response.data);
    });
  }, []);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowContactDetailsModal(true);
  };

  const handleToggleEvenCheckbox = () => {
    setOnlyEven(!onlyEven);
  };

  const filterContacts = (contacts) => {
    return contacts
      .filter((contact) => (!onlyEven || contact.id % 2 === 0))
      .filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        <button
          className="bg-purple-800 text-white px-4 py-2 rounded"
          onClick={() => setShowAllContactsModal(true)}
        >
          All Contacts
        </button>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded"
          onClick={() => setShowUsContactsModal(true)}
        >
          US Contacts
        </button>
      </div>

      {showAllContactsModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 w-1/2">
            <input
              type="text"
              placeholder="Search contacts..."
              className="border p-2 w-full mb-4"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filterContacts(allContacts).map((contact) => (
              <div key={contact.id} onClick={() => handleContactClick(contact)}>
                {contact.name} - {contact.country}
              </div>
            ))}
            <div className="mt-4">
              <input
                type="checkbox"
                id="onlyEvenCheckbox"
                checked={onlyEven}
                onChange={handleToggleEvenCheckbox}
              />
              <label htmlFor="onlyEvenCheckbox">Only even</label>
            </div>
            <button
              className="bg-purple-800 text-white px-4 py-2 rounded mt-4"
              onClick={() => setShowAllContactsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showUsContactsModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 w-1/2">
            <input
              type="text"
              placeholder="Search contacts..."
              className="border p-2 w-full mb-4"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filterContacts(usContacts).map((contact) => (
              <div key={contact.id} onClick={() => handleContactClick(contact)}>
                {contact.name} - {contact.country}
              </div>
            ))}
            <div className="mt-4">
              <input
                type="checkbox"
                id="onlyEvenCheckbox"
                checked={onlyEven}
                onChange={handleToggleEvenCheckbox}
              />
              <label htmlFor="onlyEvenCheckbox">Only even</label>
            </div>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => setShowUsContactsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showContactDetailsModal && selectedContact && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 w-1/2">
            <h2>Contact Details</h2>
            <p>ID: {selectedContact.id}</p>
            <p>Name: {selectedContact.name}</p>
            <p>Country: {selectedContact.country}</p>
            <button
              className="bg-purple-800 text-white px-4 py-2 rounded mt-4"
              onClick={() => setShowContactDetailsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecondTask;
