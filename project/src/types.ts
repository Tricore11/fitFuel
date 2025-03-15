export interface UserProfile {
  id: string;
  email: string;
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female' | 'other';
  goal: 'weight_loss' | 'weight_gain' | 'maintenance';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very_active';
}

export interface FitnessRecommendation {
  dailyCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  workoutRecommendations: string[];
  dietaryGuidelines: string[];
}