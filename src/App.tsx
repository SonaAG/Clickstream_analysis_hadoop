import React, { useState, useEffect } from 'react';
import { Home, Users, Mail, Activity, Clock, MousePointer } from 'lucide-react';

interface ClickEvent {
  timestamp: string;
  page: string;
  session_id: string;
}

function App() {
  const [recentClicks, setRecentClicks] = useState<ClickEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const logClick = async (page: string) => {
    setIsLoading(true);
    
    const clickData = {
      timestamp: new Date().toISOString(),
      page: page,
      session_id: Math.random().toString(36).substr(2, 9)
    };

    try {
      // Add to recent clicks for UI feedback
      setRecentClicks(prev => [clickData, ...prev.slice(0, 4)]);
      
      // Log to server (you can uncomment this when your server is running)
      /*
      await fetch("http://localhost:5000/log", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clickData)
      });
      */
      
      console.log('Logged click:', clickData);
    } catch (error) {
      console.error('Error logging click:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  const navigationItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home, 
      color: 'from-blue-500 to-blue-600',
      description: 'Welcome to our homepage'
    },
    { 
      id: 'about', 
      label: 'About', 
      icon: Users, 
      color: 'from-purple-500 to-purple-600',
      description: 'Learn more about us'
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      icon: Mail, 
      color: 'from-green-500 to-green-600',
      description: 'Get in touch with our team'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-bounce"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Activity className="w-12 h-12 text-blue-400 mr-4" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Track user interactions in real-time with our advanced clickstream analytics platform
          </p>
          <div className="flex items-center justify-center mt-4 text-gray-400">
            <MousePointer className="w-5 h-5 mr-2" />
            <span>Click any button to see the magic happen</span>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => logClick(item.id)}
                disabled={isLoading}
                className={`group relative p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 
                  hover:bg-white/20 hover:border-white/30 hover:scale-105 
                  transition-all duration-300 ease-out hover:shadow-2xl
                  disabled:opacity-50 disabled:cursor-not-allowed
                  focus:outline-none focus:ring-4 focus:ring-blue-400/50`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${item.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                    {item.label}
                  </h3>
                  
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    {item.description}
                  </p>
                  
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl">
                      <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Recent Activity Panel */}
        {recentClicks.length > 0 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-blue-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Recent Activity</h3>
              </div>
              
              <div className="space-y-3">
                {recentClicks.map((click, index) => (
                  <div 
                    key={`${click.timestamp}-${index}`}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10
                      animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                      <span className="text-white font-medium capitalize">{click.page}</span>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-gray-400">
                        {new Date(click.timestamp).toLocaleTimeString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        ID: {click.session_id.slice(0, 6)}...
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16">
          <p className="text-gray-400">
            Powered by advanced analytics • Real-time tracking • Secure & Private
          </p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default App;