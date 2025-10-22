'use client';

import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { Heart, Send, Phone, Video, MoreVertical, ArrowLeft, Smile } from 'lucide-react';
import { UserProfile } from '@/types';

// Mock chat data
const mockChats = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Alex Chen',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      compatibility: 85
    },
    lastMessage: 'Hey! I saw we have a 85% compatibility match. Would you like to grab coffee sometime?',
    lastMessageTime: '2 min ago',
    unreadCount: 2,
    messages: [
      {
        id: '1',
        text: 'Hey! I saw we have a 85% compatibility match. Would you like to grab coffee sometime?',
        sender: 'them',
        timestamp: '2:30 PM',
        isRead: false
      },
      {
        id: '2',
        text: 'That sounds great! I\'m free this weekend. What works for you?',
        sender: 'me',
        timestamp: '2:32 PM',
        isRead: true
      },
      {
        id: '3',
        text: 'How about Saturday afternoon? There\'s a nice cafe near the Mission District.',
        sender: 'them',
        timestamp: '2:35 PM',
        isRead: false
      }
    ]
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'Sarah Johnson',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      compatibility: 72
    },
    lastMessage: 'Thanks for the match! I\'d love to learn more about your living preferences.',
    lastMessageTime: '1 hour ago',
    unreadCount: 0,
    messages: [
      {
        id: '1',
        text: 'Thanks for the match! I\'d love to learn more about your living preferences.',
        sender: 'them',
        timestamp: '1:15 PM',
        isRead: true
      },
      {
        id: '2',
        text: 'Of course! I\'m looking for someone who values cleanliness and quiet study time.',
        sender: 'me',
        timestamp: '1:20 PM',
        isRead: true
      }
    ]
  }
];

export default function Chat() {
  const { user, isLoading } = useUser();
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [newMessage, setNewMessage] = useState('');

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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
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

      <div className="max-w-4xl mx-auto h-[calc(100vh-80px)] flex">
        {/* Chat List */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {mockChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat.id === chat.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={chat.user.profileImage}
                    alt={chat.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800 truncate">{chat.user.name}</h3>
                      <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                      {chat.unreadCount > 0 && (
                        <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-green-600 font-medium">
                        {chat.user.compatibility}% match
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedChat.user.profileImage}
                    alt={selectedChat.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{selectedChat.user.name}</h3>
                    <p className="text-sm text-green-600">{selectedChat.user.compatibility}% match</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'me'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Smile className="h-5 w-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No chat selected</h3>
                <p className="text-gray-500">Choose a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
