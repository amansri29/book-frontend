import React, { useEffect, useState } from 'react';
import { fetchAllExchangeRequests, updateExchangeRequest } from '../../services/bookService';
import './Exchanges.css';

const ExchangeList = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        setLoading(true);
        const data = await fetchAllExchangeRequests();
        setExchanges(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching exchanges.');
        setLoading(false);
      }
    };

    fetchExchanges();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateExchangeRequest(id, status);
      alert(`Exchange request ${status} successfully.`);
      // Refresh the list after updating
      const data = await fetchAllExchangeRequests();
      setExchanges(data);
    } catch (err) {
      setError(err.message || 'An error occurred while updating the exchange.');
    }
  };

  return (
    <div className="exchange-list-container">
      <h2>Exchange Requests</h2>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading exchanges...</p>
      ) : exchanges.length === 0 ? (
        <p>No exchange requests found.</p>
      ) : (
        <div className="exchange-list">
          {exchanges.map((exchange) => (
            <div key={exchange.id} className="exchange-item">
              <p>Book ID: {exchange.book.id}</p>
              <p>Book title: {exchange.book.title}</p>
              <p>Exchange Duration: {exchange.exchange_duration}</p>
              <p>Delivery Method: {exchange.delivery_method}</p>
              <p>Status: {exchange.status}</p>
              {exchange.status === 'pending' && (
                <div className="actions">
                  <button onClick={() => handleUpdateStatus(exchange.id, 'accepted')}>
                    Accept
                  </button>
                  <button onClick={() => handleUpdateStatus(exchange.id, 'rejected')}>
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExchangeList;
