import { useState } from 'react';
import axios from 'axios';
import { CgCloseR } from "react-icons/cg";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

const FinancialYearForm = ({ onClose, onDataRefresh }) => {
    const loginusername = useSelector((state) => state.auth.user.name);
    const [formData, setFormData] = useState({
        title: '',
        startDate: '',
        endDate: ''
        
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const baseURL = import.meta.env.VITE_BASE_URL;
          const url = `${baseURL}financial-years`;
            const response = await axios.post(url , {
                ...formData,
                createdBy: loginusername
            });
            console.log(response.data);
            onClose();
            onDataRefresh();
        } catch (error) {
            console.error('Error creating financial year:', error);
        }
    };

    return (
        <div>
            <div className="fixed inset-0 flex justify-end bg-gray-800 bg-opacity-75 z-50">
                <div className="bg-white rounded-lg w-4/12">
                    <div className="flex justify-between items-center mb-4 p-4 table-head">
                        <h2 className="text-2xl font-bold">Create Financial Year</h2>
                        <button onClick={onClose} className="hover:text-gray-800 pr-3" style={{ color: '#00BBD1' }}>
                            <CgCloseR className="h-6 w-6" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 p-3 flex flex-wrap">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                Title:
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter title"
                                required
                            />
                        </div>
                        <div className="mb-4 p-3 flex flex-wrap">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                                Start Date:
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                                End Date:
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
                        <div className="mb-4 pr-3 absolute bottom-0 right-0" style={{ backgroundColor: '#F4F4F4' }}>
                            <div>
                                <button
                                    type="reset"
                                    className="border-2 text-teal-400 font-bold py-2 px-4 rounded mr-3 reset-color"
                                    style={{ borderColor: '#00BBD1', color: '#00BBD1' }}
                                >
                                    Clear
                                </button>
                                <button
                                    type="submit"
                                    className="hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                                    style={{ backgroundColor: '#00BBD1' }}
                                >
                                    Submit
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
    onDataRefresh: PropTypes.func.isRequired
};

export default FinancialYearForm;
