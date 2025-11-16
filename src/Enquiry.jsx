import React, { useState } from "react";
import EForm from "./EForm";
import ETable from "./ETable";

export default function Enquiry() {
  let [loadFlag, setLoadFlag] = useState(0);
  let [formData, setFormData] = useState({
    sName: "",
    sEmail: "",
    sPhone: "",
    sMessage: "",
    _id: "",
  });
  return (
    <div className="px-2">
      <h1 className="text-[40px] font-bold text-center py-6 mb-4">
        User Enquiry
      </h1>

      <div className="grid grid-cols-[30%_auto] gap-x-4">
        <EForm
          setLoadFlag={setLoadFlag}
          formData={formData}
          setFormData={setFormData}
        />
        <ETable flag={loadFlag} setFormData={setFormData} />
      </div>
    </div>
  );
}
