import { UserProfile } from '@/types';

// Calculate compatibility score between two users
export function calculateCompatibility(user1: UserProfile, user2: UserProfile): number {
  let score = 0;
  let totalWeight = 0;

  // Budget compatibility (30% weight)
  const budgetWeight = 30;
  const budgetScore = calculateBudgetCompatibility(user1.preferences.budget, user2.preferences.budget);
  score += budgetScore * budgetWeight;
  totalWeight += budgetWeight;

  // Location compatibility (25% weight)
  const locationWeight = 25;
  const locationScore = calculateLocationCompatibility(user1.location, user2.location);
  score += locationScore * locationWeight;
  totalWeight += locationWeight;

  // Lifestyle compatibility (20% weight)
  const lifestyleWeight = 20;
  const lifestyleScore = calculateLifestyleCompatibility(user1.preferences.lifestyle, user2.preferences.lifestyle);
  score += lifestyleScore * lifestyleWeight;
  totalWeight += lifestyleWeight;

  // Interests compatibility (15% weight)
  const interestsWeight = 15;
  const interestsScore = calculateInterestsCompatibility(user1.preferences.interests, user2.preferences.interests);
  score += interestsScore * interestsWeight;
  totalWeight += interestsWeight;

  // Habits compatibility (10% weight)
  const habitsWeight = 10;
  const habitsScore = calculateHabitsCompatibility(user1.preferences.habits, user2.preferences.habits);
  score += habitsScore * habitsWeight;
  totalWeight += habitsWeight;

  return Math.round(score / totalWeight);
}

// Calculate budget compatibility (0-100)
function calculateBudgetCompatibility(budget1: {min: number, max: number}, budget2: {min: number, max: number}): number {
  const overlap = Math.min(budget1.max, budget2.max) - Math.max(budget1.min, budget2.min);
  const totalRange = Math.max(budget1.max, budget2.max) - Math.min(budget1.min, budget2.min);
  
  if (overlap <= 0) return 0;
  if (totalRange === 0) return 100;
  
  return Math.round((overlap / totalRange) * 100);
}

// Calculate location compatibility (0-100)
function calculateLocationCompatibility(location1: any, location2: any): number {
  // Same neighborhood = 100%
  if (location1.neighborhood === location2.neighborhood) return 100;
  
  // Same city = 80%
  if (location1.city === location2.city) return 80;
  
  // Calculate distance-based score
  const distance = calculateDistance(location1.coordinates, location2.coordinates);
  
  // Within 5 miles = 70%
  if (distance <= 5) return 70;
  // Within 10 miles = 50%
  if (distance <= 10) return 50;
  // Within 20 miles = 30%
  if (distance <= 20) return 30;
  
  return 10;
}

// Calculate lifestyle compatibility (0-100)
function calculateLifestyleCompatibility(lifestyle1: string[], lifestyle2: string[]): number {
  if (lifestyle1.length === 0 && lifestyle2.length === 0) return 50;
  
  const commonLifestyles = lifestyle1.filter(l => lifestyle2.includes(l));
  const totalLifestyles = new Set([...lifestyle1, ...lifestyle2]).size;
  
  return Math.round((commonLifestyles.length / totalLifestyles) * 100);
}

// Calculate interests compatibility (0-100)
function calculateInterestsCompatibility(interests1: string[], interests2: string[]): number {
  if (interests1.length === 0 && interests2.length === 0) return 50;
  
  const commonInterests = interests1.filter(i => interests2.includes(i));
  const totalInterests = new Set([...interests1, ...interests2]).size;
  
  return Math.round((commonInterests.length / totalInterests) * 100);
}

// Calculate habits compatibility (0-100)
function calculateHabitsCompatibility(habits1: string[], habits2: string[]): number {
  if (habits1.length === 0 && habits2.length === 0) return 50;
  
  const commonHabits = habits1.filter(h => habits2.includes(h));
  const totalHabits = new Set([...habits1, ...habits2]).size;
  
  return Math.round((commonHabits.length / totalHabits) * 100);
}

// Calculate distance between two coordinates (in miles)
function calculateDistance(coord1: [number, number], coord2: [number, number]): number {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;
  
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return distance;
}

// Generate vector embedding for user profile
export function generateUserEmbedding(user: UserProfile): string {
  const profileText = `
    Name: ${user.name}
    Age: ${user.age}
    Bio: ${user.bio || ''}
    Location: ${user.location.city}, ${user.location.neighborhood}
    Budget: $${user.preferences.budget.min} - $${user.preferences.budget.max}
    Move-in: ${user.preferences.moveInDate}
    Duration: ${user.preferences.duration}
    Lifestyle: ${user.preferences.lifestyle.join(', ')}
    Habits: ${user.preferences.habits.join(', ')}
    Interests: ${user.preferences.interests.join(', ')}
  `.trim();
  
  return profileText;
}

// Filter users based on basic criteria
export function filterUsers(users: UserProfile[], currentUser: UserProfile): UserProfile[] {
  return users.filter(user => {
    // Don't match with self
    if (user.id === currentUser.id) return false;
    
    // Budget overlap check
    const budgetOverlap = Math.min(user.preferences.budget.max, currentUser.preferences.budget.max) - 
                         Math.max(user.preferences.budget.min, currentUser.preferences.budget.min);
    if (budgetOverlap <= 0) return false;
    
    // Move-in date compatibility (within 30 days)
    const userMoveIn = new Date(user.preferences.moveInDate);
    const currentMoveIn = new Date(currentUser.preferences.moveInDate);
    const daysDiff = Math.abs(userMoveIn.getTime() - currentMoveIn.getTime()) / (1000 * 60 * 60 * 24);
    if (daysDiff > 30) return false;
    
    return true;
  });
}
