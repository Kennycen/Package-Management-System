import React, { useState } from "react";
import { X } from "lucide-react";

const AddPackageModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    trackingNumber: "",
    carrier: "",
    recipient: "",
    apartment: "",
    description: "",
    size: "",
  });

  const carriers = ["UPS", "USPS", "FedEx", "DHL", "Amazon Logistics", "Other"];

  const packageSizes = ["Small", "Medium", "Large", "Extra Large"];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-xl w-full max-w-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold">Add New Package</h2>
        <h3 className="mb-6 text-gray-500 text-sm">Enter the details of the new package arrival.</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tracking Number
              </label>
              <input
                type="text"
                name="trackingNumber"
                value={formData.trackingNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Carrier
              </label>
              <select
                name="carrier"
                value={formData.carrier}
                onChange={handleChange}
                className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a carrier</option>
                {carriers.map((carrier) => (
                  <option key={carrier} value={carrier}>
                    {carrier}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Name
              </label>
              <input
                type="text"
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apartment Number
              </label>
              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Package Size
            </label>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              required
            >
              <option value="">Select a size</option>
              {packageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors md:w-1/2"
          >
            Add Package
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPackageModal;
