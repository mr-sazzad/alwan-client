import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReturnInfoProps {
  returnData: {
    quantity: number;
    returnReason: string;
    returnNote: string;
  };
  onApprove: () => void;
  onReject: () => void;
}

export function ReturnInfo({
  returnData,
  onApprove,
  onReject,
}: ReturnInfoProps) {
  return (
    <Card className="mt-4 bg-orange-100">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Return Request</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Quantity to Return:</strong> {returnData.quantity}
          </p>
          <p>
            <strong>Reason for Return:</strong> {returnData.returnReason}
          </p>
          <p>
            <strong>Return Note:</strong> {returnData.returnNote}
          </p>
        </div>
        <div className="mt-4 flex space-x-2">
          <Button onClick={onApprove} variant="default">
            Approve Return
          </Button>
          <Button onClick={onReject} variant="destructive">
            Reject Return
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
