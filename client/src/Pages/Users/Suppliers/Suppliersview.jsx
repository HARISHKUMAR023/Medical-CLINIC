import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { BsFilterLeft } from "react-icons/bs";
import { LuFilter } from "react-icons/lu";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import Profileimg from "../../../assets/illustration/AUTH-illustration/ProfileDetails.png";
// import CustomerCard from './CustomerCard';
import Cardsupplier from "../../../components/Card/Cardsupplier";
import Deletepop from "../../../components/Deletepop/Deletepop";
import CreateSuppliers from "./CreateSuppliers";
import { FaEdit } from "react-icons/fa";
// import bookicone from "../../../assets/images/icons/formicone/record.svg"
const SuppliersView = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);
  const [editData, setEditData] = useState(null); 
  const selectedfirstLetter = selectedSupplier
    ? selectedSupplier.agencyContactName.charAt(0).toUpperCase()
    : "";

  // OR using optional chaining (if supported in your environment):
  // const selectedfirstLetter = selectedSupplier?.agencyContactName?.charAt(0)?.toUpperCase() || '';
  const handleEdit = (supplierDate) => {
    // Set the data to edit and open the toggle popup
    setEditData(supplierDate);
    setShowPopup(true);
  }

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/suppliers");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleSupplierClick = (supplier) => {
    setSelectedSupplier(supplier);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    // Clear edit data when closing the popup
    if (!showPopup) setEditData(null);
  };

  const handleDelete = async (id) => {
    setShowPopUp(true);
    setItemToDeleteId(id);
  };

  const handleCancel = () => {
    console.log("Cancelled");
    setShowPopUp(false);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const url = `${baseURL}suppliers/${itemToDeleteId}`;
      await axios.delete(url);
      setShowPopUp(false);
      refetchSuppliers(); // Refetch suppliers after deletion
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const refetchSuppliers = async () => {
    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      const url = `${baseURL}suppliers`;
      const response = await axios.get(url);
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };
  return (
    <div
      className="flex bg-white mx-2 w-auto   mb-32"
      style={{ height: "600px" }}
    >
      {showPopup && (
        <CreateSuppliers
          onClose={togglePopup}
          editData={editData}
          refetchSuppliers={refetchSuppliers}
        />
      )}
      <div className="div-left w-9/12 p-4  ">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <BsFilterLeft className="mr-2" />
            <p className="mr-3">Sort By:</p>
            <Box
              sx={{ minWidth: 120, border: "none" }}
              className="border-none bg-white text-white border-white"
            >
              <FormControl
                fullWidth
                className="border-none bg-white text-white border-white"
                sx={{ border: "none" }}
              >
                <NativeSelect
                  disableUnderline
                  className="border-none border-b-0"
                  sx={{ border: "none", "&:focus": { border: "none" } }}
                  defaultValue={30}
                >
                  <option value={10} className="border-none">
                    Mounth
                  </option>
                  <option value={20} className="border-none">
                    Week
                  </option>
                  <option value={30} className="border-none">
                    Newest
                  </option>
                </NativeSelect>
              </FormControl>
            </Box>
            <p className="ml-4">
              Total: <span>{suppliers.length}</span>
            </p>
          </div>
          <div className="flex items-center">
            <IoSearch className="mx-3 text-black" />
            <MdOutlineFormatListBulleted className="mx-3 text-black" />
            <LuFilter className="mx-3 text-black" />
            <button
              className="text-white px-3 p-1 text-sm font-normal rounded"
              style={{ backgroundColor: "#00BBD1" }}
              onClick={togglePopup}
            >
              + Create New
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 overflow-y-scroll h-96">
          {suppliers.map((supplier) => (
            <div
              key={supplier._id}
              className="mb-4 cursor-pointer "
              onClick={() => handleSupplierClick(supplier)}
            >
              <Cardsupplier supplier={supplier} />
            </div>
          ))}
        </div>
      </div>
      <div className=" div-right w-3/12 ">
        <div className="flex  justify-between items-center ">
          <h2 className="font-bold" style={{ color: "#00BBD1" }}>
            Supplier Info
          </h2>
<div>
<button className="px-2 py-1 mr-2  rounded" onClick={() => handleEdit(selectedSupplier)}>
                <FaEdit  className='w-4 h-4'/>
                </button>
          <button
            className="px-2 py-1 mr-2 rounded hover:text-red-500"
            onClick={() =>
              selectedSupplier && handleDelete(selectedSupplier._id)
            }
          >
            <MdDelete className="w-4 h-4" />
          </button>
</div>
         
        </div>

        <div className="bg-white flex items-center mt-3">
          <div>
            {selectedSupplier ? (
              <div className="w-80">
                <div className="flex items-center">
                  <p
                    className="text-4xl text-white p-6 rounded"
                    style={{ backgroundColor: "#797878" }}
                  >
                    {selectedfirstLetter}
                  </p>
                  <p className="font-medium text-black capitalize ml-11 text-3xl">
                    {selectedSupplier.agencyContactName}
                  </p>
                </div>
                <hr className="h-0.5 mt-2 bg-gray-400 " />
                <p className="flex items-center mt-3">
                  <FiPhone className="mr-2 w-6 h-6" />
                  {selectedSupplier.contactMailId}
                </p>
                <p
                  className="flex items-center
                 mt-3"
                >
                  <MdOutlineMail className="mr-2 w-6 h-6" />{" "}
                  {selectedSupplier.contactPhoneNumber}
                </p>
               <hr className="h-0.5 mt-2 bg-gray-400 " />
               <p className="font-medium">Quick Info</p>
               <button className=" p-2  w-full rounded font-medium text-white mt-3" style={{backgroundColor:'#00BBD1'}}>
             Total Bills</button>
                {/* Display other details as needed */}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <img src={Profileimg} alt="" className="h-24 w-24" />
                <p className="text-lg">Select a supplier to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {showPopUp && (
        <Deletepop
          message="Are you sure you want to delete?"
          onCancel={handleCancel}
          onDelete={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

SuppliersView.propTypes = {
  onDataRefresh: PropTypes.func.isRequired,
};
export default SuppliersView;
