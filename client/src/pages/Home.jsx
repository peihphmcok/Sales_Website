import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container">
      <h1>Welcome to Trạm Pha Chế</h1>
      <p>Discover our delicious products</p>
      <Link to="/shop" className="btn">Go Shopping</Link>
    </div>
  );
}

