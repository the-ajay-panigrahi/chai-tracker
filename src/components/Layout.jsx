const Layout = (props) => {
  const { children } = props;
  {
    console.log(children);
  }

  const header = (
    <header className="bg-gray-900 text-white shadow sticky top-0 z-11">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3 sm:py-4">
        {/* Logo / Brand */}
        <h1 className="text-xl sm:text-3xl font-bold text-orange-400 flex gap-2">
          <img
            src="/chai-logo.png"
            className="w-5 sm:w-10 object-contain hover:scale-110 cursor-pointer transition-all duration-200"
            alt=""
          />
          Tracker
        </h1>

        {/* Signup Button */}
        <button className="bg-orange-500 hover:bg-orange-600 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full text-sm sm:text-base transition-shadow shadow-sm hover:shadow-md cursor-pointer">
          Signup
        </button>
      </div>
    </header>
  );

  const footer = (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 flex flex-col sm:flex-row justify-between items-center">
        {/* Branding */}
        <span className="text-sm sm:text-base">
          &copy; {new Date().getFullYear()} Chai Tracker
        </span>

        {/* Links */}
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

  return (
    <div className="relative">
      {header}
      <main>{children}</main>
      {footer}
    </div>
  );
};

export default Layout;
