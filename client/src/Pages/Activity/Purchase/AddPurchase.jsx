import { useState, useEffect } from "react";
import axios from "axios";
// import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Select from 'react-select';
const AddPurchase = () => {
  // const { id } = useParams();
  const [formData, setFormData] = useState({
    supplier: "",
    purchaseDate: "",
    products: [
      {
        compositionName: "",

        brand: "",
        manufacturer: "",
        type: "",
        quantity: "",
        metric: "",
        MRP: "",
        costPrice: "",
        sellPrice: "",
        expiryDate: "",
      },
    ],
    invoiceNumber: "",
    paymentstatus: "",
  });
  const [suppliers, setSuppliers] = useState([]);
  const [manifacture, setManifactur] = useState([]);
  const [products, setproducts] = useState([]);
  const [itemsSupplied, setItemsSupplied] = useState([]);
  // Remove this line
 const [selectedItems, setSelectedItems] = useState([]);
  console.log(selectedItems);

  const handleSupplierChange = (selectedOption) => {
    const selectedSupplierId = selectedOption ? selectedOption.value : "";
    setItemsSupplied([]);
    // Fetch items supplied by the selected supplier
    if (selectedSupplierId) {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const url = `${baseURL}purchases/total/${selectedSupplierId}`;
      axios
        .get(url)
        .then((response) => {
          if (Array.isArray(response.data.purchases) && response.data.purchases.length > 0) {
            const allProducts = response.data.purchases.flatMap(
              (purchase) => purchase.products
            );
      
            const uniqueProducts = allProducts.filter(
              (product, index, self) =>
                product.productitem &&
                index ===
                  self.findIndex(
                    (t) =>
                      t.productitem &&
                      t.productitem.compositionName ===
                        product.productitem.compositionName
                  )
            );
            setItemsSupplied(uniqueProducts);
          } else {
            alert("NO PRODUCT TO DISPLAY FOR THE SUPPLIER ")
            setItemsSupplied([]);
          }
        })
        .catch((error) => {
          console.error(
            "Error fetching items supplied by the selected supplier",
            error
          );
        });
    }
  
    // Update supplier in form data
    setFormData({ ...formData, supplier: selectedSupplierId });
  };

  useEffect(() => {
    // Fetch the suppliers when the component mounts
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}/suppliers`;
    axios
      .get(url)
      .then((response) => {
        setSuppliers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching suppliers", error);
      });
  }, []);

  // geting manufacturer

  useEffect(() => {
    // Fetch the suppliers when the component mounts
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}/manufacturer`;
    axios
      .get(url)
      .then((response) => {
        setManifactur(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching manifacture", error);
      });
  }, []);

  //type of product
  useEffect(() => {
    // Fetch the suppliers when the component mounts
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}/products`;
    axios
      .get(url)
      .then((response) => {
        setproducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
      });
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...formData.products];
    list[index][name] = value;
    setFormData({ ...formData, products: list });
    console.log(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...formData.products];
    list.splice(index, 1);
    setFormData({ ...formData, products: list });
  };

  const handleAddClick = () => {
    // Get the last product
    // const lastProduct = formData.products[formData.products.length - 1];

    // // Check if any of the required fields are empty
    // if (
    //   !lastProduct.compositionName ||
    //   !lastProduct.type ||
    //   !lastProduct.brand ||
    //   !lastProduct.manufacturer
    // ) {
    //   // alert('Please fill in all required fields.');
    //   toast.error("Please fill in all required fields.");
    //   return;
    // }

    // Add a new product
    setFormData({
      ...formData,
      products: [
        ...formData.products,
        {
          compositionName: "",
          type: "",
          brand: "",
          manufacturer: "",
          quantity: "",
          metric: "",
          MRP: "",
          costPrice: "",
          sellPrice: "",
          expiryDate: "",
        },
      ],
    });
  };

  // handle change event of the other input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}purchases`;

    // Prepare the data to be sent in the POST request
    const data = {
      ...formData,
      //selectedItems: selectedItemsData
    };

    // Send a POST request to the server with the form data and selected items
    axios
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        
        setFormData({
          supplier: "",
          purchaseDate: "",
          products: [
            {
              compositionName: "",
              brand: "",
              manufacturer: "",
              type: "",
              quantity: "",
              metric: "",
              MRP: "",
              costPrice: "",
              sellPrice: "",
              expiryDate: "",
            },
          ],
          invoiceNumber: "",
          paymentstatus: "",
        });
        toast.success(response.data.message);
        setSelectedItems([]); // Clear selected items
      })
      .catch((error) => {
        console.error("Error creating purchase", error);
        console.log(formData);
        toast.error(error.message);
      });
  };
  function handleSelectItem(product, isChecked) {
    if (isChecked) {
      // Add the selected product to the formData.products array
      setFormData((prevFormData) => ({
        ...prevFormData,
        products: [
          ...prevFormData.products,
          {
            compositionName: product.productitem.compositionName,
            brand: product.productitem.brand,
            manufacturer: product.productitem.manufacturer,
            type: product.productitem.type,
            quantity: "",
            metric: "",
            MRP: "",
            costPrice: "",
            sellPrice: "",
            expiryDate: "",
          },
        ],
      }));
    } else {
      // Remove the selected product from the formData.products array
      setFormData((prevFormData) => ({
        ...prevFormData,
        products: prevFormData.products.filter(
          (item) => item.compositionName !== product.productitem.compositionName
        ),
      }));
    }
  }

  const handleProductInputChange = (
    e,
    purchaseIndex,
    productIndex,
    fieldName
  ) => {
    const { value } = e.target;
    const updatedItemsSupplied = [...itemsSupplied];
    updatedItemsSupplied[purchaseIndex].products[productIndex][fieldName] =
      value;
    setItemsSupplied(updatedItemsSupplied);
  };

  //sereach slection supplier 
  const supplierOptions = suppliers.map(supplier => ({
    value: supplier._id,
    label: supplier.agencyContactName
  }));
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md mx-3"
    >
      <div className="mb-4">
        <label htmlFor="supplier" className="block text-sm font-bold mb-2">
          Supplier
        </label>
        <Select
        name="supplier"
        value={supplierOptions.find(option => option.value === formData.supplier)}
        onChange={handleSupplierChange}
        options={supplierOptions}
        isSearchable
      />
        
        {/* <select
          name="supplier"
          value={formData.supplier}
          
          onChange={handleSupplierChange}
          className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier._id} value={supplier._id}>
              {supplier.agencyContactName}
            </option>
          ))}
        
        </select> */}
      </div>
      <div className="mb-4">
        <label htmlFor="purchaseDate" className="block text-sm font-bold mb-2">
          Purchase Date
        </label>
        <input
          type="date"
          name="purchaseDate"
          value={formData.purchaseDate}
          onChange={handleChange}
          className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="invoiceNumber" className="block text-sm font-bold mb-2">
        Supplier   Invoice Number
        </label>
        <input
          type="text"
          name="invoiceNumber"
          value={formData.invoiceNumber}
          onChange={handleChange}
          className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="paymentstatus" className="block text-sm font-bold mb-2">
          Payment Status
        </label>
        {/* <select
          name="paymentstatus"
          value={formData.paymentstatus}
          onChange={handleChange}
          className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="Unpaid">Unpaid</option>
          <option value="Paid">Paid</option>
        </select> */}
      </div>
      <div className="overflow-auto mb-4">
        <table className="w-full table-auto text-left whitespace-no-wrap border-collapse border border-slate-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-slate-300 px-4 py-2 text-stone-800 font-medium"></th>
              <th className="border border-slate-300 px-4 py-2 text-stone-800 font-medium">
                Composition Name
              </th>
              <th className="border border-slate-300 px-4 py-2 text-stone-800 font-medium">
                Brand
              </th>
              <th className="border border-slate-300 px-4 py-2 text-stone-800 font-medium">
                Manufacturer
              </th>
              <th className="border border-slate-300 px-4 py-2 text-stone-800 font-medium">
                Type
              </th>
              <th className="border border-slate-300 px-4 py-2 text-stone-800 font-medium">
                Quantity
              </th>
              <th className="border border-slate-300 px-4 py-2 text-stone-800 font-medium">
                Metric
              </th>
              <th className="border border-slate-300 px-4 py-2 text-stone-800 font-medium">
                MRP
              </th>
              <th className="border border-slate-300 px-4 py-2 text-stone-800 font-medium">
                Cost Price
              </th>
              <th className="border border-slate-300 px-4 py-2 text-stone-800 font-medium">
                Sell Price
              </th>
              <th className="border border-slate-300 px-4 py-2 text-stone-800 font-medium">
                Expiry Date
              </th>
              <th className="border border-slate-300 px-4 py-2 text-stone-800 font-medium"></th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {itemsSupplied &&
              itemsSupplied.map((product, productIndex) => {
                if (product.productitem) {
                  return (
                    <tr key={productIndex}>
                      <td>
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            handleSelectItem(product, e.target.checked)
                          }
                        />
                      </td>
                      <td>{product.productitem.compositionName}</td>
                      <td>{product.productitem.brand}</td>
                      <td>{product.productitem.manufacturer}</td>
                      <td>{product.productitem.type}</td>
                      {/* Add input fields for additional properties */}
                      <td>
                        <input
                          type="text"
                          value={product.quantity}
                          onChange={(e) =>
                            handleProductInputChange(
                              e,
                              productIndex,
                              "quantity"
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={product.metric}
                          onChange={(e) =>
                            handleProductInputChange(e, productIndex, "metric")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={product.MRP}
                          onChange={(e) =>
                            handleProductInputChange(e, productIndex, "MRP")
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={product.costPrice}
                          onChange={(e) =>
                            handleProductInputChange(
                              e,
                              productIndex,
                              "costPrice"
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={product.sellPrice}
                          onChange={(e) =>
                            handleProductInputChange(
                              e,
                              productIndex,
                              "sellPrice"
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          value={product.expiryDate}
                          onChange={(e) =>
                            handleProductInputChange(
                              e,
                              productIndex,
                              "expiryDate"
                            )
                          }
                        />
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            {formData.products.map((x, i) => (
              <tr key={i}>
                <td></td>
                <td className="border border-slate-300 ">
                  <input
                    type="text"
                    className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="compositionName"
                    placeholder="Enter Composition Name"
                    value={x.compositionName}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </td>

                <td className="border border-slate-300 ">
                  <input
                    type="text"
                    className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="brand"
                    placeholder="Brand"
                    value={x.brand}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </td>

                <td className="border border-slate-300 ">
                  <select
                    name="manufacturer"
                    value={x.manufacturer}
                    onChange={(e) => handleInputChange(e, i)}
                    className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  >
                     <option  value=''>Selet Manifacturer</option>
                    {manifacture.map((manifacture) => (
                      <option key={manifacture.name} value={manifacture.name}>
                        {manifacture.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border border-slate-300">
                  <select
                    name="type"
                    value={x.type}
                    onChange={(e) => handleInputChange(e, i)}
                    className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  >
                  <option  value=''>Select Type</option>
                    {products.map((product) => (
                      <option key={product.name} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border border-slate-300 ">
                  <input
                    type="text"
                    className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="quantity"
                    placeholder="Quantity"
                    value={x.quantity}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </td>
                <td className="border border-slate-300 ">
                  <input
                    type="text"
                    className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="metric"
                    placeholder="Metric"
                    value={x.metric}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </td>
                <td className="border border-slate-300 ">
                  <input
                    type="text"
                    className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="MRP"
                    placeholder="MRP"
                    value={x.MRP}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </td>
                <td className="border border-slate-300 ">
                  <input
                    type="text"
                    className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="costPrice"
                    placeholder="Cost Price"
                    value={x.costPrice}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </td>
                <td className="border border-slate-300 ">
                  <input
                    type="text"
                    className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="sellPrice"
                    placeholder="Sell Price"
                    value={x.sellPrice}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </td>
                <td className="border border-slate-300 ">
                  <input
                    type="date"
                    className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    name="expiryDate"
                    placeholder="Expiry Date"
                    value={x.expiryDate}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </td>
                <td className="border border-slate-300 px-4">
                  {formData.products.length !== 1 && (
                    <button
                      onClick={() => handleRemoveClick(i)}
                      className="py-1 px-2 bg-red-500 text-white rounded"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={handleAddClick}
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </button>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default AddPurchase;
