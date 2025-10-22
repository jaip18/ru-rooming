'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { Heart, MessageCircle, MapPin, DollarSign, Calendar, Star, Clock, Phone, Video } from 'lucide-react';
import { UserProfile } from '@/types';

// Mock matches data
const mockMatches: UserProfile[] = [
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

export default function Matches() {
  const { user, isLoading } = useUser();

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
              href="/dashboard"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Discover
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

      {/* Matches */}
      <main className="max-w-md mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Matches</h1>
          <p className="text-gray-600">You have {mockMatches.length} potential roommate matches</p>
        </div>

        {mockMatches.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No matches yet</h2>
            <p className="text-gray-500 mb-6">Start swiping to find your perfect roommate!</p>
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Start Swiping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {mockMatches.map((match) => (
              <div key={match.id} className="bg-white rounded-2xl shadow-lg border overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <img
                        src={match.profileImage}
                        alt={match.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        {match.compatibility}%
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{match.name}</h3>
                          <p className="text-gray-600">{match.age} years old</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                            <Phone className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                            <Video className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4 line-clamp-2">{match.bio}</p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                          <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{match.location.neighborhood}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                          <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                          <span>${match.preferences.budget.min}-{match.preferences.budget.max}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                          <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                          <span>{new Date(match.preferences.moveInDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                          <Clock className="h-4 w-4 mr-2 text-orange-500" />
                          <span className="capitalize">{match.preferences.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Link
                          href="/chat"
                          className="flex-1 bg-blue-600 text-white text-sm py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-semibold"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Start Chat
                        </Link>
                        <button className="bg-gray-100 text-gray-700 text-sm py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-semibold">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
