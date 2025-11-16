import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { ToastContainer, toast } from "react-toastify"; //toast

export default function ETable({ flag, setFormData }) {
  let [enquries, setEnquires] = useState([]); //to store all the data from db
  let loadData = () => {
    axios
      .get(
        "https://userenquiry-backend-3.onrender.com/api/website/enquiry/view"
      )
      .then((res) => {
        setEnquires(res.data.viewResponse);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    // whenever flag changes → reload table
    loadData();
  }, [flag]);

  let delData = (delID) => {
    axios
      .delete(
        `https://userenquiry-backend-3.onrender.com/api/website/enquiry/delete/${delID}`
      )
      .then((res) => {
        toast.success("Data deleted successfully");
        loadData();
      });
  };

  let editRow = (enqid) => {
    axios
      .get(
        `https://userenquiry-backend-3.onrender.com/api/website/enquiry/single/${enqid}`
      )
      .then((res) => {
        let record = res.data.singleData;
        setFormData({
          sName: record.name,
          sEmail: record.email,
          sPhone: record.phone,
          sMessage: record.message,
          _id: record._id,
        });
      });
  };

  return (
    <div className="bg-amber-400">
      <ToastContainer />
      <h1 className="font-bold text-[30px] py-3 text-center mb-4">
        Enquiry List
      </h1>
      <div className="overflow-x-auto px-2">
        <div className="max-h-100 overflow-y-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>Sr No</TableHeadCell>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <TableHeadCell>Phone</TableHeadCell>
                <TableHeadCell>Message</TableHeadCell>
                <TableHeadCell>
                  <span className="sr-only">Edit</span>
                </TableHeadCell>
                <TableHeadCell>
                  <span className="sr-only">Delete</span>
                </TableHeadCell>
              </TableRow>
            </TableHead>

            <TableBody className="divide-y">
              {enquries.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-4 font-semibold"
                  >
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                enquries.map((item, index) => (
                  <TableRow
                    key={item._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.message}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => delData(item._id)}
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </TableCell>

                    <TableCell>
                      <button
                        onClick={() => editRow(item._id)}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
