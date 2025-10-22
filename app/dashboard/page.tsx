'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, X, MapPin, DollarSign, Calendar, Users, Star, Clock, Home } from 'lucide-react';
import { UserProfile } from '@/types';

// Mock data for demonstration
const mockProfiles: UserProfile[] = [
  {
    id: '1',
    email: 'alex@example.com',
    name: 'Alex Chen',
    age: 24,
    bio: 'Software engineer who loves hiking and cooking. Looking for a clean, quiet space to work from home.',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    location: {
      city: 'San Francisco',
      neighborhood: 'Mission District',
      coordinates: [37.7749, -122.4194]
    },
    preferences: {
      budget: { min: 1500, max: 2200 },
      moveInDate: '2024-02-01',
      duration: 'long',
      lifestyle: ['quiet', 'work-focused'],
      habits: ['cleaning', 'guests'],
      interests: ['hiking', 'cooking', 'tech']
    },
    compatibility: 85
  },
  {
    id: '2',
    email: 'sarah@example.com',
    name: 'Sarah Johnson',
    age: 26,
    bio: 'Marketing professional who enjoys yoga and trying new restaurants. Pet-friendly and social!',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    location: {
      city: 'San Francisco',
      neighborhood: 'Castro',
      coordinates: [37.7611, -122.4350]
    },
    preferences: {
      budget: { min: 1800, max: 2500 },
      moveInDate: '2024-01-15',
      duration: 'medium',
      lifestyle: ['social', 'party'],
      habits: ['pets', 'guests'],
      interests: ['yoga', 'food', 'travel']
    },
    compatibility: 72
  },
  {
    id: '3',
    email: 'mike@example.com',
    name: 'Mike Rodriguez',
    age: 28,
    bio: 'Grad student in data science. Night owl who loves gaming and coffee. Looking for a study-friendly environment.',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    location: {
      city: 'San Francisco',
      neighborhood: 'SOMA',
      coordinates: [37.7749, -122.4194]
    },
    preferences: {
      budget: { min: 1200, max: 1800 },
      moveInDate: '2024-02-15',
      duration: 'short',
      lifestyle: ['quiet', 'work-focused'],
      habits: ['cleaning'],
      interests: ['gaming', 'coffee', 'data-science']
    },
    compatibility: 90
  }
];

export default function Dashboard() {
  const { user, isLoading } = useUser();
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [matches, setMatches] = useState<UserProfile[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Please log in to continue</h1>
          <Link
            href="/api/auth/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const currentProfile = mockProfiles[currentProfileIndex];

  const handleSwipe = (action: 'like' | 'pass') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSwipeDirection(action === 'like' ? 'right' : 'left');
    
    if (action === 'like') {
      setMatches(prev => [...prev, currentProfile]);
    }
    
    setTimeout(() => {
      if (currentProfileIndex < mockProfiles.length - 1) {
        setCurrentProfileIndex(prev => prev + 1);
      } else {
        setCurrentProfileIndex(0);
      }
      setIsAnimating(false);
      setSwipeDirection(null);
    }, 300);
  };

  if (!currentProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No more profiles to show</h1>
          <p className="text-gray-600 mb-6">Check back later for new potential roommates!</p>
          <Link
            href="/matches"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            View Matches ({matches.length})
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">RU Rooming</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/matches"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Matches ({matches.length})
            </Link>
            <Link
              href="/chat"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Chat
            </Link>
            <Link
              href="/profile"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Profile
            </Link>
            <Link
              href="/api/auth/logout"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>

      {/* Profile Card */}
      <main className="max-w-md mx-auto px-4 py-8">
        <div 
          className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
            isAnimating 
              ? swipeDirection === 'right' 
                ? 'transform translate-x-full rotate-12 opacity-0' 
                : 'transform -translate-x-full -rotate-12 opacity-0'
              : 'transform translate-x-0 rotate-0 opacity-100'
          }`}
        >
          {/* Profile Image */}
          <div className="relative h-96">
            <img
              src={currentProfile.profileImage}
              alt={currentProfile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1">
              <span className="text-sm font-semibold text-gray-800">
                {currentProfile.compatibility}% match
              </span>
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{currentProfile.name}</h1>
                <p className="text-gray-600">{currentProfile.age} years old</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{currentProfile.bio}</p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-3">
                <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium">{currentProfile.location.neighborhood}</p>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-3">
                <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                <div>
                  <p className="text-xs text-gray-500">Budget</p>
                  <p className="text-sm font-medium">${currentProfile.preferences.budget.min}-{currentProfile.preferences.budget.max}</p>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-3">
                <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-500">Move-in</p>
                  <p className="text-sm font-medium">{new Date(currentProfile.preferences.moveInDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-3">
                <Clock className="h-4 w-4 mr-2 text-orange-500" />
                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-sm font-medium capitalize">{currentProfile.preferences.duration}</p>
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {currentProfile.preferences.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Lifestyle */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Lifestyle</h3>
              <div className="flex flex-wrap gap-2">
                {currentProfile.preferences.lifestyle.map((style, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-8 mt-8">
          <button
            onClick={() => handleSwipe('pass')}
            disabled={isAnimating}
            className="bg-white border-2 border-gray-300 rounded-full p-4 hover:border-red-400 hover:bg-red-50 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <X className="h-8 w-8 text-gray-400 hover:text-red-500" />
          </button>
          
          <button
            onClick={() => handleSwipe('like')}
            disabled={isAnimating}
            className="bg-white border-2 border-gray-300 rounded-full p-4 hover:border-green-400 hover:bg-green-50 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Heart className="h-8 w-8 text-gray-400 hover:text-green-500" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            {mockProfiles.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentProfileIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
