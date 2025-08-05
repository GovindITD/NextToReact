"use client";
import React from "react";
import { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/components/ui/table";
import { Button } from "../../../../components/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/components/ui/popover";
import { Calendar } from "../../../../components/components/ui/calendar";
import { FileDown, Beaker, CalendarIcon, ArrowLeft } from "lucide-react";
import { Badge } from "../../../../components/components/ui/badge";
import { cn } from "../../../../lib/utils";
import { format, subDays } from "date-fns";
import { useNavigate } from "react-router-dom";

const initialLabReports = [
  {
    date: "2024-07-10",
    barcode: "L12345678",
    testName: "Complete Blood Count (CBC)",
    doctor: "Dr. John Smith",
    status: "Approved",
    url: "#",
  },
  {
    date: "2024-07-10",
    barcode: "L87654321",
    testName: "Lipid Profile",
    doctor: "Dr. John Smith",
    status: "Sample Collected",
    url: "#",
  },
  {
    date: "2024-06-15",
    barcode: "L54321678",
    testName: "Urine Analysis",
    doctor: "Dr. John Smith",
    status: "Approved",
    url: "#",
  },
];

const statusVariantMap: {
  [key: string]: "default" | "secondary" | "destructive" | "outline";
} = {
  Approved: "default",
  "Sample Collected": "secondary",
  "Result Done": "outline",
  Pending: "destructive",
};

export default function LabReportsPage() {
  const [labReports, setLabReports] = useState(initialLabReports);
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const to = new Date();
    const from = subDays(to, 30);
    setFromDate(from);
    setToDate(to);

    // Add dynamic data on client-side to avoid hydration errors
    setLabReports((prevReports) =>
      [
        ...prevReports,
        {
          date: new Date().toISOString(),
          barcode: "L98765432",
          testName: "Thyroid Panel",
          doctor: "Dr. Emily White",
          status: "Result Done",
          url: "#",
        },
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );
  }, []);

  const filteredReports = useMemo(() => {
    if (!fromDate || !toDate) return labReports;
    return labReports.filter((report) => {
      const reportDate = new Date(report.date);
      // Set hours to 0 to compare dates only
      const from = new Date(fromDate);
      from.setHours(0, 0, 0, 0);
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999);
      return reportDate >= from && reportDate <= to;
    });
  }, [labReports, fromDate, toDate]);

  return (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <Beaker className="h-12 w-12 mx-auto text-primary" />
        <h1 className="text-3xl font-bold font-headline text-primary mt-2">
          Lab Investigation Reports
        </h1>
        <p className="text-muted-foreground">Access your lab test results.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Lab Reports</CardTitle>
          <CardDescription>
            View your past reports. Use the date picker to filter results.
          </CardDescription>
          <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full sm:w-[240px] justify-start text-left font-normal",
                    !fromDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fromDate ? (
                    format(fromDate, "LLL dd, y")
                  ) : (
                    <span>Pick from date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={setFromDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full sm:w-[240px] justify-start text-left font-normal",
                    !toDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {toDate ? (
                    format(toDate, "LLL dd, y")
                  ) : (
                    <span>Pick to date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={setToDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Barcode</TableHead>
                <TableHead>Test Name</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Referring Doctor
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {format(new Date(report.date), "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell>{report.barcode}</TableCell>
                  <TableCell className="font-medium">
                    {report.testName}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {report.doctor}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={statusVariantMap[report.status] || "default"}
                    >
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <a href={report.url} target="_blank">
                        <FileDown className="mr-2 h-4 w-4" /> Download
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredReports.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    No reports found for the selected date range.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="text-center">
        <Button variant="outline" onClick={() => navigate("/dashboard/clinical-record")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Clinical Records
        </Button>
      </div>
    </div>
  );
}
