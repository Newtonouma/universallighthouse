// // src/app/causes/[id]/page.tsx
// import { causes } from '../../../../public/data/causesData';
// import { notFound } from 'next/navigation';
// import Image from 'next/image';

// export default function CauseDetails({ params }: { params: { id: string } }) {
//   const id = params.id.trim();

//   const cause = causes.find((c) => String(c.id) === id);

//   if (!cause) return notFound();

//   const progressPercentage =
//     cause.goal > 0 ? Math.min((cause.raised / cause.goal) * 100, 100).toFixed(1) : '0';

//   return (
//     <div className="max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//         {/* Image Section */}
//         <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
//           <Image
//             src={cause.image}
//             alt={`Image for ${cause.title}`}
//             fill
//             className="object-cover transition-transform duration-700 group-hover:scale-105"
//             priority
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
//         </div>

//         {/* Details Section */}
//         <div className="space-y-8">
//           <div>
//             <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-4">
//               Featured Cause
//             </span>
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
//               {cause.title}
//             </h1>
//             <p className="text-lg text-gray-600 leading-relaxed mb-8">{cause.description}</p>
//           </div>

//           <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
//             {/* Stats */}
//             <div className="grid grid-cols-2 gap-4">
//               {/* Raised */}
//               <StatCard
//                 iconColor="emerald-600"
//                 bgColor="emerald-100"
//                 label="Raised"
//                 value={cause.raised}
//               />
//               {/* Goal */}
//               <StatCard
//                 iconColor="blue-600"
//                 bgColor="blue-100"
//                 label="Goal"
//                 value={cause.goal}
//               />
//             </div>

//             {/* Progress Bar */}
//             <div>
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-sm font-medium text-gray-700">Funding Progress</span>
//                 <span className="text-sm font-bold text-emerald-600">{progressPercentage}%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
//                   style={{ width: `${progressPercentage}%` }}
//                 />
//               </div>
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-4">
//               <CTAButton
//                 text="Donate Now"
//                 iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                 gradient
//               />
//               <CTAButton
//                 text="Share Cause"
//                 iconPath="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Reusable StatCard component
// function StatCard({
//   iconColor,
//   bgColor,
//   label,
//   value,
// }: {
//   iconColor: string;
//   bgColor: string;
//   label: string;
//   value: number;
// }) {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-sm">
//       <div className="flex items-center space-x-2">
//         <div className={`p-2 bg-${bgColor} rounded-full`}>
//           <svg
//             className={`w-5 h-5 text-${iconColor}`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//             />
//           </svg>
//         </div>
//         <div>
//           <p className="text-sm font-medium text-gray-500">{label}</p>
//           <p className="text-xl font-bold text-gray-900">{value}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Reusable CTA Button component
// function CTAButton({
//   text,
//   iconPath,
//   gradient = false,
// }: {
//   text: string;
//   iconPath: string;
//   gradient?: boolean;
// }) {
//   return (
//     <button
//       className={`flex-1 ${
//         gradient
//           ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white'
//           : 'border-2 border-gray-300 hover:border-emerald-500 text-gray-700 hover:text-emerald-600'
//       } font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
//     >
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
//       </svg>
//       {text}
//     </button>
//   );
// }

import { causes } from '../../../../public/data/causesData';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default function CauseDetails({ params }: { params: { id: string } }) {
  const id = params.id.trim();
  const cause = causes.find((c) => String(c.id) === id);

  if (!cause) return notFound();

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/2">
          <Image
            src={cause.image}
            alt={cause.title}
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{cause.title}</h2>
          <p className="text-lg text-gray-700 mb-6">{cause.description}</p>
          <div className="text-sm text-gray-600 mb-4">
            <p>Goal: ${cause.goal.toLocaleString()}</p>
            <p>Raised: ${cause.raised.toLocaleString()}</p>
          </div>
          <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition duration-300">
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
}
