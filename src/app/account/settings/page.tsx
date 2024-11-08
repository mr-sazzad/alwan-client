"use client";

import ChangePasswordDialog from "@/components/profile/change-password-dialog";
import DeleteUserDialog from "@/components/profile/delete-user-dialog";
import ThemeToggle from "@/components/themes/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Key, Paintbrush, Trash2 } from "lucide-react";
import { useState } from "react";

export default function AccountSettings() {
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] =
    useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-medium">
            Account Settings
          </CardTitle>
          <CardDescription>
            Manage your account preferences and security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-medium">Security</h3>
            <p className="text-sm text-muted-foreground">
              Manage your account&apos;s security settings
            </p>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Key className="w-5 h-5 mr-2 text-muted-foreground" />
                  <h4 className="font-medium">Change Password</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Update your account password
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setChangePasswordDialogOpen(true)}
              >
                Change
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Paintbrush className="w-5 h-5 mr-2 text-muted-foreground" />
                  <h4 className="font-medium">Theme Settings</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred theme
                </p>
              </div>
              <ThemeToggle />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Trash2 className="w-5 h-5 mr-2 text-destructive" />
                  <h4 className="font-medium">Delete Account</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button
                variant="destructive"
                className="px-6"
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete
              </Button>
            </div>
          </div>
          <div className="mt-6 p-4 bg-muted rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Deleting your account is permanent. All your data will be wiped
              out immediately and you won&apos;t be able to get it back.
            </p>
          </div>
        </CardContent>
      </Card>

      <ChangePasswordDialog
        open={changePasswordDialogOpen}
        setOpen={setChangePasswordDialogOpen}
      />
      <DeleteUserDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} />
    </>
  );
}
