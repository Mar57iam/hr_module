// 'use client';

// import { AuthContext } from "@/Context/AuthContext";
// import { useQuery } from "@tanstack/react-query";
// import { useContext } from "react";

// export default function useDocuments() {
//   const { token } = useContext(AuthContext);

//   // fetch function
//   async function alldocuments() {
//     const res = await fetch(
//       "http://site46339-a7pcm8.scloudsite101.com/api/v1/documents",
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (!res.ok) {
//       throw new Error("Failed to fetch documents");
//     }

//     const finalRes = await res.json();
//     return finalRes.documents; // حسب شكل البيانات الراجعة
//   }

//   // useQuery
//   const {
//     data: documents,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["documents"],
//     queryFn: alldocuments,
//     staleTime: 1000 * 60 * 5, // 5 دقائق
//     cacheTime: 1000 * 60 * 10, // 10 دقائق
//   });

 
//   return {
//     documents,
//     isLoading,
//     isError,
//     error,
//   };
// }
