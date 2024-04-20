// Table.js

import { useState } from "react";
import PropTypes from "prop-types";

import Switch, { switchClasses } from "@mui/joy/Switch";
import edit from "../../assets/images/icons/tableicone/edit.svg";
// import del from "../../assets/images/icons/tableicone/delete.svg";
// import * as React from 'react';
import Box from "@mui/material/Box";
// import InputLabel from '@mui/material/InputLabel';
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { BsFilterLeft } from "react-icons/bs";
import { LuFilter } from "react-icons/lu";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
// import { GrNext } from "react-icons/gr";
// import { GrPrevious } from "react-icons/gr";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CreateRols from "../../Pages/Admin/Rols/CreateRols";
import { MdDelete } from "react-icons/md";
const Table = ({ data, columns, pageSize, onDataRefresh }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [checkedRows, setCheckedRows] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalRecordsPerPage = paginatedData.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSwitchChange = (rowIndex, isChecked) => {
    setCheckedRows((prevCheckedRows) => ({
      ...prevCheckedRows,
      [rowIndex]: isChecked,
    }));
  };
  // form toggle
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <div className="">
      {showPopup && (
        <CreateRols onClose={togglePopup} onDataRefresh={onDataRefresh} />
      )}
      <div className="mx-auto p-4 text-black bg-white dark:bg-dark1 dark:text-white">
        <div className="flex justify-between mb-4">
          <div className="flex items-center ">
            <BsFilterLeft className="mr-2" />
            <p className="mr-3">Sort By:</p>
            <Box
              sx={{ minWidth: 120, border: "none" }}
              className="border-none bg-white text-white border-white "
            >
              <FormControl
                fullWidth
                className="border-none bg-white text-black dark:bg-dark1"
                sx={{ border: "none" }}
              >
                <NativeSelect
                  className="border-none border-b-0 dark:text-white pl-1"
                  sx={{ border: "none", "&:focus": { border: "none" } }}
                  defaultValue={30}
                >
                  <option value={10} className="border-none">
                    Month
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

            <p className="ml-4 ">
              Total: <span>{data.length}</span>
            </p>
          </div>
          <div className="flex items-center">
            <IoSearch className="mx-3 text-black dark:text-dark-orange" />
            <MdOutlineFormatListBulleted className="mx-3 text-black dark:text-dark-orange" />
            <LuFilter className="mx-3 text-black dark:text-dark-orange" />
            <button
              className="px-3 p-1 text-sm font-semibold rounded bg-dark-orange text-black"
              style={{ backgroundColor: "" }}
              onClick={togglePopup}
            >
              + Create New
            </button>
          </div>
        </div>
        <hr />
        <table className="min-w-full bg-white text-slate-700 text-sm mt-3 dark:bg-dark1 dark:text-white">
          <thead>
            <tr
              className="text-black shadow-sm text-center items-center rounded-md dark:text-white dark:bg-dark1 divide- divide-white"
              style={{ backgroundColor: "" }}
            >
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="py-2 px-4 text-left font-medium"
                >
                  {column.title}
                </th>
              ))}
              <th className="py-2 px-4 text-left font-medium">Status</th>
              <th className="py-2 px-4 text-left font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 shadow-sm py-3 rounded-md"
              >
                {columns.map((column) => (
                  <td key={column.key} className="py-2 px-4   font-light">
                    {row[column.key]}
                  </td>
                ))}
                <td className="py-2 px-4 flex items-center">
                  <Switch
                    color={checkedRows[index] ? "success" : "danger"}
                    checked={checkedRows[index] || false}
                    onChange={(event) =>
                      handleSwitchChange(index, event.target.checked)
                    }
                    sx={{
                      paddingTop: "4px",
                      "--Switch-thumbSize": "12px",
                      "--Switch-trackWidth": "30px",
                      "--Switch-trackHeight": "18px",
                      "--Switch-trackBackground": "#FF3838",
                      "&:hover": {
                        "--Switch-trackBackground": "#FF3838",
                      },
                      [`&.${switchClasses.checked}`]: {
                        "--Switch-trackBackground": "#2CA302",
                        "&:hover": {
                          "--Switch-trackBackground": "#2CA302",
                        },
                      },
                    }}
                  />
                  {checkedRows[index] ? (
                    <span className="pl-3 text-green-600 text-center mt-1">
                      Active
                    </span>
                  ) : (
                    <span className="pl-3 text-red-600 text-center mt-1">
                      Inactive
                    </span>
                  )}
                </td>

                <td className="py-2 px-4 ">
                  <button
                    className="px-2 py-1 mr-2  rounded"
                    onClick={() => handleEdit(row)}
                  >
                    <img src={edit} alt="" />
                  </button>
                  <button
                    className="px-2 py-1 mr-2  rounded"
                    onClick={() => handleEdit(row)}
                  >
                    <MdDelete className="w-6 h-8" />
                  </button>
                  {/* <button className="px-2 py-1    rounded  " onClick={() => handleDelete(row)}>
                 <img src={del} className='text-red-500' alt="" />
                </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span
              className="px-3 py-2 "
              style={{ color: "#999999" }}
            >{`Records Per Page: ${totalRecordsPerPage} `}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                shape="rounded"
                page={currentPage}
                onChange={(event, page) => handlePageChange(page)}
              />
            </Stack>
            {/* <button
            className="px-3 py-2   "
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
           <GrPrevious />
          </button>
          <span className="px-3 py-2">{`${currentPage} of ${totalPages}`}</span>
          <button
            className="px-3 py-2  "
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <GrNext />
          </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
  onDataRefresh: PropTypes.func.isRequired,
};

export default Table;
