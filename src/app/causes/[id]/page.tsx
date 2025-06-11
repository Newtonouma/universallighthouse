import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import PaypalCheckout from '../../../../components/paypal/PaypalCheckout';
import Navbar from '../../../../components/navbar/navbar';
import Footer from '../../../../components/footer/footer';

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

// Helper function to get the correct API URL
function getApiUrl() {
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_API_URL || 'https://universallighthouse.vercel.app';
  }
  return 'http://localhost:3000';
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const response = await fetch(`${getApiUrl()}/api/causes/${id}`);
    const result = await response.json();
    
    if (result.success && result.data) {
      return {
        title: result.data.title || 'Cause Not Found',
        description: result.data.description || '',
      };
    }
  } catch (error) {
    console.error('Error fetching cause for metadata:', error);
  }
  
  return {
    title: 'Cause Not Found',
    description: '',
  };
}

// Main Component
export default async function CauseDetailsPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const response = await fetch(
      `${getApiUrl()}/api/causes/${id}`,
      { cache: 'no-store' }
    );
    const result = await response.json();
    
    if (!response.ok || !result.success || !result.data) {
      return notFound();
    }
    
    const cause = result.data;
    const progressPercentage = calculateProgress(cause.raised, cause.goal);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Navbar />
        
        {/* Hero Section with Background Pattern */}
        <div className="relative mt-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmMGZkZjQiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
          
          <main className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Left Column - Main Content */}
              <div className="lg:col-span-8 space-y-8">
                {/* Image and Title Section */}
                <div className="space-y-6">
                  <CauseImage image={cause.image} title={cause.title} />
                  <CauseHeader title={cause.title} />
                </div>
                
                {/* Description Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full" />
                    <h2 className="text-2xl font-bold text-gray-900">About This Cause</h2>
                  </div>
                  <CauseHeader description={cause.description} />
                </div>
              </div>

              {/* Right Column - Donation Panel */}
              <div className="lg:col-span-4 space-y-6">
                {/* Stats and Progress Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 sticky top-8">
                  <div className="space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-4">
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

                    {/* Progress Section */}
                    <div className="space-y-4">
                      <ProgressBar percentage={progressPercentage} />
                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold text-emerald-600">
                            ${(cause.goal - cause.raised).toLocaleString()}
                          </span>
                          {' '}left to reach our goal
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      
                      <CTAButton
                        text="Share Cause"
                        iconPath="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Section */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payment</h3>
                    <p className="text-sm text-gray-600">Choose your preferred payment method</p>
                  </div>
                  <PaypalCheckout />
                </div>
              </div>
            </div>
          </main>
        </div>
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error fetching cause:', error);
    return notFound();
  }
}

// Helper function
function calculateProgress(raised: number, goal: number): string {
  return goal > 0 ? Math.min((raised / goal) * 100, 100).toFixed(1) : '0';
}

// Component: Cause Image
function CauseImage({ image, title }: { image: string; title: string }) {
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl group">
      <Image
        src={image}
        alt={`Image for ${title}`}
        fill
        className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
        priority
        sizes="(max-width: 768px) 100vw, 66vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

// Component: Cause Header
function CauseHeader({ title, description }: { title?: string; description?: string }) {
  return (
    <div>
      {title && (
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
          {title}
        </h1>
      )}
      {description && (
        <div 
          className="prose prose-lg max-w-none text-lg text-gray-700 leading-relaxed
                     prose-headings:text-gray-900 prose-headings:font-semibold
                     prose-strong:text-gray-900 prose-strong:font-semibold
                     prose-ul:list-disc prose-ol:list-decimal
                     prose-li:marker:text-emerald-600
                     prose-p:mb-4 prose-ul:mb-4 prose-ol:mb-4
                     prose-li:mb-2"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
}

// Component: Progress Bar
function ProgressBar({ percentage }: { percentage: string }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">Funding Progress</span>
        <span className="text-lg font-bold text-emerald-600">{percentage}%</span>
      </div>
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-r from-emerald-400/20 to-teal-500/20 blur-sm -z-10" />
      </div>
    </div>
  );
}

// Component: Stat Card
function StatCard({ iconColor, bgColor, label, value }: StatCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-center space-x-4">
        <div className={`p-3 bg-${bgColor} rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300`}>
          <svg
            className={`w-6 h-6 text-${iconColor}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
            ${value.toLocaleString()}
          </p>
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
      className={`w-full ${
        gradient
          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/25'
          : 'bg-white border-2 border-gray-200 hover:border-emerald-500 text-gray-700 hover:text-emerald-600 shadow-md hover:shadow-lg'
      } font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-[1.02] active:scale-[0.98]`}
    >
      <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
      </svg>
      <span className="font-medium">{text}</span>
    </button>
  );
}