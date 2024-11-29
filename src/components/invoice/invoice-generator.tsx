"use client";

import { formatCurrency } from "@/components/utils/money";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";

// Extend the jsPDF type to include autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: typeof autoTable;
  }
}

interface InvoiceData {
  brandPhone: string;
  brandEmail: string;
  invoiceDate: Date;
  notes: string;
}

interface OrderData {
  id: string;
  userName: string;
  division: string;
  district: string;
  upazila: string;
  union: string;
  streetAddress: string;
  totalCost: number;
  shippingCost: number;
}

interface OrderItem {
  product: {
    name: string;
  };
  quantity: number;
  discountedPrice: number;
  size?: {
    name: string;
  };
}

interface InvoiceGeneratorProps {
  invoiceData: InvoiceData;
  order: OrderData;
  items: OrderItem[];
  onGenerate: () => void;
}

export default function InvoiceGenerator({
  invoiceData,
  order,
  items,
  onGenerate,
}: InvoiceGeneratorProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      const doc = new jsPDF();
      await doc.addFont(
        "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
        "Roboto",
        "normal"
      );
      await doc.addFont(
        "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Bold.ttf",
        "Roboto",
        "bold"
      );
      setIsReady(true);
    };
    loadFonts();
  }, []);

  useEffect(() => {
    if (isReady) {
      generatePDF();
    }
  }, [isReady]);

  const generatePDF = () => {
    if (!isReady) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    doc.setFont("Roboto", "normal");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPos = margin;

    // Add logo and brand information
    doc.setFontSize(24);
    doc.setFont("Roboto", "bold");
    doc.setTextColor("#4A5568");
    doc.text("INVOICE", pageWidth / 2, yPos, { align: "center" });
    yPos += 15;

    doc.setFontSize(10);
    doc.setFont("Roboto", "normal");
    doc.setTextColor("#718096");
    doc.text(invoiceData.brandPhone, margin, yPos);
    doc.text(invoiceData.brandEmail, pageWidth - margin, yPos, {
      align: "right",
    });
    yPos += 10;

    // Add invoice details
    addSection(doc, "Invoice Details", yPos);
    yPos += 7;
    addField(
      doc,
      "Date",
      invoiceData.invoiceDate.toLocaleDateString(),
      margin,
      yPos
    );
    yPos += 5;

    // Add customer information
    addSection(doc, "Customer Details", yPos);
    yPos += 7;
    addField(doc, "Name", order.userName, margin, yPos);
    yPos += 5;
    addField(doc, "Address", formatAddress(order), margin, yPos);
    yPos += 10;

    // Add table
    autoTable(doc, {
      startY: yPos,
      head: [["Product", "Quantity", "Price", "Size", "Total"]],
      body: items.map((item) => [
        item.product.name,
        item.quantity,
        formatCurrency(item.discountedPrice),
        item.size?.name ?? "N/A",
        formatCurrency(item.discountedPrice * item.quantity),
      ]),
      styles: { font: "Roboto", fontSize: 8 },
      headStyles: { fillColor: [74, 85, 104], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [237, 242, 247] },
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;

    // Add totals
    doc.setFont("Roboto", "bold");
    doc.setFontSize(10);
    addTotal(doc, "Subtotal", formatCurrency(order.totalCost), pageWidth, yPos);
    yPos += 5;
    addTotal(
      doc,
      "Shipping",
      formatCurrency(order.shippingCost),
      pageWidth,
      yPos
    );
    yPos += 5;
    doc.setFontSize(12);
    addTotal(
      doc,
      "Total",
      formatCurrency(order.totalCost + order.shippingCost),
      pageWidth,
      yPos
    );
    yPos += 15;

    // Add notes
    addSection(doc, "Notes", yPos);
    yPos += 7;
    doc.setFont("Roboto", "normal");
    doc.setFontSize(8);
    const splitNotes = doc.splitTextToSize(
      invoiceData.notes,
      pageWidth - 2 * margin
    );
    doc.text(splitNotes, margin, yPos);

    // Save the PDF
    doc.save(`invoice-${order.id}.pdf`);

    // Call the onGenerate callback
    onGenerate();
  };

  return null;
}

// Helper functions
function formatAddress(order: OrderData): string {
  return `${order.division}, ${order.district}, ${order.upazila}, ${order.union}, ${order.streetAddress}`;
}

function addSection(doc: jsPDF, title: string, y: number) {
  doc.setFont("Roboto", "bold");
  doc.setFontSize(12);
  doc.setTextColor("#2D3748");
  doc.text(title, 20, y);
  doc.setLineWidth(0.5);
  doc.setDrawColor("#CBD5E0");
  doc.line(20, y + 1, doc.internal.pageSize.getWidth() - 20, y + 1);
}

function addField(
  doc: jsPDF,
  label: string,
  value: string,
  x: number,
  y: number
) {
  doc.setFont("Roboto", "bold");
  doc.setFontSize(8);
  doc.setTextColor("#4A5568");
  doc.text(`${label}:`, x, y);
  doc.setFont("Roboto", "normal");
  doc.setTextColor("#718096");
  doc.text(value, x + 30, y);
}

function addTotal(
  doc: jsPDF,
  label: string,
  value: string,
  pageWidth: number,
  y: number
) {
  doc.text(label, pageWidth - 50, y);
  doc.text(value, pageWidth - 20, y, { align: "right" });
}
