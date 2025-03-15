import { UserProfile, FitnessRecommendation } from '../types';

export function calculateBMI(weight: number, height: number): number {
  return weight / ((height / 100) * (height / 100));
}

export function calculateBMR(profile: UserProfile): number {
  // Mifflin-St Jeor Equation
  const { weight, height, age, gender } = profile;
  const base = 10 * weight + 6.25 * height - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
}

export function calculateTDEE(bmr: number, activityLevel: string): number {
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very_active: 1.725
  };
  return bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers];
}

export function generateRecommendations(profile: UserProfile): FitnessRecommendation {
  const bmr = calculateBMR(profile);
  const tdee = calculateTDEE(bmr, profile.activityLevel);
  
  let dailyCalories = tdee;
  if (profile.goal === 'weight_loss') {
    dailyCalories = tdee - 500; // 500 calorie deficit for weight loss
  } else if (profile.goal === 'weight_gain') {
    dailyCalories = tdee + 500; // 500 calorie surplus for weight gain
  }

  // Macronutrient calculations
  const proteinGrams = profile.weight * 2; // 2g per kg of body weight
  const fatsGrams = (dailyCalories * 0.25) / 9; // 25% of calories from fat
  const carbsGrams = (dailyCalories - (proteinGrams * 4 + fatsGrams * 9)) / 4;

  const workoutRecommendations = generateWorkoutPlan(profile);
  const dietaryGuidelines = generateDietaryGuidelines(profile);

  return {
    dailyCalories: Math.round(dailyCalories),
    proteinGrams: Math.round(proteinGrams),
    carbsGrams: Math.round(carbsGrams),
    fatsGrams: Math.round(fatsGrams),
    workoutRecommendations,
    dietaryGuidelines
  };
}

function generateWorkoutPlan(profile: UserProfile): string[] {
  const baseRecommendations = [
    'Aim for 150 minutes of moderate cardio per week',
    'Include 2-3 strength training sessions per week',
    'Always start with a 5-10 minute warm-up',
    'End workouts with proper stretching'
  ];

  if (profile.goal === 'weight_loss') {
    return [
      ...baseRecommendations,
      'Focus on HIIT workouts for maximum calorie burn',
      'Include circuit training 2-3 times per week',
      'Add extra cardio sessions on rest days'
    ];
  } else if (profile.goal === 'weight_gain') {
    return [
      ...baseRecommendations,
      'Focus on compound exercises with heavy weights',
      'Limit cardio to 20-30 minutes per session',
      'Ensure adequate rest between strength sessions'
    ];
  }

  return baseRecommendations;
}

function generateDietaryGuidelines(profile: UserProfile): string[] {
  const baseGuidelines = [
    'Eat plenty of whole foods',
    'Stay hydrated with at least 8 glasses of water daily',
    'Include a variety of fruits and vegetables',
    'Choose lean protein sources'
  ];

  if (profile.goal === 'weight_loss') {
    return [
      ...baseGuidelines,
      'Focus on high-volume, low-calorie foods',
      'Limit processed foods and sugary drinks',
      'Consider intermittent fasting'
    ];
  } else if (profile.goal === 'weight_gain') {
    return [
      ...baseGuidelines,
      'Eat frequent meals throughout the day',
      'Include calorie-dense healthy foods',
      'Consider protein shakes between meals'
    ];
  }

  return baseGuidelines;
}