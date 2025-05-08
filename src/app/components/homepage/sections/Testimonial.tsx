import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Jake Smith",
    role: "Blockchain Developer",
    initials: "JS",
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
    content:
      "As a developer building in the Web3 space, this platform is exactly what I needed to fund my projects. The transparent process and smart contract integrations make everything trustworthy.",
    stars: 5,
  },
  {
    name: "Amanda Rodriguez",
    role: "Angel Investor",
    initials: "AR",
    bgColor: "bg-purple-100",
    textColor: "text-purple-700",
    content:
      "The dashboard analytics make it easy to track my investments across multiple blockchain projects. I appreciate the detailed progress reports and transparent funding metrics.",
    stars: 5,
  },
  {
    name: "Tyler Nguyen",
    role: "Startup Founder",
    initials: "TN",
    bgColor: "bg-green-100",
    textColor: "text-green-700",
    content:
      "Finding investors for my blockchain project was a challenge until I discovered this platform. The interface is intuitive and connecting with potential backers is seamless.",
    stars: 5,
  },
];

export function HpTestimonials() {
  return (
    <section className="py-20 bg-black text-white border-b-[1px] border-b-gray" >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl text-white font-bold bg-clip-text bg-gradient-to-r from-primary-500 to-primary-400 mb-4">
          What people are saying
        </h2>
        <p className="text-yellow-400 text-lg mb-16">
          Hear from our early community members
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-xl p-6 shadow-sm text-white bg-black/20 backdrop-blur"
            >
              <div className="flex items-center mb-4">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full font-bold ${testimonial.bgColor} ${testimonial.textColor}`}
                >
                  {testimonial.initials}
                </div>
                <div className="ml-4 text-left">
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-400">"{testimonial.content}"</p>
              <div className="flex justify-center gap-5 mt-4 text-yellow-400">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HpTestimonials;
