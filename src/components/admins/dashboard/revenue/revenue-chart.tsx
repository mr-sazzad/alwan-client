import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetIncomesBetweenDatesQuery } from "@/redux/api/income/incomeApi";
import { endOfDay, format, parseISO, startOfDay, subDays } from "date-fns";
import React, { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Transaction {
  time: string;
  amount: number;
}

interface ChartDataPoint {
  date: string;
  amount: number;
  transactions: Transaction[];
}

interface TimeRange {
  label: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ChartDataPoint;
    return (
      <div className="bg-white p-4 rounded shadow-md border border-gray-200">
        <p className="font-bold text-lg mb-2">
          {format(parseISO(data.date), "MMMM dd, yyyy")}
        </p>
        <p className="text-md mb-2">
          Total:{" "}
          <span className="font-semibold">TK. {data.amount.toFixed(2)}</span>
        </p>
        <p className="font-bold mt-2 mb-1">Transactions:</p>
        <ul className="max-h-40 overflow-auto">
          {data.transactions.map((t, index) => (
            <li
              key={index}
              className="text-sm py-1 border-b border-gray-100 last:border-b-0"
            >
              {t.time}:{" "}
              <span className="font-medium">TK. {t.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};

const RevenueChart: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<number>(7);

  const timeRanges: TimeRange[] = [
    { label: "Last 7 Days", value: 7 },
    { label: "Last 30 Days", value: 30 },
    { label: "Last 90 Days", value: 90 },
  ];

  const endDate = endOfDay(new Date());
  const startDate = startOfDay(subDays(endDate, selectedRange));

  const {
    data: revenueData,
    isLoading,
    isError,
  } = useGetIncomesBetweenDatesQuery({
    startDate: format(startDate, "yyyy-MM-dd"),
    endDate: format(endDate, "yyyy-MM-dd"),
  });

  const chartData: ChartDataPoint[] = useMemo(() => {
    if (!revenueData?.data?.incomes) return [];

    const groupedData: { [key: string]: ChartDataPoint } =
      revenueData.data.incomes.reduce((acc: any, income: any) => {
        const date = startOfDay(parseISO(income.createdAt)).toISOString();
        if (!acc[date]) {
          acc[date] = { date, amount: 0, transactions: [] };
        }
        acc[date].amount += income.amount;
        acc[date].transactions.push({
          time: format(parseISO(income.createdAt), "HH:mm"),
          amount: income.amount,
        });
        return acc;
      }, {} as { [key: string]: ChartDataPoint });

    return Object.values(groupedData).sort((a, b) =>
      a.date.localeCompare(b.date)
    );
  }, [revenueData]);

  const formatXAxis = (tickItem: string) => {
    return format(parseISO(tickItem), "MMM dd");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-medium">Revenue Over Time</CardTitle>
          <Select
            value={selectedRange.toString()}
            onValueChange={(value) => setSelectedRange(Number(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value.toString()}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardDescription>Daily revenue for the selected period</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Loading chart data...</p>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">
              Error loading chart data. Please try again.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={formatXAxis}
                interval="preserveStartEnd"
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
