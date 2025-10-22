'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';
import Link from 'next/link';
import { Heart, Save, MapPin, DollarSign, Calendar, User, Camera, Edit3, Check } from 'lucide-react';
import { UserProfile } from '@/types';

export default function Profile() {
  const { user, isLoading } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    id: user?.sub || '',
    email: user?.email || '',
    name: user?.name || '',
    age: 25,
    bio: 'Looking for a compatible roommate to share living expenses and create a comfortable home environment.',
    profileImage: user?.picture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
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
      habits: ['cleaning'],
      interests: ['fitness', 'cooking', 'reading']
    }
  });

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

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Saving profile:', profile);
    setIsEditing(false);
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const lifestyleOptions = ['quiet', 'social', 'party', 'work-focused'];
  const habitOptions = ['smoking', 'pets', 'guests', 'cleaning'];
  const interestOptions = ['fitness', 'music', 'cooking', 'travel', 'gaming', 'reading', 'hiking', 'yoga'];

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
              href="/matches"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Matches
            </Link>
            <Link
              href="/chat"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Chat
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

      {/* Profile */}
      <main className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Image */}
          <div className="relative h-64">
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              {isEditing && (
                <button className="bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-colors">
                  <Camera className="h-5 w-5 text-gray-600" />
                </button>
              )}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-colors"
              >
                {isEditing ? <Check className="h-5 w-5 text-green-600" /> : <Edit3 className="h-5 w-5 text-gray-600" />}
              </button>
            </div>
            {showSuccess && (
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                Profile saved!
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
                <p className="text-gray-600">{profile.age} years old</p>
              </div>
              {isEditing && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                    ) : (
                      <Save className="h-4 w-4 mr-1" />
                    )}
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              )}
            </div>

            {/* Bio */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              ) : (
                <p className="text-gray-700">{profile.bio}</p>
              )}
            </div>

            {/* Location */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Location</label>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {isEditing ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={profile.location.neighborhood}
                      onChange={(e) => setProfile({
                        ...profile,
                        location: {...profile.location, neighborhood: e.target.value}
                      })}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Neighborhood"
                    />
                    <input
                      type="text"
                      value={profile.location.city}
                      onChange={(e) => setProfile({
                        ...profile,
                        location: {...profile.location, city: e.target.value}
                      })}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City"
                    />
                  </div>
                ) : (
                  <span>{profile.location.neighborhood}, {profile.location.city}</span>
                )}
              </div>
            </div>

            {/* Budget */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Budget</label>
              <div className="flex items-center text-gray-600">
                <DollarSign className="h-4 w-4 mr-2" />
                {isEditing ? (
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={profile.preferences.budget.min}
                      onChange={(e) => setProfile({
                        ...profile,
                        preferences: {
                          ...profile.preferences,
                          budget: {...profile.preferences.budget, min: parseInt(e.target.value)}
                        }
                      })}
                      className="w-24 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Min"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      value={profile.preferences.budget.max}
                      onChange={(e) => setProfile({
                        ...profile,
                        preferences: {
                          ...profile.preferences,
                          budget: {...profile.preferences.budget, max: parseInt(e.target.value)}
                        }
                      })}
                      className="w-24 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Max"
                    />
                    <span>/month</span>
                  </div>
                ) : (
                  <span>${profile.preferences.budget.min} - ${profile.preferences.budget.max}/month</span>
                )}
              </div>
            </div>

            {/* Move-in Date */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Move-in Date</label>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                {isEditing ? (
                  <input
                    type="date"
                    value={profile.preferences.moveInDate}
                    onChange={(e) => setProfile({
                      ...profile,
                      preferences: {...profile.preferences, moveInDate: e.target.value}
                    })}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <span>{new Date(profile.preferences.moveInDate).toLocaleDateString()}</span>
                )}
              </div>
            </div>

            {/* Lifestyle */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Lifestyle</label>
              <div className="flex flex-wrap gap-2">
                {lifestyleOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      if (isEditing) {
                        const newLifestyle = profile.preferences.lifestyle.includes(option)
                          ? profile.preferences.lifestyle.filter(l => l !== option)
                          : [...profile.preferences.lifestyle, option];
                        setProfile({
                          ...profile,
                          preferences: {...profile.preferences, lifestyle: newLifestyle}
                        });
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      profile.preferences.lifestyle.includes(option)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                    } ${isEditing ? 'hover:bg-green-200 cursor-pointer' : ''}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Interests</label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      if (isEditing) {
                        const newInterests = profile.preferences.interests.includes(option)
                          ? profile.preferences.interests.filter(i => i !== option)
                          : [...profile.preferences.interests, option];
                        setProfile({
                          ...profile,
                          preferences: {...profile.preferences, interests: newInterests}
                        });
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      profile.preferences.interests.includes(option)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600'
                    } ${isEditing ? 'hover:bg-blue-200 cursor-pointer' : ''}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
