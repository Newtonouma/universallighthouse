'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useCause } from '../../../hooks/useCauses';
import PaypalCheckout from '../../../../components/paypal/PaypalCheckout';
import SafeHTMLRenderer from '../../../../components/ui/SafeHTMLRenderer';

interface StatCardProps {
  iconColor: string;
  bgColor: string;
  label: string;
  value: number;
}

interface CTAButtonProps {
  text: string;
  iconPath: string;
  gradient?: boolean;
  onClick?: () => void;
}

interface CauseClientProps {
  id: string;
}

export default function CauseClient({ id }: CauseClientProps) {
  const { cause, loading, error } = useCause(id);

  if (loading) {
    return (
      <main className="w-11xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Loading skeleton */}
          <div className="space-y-8">
            <div className="w-full h-96 bg-gray-300 rounded-2xl animate-pulse"></div>
            <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
          </div>
          <div className="space-y-6">
            <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-20 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="w-11xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Cause</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </main>
    );
  }

  if (!cause) {
    notFound();
  }

  const progressPercentage = calculateProgress(cause.raised, cause.goal);

  return (
    <main className="w-11xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">      
        <div className="space-y-8">
          <CauseImage image={cause.image} title={cause.title} />  
          <CauseHeader title={cause.title} description={cause.description} />
          <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <ProgressBar percentage={progressPercentage} />
            <div className="grid grid-cols-2 gap-4">
              <StatCard 
                iconColor="emerald-600" 
                bgColor="emerald-100" 
                label="Amount Raised" 
                value={cause.raised} 
              />
              <StatCard 
                iconColor="blue-600" 
                bgColor="blue-100" 
                label="Goal Amount" 
                value={cause.goal} 
              />
            </div>
            <div className="flex gap-4 pt-4">
              <CTAButton 
                text="Share Cause" 
                iconPath="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
              <CTAButton 
                text="Donate Now" 
                iconPath="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                gradient
              />
            </div>
          </div>
        </div> 
        <div className="paymentbuttons flex justify-center items-center gap-4 mt-8 p-4 flex-wrap bg-gray-100 rounded-lg">
          <PaypalCheckout />
        </div>
      </div>
    </main>
  );
}

// Helper function
function calculateProgress(raised: number, goal: number): string {
  return goal > 0 ? Math.min((raised / goal) * 100, 100).toFixed(1) : '0';
}

// Component: Cause Image
function CauseImage({ image, title }: { image: string; title: string }) {
  return (
    <div className="relative w-full h-46 lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
      <Image
        src={image}
        alt={`Image for ${title}`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}

// Component: Cause Header
function CauseHeader({ title, description }: { title?: string; description?: string }) {
  return (
    <div>
      {title && (
        <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {title}
        </h1>
      )}
      {description && (
        <SafeHTMLRenderer 
          content={description}
          className="text-lg text-gray-600 leading-relaxed mb-8"
        />
      )}
    </div>
  );
}

// Component: Progress Bar
function ProgressBar({ percentage }: { percentage: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Funding Progress</span>
        <span className="text-sm font-bold text-emerald-600">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Component: Stat Card
function StatCard({ iconColor, bgColor, label, value }: StatCardProps) {
  const bgColorClass = `bg-${bgColor}`;
  const iconColorClass = `text-${iconColor}`;
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2">
        <div className={`p-2 rounded-full ${bgColorClass}`}>
          <svg
            className={`w-5 h-5 ${iconColorClass}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-xl font-bold text-gray-900">${value.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

// Component: CTA Button
function CTAButton({ text, iconPath, gradient = false, onClick }: CTAButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 ${
        gradient
          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white'
          : 'border-2 border-gray-300 hover:border-emerald-500 text-gray-700 hover:text-emerald-600'
      } font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
      </svg>
      {text}
    </button>
  );
}
