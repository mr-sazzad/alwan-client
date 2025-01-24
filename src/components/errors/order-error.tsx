import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";

export default function AdminErrorPage() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px]">
          <AlertCircle className="w-14 h-14 text-red-500 mb-4" />
          <h1 className="text-2xl font-medium text-center mb-2">
            Access Denied
          </h1>
          <p className="text-center text-muted-foreground">
            As an admin or super admin, you do not have access to the orders
            page. This section is reserved for customer accounts only.
            <br />
            If you believe this is an error or need specific details about
            customer orders, please contact support or access the admin
            dashboard for relevant order-related insights.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
