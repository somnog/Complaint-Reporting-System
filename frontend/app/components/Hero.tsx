import Image from "next/image";

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

          {/* Buttons */}
          <div className="mt-8 flex justify-center md:justify-start gap-4">

            {/* Submit Complaint Button */}
            <a
              href="/complaints/new"
              className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold shadow 
                        hover:bg-blue-800 transition"
            >
              Submit Complaint
            </a>

            {/* Track Complaint Button */}
            <a
              href="/complaints/track"
              className="px-6 py-3 border border-gray-400 rounded-lg font-semibold 
                        hover:border-blue-700 hover:text-blue-800 transition"
            >
              Track Complaint
            </a>
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
