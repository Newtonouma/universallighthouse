// // app/causes/[id]/page.tsx
// import { notFound } from 'next/navigation';
// import { causes } from '../../../../public/data/causesData';


// interface PageProps {
//   params: {
//     id: string;
//   };
// }

// export default function CauseDetailPage({ params }: PageProps) {
//   const cause = causes.find(c => c.id === parseInt(params.id));

//   if (!cause) return notFound();

//   return (
//     <div className="container mx-auto py-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//         <img 
//           src={cause.imageUrl} 
//           alt={cause.title}
//           className="w-full h-64 md:h-96 object-cover"
//         />
//         <div className="p-6 md:p-8">
//           <h1 className="text-3xl font-bold mb-4">{cause.title}</h1>
//           <p className="text-gray-700 text-lg mb-6">{cause.description}</p>

//           <div className="mb-6">
//             <div className="flex justify-between text-lg font-medium mb-2">
//               <span>Raised: {cause.raised}</span>
//               <span>Goal: {cause.goal}</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-3">
//               <div 
//                 className="bg-green-600 h-3 rounded-full" 
//                 style={{ width: `${cause.percent}%` }}
//               ></div>
//             </div>
//             <div className="mt-2 text-right font-medium">
//               {cause.percent}% funded
//             </div>
//           </div>

//           <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
//             Donate Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
