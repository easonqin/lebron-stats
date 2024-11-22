import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO
} from 'date-fns';

interface Game {
  date: string;
  opponent: string;
  result: string;
  points: number;
  rebounds: number;
  assists: number;
}

interface CalendarProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  onMonthChange: (date: Date) => void;
  gameData: Game[];
}

const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  onDateSelect,
  onMonthChange,
  gameData
}) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const hasGameOnDate = (date: Date): boolean => {
    return gameData.some(game => {
      try {
        const gameDate = parseISO(game.date);
        const result = isSameDay(gameDate, date);
        console.log('Comparing dates:', {
          gameDate: format(gameDate, 'yyyy-MM-dd'),
          calendarDate: format(date, 'yyyy-MM-dd'),
          result
        });
        return result;
      } catch (error) {
        console.error('Error parsing game date:', error);
        return false;
      }
    });
  };

  const handleDateClick = (date: Date) => {
    if (hasGameOnDate(date)) {
      console.log('Clicked date with game:', format(date, 'yyyy-MM-dd'));
      onDateSelect(date);
    } else {
      console.log('Clicked date without game:', format(date, 'yyyy-MM-dd'));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onMonthChange(subMonths(currentDate, 1))}
          className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          ←
        </button>
        <h2 className="text-xl font-semibold text-gray-900">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={() => onMonthChange(addMonths(currentDate, 1))}
          className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-600 p-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {monthDays.map((day, index) => {
          const hasGame = hasGameOnDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          
          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              className={`
                relative p-2 text-center focus:outline-none transition-colors duration-200
                ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                ${hasGame ? 'cursor-pointer hover:bg-indigo-50' : 'cursor-default'}
              `}
              disabled={!hasGame}
            >
              {format(day, 'd')}
              {hasGame && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
