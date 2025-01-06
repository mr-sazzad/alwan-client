"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Info, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import ReviewsCard from "../../components/cards/single-product-page-comment-card";
import InformationCard from "../../components/cards/single-product-page-info-card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

const ReviewAndInfoTab = () => {
  const [activeTab, setActiveTab] = useState("information");

  return (
    <div className="w-full mt-12 px-4">
      <Tabs
        defaultValue="information"
        onValueChange={(value) => setActiveTab(value)}
        className="w-full"
      >
        <TabsList className="w-full flex justify-center bg-transparent">
          <div className="flex space-x-2 bg-muted p-1 rounded-full">
            <TabsTrigger
              value="information"
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === "information"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:bg-muted-hover"
              }`}
            >
              <Info className="w-4 h-4 mr-2" />
              Information
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === "comments"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:bg-muted-hover"
              }`}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Reviews
            </TabsTrigger>
          </div>
        </TabsList>
        <div className="bg-card rounded-xl shadow-lg overflow-hidden">
          <AnimatePresence mode="wait">
            <TabsContent value="information" key="information">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                <InformationCard />
              </motion.div>
            </TabsContent>
            <TabsContent value="comments" key="comments">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                <ReviewsCard />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
  );
};

export default ReviewAndInfoTab;
