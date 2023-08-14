import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './form.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
const InvoiceForm = (onSubmit) => {
  
  const [selectedCurrency, setSelectedCurrency] = useState("$");
  const [lineItems, setLineItems] = useState([{ description: "", quantity: 1, price: 0 }]);
  const [detailsFilled, setDetailsFilled] = useState(false);
  const [isDiscountPercentage, setIsDiscountPercentage] = useState(true);
  const [isTaxPercentage, setIsTaxPercentage] = useState(true);
   // Initialize with true for percentage mode

  // Array of currency options
  const currencyOptions = [
    { code: "$", name: "US Dollar" },
    { code: "€", name: "Euro" },
    { code: "£", name: "British Pound" },
    // Add more currency options here
  ];
  
  
  const [logo, setLogo] = useState(null);
  
  const [isInvoiceTitleFocused, setIsTitleToFocused] = useState(false);
  const [invoiceTitle, setInvoiceTitle] = useState('INVOICE');
  const [billTo, setBillTo] = useState('Bill To');
  const [isshipToFocused, setIsshipToFocused] = useState(false);
  const [shipTo, setshipTo] = useState('Ship To');
  const [invoiceNumber, setInvoiceNumber] = useState([]);
  const [isBillToFocused, setIsBillToFocused] = useState(false);
  const [isInvoiceToFocused, setIsInvoiceToFocused] = useState(false);
  const [isShippingToFocused, setIsShippingToFocused] = useState(false);
  const [shippingTo, setShippingTo] = useState('');
  const [isinvoiceDateFocused, setIsinvoiceDateFocused] = useState(false);
  const [invoiceDate, setinvoiceDate] = useState('Due Date');
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [Name, setName] = useState('Payment Terms');
  const [isShipDateFocused, setIsShipDateFocused] = useState(false);
  const [ShipDate, setShipDate] = useState('Ship-Date');
  const [isPOFocused, setIsPOFocused] = useState(false);
  const [PO, setPO] = useState('Purchase Order');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isInvoiceDateFocused, setIsInvoiceDateFocused] = useState(false);
  const [shipDate, setshipDate] = useState(null); // Initialize with null
  const [isshipDateFocused, setIsshipDateFocused] = useState(false); // Initialize with false
  const [logoUrl, setLogoUrl] = useState(null);
  const [invoiceFrom, setInvoiceFrom] = useState('');
  const [invoiceTo, setInvoiceTo] = useState('');
  const [discountFocused, setdiscountFocused] = useState(false);
  const [taxFocused, settaxFocused] = useState(false);
  const [shopFocused,setshopFocused]=useState(false);
  const [isInvoiceFromFocused, setIsInvoiceFromFocused] = useState(false);
  const [editablePO, setEditablePO] = useState('');
  const [isEditablePOFocused, setIsEditablePOFocused] = useState(false);
  const [item, setitem] = useState('Item');
  const [isitemFocused, setIsitemFocused] = useState(false);
  const [quantity, setquantity] = useState('Quantity');
  const [isquantityFocused, setIsquantityFocused] = useState(false);
  const [price, setprice] = useState('Price');
  const [ispriceFocused, setIspriceFocused] = useState(false);
  const [amount, setamount] = useState('Amount');
  const [isamountFocused, setIsamountFocused] = useState(false);
  const [isitem1Focused, setIsitem1Focused] = useState(false);
  const [isquantity1Focused, setIsquantity1Focused] = useState(false);
  const [isprice1Focused, setIsprice1Focused] = useState(false);
  const [isamount1Focused, setIsamount1Focused] = useState(false);
  const [Notes, setNotes] = useState('Notes');
  const [isNotesFocused, setIsNotesFocused] = useState(false);
  const [notes, setnotes] = useState('');
  const [isnotesFocused, setIsnotesFocused] = useState(false);
  const [Terms, setTerms] = useState('Terms');
  const [isTermsFocused, setIsTermsFocused] = useState(false);
  const [terms, setterms] = useState('');
  const [istermsFocused, setIstermsFocused] = useState(false);
  const [isSubtotalFocused, setIsSubtotalFocused] = useState(false);
  const [Subtotal, setSubtotal] = useState('Subtotal');
  const [istotalFocused, setIstotalFocused] = useState(false);
  const [total, settotal] = useState('Total');
  const [ispaidFocused, setIspaidFocused] = useState(false);
  const [paid, setpaid] = useState('Amount Paid');
  const [isamountpaidFocused, setIsamountpaidFocused] = useState(false);
  const [amountpaid, setamountpaid] = useState('');
  const [isBalanceFocused, setIsBalanceFocused] = useState(false);
  const [Balance, setBalance] = useState('Balance');

  const [isdiscountFocused, setIsdiscountFocused] = useState(false);
  const [discount, setdiscount] = useState('Discount');
  const [isdiscount1Focused, setIsdiscount1Focused] = useState(false);
  const [discount1, setdiscount1] = useState(0);
  const [discountType, setDiscountType] = useState('percentage'); // 'percentage' or 'value'


  const [istaxFocused, setIstaxFocused] = useState(false);
  const [tax, settax] = useState('Tax');
  const [istax1Focused, setIstax1Focused] = useState(false);
  const [tax1, settax1] = useState(0);

  const [isshopFocused, setIsshopFocused] = useState(false);
  const [shop, setshop] = useState('Shipping');
  const [isshop1Focused, setIsshop1Focused] = useState(false);
  const [shop1, setshop1] = useState(0);
  const [editableCustomerName, setEditableCustomerName] = useState('');
