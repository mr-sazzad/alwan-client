import { Button } from "@/components/ui/button";

const Settings = () => {
  return (
    <div>
      <h3 className="text-xl font-medium mb-4 text-muted-foreground">
        Account Settings
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Change Password</h4>
            <p className="text-sm text-muted-foreground">
              Update your account password
            </p>
          </div>
          <Button variant="outline">Change</Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Delete Account</h4>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all data
            </p>
          </div>
          <Button variant="destructive" className="px-6">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
