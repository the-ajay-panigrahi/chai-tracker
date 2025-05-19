const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-4 pt-8 transition-all duration-500 ease-in-out relative overflow-hidden min-h-screen">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500 rounded-full opacity-30 blur-3xl animate-pulse z-20"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-600 rounded-full opacity-20 blur-2xl animate-pulse z-0"></div>
      <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold text-center leading-tight mb-10 tracking-tight flex justify-center gap-6 items-center flex-col lg:flex-row">
        Welcome to
        <span className="text-orange-500 drop-shadow-[0_0_10px_rgba(255,115,0,0.7)]">
          Chai Tracker
        </span>
        <img
          src="/chai-logo.png"
          className="w-14 sm:w-20 ml-[-15px] hover:scale-110 cursor-pointer transition-all duration-200"
          alt=""
        />
      </h1>
      <div className="relative z-10 backdrop-blur-md bg-white/5 border border-gray-700 p-6 sm:p-8 rounded-2xl shadow-xl max-w-3xl mx-auto mb-12 transition duration-500 hover:shadow-2xl hover:-translate-y-1 overflow-hidden ">
        <h3 className="text-3xl font-semibold mb-6 text-orange-400 animate-fade-in text-center md:text-left">
          Track your <strong className=" text-white">chai habit</strong> with
          ease
        </h3>
        <ul className="space-y-5 text-gray-300 text-base sm:text-lg leading-relaxed">
          {[
            { emoji: "☕", text: "Tracking every cup of chai" },
            { emoji: "🧠", text: "Monitoring your caffeine levels" },
            { emoji: "💸", text: "Quantifying your addiction cost" },
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-2 transition-all duration-300 hover:translate-x-2 cursor-pointer hover:font-semibold"
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="text-white">{item.text}</span>
            </li>
          ))}
        </ul>

        <img
          src="/hitesh-choudhary.png"
          className="max-w-sm object-cover absolute bottom-0 right-0 hidden md:block"
          alt=""
        />
      </div>
      <div className="relative z-10 bg-gradient-to-tr from-gray-800 to-gray-700 border border-gray-600 p-6 sm:p-8 rounded-2xl shadow-lg max-w-3xl mx-auto hover:shadow-2xl hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
        <div className="flex items-center gap-3 text-blue-400 mb-3">
          <span className="text-xl animate-pulse">ℹ️</span>
          <h3 className="text-lg font-semibold">Did you know?</h3>
        </div>
        <h5 className="text-lg sm:text-xl font-bold text-white mb-2 animate-fade-in">
          Caffeine&apos;s half-life is about 5 hours!
        </h5>
        <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
          After 5 hours, half the caffeine from your chai is still in your
          system. So if you sip 100mg now, you&apos;ll still be buzzing on 50mg
          5 hours later.
        </p>
      </div>
    </section>
  );
};

export default Hero;