const [isEditableCustomerNameFocused, setIsEditableCustomerNameFocused] = useState(false);
const [inv, setinv] = useState('');
const [isinvFocused, setIsinvFocused] = useState(false);

const handleshipDateChange = (date) => {
  setshipDate(date);
};


const handleEditableCustomerNameChange = (event) => {
  setEditableCustomerName(event.target.value);
};

const updateDetailsFilled = () => {
  if (invoiceFrom && invoiceTo) {
    setDetailsFilled(true);
  } else {
    setDetailsFilled(false);
  }
};

const handleEditablePOChange = (event) => {
  setEditablePO(event.target.value);
};

  
  const calculateBalance = () => {
    const totalAmount = calculateTotalAmount();
    
    return parseFloat(totalAmount-amountpaid);
  };

  useEffect(() => {
    if (lineItems.length === 0) {
      handleAddLineItem();
    }
  }, []);
 
  const handleShippingToChange = (event) => {
    setShippingTo(event.target.value);
  };


  const handleAddLineItem = () => {
    setLineItems([...lineItems, { description: '', quantity: '', price: '' }]);
  };

  const handleLineItemChange = (index, field, value) => {
    const updatedLineItems = [...lineItems];
    updatedLineItems[index][field] = value;
    setLineItems(updatedLineItems);
  };
