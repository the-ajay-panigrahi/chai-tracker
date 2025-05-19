const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 flex flex-col sm:flex-row justify-between items-center">
        <span className="text-sm sm:text-base">
          &copy; {new Date().getFullYear()} Chai Tracker
        </span>
        <div className="flex gap-4 mt-3 sm:mt-0 text-sm sm:text-base">
          <a href="#privacy" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-white transition">
            Terms of Service
          </a>
          <a href="#contact" className="hover:text-white transition">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
