"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateExpenseMutation,
  useDeleteExpenseMutation,
  useGetAllExpensesQuery,
  useGetMonthlyExpensesQuery,
  useGetWeeklyExpensesQuery,
  useUpdateExpenseMutation,
} from "@/redux/api/expenses/expensesApi";
import { Expense } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  DollarSign,
  Edit,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const expenseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

export default function ExpensePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const { data: allExpenses, isLoading: isLoadingAll } =
    useGetAllExpensesQuery(undefined);
  const { data: weeklyExpenses, isLoading: isLoadingWeekly } =
    useGetWeeklyExpensesQuery(undefined);
  const { data: monthlyExpenses, isLoading: isLoadingMonthly } =
    useGetMonthlyExpensesQuery(undefined);

  const [createExpense] = useCreateExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();

  const { toast } = useToast();

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      description: "",
      amount: 0,
    },
  });

  const onSubmit = async (values: ExpenseFormData) => {
    try {
      if (editingExpense) {
        await updateExpense({ id: editingExpense.id, data: values }).unwrap();
        toast({ title: "Expense updated successfully" });
      } else {
        await createExpense(values).unwrap();
        toast({ title: "Expense added successfully" });
      }
      setIsDialogOpen(false);
      form.reset();
      setEditingExpense(null);
    } catch (error) {
      toast({
        title: "Error occurred",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    form.reset({
      title: expense.title,
      description: expense.description,
      amount: expense.amount,
    });
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

  if (isLoadingAll || isLoadingWeekly || isLoadingMonthly) {
    return <div>Loading...</div>;
  }

  const filteredExpenses = (expenses: Expense[] | undefined): Expense[] =>
    expenses?.filter(
      (expense) =>
        expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const ExpenseTable: React.FC<{
    expenses: Expense[] | undefined;
    isLoading: boolean;
  }> = ({ expenses, isLoading }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Loading...
            </TableCell>
          </TableRow>
        ) : filteredExpenses(expenses).length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No expenses found
            </TableCell>
          </TableRow>
        ) : (
          filteredExpenses(expenses).map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.title}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                  {expense.amount.toFixed(2)}
                </div>
              </TableCell>
              <TableCell>
                {format(new Date(expense.createdAt), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(expense)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(expense.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  const calculateTotal = (expenses: Expense[] | undefined): number =>
    expenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0;

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Expense Manager</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Add New Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl w-full">
            <DialogHeader>
              <DialogTitle className="font-medium text-xl">
                {editingExpense ? "Edit Expense" : "Add New Expense"}
              </DialogTitle>
              <DialogDescription>
                Enter the details of your expense here.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Expense title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide a detailed description of the expense"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full text-lg font-light">
                  {editingExpense ? "Update" : "Add"} Expense
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${calculateTotal(allExpenses.data).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Weekly Expenses
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${calculateTotal(weeklyExpenses.data).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              +5.4% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Expenses
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${calculateTotal(monthlyExpenses.data).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lifetime Expenses
            </CardTitle>
            <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$21,456.90</div>
            <p className="text-xs text-muted-foreground">
              -2.5% from last year
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex md:flex-row md:gap-10 flex-col gap-2">
          <TabsList className="md:max-w-lg w-full">
            <TabsTrigger value="all" className="w-full">
              All Expenses
            </TabsTrigger>
            <TabsTrigger value="weekly" className="w-full">
              Weekly
            </TabsTrigger>
            <TabsTrigger value="monthly" className="w-full">
              Monthly
            </TabsTrigger>
          </TabsList>

          <div className="flex justify-between items-center w-full">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search expenses"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Expenses</CardTitle>
              <CardDescription>A list of all your expenses.</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseTable
                isLoading={isLoadingAll}
                expenses={allExpenses.data}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Expenses</CardTitle>
              <CardDescription>Your expenses for this week.</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseTable
                isLoading={isLoadingWeekly}
                expenses={weeklyExpenses.data}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Expenses</CardTitle>
              <CardDescription>Your expenses for this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseTable
                isLoading={isLoadingMonthly}
                expenses={monthlyExpenses.data}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
