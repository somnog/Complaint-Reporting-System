
import { Send, Search } from "lucide-react";

const SubHero = () => {
  return (
    <section className="w-full bg-gray-100 text-white py-32 mt-20 relative overflow-hidden">

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10 space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
          Somalia Government<br />Complaint & Feedback System
        </h1>

        <p className="text-lg md:text-2xl text-gray-700 max-w-3xl mx-auto">
          Strengthening transparency, improving public service delivery, and empowering citizens
          through secure and efficient digital reporting.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          
          {/* Submit Button */}
          <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold text-lg shadow hover:bg-gray-200 transition flex items-center gap-2 justify-center">
            <Send size={20} />
            Submit a Complaint
          </button>

          {/* Track Case Button */}
          <button className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow hover:bg-gray-700 transition flex items-center gap-2 justify-center">
            <Search size={20} />
            Track Your Case
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-gray-100">
          <div className="p-6 bg-gray-700 rounded-xl shadow-md">
            <h3 className="text-3xl font-bold">10,000+</h3>
            <p className="mt-1">Complaints Resolved</p>
          </div>

          <div className="p-6 bg-gray-600 rounded-xl shadow-md">
            <h3 className="text-3xl font-bold">24/7</h3>
            <p className="mt-1">Support Availability</p>
          </div>

          <div className="p-6 bg-gray-300 rounded-xl shadow-md">
            <h3 className="text-3xl font-bold text-gray-900">100%</h3>
            <p className="mt-1 text-gray-900">Secure & Confidential</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubHero;
