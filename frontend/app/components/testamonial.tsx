import Image from "next/image";

const testimonials = [
  {
    name: "Hodan Ibrahim",
    role: "Citizen",
    image: "/mare.jpg",
    text: "This platform made it so easy to submit my complaint and track the response. Truly transparent and fast!"
  },
  {
    name: "Mohamed Ali",
    role: "Community Leader",
    image: "/mao.jpg",
    text: "I love how secure and reliable this system is. It's a game-changer for citizen engagement."
  },
  {
    name: "Captain Mudey",
    role: "NGO Volunteer",
    image: "/mudey.jpg",
    text: "The complaint tracking feature gives citizens real power. Highly recommend it to everyone!"
  },
  {
    name: "Mohamed",
    role: "Teacher",
    image: "/Moha.jpg",
    text: "A modern solution that truly bridges the gap between citizens and government services."
  },
  {
    name: "Ayub Hassan",
    role: "Business Owner",
    image: "/Ayoub.jpg",
    text: "Fast responses and a transparent system. This is exactly what our country needed."
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          What People Are Saying
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col items-center text-center hover:border-gray-300 transition"
            >
              <div className="w-20 h-20 mb-4 relative rounded-full overflow-hidden border border-gray-200">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-gray-700 mb-4 text-sm">{t.text}</p>

              <h3 className="font-semibold text-gray-900">{t.name}</h3>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
