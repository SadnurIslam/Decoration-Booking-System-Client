import { motion } from "framer-motion";
import { FaRegHandshake, FaPaintRoller, FaStar } from "react-icons/fa";

const About = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl font-bold leading-tight">
          About <span className="text-primary">StyleDecor</span>
        </h1>
        <p className="mt-6 text-base-content/70 text-lg">
          StyleDecor is a modern decoration service booking platform that
          connects customers with verified decorators for weddings, homes,
          and corporate events.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mt-20">
        {[
          {
            icon: FaPaintRoller,
            title: "Expert Decorators",
            text: "Hand-picked professionals with real event experience and verified reviews.",
          },
          {
            icon: FaRegHandshake,
            title: "Transparent Booking",
            text: "Clear pricing, secure payments, and zero hidden costs.",
          },
          {
            icon: FaStar,
            title: "Premium Experience",
            text: "From discovery to decoration, everything feels smooth and reliable.",
          },
        ].map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="bg-base-100 rounded-3xl p-8 shadow-md hover:shadow-xl transition"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Icon className="text-primary text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-base-content/70 text-sm leading-relaxed">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
