// app/page.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import scheduleDB from "@/data/scheduleDB.json";

export default function LunaYoga() {
  const [theme, setTheme] = useState<"calm" | "focus">("calm");
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);

  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "services", "schedule"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scrolling to sections
  const scrollToSection = useCallback((id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "calm" ? "focus" : "calm"));
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextStep = () => {
    setBookingStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setBookingStep((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Service cards data
  const services = [
    {
      title: "Private Classes",
      description:
        "Personalized one-on-one sessions tailored to your needs and goals.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      title: "Retreats",
      description:
        "Immersive experiences in serene locations to deepen your practice.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Online Sessions",
      description:
        "Flexible classes from the comfort of your home, live or on-demand.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === "calm"
          ? "bg-gradient-to-b from-sky-50 to-blue-100 text-indigo-900"
          : "bg-gradient-to-b from-amber-50 to-orange-100 text-amber-900"
      }`}
    >
      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <BookingModal
            theme={theme}
            closeModal={closeModal}
            bookingStep={bookingStep}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed w-full z-40 py-4 backdrop-blur-sm bg-white/50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div
              className={`p-2 rounded-full ${
                theme === "calm" ? "bg-blue-100" : "bg-amber-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 h-6 ${
                  theme === "calm" ? "text-blue-600" : "text-amber-600"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </div>
            <span className="font-serif text-xl font-semibold">Luna Yoga</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              {["services", "schedule"].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize px-3 py-1 rounded-full transition-colors ${
                    activeSection === item
                      ? theme === "calm"
                        ? "bg-blue-200"
                        : "bg-amber-200"
                      : ""
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === "calm"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-amber-100 text-amber-700"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "calm" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg bg-white/50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/80 backdrop-blur-sm"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
                {["services", "schedule"].map((item) => (
                  <motion.button
                    key={item}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize px-3 py-2 rounded-lg text-left ${
                      activeSection === item
                        ? theme === "calm"
                          ? "bg-blue-100"
                          : "bg-amber-100"
                        : ""
                    }`}
                  >
                    {item}
                  </motion.button>
                ))}
                <button
                  onClick={toggleTheme}
                  className={`px-3 py-2 rounded-lg text-left ${
                    theme === "calm"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  Switch to {theme === "calm" ? "Focus" : "Calm"} Theme
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16"
      >
        {/* Wave animation */}
        <div className="absolute bottom-0 w-full overflow-hidden">
          <div className="wave-container relative h-32 w-[200%]">
            <div
              className={`absolute top-0 left-0 w-full h-full ${
                theme === "calm" ? "bg-blue-500" : "bg-amber-500"
              }`}
              style={{
                clipPath:
                  "polygon(0% 45%, 5% 44%, 10% 46%, 15% 50%, 20% 55%, 25% 58%, 30% 58%, 35% 55%, 40% 50%, 45% 44%, 50% 40%, 55% 41%, 60% 46%, 65% 52%, 70% 55%, 75% 54%, 80% 49%, 85% 45%, 90% 42%, 95% 40%, 100% 41%, 100% 100%, 0% 100%)",
              }}
            />
            <div
              className={`absolute top-0 left-0 w-full h-full ${
                theme === "calm" ? "bg-blue-400" : "bg-amber-400"
              }`}
              style={{
                clipPath:
                  "polygon(0% 60%, 5% 65%, 10% 70%, 15% 75%, 20% 75%, 25% 70%, 30% 60%, 35% 55%, 40% 55%, 45% 60%, 50% 65%, 55% 65%, 60% 60%, 65% 55%, 70% 50%, 75% 45%, 80% 40%, 85% 35%, 90% 30%, 95% 25%, 100% 20%, 100% 100%, 0% 100%)",
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-6"
          >
            Luna Yoga <span className="font-normal">with Maya</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <p className="text-xl md:text-2xl italic mb-6">
              “Find your center through conscious movement.”
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
            className={`px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-colors ${
              theme === "calm"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-amber-600 text-white hover:bg-amber-700"
            }`}
          >
            Book a Session
          </motion.button>
        </div>

        <motion.div
          className="absolute bottom-20 animate-bounce"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <button
            onClick={() => scrollToSection("services")}
            className="p-3 rounded-full bg-white/30 backdrop-blur-sm"
            aria-label="Scroll down"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 ${
                theme === "calm" ? "text-blue-600" : "text-amber-600"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif font-bold text-center mb-16"
          >
            Our Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-3xl shadow-lg backdrop-blur-sm bg-white/70 overflow-hidden relative ${
                  theme === "calm"
                    ? "border border-blue-200"
                    : "border border-amber-200"
                }`}
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 rounded-full ${
                    theme === "calm" ? "bg-blue-200" : "bg-amber-200"
                  }`}
                ></div>

                <div
                  className={`mb-6 ${
                    theme === "calm" ? "text-blue-500" : "text-amber-500"
                  }`}
                >
                  {service.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif font-bold text-center mb-16"
          >
            Weekly Schedule
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div
                className={`absolute left-4 top-0 h-full w-1 ${
                  theme === "calm" ? "bg-blue-300" : "bg-amber-300"
                }`}
              ></div>

              {scheduleDB.map((cls, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex mb-12 last:mb-0"
                >
                  <div className="flex-shrink-0 z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        theme === "calm"
                          ? "bg-blue-500 text-white"
                          : "bg-amber-500 text-white"
                      }`}
                    >
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>

                  <div
                    className={`ml-6 p-6 rounded-2xl backdrop-blur-sm bg-white/70 shadow-sm w-full ${
                      theme === "calm"
                        ? "border border-blue-200"
                        : "border border-amber-200"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div className="mb-3 md:mb-0">
                        <h3 className="text-xl font-semibold mb-1">
                          {cls.title}
                        </h3>
                        <p className="text-gray-700">{cls.description}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          theme === "calm"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {cls.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-10 text-center ${
          theme === "calm"
            ? "bg-blue-500 text-white"
            : "bg-amber-500 text-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <p className="mb-4">
            © {new Date().getFullYear()} Luna Yoga with Maya. All rights
            reserved.
          </p>
          <p className="text-sm opacity-80">
            Find your center through conscious movement.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Booking Modal Component
function BookingModal({
  theme,
  closeModal,
  bookingStep,
  nextStep,
  prevStep,
}: {
  theme: "calm" | "focus";
  closeModal: () => void;
  bookingStep: number;
  nextStep: () => void;
  prevStep: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sessionType: "private",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit this data to your backend
    alert("Booking request submitted! We will contact you shortly.");
    closeModal();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal Content */}
      <motion.div
        className={`relative rounded-3xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto ${
          theme === "calm" ? "bg-blue-50" : "bg-amber-50"
        }`}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <button
          onClick={closeModal}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            theme === "calm"
              ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
              : "bg-amber-100 text-amber-700 hover:bg-amber-200"
          }`}
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6 md:p-8">
          {/* Modal Header */}
          <div className="text-center mb-8">
            <div
              className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                theme === "calm" ? "bg-blue-100" : "bg-amber-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-8 h-8 ${
                  theme === "calm" ? "text-blue-600" : "text-amber-600"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2">
              Book Your Session
            </h3>
            <p className="text-gray-600">
              Experience personalized yoga with Maya
            </p>
          </div>

          {/* Booking Steps */}
          <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2 z-0"></div>
            {[1, 2, 3].map((step) => (
              <div key={step} className="relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    bookingStep === step
                      ? theme === "calm"
                        ? "bg-blue-600 text-white"
                        : "bg-amber-600 text-white"
                      : "bg-white border-2 border-gray-300"
                  }`}
                >
                  {step}
                </div>
                <div className="text-xs mt-2 text-center">
                  {step === 1 && "Details"}
                  {step === 2 && "Schedule"}
                  {step === 3 && "Confirm"}
                </div>
              </div>
            ))}
          </div>

          {/* Step 1: Personal Details */}
          {bookingStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(123) 456-7890"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={nextStep}
                  className={`w-full py-3 rounded-xl text-white font-medium ${
                    theme === "calm"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-amber-600 hover:bg-amber-700"
                  }`}
                >
                  Next: Choose Session
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Session Details */}
          {bookingStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Session Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["private", "retreat", "online", "couple"].map((type) => (
                    <label
                      key={type}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-colors flex flex-col items-center ${
                        formData.sessionType === type
                          ? theme === "calm"
                            ? "border-blue-500 bg-blue-50"
                            : "border-amber-500 bg-amber-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="sessionType"
                        value={type}
                        checked={formData.sessionType === type}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`mb-2 p-2 rounded-full ${
                          theme === "calm" ? "bg-blue-100" : "bg-amber-100"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`w-5 h-5 ${
                            theme === "calm"
                              ? "text-blue-600"
                              : "text-amber-600"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="capitalize font-medium">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="date"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="time"
                  >
                    Time
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="7:00 PM">7:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="message"
                >
                  Special Requests
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any special requests or notes..."
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={prevStep}
                  className={`py-3 px-6 rounded-xl font-medium ${
                    theme === "calm"
                      ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className={`py-3 px-6 rounded-xl text-white font-medium ${
                    theme === "calm"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-amber-600 hover:bg-amber-700"
                  }`}
                >
                  Next: Confirm
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {bookingStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div
                className={`p-6 rounded-2xl ${
                  theme === "calm" ? "bg-blue-100" : "bg-amber-100"
                }`}
              >
                <h4 className="font-bold mb-3">Booking Summary</h4>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">
                      {formData.name || "Not provided"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">
                      {formData.email || "Not provided"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">
                      {formData.phone || "Not provided"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Session Type:</span>
                    <span className="font-medium capitalize">
                      {formData.sessionType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date & Time:</span>
                    <span className="font-medium">
                      {formData.date
                        ? `${formData.date} at ${formData.time}`
                        : "Not selected"}
                    </span>
                  </div>
                  {formData.message && (
                    <div className="pt-2 border-t border-gray-300">
                      <p className="text-gray-600">Special Requests:</p>
                      <p className="font-medium">{formData.message}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className={`py-3 px-6 rounded-xl font-medium ${
                    theme === "calm"
                      ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className={`py-3 px-6 rounded-xl text-white font-medium ${
                    theme === "calm"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-amber-600 hover:bg-amber-700"
                  }`}
                >
                  Confirm Booking
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
