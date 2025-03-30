
import { Card } from "@/components/ui/card";
import { 
  BarChart3,
  Clock,
  CheckCircle,
  UserRound, 
  ChevronDown
} from "lucide-react";
import { useUpcomingMatches } from "@/hooks/useMatchData";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Predictions = () => {
  const { data: upcomingMatches } = useUpcomingMatches();
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);

  const predictionModels = [
    {
      id: 'xg',
      name: 'Expected Goals (xG) Model',
      description: 'Based on shot quality and quantity',
      accuracy: '76%',
      isSelected: selectedModelIndex === 0,
    },
    {
      id: 'form',
      name: 'Form-Based Model',
      description: 'Based on recent team performance',
      accuracy: '72%',
      isSelected: selectedModelIndex === 1,
    },
    {
      id: 'h2h',
      name: 'Head-to-Head Model',
      description: 'Based on historical matchups',
      accuracy: '68%',
      isSelected: selectedModelIndex === 2,
    },
    {
      id: 'combined',
      name: 'Combined Analysis',
      description: 'Weighted average of all models',
      accuracy: '82%',
      isSelected: selectedModelIndex === 3,
    }
  ];

  const keyFactors = [
    { name: 'Home Advantage', value: '+8.5', positive: true },
    { name: 'Recent Form', value: '+7.2', positive: true },
    { name: 'Offensive Strength', value: '+6.8', positive: true },
    { name: 'Key Player Absence (Opponent)', value: '+5.9', positive: true },
    { name: 'Defensive Weakness', value: '-4.3', positive: false },
  ];

  const scenarios = [
    { 
      name: 'Base Scenario', 
      description: 'Standard lineup and tactics against Atlético Madrid',
      winPercentage: '62%' 
    },
    { 
      name: 'Aggressive 4-3-3', 
      description: 'Using more attacking formation with high press',
      winPercentage: '68%' 
    },
    { 
      name: 'Defensive 4-4-2', 
      description: 'More conservative approach with counter-attacks',
      winPercentage: '53%' 
    },
    { 
      name: 'Key Player Injury', 
      description: 'If Lewandowski is unavailable for the match',
      winPercentage: '41%' 
    },
  ];

  return (
    <div className="page-container bg-[#1A1F2C] text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-center mb-2">
          <span className="text-fcb-blue">Match </span>
          <span className="text-fcb-red">Prediction </span>
          <span className="text-white">System</span>
        </h1>
        <p className="text-gray-300 text-center mb-10">
          Advanced analytics to predict Barcelona's match outcomes with statistical models
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Match Selection */}
          <Card className="bg-[#1a1f2c] border-none shadow-lg p-5">
            <div className="flex items-center gap-2 mb-4 text-xl font-semibold">
              <Clock className="text-yellow-400" />
              <h2>Select Upcoming Match</h2>
            </div>
            {upcomingMatches && upcomingMatches.length > 0 ? (
              <div className="space-y-2">
                {upcomingMatches.slice(0, 3).map((match) => (
                  <div key={match._id} className="glass-card p-3 hover:border-fcb-blue cursor-pointer transition-colors">
                    <p className="text-sm font-medium">{match.homeTeam.name} vs {match.awayTeam.name}</p>
                    <p className="text-xs text-gray-400">{new Date(match.utcDate).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card p-4 text-center">
                <p className="text-gray-400">No upcoming matches available</p>
              </div>
            )}
          </Card>

          {/* Key Influencing Factors */}
          <Card className="bg-[#1a1f2c] border-none shadow-lg p-5">
            <div className="flex items-center gap-2 mb-4 text-xl font-semibold">
              <BarChart3 className="text-yellow-400" />
              <h2>Key Influencing Factors</h2>
            </div>
            <div className="space-y-3">
              {keyFactors.map((factor) => (
                <div key={factor.name} className="flex justify-between items-center">
                  <span className="text-gray-300">{factor.name}</span>
                  <span className={`font-semibold ${factor.positive ? 'text-green-400' : 'text-red-400'}`}>
                    {factor.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Scenario Analysis */}
          <Card className="bg-[#1a1f2c] border-none shadow-lg p-5">
            <div className="flex items-center gap-2 mb-4 text-xl font-semibold">
              <UserRound className="text-yellow-400" />
              <h2>Scenario Analysis</h2>
            </div>
            <div className="space-y-3">
              {scenarios.map((scenario) => (
                <div key={scenario.name} className="glass-card p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{scenario.name}</span>
                    <span className="text-green-400 font-semibold">{scenario.winPercentage} Win</span>
                  </div>
                  <p className="text-xs text-gray-400">{scenario.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Prediction Models */}
        <Card className="bg-[#1a1f2c] border-none shadow-lg p-5 mt-6">
          <div className="flex items-center gap-2 mb-4 text-xl font-semibold">
            <BarChart3 className="text-yellow-400" />
            <h2>Prediction Model</h2>
          </div>
          
          <div className="space-y-3">
            {predictionModels.map((model, index) => (
              <div 
                key={model.id}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  model.isSelected 
                    ? 'bg-[#0e4d98] border border-blue-400' 
                    : 'glass-card hover:border-gray-400'
                }`}
                onClick={() => setSelectedModelIndex(index)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    model.isSelected ? 'bg-blue-500' : 'bg-gray-700'
                  }`}>
                    {model.isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <div>
                    <h3 className="font-medium">{model.name}</h3>
                    <p className="text-xs text-gray-400">{model.description}</p>
                    <p className="text-xs text-green-400 mt-1">Historical accuracy: {model.accuracy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Calculate Prediction
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Predictions;
