"use client";
import { useState } from "react";
const ComplaintsPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "general",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 mt-24 grid md:grid-cols-2 gap-12">

      {/* Left Side - Form */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Submit a Complaint</h1>
        <p className="text-gray-600 text-lg mb-6">
          Your feedback helps improve Somalia Government services. Please fill out the form below and our team will review your submission.
        </p>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <form onSubmit={handleSubmit} className="grid gap-4">

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="border p-3 rounded-xl w-full"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded-xl w-full"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={handleChange}
              className="border p-3 rounded-xl w-full"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-3 rounded-xl w-full"
            >
              <option value="general">General Complaint</option>
              <option value="corruption">Corruption Report</option>
              <option value="service">Service Issue</option>
              <option value="staff">Staff Misconduct</option>
            </select>

            <textarea
              name="message"
              placeholder="Describe your complaint in detail..."
              value={formData.message}
              onChange={handleChange}
              className="border p-3 rounded-xl w-full h-32"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-lg bg-gray-700 text-white font-semibold hover:bg-gray-800 transition"
            >
              Submit Complaint
            </button>

          </form>
        </div>
      </div>

      {/* Right Side - Info */}
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">What Happens Next?</h2>
        <ul className="text-gray-600 text-lg space-y-3">
          <li>• Your complaint will be reviewed by the appropriate government department.</li>
          <li>• Sensitive reports such as corruption are handled confidentially.</li>
          <li>• You may receive a follow-up if additional information is needed.</li>
        </ul>

        <div className="mt-8 p-8 bg-gray-100 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold text-gray-700 mb-2">Need Immediate Support?</h3>
          <p className="text-gray-600">Call our hotline:</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">+252 61 234 5678</p>
        </div>
      </div>

    </section>
  );
};

export default ComplaintsPage;