import React from "react";
import { format, addDays, isSameDay, startOfToday } from "date-fns";

const HorizontalCalendar = ({ selectedDate, setSelectedDate }) => {
  const today = startOfToday();
  const days = Array.from({ length: 14 }, (_, i) => addDays(today, i)); // Show 14 days for more scroll

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-black text-slate-900">March 2026</h2>

      <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide no-scrollbar">
        {days.map((day) => {
          const isSelected = isSameDay(day, new Date(selectedDate));
          const isToday = isSameDay(day, today);

          return (
            <div
              key={day.toString()}
              className="flex flex-col items-center gap-4 min-w-[70px]"
            >
              <button
                onClick={() => setSelectedDate(format(day, "yyyy-MM-dd"))}
                className={`
                  relative w-[70px] h-[70px] rounded-full flex items-center justify-center text-xl font-bold transition-all duration-200
                  ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110"
                      : "bg-white text-slate-900 border border-slate-100 hover:border-slate-300"
                  }
                `}
              >
                {format(day, "d")}

                {/* Optional % Badge */}
                {!isSelected && (
                  <span className="absolute top-0 right-0 bg-green-600 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center border-4 border-white">
                    %
                  </span>
                )}
              </button>
              <span
                className={`text-sm font-bold uppercase tracking-tighter ${isSelected ? "text-indigo-600" : "text-slate-400"}`}
              >
                {isToday ? "Today" : format(day, "eee")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalCalendar;
