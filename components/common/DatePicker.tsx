"use client";

import { useState, useRef, useEffect } from "react";

type DatePickerProps = {
  onChange?: (date: Date) => void;
  value?: Date | null;
};

function isSameDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

export default function DatePicker({ onChange, value }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [viewDate, setViewDate] = useState(value || new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
      setViewDate(value);
    }
  }, [value]);

  const today = new Date();
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = new Date(firstDay);
  startDay.setDate(startDay.getDate() - firstDay.getDay());
  const endDay = new Date(lastDay);
  endDay.setDate(endDay.getDate() + (6 - lastDay.getDay()));

  const dates: Date[] = [];
  let day = new Date(startDay);
  while (day <= endDay) {
    dates.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(e.target as Node)
    ) {
      setShowCalendar(false);
    }
  };

  const years = Array.from({ length: 31 }, (_, i) => 2000 + i); // 2000~2030
  const months = Array.from({ length: 12 }, (_, i) => i); // 0 ~ 11

  useEffect(() => {
    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCalendar]);

  return (
    <div className="w-full" ref={calendarRef}>
      <button
        type="button"
        onClick={() => setShowCalendar((prev) => !prev)}
        className={`w-full h-[39px] bg-white px-3 
          ${selectedDate ? "text-gray-939" : "text-[#AAAAAA]"}
        font-[Hana2-CM] text-[14px] leading-[18px] font-normal
        resize-none placeholder:text-[#AAAAAA]
        focus:outline-none focus:ring-0
        border rounded-[10px] border-transparent outline-none shadow-[0_0_5px_rgba(0,0,0,0.15)]
        flex justify-between items-center`}
      >
        {selectedDate ? formatDate(selectedDate) : "날짜를 선택하세요"}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="#00A49D"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {showCalendar && (
        <div className="relative">
          <div className="absolute w-full mt-2 p-4 bg-white rounded-[10px] shadow border border-green-49d z-10">
            <div className="flex justify-between items-center mb-3 text-sm text-[#00A49D] font-medium">
              <button onClick={() => setViewDate(new Date(year, month - 1, 1))}>
                ◀
              </button>
              <div className="flex gap-2 items-center">
                <select
                  value={year}
                  onChange={(e) =>
                    setViewDate(new Date(Number(e.target.value), month, 1))
                  }
                  className="border border-gray-300 rounded px-2 py-[2px] text-sm"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}년
                    </option>
                  ))}
                </select>

                <select
                  value={month}
                  onChange={(e) =>
                    setViewDate(new Date(year, Number(e.target.value), 1))
                  }
                  className="border border-gray-300 rounded px-2 py-[2px] text-sm"
                >
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m + 1}월
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={() => setViewDate(new Date(year, month + 1, 1))}>
                ▶
              </button>
            </div>

            <div className="grid grid-cols-7 gap-[6px] text-center text-sm">
              {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
                <div key={d} className="text-gray-500 font-semibold">
                  {d}
                </div>
              ))}
              {dates.map((date) => {
                const isOtherMonth = date.getMonth() !== month;
                const isToday = isSameDate(date, today);
                const isSelected =
                  selectedDate && isSameDate(date, selectedDate);

                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => {
                      setSelectedDate(date);
                      onChange?.(date);
                      setShowCalendar(false);
                    }}
                    className={`
                    py-1 rounded-[6px] text-sm
                    ${isOtherMonth ? "text-gray-300" : "text-gray-700"}
                    ${isToday ? "border border-[#00A49D] font-bold" : ""}
                    ${isSelected ? "bg-[#00A49D] text-white" : "hover:bg-[#F6F7F9]"}
                  `}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
