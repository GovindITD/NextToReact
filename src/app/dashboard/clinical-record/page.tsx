"use client";

import { Link } from "react-router-dom";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/components/ui/card";
import { Stethoscope, Beaker, Scan, Pill, ChevronRight } from "lucide-react";

const recordTypes = [
  {
    name: "Consultation History",
    description: "View past doctor consultations and prescriptions.",
    icon: Stethoscope,
    href: "/dashboard/clinical-record/consultations",
  },
  {
    name: "Lab Investigation Reports",
    description: "Access your lab test results.",
    icon: Beaker,
    href: "/dashboard/clinical-record/lab-reports",
  },
  {
    name: "Radiology Investigation Reports",
    description: "View your imaging reports like X-rays and scans.",
    icon: Scan,
    href: "/dashboard/clinical-record/radiology-reports",
  },
  {
    name: "Medicines",
    description: "See a list of your prescribed medications.",
    icon: Pill,
    href: "/dashboard/clinical-record/medicines",
  },
];

export default function ClinicalRecordPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline text-primary">
          Clinical Record
        </h1>
        <p className="text-muted-foreground">
          Select a category to view your health records.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {recordTypes.map((record) => (
          <Link to={record.href} key={record.name}>
            <Card className="hover:shadow-lg hover:border-primary/50 transition-all h-full flex flex-col">
              <CardHeader className="flex-row items-center gap-4">
                <record.icon className="h-10 w-10 text-primary" />
                <div>
                  <CardTitle className="text-xl font-headline">
                    {record.name}
                  </CardTitle>
                  <CardDescription>{record.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex items-end justify-end">
                <ChevronRight className="h-6 w-6 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
