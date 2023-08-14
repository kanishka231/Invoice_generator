import React from 'react';
import InvoiceForm from './invoiceform';
import './header.css';
import './App.css';

function App() {
  return (
    <div>
      {/* Add the header */}
      <div className="header">
        <h1>Invoice Generator</h1>
      </div>
      <div className="invoice-form-container">
      <InvoiceForm />
      </div>
      
      
    </div>
    
  );
}

export default App;
