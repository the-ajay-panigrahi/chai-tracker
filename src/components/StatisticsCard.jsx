function StatisticCard({ fullWidth, title, children }) {
  return (
    <div
      className={`rounded-xl bg-white p-5 shadow-sm border border-gray-200 
      ${fullWidth ? "col-span-full" : "col-span-1 sm:col-span-1"} 
      flex flex-col gap-2 group hover:shadow-lg hover:border-blue-300 
      hover:scale-[1.02] transition-all duration-200 cursor-pointer`}
    >
      <h4 className="text-lg  text-gray-500 group-hover:text-orange-600 transition-colors duration-200 font-semibold">
        {title}
      </h4>
      {children}
    </div>
  );
}

export default StatisticCard;
