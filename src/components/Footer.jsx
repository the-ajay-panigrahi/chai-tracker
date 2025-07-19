const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6 sm:py-8 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-400">
      <div className="max-w-screen-md mx-auto px-4 flex flex-col sm:flex-row justify-between items-center md:max-w-[700px]">
        <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
          &copy; {new Date().getFullYear()} Chai Tracker
        </span>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-3 sm:mt-0 text-sm sm:text-base">
          <a
            href="#privacy"
            className="hover:text-gray-900 transition-colors duration-200 dark:hover:text-white"
          >
            Privacy Policy
          </a>
          <a
            href="#terms"
            className="hover:text-gray-900 transition-colors duration-200 dark:hover:text-white"
          >
            Terms of Service
          </a>
          <a
            href="#contact"
            className="hover:text-gray-900 transition-colors duration-200 dark:hover:text-white"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
