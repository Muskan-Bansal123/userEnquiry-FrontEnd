import React, { useState } from "react";
import { Label, TextInput, Button, Textarea } from "flowbite-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; //toast
export default function EForm({ setLoadFlag, formData, setFormData }) {
  let saveEnquiry = (e) => {
    e.preventDefault();

    if (formData._id) {
      //when _id is not null then we have to do update work
      axios
        .put(
          `https://userenquiry-backend-3.onrender.com/api/website/enquiry/update/${formData._id}`,
          formData
        )
        .then((res) => {
          toast.success("Data updated successfully!");
          setFormData({
            //after saving we have to set the fields blank of form
            sName: "",
            sEmail: "",
            sPhone: "",
            sMessage: "",
            _id: "",
          });
          setLoadFlag((prev) => prev + 1);
        });
    } else {
      //do insert work
      axios
        .post(
          "https://userenquiry-backend-3.onrender.com/api/website/enquiry/insert",
          formData
        )
        .then((res) => {
          console.log(res.data);
          toast.success("Data saved successfully!"); //toast
          setFormData({
            //after saving we have to set the fields blank of form
            sName: "",
            sEmail: "",
            sPhone: "",
            sMessage: "",
            _id: "",
          });
          setLoadFlag((prev) => prev + 1);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  let getValue = (e) => {
    let inputName = e.target.name; //will give one field-> sName/sEmail/sPhone,sMessage
    let inputVal = e.target.value; //will give value of that one field
    let oldData = { ...formData };
    oldData[inputName] = inputVal;
    setFormData(oldData);
  };
  return (
    <div>
      <ToastContainer />
      <div className="bg-amber-500">
        <h1 className="font-bold text-[30px] py-3 text-center">Enquiry Form</h1>
        <form action="" onSubmit={saveEnquiry}>
          <div className="py-3 px-2">
            <Label htmlFor="name">Your Name</Label>
            <TextInput
              type="text"
              name="sName" //changed "name" to  "sName" becz in getValue func we needed it to actually match to the fields in formData
              id="name"
              value={formData.sName}
              onChange={getValue}
              placeholder="Enter your name..."
              required
              shadow
            />
          </div>
          <div className="py-3 px-2">
            <Label htmlFor="email">Your Email</Label>
            <TextInput
              type="email"
              name="sEmail"
              id="email"
              value={formData.sEmail}
              onChange={getValue}
              placeholder="Enter your email..."
              required
              shadow
            />
          </div>
          <div className="py-3 px-2">
            <Label htmlFor="phone">Your Phone</Label>
            <TextInput
              type="number"
              name="sPhone"
              id="phone"
              value={formData.sPhone}
              onChange={getValue}
              placeholder="Enter your phone no..."
              required
              shadow
            />
          </div>
          <div className="py-3 px-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              name="sMessage"
              id="message"
              value={formData.sMessage}
              onChange={getValue}
              placeholder="Leave a message..."
              required
              rows={4}
            />
          </div>
          <div className="py-3 px-2">
            <Button className="w-full bg-black text-white" type="submit">
              {formData._id ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
