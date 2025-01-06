"use client";
import { AlertCircle, Rocket } from "lucide-react";
import React, { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../components/ui/alert";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import { Skeleton } from "../../../../components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { useGetCourierRatioMutation } from "../../../../redux/api/bd-courier/bd-courier-api";

type CourierData = {
  total_parcel: number;
  success_parcel: number;
  cancelled_parcel: number;
  success_ratio: number;
};

type CourierInfoProps = {
  phone: string;
};

const columnColors = {
  courier: "bg-emerald-200",
  total: "bg-indigo-200",
  successful: "bg-emerald-200",
  cancelled: "bg-rose-200",
  ratio: "bg-indigo-200",
};

const courierNames = ["Pathao", "Steadfast", "RedX", "Paperfly"];

const CourierRatioChecker = ({ phone }: CourierInfoProps) => {
  const [open, setOpen] = useState(false);
  const [getCourierRatio, { data, isLoading, isError }] =
    useGetCourierRatioMutation();

  const handleOpen = async () => {
    setOpen(true);
    await getCourierRatio({ phone });
  };

  const SkeletonRow = () => (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-8" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-8" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-8" />
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-end">
          <Skeleton className="h-2 w-16 mr-2" />
          <Skeleton className="h-4 w-8" />
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="p-0 ml-2"
          onClick={handleOpen}
        >
          <Rocket className="h-4 w-4" />
          <span className="sr-only">Check courier ratio</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">
            Courier Information
          </DialogTitle>
          <DialogDescription>
            Courier order ratio information for {phone}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[500px] rounded-md border p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={`w-[100px] ${columnColors.courier}`}>
                  Courier
                </TableHead>
                <TableHead className={columnColors.total}>Total</TableHead>
                <TableHead className={columnColors.successful}>
                  Successful
                </TableHead>
                <TableHead className={columnColors.cancelled}>
                  Cancelled
                </TableHead>
                <TableHead className={`text-right ${columnColors.ratio}`}>
                  Ratio
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        An error occurred while fetching courier information.
                        Please try again.
                      </AlertDescription>
                    </Alert>
                  </TableCell>
                </TableRow>
              ) : (
                data &&
                data.data &&
                data.data.courierData && (
                  <>
                    {courierNames.map((courierName) => {
                      const courierData = data.data.courierData[
                        courierName.toLowerCase() as keyof typeof data.data.courierData
                      ] as CourierData;
                      return (
                        <TableRow key={courierName}>
                          <TableCell
                            className={`font-medium ${columnColors.courier}`}
                          >
                            {courierName}
                          </TableCell>
                          <TableCell className={columnColors.total}>
                            {courierData.total_parcel}
                          </TableCell>
                          <TableCell className={columnColors.successful}>
                            {courierData.success_parcel}
                          </TableCell>
                          <TableCell className={columnColors.cancelled}>
                            {courierData.cancelled_parcel}
                          </TableCell>
                          <TableCell
                            className={`text-right ${columnColors.ratio}`}
                          >
                            <div className="flex items-center justify-end">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-green-500 h-2 rounded-full"
                                  style={{
                                    width: `${courierData.success_ratio}%`,
                                  }}
                                />
                              </div>
                              <span>{courierData.success_ratio}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow className="bg-emerald-200 hover:bg-emerald-300">
                      <TableCell className="font-medium">Summary</TableCell>
                      <TableCell>
                        {data.data.courierData.summary.total_parcel}
                      </TableCell>
                      <TableCell>
                        {data.data.courierData.summary.success_parcel}
                      </TableCell>
                      <TableCell>
                        {data.data.courierData.summary.cancelled_parcel}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <div className="w-16 bg-gray-300 rounded-full h-2 mr-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{
                                width: `${data.data.courierData.summary.success_ratio}%`,
                              }}
                            />
                          </div>
                          <span>
                            {data.data.courierData.summary.success_ratio}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                )
              )}
            </TableBody>
          </Table>
          {data &&
            data.data &&
            data.data.reports &&
            data.data.reports.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2">
                    {data.data.reports.map((report: string, index: number) => (
                      <li key={index} className="text-sm text-gray-600">
                        {report}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CourierRatioChecker;
