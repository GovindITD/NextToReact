"use client";

import { useState, useMemo, useEffect } from "react";
import React from "react";
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
import { FileDown, Scan, CalendarIcon, ArrowLeft } from "lucide-react";
import { Badge } from "../../../../components/components/ui/badge";
import { cn } from "../../../../lib/utils";
import { format, subDays } from "date-fns";
import { useNavigate } from "react-router-dom";

const initialRadiologyReports = [
  {
    date: "2024-07-20",
    barcode: "R11223344",
    reportName: "Chest X-Ray PA View",
    radiologist: "Dr. Jessica Davis",
    status: "Approved",
    url: "#",
  },
  {
    date: "2024-07-25",
    barcode: "R55667788",
    reportName: "Ultrasound Abdomen",
    radiologist: "Dr. Robert Brown",
    status: "Result Done",
    url: "#",
  },
  {
    date: "2024-08-05",
    barcode: "R99001122",
    reportName: "CT Scan Brain",
    radiologist: "Dr. Jessica Davis",
    status: "Sample Collected",
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

export default function RadiologyReportsPage() {
  const [radiologyReports, setRadiologyReports] = useState(
    initialRadiologyReports
  );
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const to = new Date();
    const from = subDays(to, 30);
    setFromDate(from);
    setToDate(to);
  }, []);

  const filteredReports = useMemo(() => {
    if (!fromDate || !toDate) return radiologyReports;
    return radiologyReports.filter((report) => {
      const reportDate = new Date(report.date);
      const from = new Date(fromDate);
      from.setHours(0, 0, 0, 0);
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999);
      return reportDate >= from && reportDate <= to;
    });
  }, [radiologyReports, fromDate, toDate]);

  return (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <Scan className="h-12 w-12 mx-auto text-primary" />
        <h1 className="text-3xl font-bold font-headline text-primary mt-2">
          Radiology Investigation Reports
        </h1>
        <p className="text-muted-foreground">
          View your imaging reports like X-rays and scans.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Radiology Reports</CardTitle>
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
                <TableHead>Report Name</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Radiologist
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
                    {report.reportName}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {report.radiologist}
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
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard/clinical-record")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Clinical Records
        </Button>
      </div>
    </div>
  );
}
