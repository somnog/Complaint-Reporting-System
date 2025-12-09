"use client";
import Footer from "../components/footer";
import NavBar from "../components/NavBar";
import { useState } from "react";

const ComplaintsPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    reference: "",
    submitBy: "",
    category: "general",
    status: "",
    priority: "low",
    assignedTo: "",
    comments: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // You can connect to API here
  };

  return (
    <>
      <NavBar />
      <h1 className="text-4xl mt-10 md:text-6xl text-center font-extrabold text-gray-800 leading-tight">
        Submit Complaint & Feedback
      </h1>

      <section className="max-w-6xl mx-auto px-6 py-16 mt-24 grid md:grid-cols-2 gap-12">
        {/* Left Side - Form */}
        <div>
          <p className="text-gray-600 text-lg mb-6">
            Your feedback helps improve Somalia Government services. Please fill out the form below and our team will review your submission.
          </p>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <form onSubmit={handleSubmit} className="grid gap-4">

              {/* Full Name */}
              <input
                type="text"
                name="title"
                placeholder="Full Name"
                value={formData.title}
                onChange={handleChange}
                className="border p-3 rounded-xl w-full"
              />

              {/* Reference */}
              <input
                type="text"
                name="reference"
                placeholder="Reference Number"
                value={formData.reference}
                onChange={handleChange}
                className="border p-3 rounded-xl w-full"
              />

              {/* Submitted By */}
              <input
                type="text"
                name="submitBy"
                placeholder="Submitted By"
                value={formData.submitBy}
                onChange={handleChange}
                className="border p-3 rounded-xl w-full"
              />

              {/* Category */}
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="border p-3 rounded-xl w-full"
              />

              {/* Status */}
              <input
                type="text"
                name="status"
                placeholder="Status"
                value={formData.status}
                onChange={handleChange}
                className="border p-3 rounded-xl w-full"
              />

              {/* Priority */}
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="border p-3 rounded-xl w-full"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>

              {/* Assigned To */}
              <input
                type="text"
                name="assignedTo"
                placeholder="Assigned To"
                value={formData.assignedTo}
                onChange={handleChange}
                className="border p-3 rounded-xl w-full"
              />

              {/* Comments */}
              <textarea
                name="comments"
                placeholder="Additional Comments"
                value={formData.comments}
                onChange={handleChange}
                className="border p-3 rounded-xl w-full h-24"
              />

              {/* Description */}
              <textarea
                name="description"
                placeholder="Describe your complaint in detail..."
                value={formData.description}
                onChange={handleChange}
                className="border p-3 rounded-xl w-full h-32"
              />

              {/* Submit Button */}
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

      <Footer />
    </>
  );
};

export default ComplaintsPage;
