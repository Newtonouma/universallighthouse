'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCauses } from '../../../src/hooks/useCauses';
import SafeHTMLRenderer from '../../ui/SafeHTMLRenderer';

interface Cause {
  id: number | string;
  title: string;
  description: string;
  raised: string | number;
  goal: string | number;
  category?: string;
  image: string;
}

export default function CausesGrid() {
  const router = useRouter();
  const { causes, loading, error, refetch } = useCauses();

  if (loading) {
    return (
      <div className="px-4 pt-24 py-12 bg-[rgba(10,49,10,0.05)] font-['Montserrat'] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-500 to-red-500 bg-clip-text text-transparent">
            Our Impactful Causes
          </h2>
          <p className="text-lg text-[rgba(10,49,10,0.8)] max-w-3xl mx-auto">
            Loading our latest causes...
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Loading skeleton */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col animate-pulse">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
                <div className="h-2 bg-gray-300 rounded mb-4"></div>
                <div className="flex justify-between mb-6">
                  <div className="bg-gray-200 p-3 rounded-lg flex-1 mr-2">
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </div>
                  <div className="bg-gray-200 p-3 rounded-lg flex-1">
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
                  <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 pt-24 py-12 bg-[rgba(10,49,10,0.05)] font-['Montserrat'] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-red-600">
            Error Loading Causes
          </h2>
          <p className="text-lg text-[rgba(10,49,10,0.8)] max-w-3xl mx-auto mb-4">
            {error}
          </p>
          <button
            onClick={refetch}
            className="bg-gradient-to-r from-green-500 to-red-500 hover:opacity-90 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="px-4 pt-24 py-12 bg-[rgba(10,49,10,0.05)] font-['Montserrat']  mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-500 to-red-500 bg-clip-text text-transparent">
          Our Impactful Causes
        </h2>
        <p className="text-lg text-[rgba(10,49,10,0.8)] max-w-3xl mx-auto">
          Sustainable livelihoods are key to long-term recovery. We empower individuals and families to rebuild their lives with lasting stability.
        </p>
      </div>

      {/* Grid of Causes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {causes.map((cause: Cause) => {
          const raisedNum = typeof cause.raised === 'string'
            ? Number(cause.raised.replace(/[^0-9.-]+/g, ''))
            : Number(cause.raised);

          const goalNum = typeof cause.goal === 'string'
            ? Number(cause.goal.replace(/[^0-9.-]+/g, ''))
            : Number(cause.goal);

          const percentage = Math.min((raisedNum / goalNum) * 100, 100).toFixed(0);

          return (
            <div
              key={cause.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-[rgba(10,49,10,0.1)] hover:-translate-y-1 h-full flex flex-col"
            >
              {/* Image with Category Tag */}
              <div className="relative h-48">
                <span className="absolute top-4 left-4 z-10 bg-[rgba(10,49,10,0.9)] text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                  {cause.category || 'Charity'}
                </span>
                <img
                  src={cause.image}
                  alt={cause.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-[rgba(10,49,10,0.9)] mb-2">{cause.title}</h3>
                <SafeHTMLRenderer 
                  content={cause.description}
                  className="text-[rgba(10,49,10,0.7)] text-sm mb-4 line-clamp-3"
                />

                {/* Progress Bar */}
                <div className="mt-auto mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-[rgba(10,49,10,0.6)]">Progress</span>
                    <span className="text-xs font-semibold text-green-500">{percentage}%</span>
                  </div>
                  <div className="w-full bg-[rgba(10,49,10,0.1)] rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Raised and Goal */}
                <div className="flex justify-between mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg flex-1 mr-2">
                    <p className="text-xs text-[rgba(10,49,10,0.6)]">Raised</p>
                    <p className="font-semibold text-[rgba(10,49,10,0.9)]">
                      {typeof cause.raised === 'number'
                        ? `$${cause.raised.toLocaleString()}`
                        : cause.raised}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg flex-1">
                    <p className="text-xs text-[rgba(10,49,10,0.6)]">Goal</p>
                    <p className="font-semibold text-[rgba(10,49,10,0.9)]">
                      {typeof cause.goal === 'number'
                        ? `$${cause.goal.toLocaleString()}`
                        : cause.goal}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 mt-auto">
                  <Link
                    href={`/causes/${cause.id}`}
                    className="flex-1 text-center border border-[rgba(10,49,10,0.3)] text-[rgba(10,49,10,0.9)] hover:bg-[rgba(10,49,10,0.05)] font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                  >
                    Learn More
                  </Link>
                  
                  <button
                    onClick={() => router.push(`/causes/${cause.id}`)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-red-500 hover:opacity-90 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm hover:-translate-y-0.5"
                  >
                    Support Cause
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}