const handleLogoChange = (event) => {
    const selectedLogo = event.target.files[0];
    if (selectedLogo) {
      setLogo(selectedLogo);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoUrl(e.target.result);
      };
      reader.readAsDataURL(selectedLogo);
    }
  };
  const handleInvoiceFromChange = (event) => {
    setInvoiceFrom(event.target.value);
    updateDetailsFilled();
  };

  const handleInvoiceToChange = (event) => {
    setInvoiceTo(event.target.value);
    updateDetailsFilled();
  };
  const handlenotesChange = (event) => {
    setnotes(event.target.value);
  };
  const handleInvoiceNumberChange = (event) => {
    // Allow only numbers and backspace key
    const newValue = event.target.value.replace(/[^0-9]/g, '');
    setInvoiceNumber(newValue);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  
  const calculateSubtotal = () => {
    return lineItems.reduce((subtotal, item) => {
      if (item.price && item.quantity) {
        return subtotal + parseFloat(item.price) * parseFloat(item.quantity);
      }
      return subtotal;
    }, 0);
  };
  
  const calculateTotalAmount = () => {
    const subtotal = calculateSubtotal();
    let discountAmount = 0;
  
    if (isDiscountPercentage) {
      discountAmount = (subtotal * discount1) / 100;
    } else {
      discountAmount = parseFloat(discount1);
    }
  
    let taxAmount = 0;
  
    if (isTaxPercentage) {
      taxAmount = (subtotal * tax1) / 100;
    } else {
      taxAmount = parseFloat(tax1);
    }
  
    const totalAmount = subtotal - discountAmount + taxAmount + parseFloat(shop1);
    return totalAmount;
  };
  
  
 
  const handleRemoveLineItem = (index) => {
    if (lineItems.length > 1) {
      const updatedLineItems = lineItems.filter((_, i) => i !== index);
      setLineItems(updatedLineItems);
    }
  };
  
  const toggleDiscount = () => {
    setDiscountType('percentage');
    setdiscountFocused(!discountFocused);
  };

  const toggleTax = () => {
    settaxFocused(!taxFocused);
  };

  const toggleShip = () => {
    setshopFocused(!shopFocused);
  };
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const columns = ['#', 'Description', 'Quantity', 'Price', 'Amount'];
  
  const generatePDFContent = (doc) => {
    // Logo
    if (logo) {
      const logoImage = new Image();
      logoImage.src = logoUrl;
      logoImage.onload = () => {
        doc.addImage(logoImage, 'JPEG', 10, 10, 40, 40);
        generateHeader(doc);
        generateTable(doc);
        generateSummary(doc);
        doc.save('invoice.pdf');
      };
    } else {
      generateHeader(doc);
      generateTable(doc);
      generateSummary(doc);
      doc.save('invoice.pdf');
    }
  };
  
  const generateHeader = (doc) => {
    // Title and Invoice Info
    doc.setFontSize(18);
    doc.text(invoiceTitle, 60, 20);
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoiceNumber}`, 80, 40);
    doc.text(`Due Date: ${new Date(selectedDate).toLocaleDateString('en-US', options)}`, 80, 50);
    doc.text(`Ship Date: ${new Date(shipDate).toLocaleDateString('en-US', options)}`, 80, 60);
  
    // Logo (if not provided in the header)
    if (!logo) {
      doc.text(`Invoice From: ${invoiceFrom}`, 10, 40);
      doc.text(`Invoice To: ${invoiceTo}`, 10, 50);
      doc.text(`Ship To: ${shippingTo}`, 10, 60);
    }
  };
  
  const generateTable = (doc) => {
    const tableData = lineItems.map((item, index) => [
      index + 1,
      item.description,
      item.quantity,
      `${selectedCurrency}${item.price}`,
      `${selectedCurrency}${(item.quantity * item.price).toFixed(2)}`
    ]);
  
    const startYForTable = 90;
  
    doc.autoTable({
      head: [columns],
      body: tableData,
      startY: startYForTable,
      theme: 'grid',
      styles: {
        halign: 'center'
      }
    });
  };
  
  const generateSummary = (doc) => {
    const startYForSummary = doc.previousAutoTable.finalY + 10;
    
doc.setFontSize(12);
    doc.text(`Sub-Total: ${selectedCurrency}${calculateSubtotal()}`, 10, startYForSummary);
    doc.text(`Discount: ${discount1}${isDiscountPercentage ? '%' : selectedCurrency}`, 10, startYForSummary + 10);
    doc.text(`Tax: ${tax1}${isTaxPercentage ? '%' : selectedCurrency}`, 10, startYForSummary + 20);
    doc.text(`Total: ${selectedCurrency}${calculateTotalAmount()}`, 10, startYForSummary + 30);
    doc.text(`Amount Paid: ${selectedCurrency}${amountpaid}`, 10, startYForSummary + 40);
    doc.text(`Balance: ${selectedCurrency}${calculateBalance()}`, 10, startYForSummary + 50);
  };
  
  

    const handleGeneratePDF = () => {
      const doc = new jsPDF();
    
  
      generatePDFContent(doc);
    };
    
  

  return (
<div className="invoice-form '">
      <form onSubmit={handleSubmit}>
      <div className="currency-select">
      <div>
  Select currency
</div>
          <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
              {currencyOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.name} ({option.code})
                </option>
              ))}
            </select>
          
        </div>
< div className='address-container'>
<div className="left-side-container">
<div className="logo-upload">
        <span>
      {logo && (
        <button
          className="remove-logo-button"
          onClick={() => setLogo(null)}
        >
          &#10006;
        </button>
      )}
      <label htmlFor="logo" className="logo-label">
      
        {logo ? (
          <img
            src={URL.createObjectURL(logo)}
            alt="Logo Preview"
            className="logo-preview"
          />
        ) : (
          <span> + Add Your logo </span>
        )}
      </label>
      <input type="file" id="logo" accept="image/*" onChange={handleLogoChange} style={{ display: 'none' }} />
      </span>
    </div> 
<div className={`invoice-from-block ${isInvoiceFromFocused ? 'focused' : ''}`}
  onMouseEnter={() => setIsInvoiceFromFocused(true)}
  onMouseLeave={() => setIsInvoiceFromFocused(false)}
>
  <input
    type="text"
    id="invoiceFrom"
    value={invoiceFrom}
    onChange={handleInvoiceFromChange}
    placeholder="Who is this invoice from? (required)"
    required
    className="invoice-from-field"
  />
</div>
<div className="address-row">
  <div
    className={`defaultL-block ${isBillToFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsBillToFocused(true)}
    onMouseLeave={() => setIsBillToFocused(false)}
  >
    <input
      type="text"
      id="billTo"
      value={billTo}
      onChange={(e) => setBillTo(e.target.value)}
      placeholder="Bill To"
      className="defaultL-field"
    />
  </div>
<div
    className={`defaultL-block ${isshipToFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsshipToFocused(true)}
    onMouseLeave={() => setIsshipToFocused(false)}
  >
    <input
      type="text"
      id="shipTo"
      value={shipTo}
      onChange={(e) => setshipTo(e.target.value)}
      placeholder="Ship To"
      className="defaultL-field"
    />
  </div>
</div>
<div className="address-row">
 <div className={`invoice-to-block ${isInvoiceToFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsInvoiceToFocused(true)}
    onMouseLeave={() => setIsInvoiceToFocused(false)}
  >
    <input
      type="text"
      id="invoiceTo"
      value={invoiceTo}
      onChange={handleInvoiceToChange}
      placeholder="Who is this invoice to?
       (required)"
      required
      className="invoice-to-field"
    />
  </div>
  <div className={`shipping-to-block ${isShippingToFocused ? 'focused' : ''}`}
            onMouseEnter={() => setIsShippingToFocused(true)}
            onMouseLeave={() => setIsShippingToFocused(false)}
          >
            <input
              type="text"
              id="shippingTo"
              value={shippingTo}
              onChange={handleShippingToChange}
              placeholder="(optional)"
              className="shipping-to-field"
            />
     </div>
</div>
</div>
<div className='right-side-container'>
  <div
    className={`invoice-title-block ${isInvoiceTitleFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsTitleToFocused(true)}
    onMouseLeave={() => setIsTitleToFocused(false)}
  >
    <input
      type="text"
      id="invoiceTitle"
      value={invoiceTitle}
      onChange={(e) => setInvoiceTitle(e.target.value)}
      placeholder="INVOICE"
      className="invoice-title-field"
    />
  </div>
  <div className="invoice-number-block">
  <span className="invoice-number-label">#</span>
  
  <div
    className={`customer-name-block ${isinvFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsinvFocused(true)}
    onMouseLeave={() => setIsinvFocused(false)}
  >
    <input
      type="number"
      id="invoiceNumber"
      value={invoiceNumber}
      onChange={handleInvoiceNumberChange}
      className="customer-name-field"
    />
  </div>
</div>
  <div className="address-row">
<div
    className={`defaultR-block ${isinvoiceDateFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsinvoiceDateFocused(true)}
    onMouseLeave={() => setIsinvoiceDateFocused(false)}
  >
    <input
      type="text"
      id="invoiceDate"
      value={invoiceDate}
      onChange={(e) => setinvoiceDate(e.target.value)}
      placeholder="Due Date"
      className="defaultR-field"
    />
  </div>
  <div className={`invoiceDate-block ${isInvoiceDateFocused ? 'focused' : ''}`}>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        onFocus={() => setIsInvoiceDateFocused(true)}
        onBlur={() => setIsInvoiceDateFocused(false)}
        dateFormat="MMM d, yyyy"
        className="invoiceDate-field"
        calendarClassName="custom-calendar"
      />
    </div>

</div>
<div className='address-row'>
<div
    className={`defaultR-block ${isNameFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsNameFocused(true)}
    onMouseLeave={() => setIsNameFocused(false)}
  >
    <input
      type="text"
      id="Name"
      value={Name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Customer Name"
      className="defaultR-field"
    />
  </div>
  <div
    className={`customer-name-block ${isEditableCustomerNameFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsEditableCustomerNameFocused(true)}
    onMouseLeave={() => setIsEditableCustomerNameFocused(false)}
  >
    <input
      type="text"
      id="editableCustomerName"
      value={editableCustomerName}
      onChange={handleEditableCustomerNameChange}
      className="customer-name-field"
    />
  </div>
  
</div>
<div className='address-row'>
  <div
    className={`defaultR-block ${isShipDateFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsShipDateFocused(true)}
    onMouseLeave={() => setIsShipDateFocused(false)}
  >
    <input
      type="text"
      id="ShipDate"
      value={ShipDate}
      onChange={(e) => setShipDate(e.target.value)}
      placeholder="Date"
      className="defaultR-field"
    />
  </div>
  <div
  className={`shipDate-block ${isshipDateFocused ? 'focused' : ''}`}
  onMouseEnter={() => setIsshipDateFocused(true)}
  onMouseLeave={() => setIsshipDateFocused(false)}
>
  <DatePicker
    selected={shipDate}
    onChange={handleshipDateChange}
    className="shipDate-field"
    dateFormat="MMM d, yyyy"
    customInput={<input />}
  />
</div>
  </div>
  <div className='address-row'>
  <div
    className={`defaultR-block ${isPOFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsPOFocused(true)}
    onMouseLeave={() => setIsPOFocused(false)}
  >
    <input
      type="text"
      id="PO"
      value={PO}
      onChange={(e) => setPO(e.target.value)}
      placeholder="PO number"
      className="defaultR-field"
    />
  </div>
  <div
    className={`customer-name-block ${isEditablePOFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsEditablePOFocused(true)}
    onMouseLeave={() => setIsEditablePOFocused(false)}
  >
    <input
      type="text"
      id="editablePO"
      value={editablePO}
      onChange={handleEditablePOChange}
      className="customer-name-field"
    />
  </div>
  </div>
</div>
</div>

<div className='address-row1'>
<div
    className={`item-block ${isitemFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsitemFocused(true)}
    onMouseLeave={() => setIsitemFocused(false)}
  >
    <input
      type="text"
      id="item"
      value={item}
      onChange={(e) => setitem(e.target.value)}
      placeholder="item"
      className="item-field"
    />
  </div>
  <div
    className={`quantity-block ${isquantityFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsquantityFocused(true)}
    onMouseLeave={() => setIsquantityFocused(false)}
  >
    <input
      type="text"
      id="quantity"
      value={quantity}
      onChange={(e) => setquantity(e.target.value)}
      placeholder="quantity"
      className="quantity-field"
    />
  </div>
  <div
    className={`price-block ${ispriceFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIspriceFocused(true)}
    onMouseLeave={() => setIspriceFocused(false)}
  >
    <input
      type="text"
      id="price"
      value={price}
      onChange={(e) => setprice(e.target.value)}
      placeholder="price"
      className="price-field"
    />
  </div>
  <div
    className={`amount-block ${isamountFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsamountFocused(true)}
    onMouseLeave={() => setIsamountFocused(false)}
  >
    <input
      type="text"
      id="amount"
      value={amount}
      onChange={(e) => setamount(e.target.value)}
      placeholder="amount"
      className="amount-field"
    />
  </div>
</div>
<div className="line-item">
          {lineItems.map((lineItem, index) => (
            <div key={index} className="address-row">
              <span 
               className={`item1-block ${isitem1Focused ? 'focused' : ''}`}
               onMouseEnter={() => setIsitem1Focused(true)}
               onMouseLeave={() => setIsitem1Focused(false)}>
              <input
                type="text"
                placeholder="Product Description"
                value={lineItem.description}
                onChange={(e) =>
                  handleLineItemChange(index, 'description', e.target.value)
                }
                className="item1-field"
              />
              </span>
              <span
              className={`quantity1-block ${isquantity1Focused ? 'focused' : ''}`}
              onMouseEnter={() => setIsquantity1Focused(true)}
              onMouseLeave={() => setIsquantity1Focused(false)}>
              <input
                type="number"
                placeholder="Quantity"
                value={lineItem.quantity}
                onChange={(e) =>
                  handleLineItemChange(index, 'quantity', e.target.value)
                }
                className="quantity1-field"
              />
              </span>
              <span
              className={`price1-block ${isprice1Focused ? 'focused' : ''}`}
              onMouseEnter={() => setIsprice1Focused(true)}
              onMouseLeave={() => setIsprice1Focused(false)}>
                {selectedCurrency}
              <input
                type="number"
                placeholder="Price"
                value={lineItem.price}
                onChange={(e) =>
                  handleLineItemChange(index, 'price', e.target.value)
                }
                className='price1-field'
              />
              </span>
              
              
              <span 
              data="amount1"
              className={`amount1-block ${isamount1Focused ? 'focused' : ''}`}
              onMouseEnter={() => setIsamount1Focused(true)}
              onMouseLeave={() => setIsamount1Focused(false)}>
                {selectedCurrency}{lineItem.price && lineItem.quantity
                  ? (
                    parseFloat(lineItem.price) * parseFloat(lineItem.quantity)
                  ).toFixed(2)
                  : '0.00'}
              </span>
            
              <button type="button" onClick={() => handleRemoveLineItem(index)}>x
              </button>
            </div>
          ))}
          <div>
            <div>
          <button type="button" onClick={handleAddLineItem} style={{
      backgroundColor: 'teal',
      color: 'white',
      border: 'none',
      padding: '0.5rem 0.5rem',
      borderRadius: '4px',
      cursor: 'pointer',
    }}>
            + Line Item
          </button>
          </div>
          </div>
</div>
<div className='address-container'>
<div className='left-side-container'>
<div
    className={`default2-block ${isNotesFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsNotesFocused(true)}
    onMouseLeave={() => setIsNotesFocused(false)}
  >
    <input
      type="text"
      id="Notes"
      value={Notes}
      onChange={(e) => setNotes(e.target.value)}
      placeholder="Notes"
      className="default2-field"
    />
  </div>
  <div className={`default3-block ${isnotesFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsnotesFocused(true)}
    onMouseLeave={() => setIsnotesFocused(false)}
  >
    <input
      type="text"
      id="notes"
      value={notes}
      onChange={handlenotesChange}
      placeholder="Notes-any relevent information not already covered"
      className="default3-field"
    />
  </div>
  <div
    className={`default2-block ${isTermsFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsTermsFocused(true)}
    onMouseLeave={() => setIsTermsFocused(false)}
  >
    <input
      type="text"
      id="Terms"
      value={Terms}
      onChange={(e) => setTerms(e.target.value)}
      placeholder="Terms"
      className="default2-field"
    />
  </div>
  <div className={`default3-block ${istermsFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIstermsFocused(true)}
    onMouseLeave={() => setIstermsFocused(false)}
  >
    <input
      type="text"
      id="terms"
      value={terms}
      onChange={(e) => setterms(e.target.value)}
      placeholder="Terms and conditions-late fees,payment methods,
      delivery schedule"
      className="default3-field"
    />
  </div>

</div>
<div className='right-side-container'>
<div className='address-row'>
  <div className={`defaultR-block ${isSubtotalFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsSubtotalFocused(true)}
    onMouseLeave={() => setIsSubtotalFocused(false)}
  >
    <input
      type="text"
      id="Subtotal"
      value={Subtotal}
      onChange={(e) => setSubtotal(e.target.value)}
      placeholder="Subtotal"
      className="defaultR-field"
    />
  </div>
  <div
  style={{
    backgroundColor: 'transparent',
    textAlign: 'right',
    padding: '0.5rem',
    border: '1px transparent',
    borderRadius: '4px',
    width: '10rem', // Adjust the width value as needed
  }}
>
{selectedCurrency}{calculateSubtotal().toFixed(2)}
</div>
</div>
<div className="total-row">
<span className="toggle-button-row">
  {discountFocused ? (
    <div className="address-row">
      <div
        className={`defaultR-block ${isdiscountFocused ? 'focused' : ''}`}
        onMouseEnter={() => setIsdiscountFocused(true)}
        onMouseLeave={() => setIsdiscountFocused(false)}
      >
        <input
          type="text"
          id="discount"
          value={discount}
          onChange={(e) => setdiscount(e.target.value)}
          placeholder="Discount"
          className="defaultR-field"
        />
      </div>
      <div
        className={`amountpaid-block ${
          isdiscount1Focused ? 'focused' : ''
        }`}
        onMouseEnter={() => setIsdiscount1Focused(true)}
        onMouseLeave={() => setIsdiscount1Focused(false)}
      >
        {isDiscountPercentage ? (
          <input
            type="number"
            id="discount"
            value={discount1}
            onChange={(e) => setdiscount1(e.target.value)}
            className="amountpaid-field"
          /> 
        ) : (
          <>
            {selectedCurrency}{' '}
            <input
              type="number"
              id="discount"
              value={discount1}
              onChange={(e) => setdiscount1(e.target.value)}
              className="amountpaid-field"
            />
          </>
        )}
        <button
          type="button"
          onClick={() => setIsDiscountPercentage(!isDiscountPercentage)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'teal'
          }}
        > {isDiscountPercentage ? '%◀' : '◀'}
        </button>
      </div>
      <button type="button" onClick={toggleDiscount}>
        X
      </button>
    </div>
  ) : (
    <button
      type="button"
      onClick={toggleDiscount}
      style={{
        backgroundColor: 'white',
        color: 'teal',
        border: 'none',
        padding: '0.5rem 0.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontFamily: 'sans-serif'
      }}
    >+ Discount
    </button>
  )}
</span>
<span className="toggle-button-row">
  {taxFocused ? (
    <div className="address-row">
      <div
        className={`defaultR-block ${istaxFocused ? 'focused' : ''}`}
        onMouseEnter={() => setIstaxFocused(true)}
        onMouseLeave={() => setIstaxFocused(false)}
      >
        <input
          type="text"
          id="tax"
          value={tax}
          onChange={(e) => settax(e.target.value)}
          placeholder="tax"
          className="defaultR-field"
        />
      </div>
      <div
        className={`amountpaid-block ${
          istax1Focused ? 'focused' : ''
        }`}
        onMouseEnter={() => setIstax1Focused(true)}
        onMouseLeave={() => setIstax1Focused(false)}
      >
        {isTaxPercentage ? (
          <input
            type="number"
            id="tax"
            value={tax1}
            onChange={(e) => settax1(e.target.value)}
            className="amountpaid-field"
          /> 
        ) : (
          <>
            {selectedCurrency}{' '}
            <input
              type="number"
              id="tax1"
              value={tax1}
              onChange={(e) => settax1(e.target.value)}
              className="amountpaid-field"
            />
          </>
        )}
        <button
          type="button"
          onClick={() => setIsTaxPercentage(!isTaxPercentage)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'teal'
          }}
        > {isTaxPercentage ? '%◀' : '◀'}
        </button>
      </div>
      <button type="button" onClick={toggleTax}>
        X
      </button>
    </div>
  ) : (
    <button
      type="button"
      onClick={toggleTax}
      style={{
        backgroundColor: 'white',
        color: 'teal',
        border: 'none',
        padding: '0.5rem 0.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontFamily: 'sans-serif'
      }}
    >+ Tax
    </button>
  )}
</span>
<span className="toggle-button">
            {shopFocused ? (
              <div className='address-row'>
              <div
                className={`defaultR-block ${isshopFocused ? 'focused' : ''}`}
                onMouseEnter={() => setIsshopFocused(true)}
                onMouseLeave={() => setIsshopFocused(false)}
              >
                <input
                  type="text"
                  id="shop"
                  value={shop}
                  onChange={(e) => setshop(e.target.value)}
                  placeholder="shipping"
                  className="defaultR-field"
                />
              </div>
              <div
                className={`amountpaid-block ${isshop1Focused ? 'focused' : ''}`}
                onMouseEnter={() => setIsshop1Focused(true)}
                onMouseLeave={() => setIsshop1Focused(false)}
              >{selectedCurrency}<input
                  type="number"
                  id="shop1"
                  value={shop1}
                  onChange={(e) => setshop1(e.target.value)}
                  className='amountpaid-field'
                />
              </div>
              <button type="button" onClick={toggleShip} >
                X
              </button>
              </div>
            ) : (
              <button type="button" onClick={toggleShip} style={{
                backgroundColor: 'white',
                color: 'teal',
                border: 'none',
                padding: '0.5rem 0.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontFamily: 'sans-serif'
              }}>
                + Shipping
              </button>
            )}
          </span>
</div>
<div className='address-row'>
  <div
    className={`defaultR-block ${istotalFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIstotalFocused(true)}
    onMouseLeave={() => setIstotalFocused(false)}
  >
    <input
      type="text"
      id="total"
      value={total}
      onChange={(e) => settotal(e.target.value)}
      placeholder="total"
      className="defaultR-field"
    />
  </div>
  <div
  style={{
    backgroundColor: 'transparent',
    textAlign: 'right',
    padding: '0.5rem',
    border: '1px transparent',
    borderRadius: '4px',
    width: '10rem',
  }}
>{selectedCurrency}{calculateTotalAmount().toFixed(2)} 
</div>
</div>
  <div className='address-row'>
  <div
    className={`defaultR-block ${ispaidFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIspaidFocused(true)}
    onMouseLeave={() => setIspaidFocused(false)}
  >
    <input
      type="text"
      id="paid"
      value={paid}
      onChange={(e) => setpaid(e.target.value)}
      placeholder="Amount Paid"
      className="defaultR-field"
    />
  </div>
  <div
    className={`amountpaid-block ${isamountpaidFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsamountpaidFocused(true)}
    onMouseLeave={() => setIsamountpaidFocused(false)}
  >{selectedCurrency}<input
      type="number"
      id="amountpaid"
      value={amountpaid}
      onChange={(e) => setamountpaid(e.target.value)}
      className='amountpaid-field'
    />
  </div>
</div>
 <div className='address-row'>
  <div className={`defaultR-block ${isBalanceFocused ? 'focused' : ''}`}
    onMouseEnter={() => setIsBalanceFocused(true)}
    onMouseLeave={() => setIsBalanceFocused(false)}
  >
    <input
      type="text"
      id="Balance"
      value={Balance}
      onChange={(e) => setSubtotal(e.target.value)}
      placeholder="Balance"
      className="defaultR-field"
    />
  </div>
  <div
  style={{
    backgroundColor: 'transparent',
    textAlign: 'right',
    padding: '0.5rem',
    border: '1px transparent',
    borderRadius: '4px',
    width: '10rem',
  }}
>{selectedCurrency}{calculateBalance().toFixed(2)}
</div>
</div>
</div>
</div>  

<div className="generate-pdf-button">
<button
  type="button"
  onClick={handleGeneratePDF}
  disabled={!detailsFilled}
  style={{
    backgroundColor: detailsFilled ? 'teal' : 'rgba(0, 128, 128, 0.5)', // Teal or semi-transparent teal
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: detailsFilled ? 'pointer' : 'not-allowed',
  }}
>
  Download PDF
</button>


</div>
</form>
</div>
  );
};

export default InvoiceForm;
