"use client";

import { Button } from "../../../../components/components/ui/button";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/components/ui/card";
import { Input } from "../../../../components/components/ui/input";
import { Label } from "../../../../components/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GenerateTokenPage() {
  const navigate = useNavigate();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission and token generation logic.
    alert("New token generated and saved!");
    navigate("/dashboard/token");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6" style={{ padding: "12px" }}>
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline text-primary">
          Generate New Token
        </h1>
        <p className="text-muted-foreground">
          Select the service details to generate a token.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Token Generation Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value="BEATRICE CHEPKORIR" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile No</Label>
                <Input id="mobile" value="0115983283" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service-category">Service Category</Label>
                <Select>
                  <SelectTrigger id="service-category">
                    <SelectValue placeholder="--Select--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="investigation">Investigation</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select>
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="opd">OPD</SelectItem>
                    <SelectItem value="ipd">IPD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="service">Service</Label>
                <Select>
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Physician</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Save
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button variant="outline" onClick={() => navigate("/dashboard/token")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to My Token
        </Button>
      </div>
    </div>
  );
}
