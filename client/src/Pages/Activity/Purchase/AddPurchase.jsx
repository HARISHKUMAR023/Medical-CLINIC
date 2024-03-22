
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const AddPurchase = () => {
    const { id } = useParams();
  const [formData, setFormData] = useState({
    supplier: '',
    purchaseDate: '',
    products: [
      {
        compositionName: '',
        type: '',
        brand: '',
        manufacturer: '',
        quantity: '',
        metric: '',
        MRP: '',
        costPrice: '',
        sellPrice: '',
        expiryDate: '',
      }
    ],
    invoiceNumber: '',
    paymentstatus: '',
  });
const [suppliers, setSuppliers] = useState([]);

useEffect(() => {
    // Fetch the suppliers when the component mounts
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}/suppliers`;
    axios.get(url)
        .then(response => {
            setSuppliers(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.error('Error fetching suppliers', error);
        });
}, []);
//   useEffect(() => {
//     // Fetch the purchase data when the component mounts
//     const baseURL = import.meta.env.VITE_BASE_URL;
//     const url = `${baseURL}/purchases/total/${id}`;
//     axios.get(url)
//       .then(response => {
//         setFormData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching purchase data', error);
//       });
//   }, [id]);
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...formData.products];
    list[index][name] = value;
    setFormData({ ...formData, products: list });
  };

  const handleRemoveClick = index => {
    const list = [...formData.products];
    list.splice(index, 1);
    setFormData({ ...formData, products: list });
  };

  const handleAddClick = () => {
    setFormData({ ...formData, products: [...formData.products, { compositionName: '', type: '', brand: '', manufacturer: '', quantity: '', metric: '', MRP: '', costPrice: '', sellPrice: '', expiryDate: '' }] });
  };

  // handle change event of the other input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}purchases`;
    // Send a POST request to the server with the form data
    axios.post(url, formData)
      .then(response => {
        console.log(response.data);
        toast.success(response.data.message);
        setFormData({
            supplier: '',
            purchaseDate: '',
            products: [
                {
                    compositionName: '',
                    type: '',
                    brand: '',
                    manufacturer: '',
                    quantity: '',
                    metric: '',
                    MRP: '',
                    costPrice: '',
                    sellPrice: '',
                    expiryDate: '',
                }
            ],
            invoiceNumber: '',
            paymentstatus: '',
        });
   
      })
      .catch(error => {
        console.error('Error creating purchase', error);
        toast.error(error.response?.data?.message || 'An error occurred.');
      });
  };
 


  return ( 
    <form onSubmit={handleSubmit} className=''>
    
        <label htmlFor="supplier">Supplier</label>
<select name="supplier" value={formData.supplier} onChange={handleChange}>
  {suppliers.map(supplier => (
    <option key={supplier._id} value={supplier._id}>{supplier.agencyContactName}</option>
  ))}
</select>

        {/* <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} /> */}
    {/* <select name="supplier" value={formData.supplier} onChange={handleChange} className='w-24 '>
  {suppliers.map(supplier => (
    <option key={supplier._id} value={supplier._id}>{supplier.agencyContactName}</option>
  ))}
</select> */}
      <label>
        Purchase Date:
        <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} />
      </label>
      <label>
        Invoice Number:
        <input type="text" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} />
      </label>
      <label>
        Payment Status:
        <select name="paymentstatus" value={formData.paymentstatus} onChange={handleChange}>
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
        </select>
        {/* <input type="text" name="paymentstatus" value={formData.paymentstatus} onChange={handleChange} /> */}
      </label>
      {formData.products.map((x, i) => {
  return (
    <div className="box" key={i}>
      <input type="text" name="compositionName" placeholder="Enter Composition Name" value={x.compositionName} onChange={e => handleInputChange(e, i)} />
      <input type="text" name="type" placeholder="type" value={x.type} onChange={e => handleInputChange(e, i)} />
      <input type="text" name="brand" placeholder="brand" value={x.brand} onChange={e => handleInputChange(e, i)} />
      <input type="text" name="manufacturer" placeholder="manufacturer" value={x.manufacturer} onChange={e => handleInputChange(e, i)} />
      <input type="number" name="quantity" placeholder="quantity" value={x.quantity} onChange={e => handleInputChange(e, i)} />
      <input type="text" name="metric" placeholder="metric" value={x.metric} onChange={e => handleInputChange(e, i)} />
      <input type="number" name="MRP" placeholder="MRP" value={x.MRP} onChange={e => handleInputChange(e, i)} />
      <input  type="number" name="costPrice" placeholder="costPrice" value={x.costPrice} onChange={e => handleInputChange(e, i)} />
      <input  type="number" name="sellPrice" placeholder="sellPrice" value={x.sellPrice} onChange={e => handleInputChange(e, i)} />
      <input type="date" name="expiryDate" placeholder="expiryDate" value={x.expiryDate} onChange={e => handleInputChange(e, i)} />
      {/* Add other product fields here */}
      <div className="btn-box">
        {formData.products.length !== 1 && <button onClick={() => handleRemoveClick(i)}>Remove</button>}
        {formData.products.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
      </div>
    </div>
  );
})}
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddPurchase;
