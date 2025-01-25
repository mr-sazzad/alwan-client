// "use client";
// import { AlertCircle, Key, Paintbrush, Trash2 } from "lucide-react";
// import React, { useState } from "react";
// import { PiPasswordLight } from "react-icons/pi";
// import ChangePasswordDialog from "../../../components/profile/change-password-dialog";
// import DeleteUserDialog from "../../../components/profile/delete-user-dialog";
// import ThemeToggle from "../../../components/themes/theme-toggle";
// import { Button } from "../../../components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../../../components/ui/card";
// import { getUserFromLocalStorage } from "../../../helpers/jwt";

// export default function AccountSettings() {
//   const [changePasswordDialogOpen, setChangePasswordDialogOpen] =
//     useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const currentUser = getUserFromLocalStorage() as any;

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-4xl">
//       <h1 className="text-2xl font-medium mb-2">Account Settings</h1>
//       <p className="text-muted-foreground mb-8">
//         Manage your account preferences and security
//       </p>

//       <div className="grid gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-xl font-medium flex items-center">
//               <Key className="w-5 h-5 mr-2 text-primary" />
//               Security
//             </CardTitle>
//             <CardDescription>
//               Manage your account&apos;s security settings
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h4 className="font-medium">Change Password</h4>
//                 <p className="text-sm text-muted-foreground">
//                   Update your account password
//                 </p>
//               </div>
//               <Button
//                 variant="outline"
//                 onClick={() => setChangePasswordDialogOpen(true)}
//                 className="flex items-center gap-2"
//               >
//                 <PiPasswordLight />
//                 Change
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-xl font-medium flex items-center">
//               <Paintbrush className="w-5 h-5 mr-2 text-primary" />
//               Appearance
//             </CardTitle>
//             <CardDescription>
//               Customize the look and feel of the application
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h4 className="font-medium">Theme Settings</h4>
//                 <p className="text-sm text-muted-foreground">
//                   Choose your preferred theme
//                 </p>
//               </div>
//               <ThemeToggle />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-xl font-medium flex items-center">
//               <Trash2 className="w-5 h-5 mr-2 text-destructive" />
//               Danger Zone
//             </CardTitle>
//             <CardDescription>
//               Actions that can permanently affect your account
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h4 className="font-medium">Delete Account</h4>
//                 <p className="text-sm text-muted-foreground">
//                   Permanently delete your account and all data
//                 </p>
//               </div>
//               <Button
//                 variant="destructive"
//                 onClick={() => setDeleteDialogOpen(true)}
//                 disabled={currentUser?.role !== "USER"}
//               >
//                 Delete Account
//               </Button>
//             </div>
//             <div className="p-4 bg-muted rounded-lg flex items-start">
//               <AlertCircle className="w-5 h-5 mr-2 text-muted-foreground flex-shrink-0 mt-0.5" />
//               <p className="text-sm text-muted-foreground">
//                 Deleting your account is permanent. All your data will be wiped
//                 out immediately and you won&apos;t be able to get it back.
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <ChangePasswordDialog
//         open={changePasswordDialogOpen}
//         setOpen={setChangePasswordDialogOpen}
//       />
//       <DeleteUserDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} />
//     </div>
//   );
// }

import React from "react";
const Page = () => {
  return <div>Hello From Page</div>;
};

export default Page;
