"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Users, 
  MessageCircle, 
  Plus, 
  MapPin, 
  Clock,
  UserPlus
} from "lucide-react";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  category?: string;
  host: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  rsvps: Array<{
    id: string;
    status: string;
    user: {
      id: string;
      name: string;
      imageUrl?: string;
    };
  }>;
  eventTags: Array<{
    tag: {
      name: string;
    };
  }>;
}

interface User {
  id: string;
  name: string;
  age?: number;
  profession?: string;
  city: string;
  bio?: string;
  imageUrl?: string;
  interests: Array<{
    interest: {
      name: string;
    };
  }>;
  tags: Array<{
    tag: {
      name: string;
    };
  }>;
}

export default function DashboardPage() {
  const { user } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [matches, setMatches] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("events");

  useEffect(() => {
    fetchEvents();
    fetchMatches();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchMatches = async () => {
    try {
      const response = await fetch("/api/users/matches");
      const data = await response.json();
      setMatches(data.matches || []);
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async (eventId: string, status: string) => {
    try {
      const response = await fetch(`/api/events/${eventId}/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchEvents(); // Refresh events
      }
    } catch (error) {
      console.error("Error RSVPing:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  NewCity
                </h1>
                <p className="text-sm text-gray-400">Welcome back, {user?.firstName}!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/create-event"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Event</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab("events")}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeTab === "events"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Events</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("matches")}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeTab === "matches"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Matches</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeTab === "messages"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Messages</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "events" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all"
                >
                  {event.imageUrl && (
                    <div className="w-full h-48 bg-gray-700 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                    {event.category && (
                      <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs">
                        {event.category}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="flex items-center text-gray-400 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-400 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={event.host.imageUrl || "/default-avatar.png"}
                        alt={event.host.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-400">Hosted by {event.host.name}</span>
                    </div>
                    <span className="text-sm text-gray-400">
                      {event.rsvps.length} attending
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRSVP(event.id, "INTERESTED")}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Express Interest
                    </button>
                    <button
                      onClick={() => handleRSVP(event.id, "GOING")}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      RSVP
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "matches" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((match) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={match.imageUrl || "/default-avatar.png"}
                      alt={match.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-white">{match.name}</h3>
                      <p className="text-gray-400">{match.profession}</p>
                      <p className="text-sm text-gray-500">{match.city}</p>
                    </div>
                  </div>
                  
                  {match.bio && (
                    <p className="text-gray-400 mb-4 line-clamp-2">{match.bio}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {match.interests.slice(0, 3).map((interest, index) => (
                      <span
                        key={index}
                        className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded-full text-xs"
                      >
                        {interest.interest.name}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                      <UserPlus className="w-4 h-4 inline mr-2" />
                      Connect
                    </button>
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                      <MessageCircle className="w-4 h-4 inline mr-2" />
                      Message
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "messages" && (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No messages yet</h3>
              <p className="text-gray-500">Start connecting with people to see your messages here.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 