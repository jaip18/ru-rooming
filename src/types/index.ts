export interface UserProfile {
  id: string;
  email: string;
  name: string;
  age: number;
  bio?: string;
  profileImage?: string;
  location: {
    city: string;
    neighborhood: string;
    coordinates: [number, number];
  };
  preferences: {
    budget: { min: number; max: number };
    moveInDate: string;
    duration: 'short' | 'medium' | 'long';
    lifestyle: string[]; // ['quiet', 'social', 'party', 'work-focused']
    habits: string[]; // ['smoking', 'pets', 'guests', 'cleaning']
    interests: string[]; // ['fitness', 'music', 'cooking', 'travel']
  };
  compatibility?: number; // 0-100 score
}

export interface Match {
  id: string;
  user: UserProfile;
  compatibility: number;
  matchedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface SwipeAction {
  userId: string;
  targetUserId: string;
  action: 'like' | 'pass';
  timestamp: string;
}
