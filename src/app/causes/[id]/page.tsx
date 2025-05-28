import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { causes } from '../../../data/causesData';
import PaypalCheckout from '../../../../components/paypal/PaypalCheckout';
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

// Generate metadata dynamically
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const cause = causes.find(c => String(c.id) === id);
  return {
    title: cause?.title || 'Cause Not Found',
    description: cause?.description || '',
  };
}

// Main Component
export default async function CauseDetailsPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cause = causes.find((c) => String(c.id) === id.trim());

  if (!cause) return notFound();

  const progressPercentage = calculateProgress(cause.raised, cause.goal);

 
  return (
    <main className="w-11xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">      

        <div className="space-y-8">
          <CauseImage image={cause.image} title={cause.title} />  
          <CauseHeader title={cause.title} />
          <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                iconColor="emerald-600"
                bgColor="emerald-100"
                label="Raised"
                value={cause.raised}
              />
              <StatCard
                iconColor="blue-600"
                bgColor="blue-100"
                label="Goal"
                value={cause.goal}
              />
            </div>

            <ProgressBar percentage={progressPercentage} />

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <CTAButton
                text="Donate Now"
                iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                gradient
              />
              <CTAButton
                text="Share Cause"
                iconPath="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </div>
          </div>
          <CauseHeader description={cause.description} />
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
        <p className="text-lg text-gray-600 leading-relaxed mb-8">{description}</p>
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
          className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Component: Stat Card
function StatCard({ iconColor, bgColor, label, value }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2">
        <div className={`p-2 bg-${bgColor} rounded-full`}>
          <svg
            className={`w-5 h-5 text-${iconColor}`}
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
          <p className="text-0.5xl font-bold text-gray-900">${value.toLocaleString()}</p>
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

