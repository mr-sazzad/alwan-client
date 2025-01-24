"use client";
import {
  AlertCircle,
  BarChart2,
  CheckCircle,
  FileText,
  Package,
  PieChart,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../components/ui/alert";
import { Badge } from "../../../../components/ui/badge";
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
import { Progress } from "../../../../components/ui/progress";
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

const courierNames = ["Pathao", "Steadfast", "RedX", "Paperfly"];

const CourierRatioChecker = ({ phone }: CourierInfoProps) => {
  const [open, setOpen] = useState(false);
  const [getCourierRatio, { data, isLoading, isError }] =
    useGetCourierRatioMutation();

  const handleOpen = async () => {
    setOpen(true);
    await getCourierRatio({ phone });
  };

  const LoadingState = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Progress value={0} className="w-full" />
        </div>
      ))}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          onClick={handleOpen}
        >
          <BarChart2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] h-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium flex items-center space-x-2">
            <PieChart className="h-4 w-4" />
            <span>Courier Performance Dashboard</span>
          </DialogTitle>
          <DialogDescription>
            Delivery statistics for courier{" "}
            <Badge variant="outline" className="ml-1">
              {phone}
            </Badge>
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] rounded-md border border-border p-4">
          {isLoading ? (
            <LoadingState />
          ) : isError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                An error occurred while fetching courier information. Please try
                again.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Courier</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Successful</TableHead>
                    <TableHead>Cancelled</TableHead>
                    <TableHead className="text-center font-bold text-blue-800 dark:text-blue-100">
                      Ratio
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data &&
                    data.data &&
                    data.data.courierData &&
                    courierNames.map((courierName) => {
                      const courierData = data.data.courierData[
                        courierName.toLowerCase() as keyof typeof data.data.courierData
                      ] as CourierData;
                      return (
                        <TableRow
                          key={courierName}
                          className="hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium flex items-center">
                            <Package className="h-4 w-4 mr-2 text-blue-600" />
                            {courierName}
                          </TableCell>
                          <TableCell>{courierData.total_parcel}</TableCell>
                          <TableCell className="text-green-600">
                            {courierData.success_parcel}
                          </TableCell>
                          <TableCell className="text-red-600">
                            {courierData.cancelled_parcel}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                              <Progress
                                value={courierData.success_ratio}
                                className={`w-16 mr-2 ${
                                  courierData.success_ratio > 75
                                    ? "[&>div]:bg-green-500"
                                    : courierData.success_ratio > 50
                                    ? "[&>div]:bg-yellow-500"
                                    : "[&>div]:bg-red-500"
                                }`}
                              />
                              <span>{courierData.success_ratio}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {data && data.data && data.data.courierData && (
                    <TableRow className="bg-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-800 dark:to-indigo-800 hover:from-blue-300 hover:to-indigo-300 dark:hover:from-blue-700 dark:hover:to-indigo-700 transition-colors duration-200">
                      <TableCell className="font-bold">Summary</TableCell>
                      <TableCell>
                        {data.data.courierData.summary.total_parcel}
                      </TableCell>
                      <TableCell className="text-green-700 dark:text-green-300">
                        {data.data.courierData.summary.success_parcel}
                      </TableCell>
                      <TableCell className="text-red-700 dark:text-red-300">
                        {data.data.courierData.summary.cancelled_parcel}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <Progress
                            value={data.data.courierData.summary.success_ratio}
                            className="w-16 mr-2 [&>div]:bg-gradient-to-r [&>div]:from-blue-600 [&>div]:to-indigo-600"
                          />
                          <span>
                            {data.data.courierData.summary.success_ratio}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {data &&
                data.data &&
                data.data.reports &&
                data.data.reports.length > 0 && (
                  <Card className="mt-6 bg-white dark:bg-gray-800 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900">
                      <CardTitle className="text-xl font-bold text-blue-800 dark:text-blue-100 flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        Reports
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-none pl-0 space-y-2">
                        {data.data.reports.map(
                          (report: string, index: number) => (
                            <li
                              key={index}
                              className="text-sm text-gray-700 dark:text-gray-300 flex items-start"
                            >
                              <span className="mr-2 mt-1">
                                {index % 2 === 0 ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-red-500" />
                                )}
                              </span>
                              {report}
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                )}
            </>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CourierRatioChecker;
