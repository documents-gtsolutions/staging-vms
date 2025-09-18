"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, HomeIcon } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()
  const [counter, setCounter] = useState(15)
  const [animateItems, setAnimateItems] = useState(false)

  // Countdown timer for auto-redirect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (counter > 0) {
        setCounter(counter - 1)
      } else {
        router.push('/')
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [counter, router])

  // Animation effect
  useEffect(() => {
    setAnimateItems(true)
  }, [])

  // Random crayon colors
  const crayonColors = [
    'from-red-400 to-red-500',
    'from-blue-400 to-blue-500',
    'from-green-400 to-green-500',
    'from-yellow-400 to-yellow-500',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-500',
    'from-orange-400 to-orange-500',
    'from-teal-400 to-teal-500'
  ]

  // Get random crayon color
  const getRandomColor = () => {
    return crayonColors[Math.floor(Math.random() * crayonColors.length)]
  }

  return (
    <div className='min-h-screen pl-64 flex justify-center items-center'>
      <div className="bg-[#F9F5FF] flex flex-col items-center justify-center p-4 overflow-hidden">
        {/* Floating items animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute ${getRandomColor()} w-8 h-8 rounded-full opacity-70 animate-float`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            />
          ))}
        </div>

        {/* Crayons decoration */}
        <div className="absolute top-1/4 -left-10 transform -rotate-45 flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-40 w-6 bg-gradient-to-b ${getRandomColor()} rounded-t-full shadow-lg transform -rotate-${i * 15} transition-transform duration-1000 ${
                animateItems ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="h-2 w-6 bg-white/20 rounded-t-full" />
            </div>
          ))}
        </div>

        <div className="absolute bottom-1/4 -right-10 transform rotate-45 flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-40 w-6 bg-gradient-to-b ${getRandomColor()} rounded-t-full shadow-lg transform rotate-${i * 15} transition-transform duration-1000 ${
                animateItems ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
              }`}
              style={{ transitionDelay: `${(i + 5) * 150}ms` }}
            >
              <div className="h-2 w-6 bg-white/20 rounded-t-full" />
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-8">
            <div 
              className={`text-[150px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 leading-none transition-all duration-1000 ${
                animateItems ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-90'
              }`}
            >
              404
            </div>
            <h1 
              className={`text-4xl font-bold mb-2 text-[#330072] transition-all duration-1000 delay-300 ${
                animateItems ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              Oops! Page is on a Playdate
            </h1>
            <p 
              className={`text-gray-600 mb-8 transition-all duration-1000 delay-500 ${
                animateItems ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              It looks like the page you're looking for is out playing in the sandbox!
              Maybe it's nap time, or perhaps it's enjoying story time elsewhere.
            </p>
          </div>

          {/* Illustration */}
          <div 
            className={`w-full max-w-xs mx-auto mb-8 transition-all duration-1000 delay-700 ${
              animateItems ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-8 opacity-0 rotate-12'
            }`}
          >
            <div className="w-40 h-40 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="60" fill="#F3EAFF" />
                <circle cx="45" cy="50" r="5" fill="#842DF0" />
                <circle cx="75" cy="50" r="5" fill="#842DF0" />
                <path d="M40 75C45 85 75 85 80 75" stroke="#842DF0" strokeWidth="3" strokeLinecap="round" />
                <path d="M30 30C30 30 45 15 60 30" stroke="#842DF0" strokeWidth="3" strokeLinecap="round" />
                <path d="M90 30C90 30 75 15 60 30" stroke="#842DF0" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <div className="mt-4 text-sm text-purple-600 animate-bounce">
              Don't worry, we're looking for it!
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/"
              className={`flex items-center justify-center gap-2 px-6 py-3 bg-[#842DF0] text-white rounded-lg font-medium hover:bg-[#6E1BD6] transition-all duration-1000 delay-900 ${
                animateItems ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <HomeIcon size={18} />
              Back to Dashboard
            </Link>
            <button 
              onClick={() => router.back()}
              className={`flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-1000 delay-1100 ${
                animateItems ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>

          {/* Redirect message */}
          <div 
            className={`mt-8 text-sm text-gray-500 transition-all duration-1000 delay-1300 ${
              animateItems ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            Redirecting to home in {counter} seconds...
          </div>
        </div>

        {/* CSS for animations */}
        <style jsx global>{`
          @keyframes float {
            0% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(10deg);
            }
            100% {
              transform: translateY(0) rotate(0deg);
            }
          }
          .animate-float {
            animation: float 10s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  )
} 