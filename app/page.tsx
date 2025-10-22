'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { HomeIcon, Users, MapPin, Star } from 'lucide-react';

export default function Home() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-indigo-100">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <HomeIcon className="h-8 w-8 text-red-600" />
          <span className="text-2xl font-bold text-gray-800">RU Rooming</span>
        </div>
        {user ? (
          <Link
            href="/dashboard"
            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        ) : (
          <div className="flex space-x-4">
            <Link
              href="/login"
              className="bg-white text-red-600 px-6 py-2 rounded-full hover:bg-gray-50 transition-colors border-2 border-red-600"
            >
              Login
            </Link>
            <Link
              href="/api/auth/login"
              className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Find Your Perfect
            <span className="text-red-600"> Roommate</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Swipe your way to the ideal living situation. Match with compatible roommates 
            based on lifestyle, budget, and preferences.
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="inline-block bg-white text-red-600 text-lg px-8 py-4 rounded-full hover:bg-gray-50 transition-colors shadow-lg border-2 border-red-600"
              >
                Login
              </Link>
              <Link
                href="/api/auth/login"
                className="inline-block bg-red-600 text-white text-lg px-8 py-4 rounded-full hover:bg-red-700 transition-colors shadow-lg"
              >
                Start Matching Now
              </Link>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <Users className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-black mb-2">Smart Matching</h3>
            <p className="text-gray-600">
              Our algorithm matches you with compatible roommates based on lifestyle, 
              habits, and preferences.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <MapPin className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">Location-Based</h3>
            <p className="text-gray-600">
              Find roommates in your preferred neighborhoods with easy commute options.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <Star className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">Verified Profiles</h3>
            <p className="text-gray-600">
              All profiles are verified to ensure a safe and trustworthy experience.
            </p>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Profile</h3>
              <p className="text-gray-600">
                Tell us about your lifestyle, budget, and what you're looking for in a roommate.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Swipe & Match</h3>
              <p className="text-gray-600">
                Swipe through potential roommates and get matched with compatible people.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect & Meet</h3>
              <p className="text-gray-600">
                Chat with your matches and arrange to meet in person to finalize your living situation.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
