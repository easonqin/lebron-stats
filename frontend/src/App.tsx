import React, { useState, useEffect } from 'react';
import { 
  createBrowserRouter,
  RouterProvider,
  useNavigate, 
  useParams,
} from 'react-router-dom';
import axios from 'axios';
import Calendar from './components/Calendar';
import GameCard from './components/GameCard';
import './index.css';
import { format } from 'date-fns';

const API_BASE_URL = 'http://localhost:8000/api';

// 创建路由器
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <CalendarView />,
    },
    {
      path: "/game/:date",
      element: <GameDetail />,
    },
  ]
);

function GameDetail() {
  const { date } = useParams();
  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameData = async () => {
      if (!date) return;
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching game data for date:', date);
        const response = await axios.get(`${API_BASE_URL}/game/${date}`);
        console.log('Game data response:', response.data);
        setGame(response.data);
      } catch (error: any) {
        console.error('Error fetching game data:', error);
        setError(error.response?.data?.detail || 'Failed to load game data');
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [date]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-5xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-indigo-600">
                Game Details - {date}
              </h1>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
              >
                Back to Calendar
              </button>
            </div>

            {loading && (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {game && !loading && <GameCard game={game} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function CalendarView() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [gameData, setGameData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMonthData = async (date: Date) => {
    setLoading(true);
    setError(null);
    try {
      const monthStr = format(date, 'yyyy-MM');
      console.log('Fetching data for month:', monthStr);
      const response = await axios.get(`${API_BASE_URL}/stats/${monthStr}`);
      console.log('Month data response:', response.data);
      
      if (response.data && Array.isArray(response.data.games)) {
        setGameData(response.data.games);
      } else {
        console.error('Invalid response format:', response.data);
        setGameData([]);
      }
    } catch (error: any) {
      console.error('Error fetching month data:', error);
      setError(error.response?.data?.detail || 'Failed to load month data');
      setGameData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthData(currentDate);
  }, [currentDate]);

  const handleDateSelect = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    console.log('Selected date:', dateStr);
    navigate(`/game/${dateStr}`);
  };

  const handleMonthChange = (date: Date) => {
    console.log('Changing month to:', format(date, 'yyyy-MM'));
    setCurrentDate(date);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-5xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
                  LeBron James Game Stats
                </h1>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}

                <Calendar
                  currentDate={currentDate}
                  onDateSelect={handleDateSelect}
                  onMonthChange={handleMonthChange}
                  gameData={gameData}
                />

                {loading && (
                  <div className="flex justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
