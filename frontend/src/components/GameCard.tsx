import React from 'react';

interface GameStats {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  minutes: string;
  field_goals_made: number;
  field_goals_attempted: number;
  three_pointers_made: number;
  three_pointers_attempted: number;
  free_throws_made: number;
  free_throws_attempted: number;
}

interface GameProps {
  game: {
    date: string;
    matchup: string;
    wl: string;
    stats: GameStats;
  };
}

const GameCard: React.FC<GameProps> = ({ game }) => {
  const {
    date,
    matchup,
    wl,
    stats: {
      points,
      rebounds,
      assists,
      steals,
      blocks,
      minutes,
      field_goals_made,
      field_goals_attempted,
      three_pointers_made,
      three_pointers_attempted,
      free_throws_made,
      free_throws_attempted,
    },
  } = game;

  const calculatePercentage = (made: number, attempted: number) => {
    if (attempted === 0) return '0.0';
    return ((made / attempted) * 100).toFixed(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{matchup}</h2>
          <p className="text-sm text-gray-600">Date: {date}</p>
        </div>
        <div className={`px-3 py-1 rounded-full ${
          wl === 'W' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {wl}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-indigo-50 rounded-lg">
          <p className="text-3xl font-bold text-indigo-600">{points}</p>
          <p className="text-sm text-gray-600">Points</p>
        </div>
        <div className="text-center p-3 bg-indigo-50 rounded-lg">
          <p className="text-3xl font-bold text-indigo-600">{minutes}</p>
          <p className="text-sm text-gray-600">Minutes</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">{rebounds}</p>
          <p className="text-sm text-gray-600">Rebounds</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">{assists}</p>
          <p className="text-sm text-gray-600">Assists</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">{blocks}</p>
          <p className="text-sm text-gray-600">Blocks</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Field Goals</span>
            <span>{field_goals_made}/{field_goals_attempted} ({calculatePercentage(field_goals_made, field_goals_attempted)}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{
                width: `${calculatePercentage(field_goals_made, field_goals_attempted)}%`,
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Three Pointers</span>
            <span>{three_pointers_made}/{three_pointers_attempted} ({calculatePercentage(three_pointers_made, three_pointers_attempted)}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{
                width: `${calculatePercentage(three_pointers_made, three_pointers_attempted)}%`,
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Free Throws</span>
            <span>{free_throws_made}/{free_throws_attempted} ({calculatePercentage(free_throws_made, free_throws_attempted)}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{
                width: `${calculatePercentage(free_throws_made, free_throws_attempted)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
