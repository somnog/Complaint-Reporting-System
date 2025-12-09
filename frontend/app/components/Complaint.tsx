"use client";

const ComplaintsPage = () => {
  return (
    <>
      <h1 className="text-4xl md:text-6xl text-center font-extrabold text-gray-800 leading-tight">
        Submit Complaint & Feedback
      </h1>
      <section className="max-w-6xl mx-auto px-6 py-16 mt-24 grid md:grid-cols-2 gap-12">
        {/* Left Side - Form */}
        <div>
          <p className="text-gray-600 text-lg mb-6">
            Your feedback helps improve Somalia Government services. Please fill
            out the form below and our team will review your submission.
          </p>
        </div>

        {/* Right Side - Info */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            What Happens Next?
          </h2>
          <ul className="text-gray-600 text-lg space-y-3">
            <li>
              • Your complaint will be reviewed by the appropriate government
              department.
            </li>
            <li>
              • Sensitive reports such as corruption are handled confidentially.
            </li>
            <li>
              • You may receive a follow-up if additional information is needed.
            </li>
          </ul>

          <div className="mt-8 p-8 bg-gray-100 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Need Immediate Support?
            </h3>
            <p className="text-gray-600">Call our hotline:</p>
            <p className="text-2xl font-bold text-gray-800 mt-2">
              +252 61 234 5678
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ComplaintsPage;
