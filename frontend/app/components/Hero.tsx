import Image from "next/image";
import { Send, Search } from "lucide-react";
const HeroSection = () => {
  return (
    <section className="bg-white shadow-md max-w-6xl mx-auto rounded-xl mt-14 text-gray-900 py-20 relative overflow-hidden">

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center md:items-start gap-12">

        {/* Left Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Somalia Government
            <span className="block text-blue-800">Complaint & Feedback System</span>
          </h1>

          <p className="mt-5 text-lg text-gray-700 max-w-xl">
            A secure, transparent and fast platform for citizens to submit complaints, report issues,
            and track government responses. Your voice matters let’s build a better nation together.
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
        </div>

        {/* Right Illustration */}
        <div className="flex-1 flex justify-center">
          <div className="flex-1 flex justify-center">
  <Image
    src="/hero.svg"
    alt="Hero Illustration"
    width={380}     // you can change the size
    height={380}
    className="w-72 md:w-96"
  />
</div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
