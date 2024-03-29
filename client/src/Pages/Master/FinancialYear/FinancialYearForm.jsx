import { useState ,useEffect} from 'react';
import axios from 'axios';
import { CgCloseR } from "react-icons/cg";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
const FinancialYearForm = ({ onClose, onDataRefresh, editData  }) => {
    const loginusername = useSelector((state) => state.auth.user.name);
    const [formData, setFormData] = useState({
        title: '',
        startDate: '',
        endDate: ''
        
    });

    useEffect(() => {
        if (editData) {
          // If editData is provided, populate the form fields with its data
          setFormData({
            title: editData.title || '',
      startDate: editData.startDate || '',
      endDate: editData.endDate || '',
          });
        }
      }, [editData]);
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const baseURL = import.meta.env.VITE_BASE_URL;
          let url = `${baseURL}financial-years`;
    
          if (editData) {
            // If editData exists, it's an edit operation
            url += `/${editData._id}`; // Append ID for editing
            await axios.put(url, {
              ...formData,
              createdBy: loginusername,
            });
            toast.success('Financial year updated successfully.');
          } else {
            // If editData is null, it's a create operation
            await axios.post(url, {
              ...formData,
              createdBy: loginusername,
            });
            toast.success('Financial year created successfully.');
          }
    
          setTimeout(() => {
            onClose();
            onDataRefresh();
          }, 3000);
        } catch (error) {
          console.error('Error:', error);
          toast.error(error.response?.data?.message || 'An error occurred.');
        }
      };
    return (
        <div>
                   
            <div className="fixed inset-0 flex justify-end bg-gray-800 bg-opacity-75 z-50">
            <ToastContainer />
                <div className="bg-white rounded-lg w-4/12">
                    <div className="flex justify-between items-center mb-4 p-4 table-head">
                    <h2 className="text-2xl font-bold">{editData ? 'Edit Financial Year' : 'Create Financial Year'}</h2>
                        <button onClick={onClose} className="hover:text-gray-800 pr-3" style={{ color: '#00BBD1' }}>
                            <CgCloseR className="h-6 w-6" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 p-3 flex flex-wrap">
                            <label className="block text-gray-700 text-sm font-normal mb-2" htmlFor="title">
                                Title<span className='text-rose-400'>*</span> 
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Financial Year 19 to 20"
                                required
                            />
                        </div>
                        <div className="mb-4 p-3 flex flex-wrap">
                            <label className="block text-gray-700 text-sm font-normal mb-2" htmlFor="startDate">
                                Start Date<span className='text-rose-400'>*</span> 
                            </label>
                            <input
                            
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                              
                            />
                        </div>
                        <div className="mb-4 p-3 flex flex-wrap">
                            <label className="block text-gray-700 text-sm font-normal mb-2" htmlFor="endDate">
                                End Date<span className='text-rose-400'>*</span> 
                            </label>
                            <input
                         
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="  " >
                            <div className='pr-3 absolute bottom-0 right-0  bg-gray-200  rounded-md w-4/12 h-auto   py-3 flex justify-end' >
                                <button
                                    type="reset"
                                    className="border-2 text-teal-400 font-bold py-2 px-4 rounded mr-3 reset-color"
                                    style={{ borderColor: '#00BBD1', color: '#00BBD1' }}
                                >
                                    Clear
                                </button>
                                <button
                type="submit"
                className={`hover:bg-teal-700 text-white font-bold px-4 rounded py-2 ${
                  editData ? 'bg-blue-500' : 'bg-green-500'
                }`}
              >
                {editData ? 'Update' : 'Create'}
              </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

FinancialYearForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    onDataRefresh: PropTypes.func.isRequired,
    editData: PropTypes.object
};

export default FinancialYearForm;
