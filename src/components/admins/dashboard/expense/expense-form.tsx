"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../../../../components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { toast } from "../../../../components/ui/use-toast";
import {
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
} from "../../../../redux/api/expenses/expensesApi";
import { IExpense } from "../../../../types";

interface ExpenseFormProps {
  expense?: IExpense | null;
  onClose: () => void;
}

const expenseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

export default function ExpenseForm({ expense, onClose }: ExpenseFormProps) {
  const [createExpense] = useCreateExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      description: "",
      amount: 0,
    },
  });

  useEffect(() => {
    if (expense) {
      form.reset({
        title: expense.title,
        description: expense.description,
        amount: expense.amount,
      });
    }
  }, [expense, form]);

  const onSubmit = async (values: ExpenseFormData) => {
    try {
      if (expense) {
        await updateExpense({ id: expense.id, ...values }).unwrap();
        toast({ title: "Expense updated successfully" });
      } else {
        await createExpense(values).unwrap();
        toast({ title: "Expense added successfully" });
      }
      onClose();
      form.reset();
    } catch (error) {
      toast({
        title: "Error occurred",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const isEditing = !!expense;

  return (
    <DialogContent className="sm:max-w-xl w-full">
      <DialogHeader>
        <DialogTitle className="font-medium text-xl">
          {isEditing ? "Edit Expense" : "Add New Expense"}
        </DialogTitle>
        <DialogDescription>
          Enter the details of your expense here.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full text-lg font-light">
            {isEditing ? "Update" : "Add"} Expense
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
