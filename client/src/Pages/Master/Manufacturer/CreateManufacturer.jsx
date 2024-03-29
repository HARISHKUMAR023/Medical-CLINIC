import { useState, useEffect } from "react";
import axios from "axios";
import { CgCloseR } from "react-icons/cg";
import user from "../../../assets/images/icons/formicone/user.png";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateManufacturer = ({ onClose, onDataRefresh, editData }) => {
  const loginusername = useSelector((state) => state.auth.user.name);
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    hsltype: "",
    manufacturerPic: "",
  });

  useEffect(() => {
    if (editData) {
      // If editData is provided, populate the form fields with its data
      setFormData({
        name: editData.name || "",
        hsltype: editData.hsltype || "",
        manufacturerPic: editData.manufacturerPic || null,
      });
      setPreviewImage(editData.manufacturerPic || null); // Set preview image
    }
  }, [editData]);

  const handleChange = (e) => {
    if (e.target.name === "manufacturerPic") {
      const file = e.target.files[0];
      console.log("Selected file:", file); // Log the selected file
      setFormData({ ...formData, manufacturerPic: file });
      // Update image preview
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.append("name", formData.name);
    postData.append("hsltype", formData.hsltype);
    postData.append("createdBy", loginusername);
    if (formData.manufacturerPic) {
      postData.append("manufacturerPic", formData.manufacturerPic);
    }

    try {
      const baseURL = import.meta.env.VITE_BASE_URL;
      let url;
      if (editData) {
        // If editData exists, update the manufacturer
        url = `${baseURL}manufacturer/${editData._id}`;
        await axios.put(url, {
          ...formData,
        });
        console.log("postData:", postData);
        toast.success("Manufacturer updated successfully!");
      } else {
        // Otherwise, create a new manufacturer
        url = `${baseURL}manufacturer`;
        await axios.post(url, postData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Manufacturer created successfully!");
      }

      // Close the modal after a short delay
      setTimeout(() => {
        onClose();
        onDataRefresh();
      }, 3000);
    } catch (error) {
      console.error("Error creating or updating manufacturer:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="fixed inset-0 flex  justify-end bg-gray-800 bg-opacity-75 z-50">
      <ToastContainer />
      <div className="bg-white rounded-lg w-3/12">
        <div className="flex justify-between items-center mb-4 p-4 table-head">
          <h2 className="text-2xl font-bold">
            {editData ? "Edit Manufacturer" : "Create Manufacturer"}
          </h2>
          <button
            onClick={onClose}
            className="hover:text-gray-800 pr-3"
            style={{ color: "#00BBD1" }}
          >
            <CgCloseR className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 p-3 flex flex-wrap">
            <div className="mx-3">
              <label
                className="block text-gray-500 text-sm font-medium "
                htmlFor="name"
              >
                Name <span className="text-rose-400">*</span>
              </label>
              <input
                className=" border border-gray-300 p-2 py-4 rounded w-80"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Manufacturer Name"
              />
            </div>

            <div className="mx-3 mt-3">
              <label
                className="block text-gray-500 text-sm font-medium "
                htmlFor="hsltype"
              >
              HslType <span className="text-rose-400">*</span>
              </label>
              <input
                className=" border border-gray-300 p-2 py-4 rounded w-80"
                type="text"
                id="hsltype"
                name="hsltype"
                value={formData.hsltype}
                onChange={handleChange}
                required
                placeholder="hsltype"
              />
            </div>
          </div>

          <div className="flex  ml-6 mt-44">
            <div className="flex flex-col items-start">
              <label
                className="block text-gray-500 text-sm font-medium"
                htmlFor="manufacturerPic"
              >
                ManufacturerPic<span className="text-rose-400">*</span>
              </label>
              <div className="relative w-auto">
                <input
                  type="file"
                  id="manufacturerPic"
                  name="manufacturerPic"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleChange}
                  className="sr-only w-auto h-auto"
                />
                <label
                  htmlFor="manufacturerPic"
                  className="border-2 border-dashed border-gray-300 rounded cursor-pointer flex items-center justify-center w-80 h-24"
                >
                  <div className="text-center flex justify-center items-center p-3">
                    <img
                      src={user}
                      alt="Browse"
                      className="w-12 h-14 mx-auto mr-3"
                    />
                    <span>
                      Drag and drop image or{" "}
                      <span className="text-blue-600">Select</span>
                    </span>
                  </div>
                </label>
              </div>
              <img src={previewImage} alt="Preview" />
            </div>
          </div>
          <div>
            <div className="pr-3 absolute bottom-0 right-0  bg-gray-200  rounded-md w-3/12 h-auto   py-3 flex justify-end">
              <button
                type="reset"
                className="border-2 text-teal-400 font-bold py-2 px-4 rounded mr-3 reset-color"
                style={{ borderColor: "#00BBD1", color: "#00BBD1" }}
              >
                Clear
              </button>
              <button
                type="submit"
                className={`hover:bg-teal-700 text-white font-bold px-4 rounded py-2 ${
                  editData ? "bg-blue-500" : "bg-green-500"
                }`}
              >
                {editData ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateManufacturer.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDataRefresh: PropTypes.func.isRequired,
  editData: PropTypes.object,
};

export default CreateManufacturer;
