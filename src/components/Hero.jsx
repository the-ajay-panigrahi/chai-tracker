const Hero = () => {
  return (
    <section
      className="bg-gradient-to-b from-gray-50 to-white text-gray-800 px-4 pt-12  transition-all duration-500 ease-in-out relative overflow-hidden pb-16
                         dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white"
    >
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-300 dark:bg-orange-500 rounded-full opacity-30 blur-3xl animate-pulse z-0 transform transition-all duration-700 hover:scale-105"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-300 dark:bg-purple-600 rounded-full opacity-20 blur-2xl animate-pulse z-0 transform transition-all duration-700 hover:scale-105"></div>

      <h1 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-extrabold text-center leading-tight mb-10 tracking-tight flex justify-center items-center flex-col lg:flex-row gap-2 sm:gap-4 md:gap-6">
        Welcome to
        <span className="text-orange-600 dark:text-orange-500 drop-shadow-[0_0_8px_rgba(255,140,0,0.6)] dark:drop-shadow-[0_0_10px_rgba(255,115,0,0.7)] transition-colors duration-300">
          Chai Tracker
        </span>
        <img
          src="/chai-logo.png"
          className="w-12 sm:w-16 ml-0 lg:ml-[-15px] object-contain hover:scale-110 cursor-pointer transition-transform duration-300 ease-in-out"
          alt="Chai Logo"
        />
      </h1>

      <div
        className="relative z-10 bg-white/70 backdrop-blur-md border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-xl max-w-sm mx-auto mb-8 md:max-w-[700px] transition duration-500 hover:shadow-2xl hover:-translate-y-1 overflow-hidden
                         dark:bg-white/5 dark:border-gray-700"
      >
        <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-orange-600 dark:text-orange-400 animate-fade-in text-center md:text-left transition-colors duration-300">
          Track your{" "}
          <strong className="text-gray-900 dark:text-white">chai habit</strong>{" "}
          with ease
        </h3>
        <ul className="space-y-4 text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
          {[
            { icon: "fas fa-mug-hot", text: "Tracking every cup of chai" },
            { icon: "fas fa-brain", text: "Monitoring your caffeine levels" },
            {
              icon: "fas fa-sack-dollar",
              text: "Quantifying your addiction cost",
            },
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-3 transition-all duration-300 hover:translate-x-2 cursor-pointer hover:font-semibold text-gray-700 dark:text-white"
            >
              <i className={`${item.icon} text-xl w-6 text-center`}></i>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>

        <img
          src="/hitesh-choudhary.png"
          className="max-w-[150px] sm:max-w-[200px] object-cover absolute bottom-0 right-0 hidden md:block opacity-80 hover:opacity-100 transition-opacity duration-300"
          alt="Hitesh Choudhary"
        />
      </div>

      <div className="relative z-10 bg-gray-100 dark:bg-gradient-to-tr dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 p-6 sm:p-8 rounded-2xl shadow-lg max-w-sm mx-auto md:max-w-[700px] hover:shadow-2xl hover:scale-[1.01] transition duration-500 ease-in-out cursor-pointer">
        <div className="flex items-center gap-3 text-blue-500 dark:text-blue-400 mb-3">
          <i className="fas fa-info-circle text-xl animate-pulse"></i>
          <h3 className="text-lg font-semibold">Did you know?</h3>
        </div>
        <h5 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 animate-fade-in transition-colors duration-300">
          Caffeine&apos;s half-life is about 5 hours!
        </h5>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
          After 5 hours, half the caffeine from your chai is still in your
          system. So if you sip 100mg now, you&apos;ll still be buzzing on 50mg
          5 hours later.
        </p>
      </div>
    </section>
  );
};

export default Hero;
