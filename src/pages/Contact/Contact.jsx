import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-16">

        <div>
          <h1 className="text-5xl font-bold">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="mt-5 text-base-content/70 max-w-md">
            Have questions or need help choosing a decoration service?
            Our team is always ready to help you.
          </p>

          <div className="mt-10 space-y-6">
            {[
              {
                icon: FaEnvelope,
                label: "Email",
                value: "support@styledecor.com",
              },
              {
                icon: FaPhoneAlt,
                label: "Phone",
                value: "+880 1XXX-XXXXXX",
              },
              {
                icon: FaMapMarkerAlt,
                label: "Location",
                value: "Dhaka, Bangladesh",
              },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">{label}</p>
                  <p className="text-sm text-base-content/70">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-base-100 rounded-3xl shadow-xl p-8">
          <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full"
            />
            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full min-h-[140px]"
            />

            <button className="btn btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
