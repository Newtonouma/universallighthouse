import { causes } from '../../../../public/data/causesData';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type CauseDetailsProps = {
  params: { id: string };
};

export default function CauseDetails({ params }: CauseDetailsProps) {
  const id = params.id.trim(); // Remove spaces if any

  const cause = causes.find((c) => String(c.id) === id);

  if (!cause) return notFound();

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    {/* Image Section */}
    <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
      <Image
        src={cause.image}
        alt={cause.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>

    {/* Details Section */}
    <div className="space-y-8">
      <div>
        <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-4">
          Featured Cause
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {cause.title}
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          {cause.description}
        </p>
      </div>

      <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
        {/* Stats with icons */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-emerald-100 rounded-full">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Raised</p>
                <p className="text-xl font-bold text-gray-900">{cause.raised}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-full">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Goal</p>
                <p className="text-xl font-bold text-gray-900">{cause.goal}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Funding Progress</span>
            <span className="text-sm font-bold text-emerald-600">
              {((parseFloat(cause.raised) / parseFloat(cause.goal)) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
              style={{
                width: `${Math.min((parseFloat(cause.raised) / parseFloat(cause.goal)) * 100, 100)}%`,
              }}
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Donate Now
          </button>
          <button className="flex-1 border-2 border-gray-300 hover:border-emerald-500 text-gray-700 hover:text-emerald-600 font-semibold py-3 px-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Share Cause
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
