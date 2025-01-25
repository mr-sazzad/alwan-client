// "use client";
// import { BarChart, FileText, Settings, Users } from "lucide-react";
// import Link from "next/link";
// import React from "react";
// import { Button } from "../../../components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../../../components/ui/card";

// export default function AdminDashboard() {
//   const menuItems = [
//     {
//       icon: BarChart,
//       label: "Analytics",
//       href: "/admins/dashboard/application-dashboard",
//     },
//     { icon: Users, label: "User Management", href: "/admins/dashboard/users" },
//     { icon: FileText, label: "Reports", href: "/admins/dashboard/reports" },
//     { icon: Settings, label: "Settings", href: "/admins/dashboard/settings" },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle className="text-2xl font-medium">
//             Admin Dashboard
//           </CardTitle>
//           <CardDescription>
//             Select a menu option for detailed information
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {menuItems.map((item, index) => (
//               <Link key={index} href={item.href} passHref>
//                 <Button
//                   variant="outline"
//                   className="w-full h-24 text-left flex items-center space-x-4 hover:bg-secondary transition-colors"
//                 >
//                   <item.icon className="w-6 h-6 text-primary" />
//                   <span className="font-medium">{item.label}</span>
//                 </Button>
//               </Link>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import React from "react";
const Page = () => {
  return <div>Hello From Page</div>;
};

export default Page;
