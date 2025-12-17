import { motion } from "framer-motion";
import { FaArrowRight, FaPalette } from "react-icons/fa";

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-base-100">

            <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6 py-28 text-center">
                <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary"
                >
                    <FaPalette />
                    Premium Decoration Platform
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl"
                >
                    Turn Your Events Into
                    <span className="block text-primary">Beautiful Experiences</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mx-auto mt-6 max-w-2xl text-base text-base-content/70 md:text-lg"
                >
                    Discover trusted decorators, book services instantly, and track
                    everything from one modern dashboard.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-10 flex justify-center gap-4"
                >
                    <button className="btn btn-primary rounded-full px-8">
                        Get Started <FaArrowRight />
                    </button>
                    <button className="btn btn-outline rounded-full px-8">
                        View Services
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
