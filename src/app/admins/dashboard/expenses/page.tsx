"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  useDeleteExpenseMutation,
  useGetAllExpensesQuery,
  useGetMonthlyExpensesQuery,
  useGetWeeklyExpensesQuery,
  useUpdateExpenseMutation,
} from "@/redux/api/expenses/expensesApi";
import { Expense } from "@/types";
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  DollarSign,
  PlusCircle,
} from "lucide-react";
import { useState } from "react";

import ExpenseForm from "@/components/admins/dashboard/expense/expense-form";
import { DataTable } from "@/components/admins/dashboard/products/data-table";
import { ExpensesColumns } from "./expense-columns";

export default function ExpensePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const { data: allExpenses, isLoading: isLoadingAll } =
    useGetAllExpensesQuery(undefined);
  const { data: weeklyExpenses, isLoading: isLoadingWeekly } =
    useGetWeeklyExpensesQuery(undefined);
  const { data: monthlyExpenses, isLoading: isLoadingMonthly } =
    useGetMonthlyExpensesQuery(undefined);

  const [deleteExpense, { isLoading: isDeleting }] = useDeleteExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();

  const { toast } = useToast();

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExpense(id).unwrap();
      toast({ title: "Expense deleted successfully", variant: "default" });
    } catch (error) {
      toast({
        title: "Error occurred",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingExpense(null);
  };

  const calculateTotal = (expenses: Expense[] | undefined): number =>
    expenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0;

  const columns = ExpensesColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    isLoading: isLoadingAll,
  });

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto py-10 space-y-8">
          <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-gray-100">
              Expense Manager
            </h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Expense
                </Button>
              </DialogTrigger>
              <ExpenseForm
                expense={editingExpense}
                onClose={handleCloseDialog}
              />
            </Dialog>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-teal-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Expenses
                </CardTitle>
                <DollarSign className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${calculateTotal(allExpenses?.data).toFixed(2)}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-purple-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Weekly Expenses
                </CardTitle>
                <Calendar className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${calculateTotal(weeklyExpenses?.data).toFixed(2)}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-violet-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Expenses
                </CardTitle>
                <ArrowUpRight className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${calculateTotal(monthlyExpenses?.data).toFixed(2)}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-indigo-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Lifetime Expenses
                </CardTitle>
                <ArrowDownRight className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$21,456.90</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-6">
              <Tabs defaultValue="all" className="w-full">
                <div className="flex md:flex-row md:gap-10 flex-col gap-2 mb-6">
                  <TabsList className="md:max-w-lg w-full bg-gray-100 dark:bg-gray-700 p-1 rounded-md">
                    <TabsTrigger
                      value="all"
                      className="w-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600"
                    >
                      All Expenses
                    </TabsTrigger>
                    <TabsTrigger
                      value="weekly"
                      className="w-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600"
                    >
                      Weekly
                    </TabsTrigger>
                    <TabsTrigger
                      value="monthly"
                      className="w-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600"
                    >
                      Monthly
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="all">
                  <DataTable
                    columns={columns}
                    data={allExpenses?.data || []}
                    filterColumn="title"
                  />
                </TabsContent>
                <TabsContent value="weekly">
                  <DataTable
                    columns={columns}
                    data={weeklyExpenses?.data || []}
                    filterColumn="title"
                  />
                </TabsContent>
                <TabsContent value="monthly">
                  <DataTable
                    columns={columns}
                    data={monthlyExpenses?.data || []}
                    filterColumn="title"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
