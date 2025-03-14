"use client";
import { Plus, Rocket } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";
import HomeTextForm from "../../../../components/admins/dashboard/home-text/home-text-form";
import PageTitle from "../../../../components/admins/dashboard/page-titles/page-title";
import AlwanBreadCrumb from "../../../../components/breadcrumbs/breadcrumb";
import AdminColorSkeleton from "../../../../components/skeletons/admin-color-skeleton";
import { Button } from "../../../../components/ui/button";
import { toast } from "../../../../components/ui/use-toast";
import { useGetLeafCategoriesQuery } from "../../../../redux/api/categoies/categoriesApi";
import {
  useAddTextMutation,
  useGetTextsQuery,
  useUpdateTextMutation,
} from "../../../../redux/api/home-text/homeTextApi";
import { homeTextSchema } from "../../../../schemas/admins/home-text-schema";
import HomeTextTable from "./home-text-table";

type HomeTextType = z.infer<typeof homeTextSchema>;

export default function HomeText() {
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedText, setSelectedText] = useState<HomeTextType | null>(null);

  const { data: response, isLoading } = useGetTextsQuery(undefined);
  const { data: categoryRes, isLoading: isCategoriesLoading } =
    useGetLeafCategoriesQuery(undefined);
  const [addText, { isLoading: isAdding }] = useAddTextMutation();
  const [updateText, { isLoading: isTextUpdating }] = useUpdateTextMutation();

  if (isLoading || isCategoriesLoading) {
    return <AdminColorSkeleton />;
  }

  console.log("Res =>", response.data);

  const handleSubmit = async (values: HomeTextType) => {
    try {
      const submissionData = {
        ...values,
        text: values.text.split(","),
      };

      const result =
        isUpdating && selectedText
          ? await updateText({
              textId: submissionData.id,
              ...submissionData,
            }).unwrap()
          : await addText(submissionData).unwrap();

      if (result.data.id) {
        toast({
          title: "Success",
          description: `Text ${isUpdating ? "updated" : "added"} successfully`,
        });
        setOpen(false);
        setIsUpdating(false);
        setSelectedText(null);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form",
        variant: "destructive",
      });
    }
  };

  const handleUpdateText = (text: HomeTextType) => {
    setSelectedText(text);
    setIsUpdating(true);
    setOpen(true);
  };

  return (
    <div className="space-y-4">
      <AlwanBreadCrumb
        links={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
        ]}
        page="Home Text"
        className="my-3"
      />
      <PageTitle
        title="Welcome to Page Title"
        description="Discover amazing features and boost your productivity"
        icon={<Rocket className="w-6 h-6" />}
        size="lg"
        className="mb-8"
      />

      <div className="flex justify-end">
        <Button
          onClick={() => {
            setIsUpdating(false);
            setSelectedText(null);
            setOpen(true);
          }}
          disabled={response?.data && response.data.length > 0}
        >
          <Plus />
          Add New Home Text
        </Button>
      </div>

      <HomeTextTable texts={response.data} onUpdateText={handleUpdateText} />

      <HomeTextForm
        open={open}
        setOpen={setOpen}
        isUpdating={isUpdating}
        categories={categoryRes.data}
        onSubmit={handleSubmit}
        initialData={selectedText}
        isLoading={isAdding || isTextUpdating}
      />
    </div>
  );
}
