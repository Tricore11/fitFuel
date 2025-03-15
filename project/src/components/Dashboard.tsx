import React from 'react';
import { useLocation } from 'react-router-dom';
import { Activity, Scale, Apple, Dumbbell } from 'lucide-react';
import { calculateBMI, generateRecommendations } from '../utils/fitnessCalculator';
import { UserProfile, FitnessRecommendation } from '../types';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const profile = location.state?.profile as UserProfile;
  
  if (!profile) {
    return (
      <div className="text-center">
        <p className="text-xl text-gray-600">Please fill out your profile first</p>
      </div>
    );
  }

  const bmi = calculateBMI(profile.weight, profile.height);
  const recommendations = generateRecommendations(profile);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="BMI"
          value={bmi.toFixed(1)}
          icon={<Scale className="w-6 h-6" />}
          description={getBMICategory(bmi)}
        />
        <MetricCard
          title="Daily Calories"
          value={`${recommendations.dailyCalories}`}
          icon={<Activity className="w-6 h-6" />}
          description="Recommended daily intake"
        />
        <MetricCard
          title="Protein"
          value={`${recommendations.proteinGrams}g`}
          icon={<Dumbbell className="w-6 h-6" />}
          description="Daily protein target"
        />
        <MetricCard
          title="Carbs"
          value={`${recommendations.carbsGrams}g`}
          icon={<Apple className="w-6 h-6" />}
          description="Daily carbs target"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecommendationSection
          title="Workout Recommendations"
          items={recommendations.workoutRecommendations}
        />
        <RecommendationSection
          title="Dietary Guidelines"
          items={recommendations.dietaryGuidelines}
        />
      </div>
    </div>
  );
};

const MetricCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}> = ({ title, value, icon, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <div className="text-indigo-600">{icon}</div>
    </div>
    <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const RecommendationSection: React.FC<{
  title: string;
  items: string[];
}> = ({ title, items }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3"></span>
          <span className="text-gray-700">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export default Dashboard;