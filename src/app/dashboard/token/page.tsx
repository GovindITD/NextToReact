"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "../../../components/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/components/ui/card";
import { Ticket, ArrowLeft, RefreshCw, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function TokenPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState("T-123");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  const generateNewToken = () => {
    // In a real app, you would call an API to get a new token.
    // For this demo, we'll just generate a random number.
    const newTokenNumber = Math.floor(100 + Math.random() * 900);
    setToken(`T-${newTokenNumber}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8" style={{ padding: "12px" }}>
      <div className="text-center">
        <Ticket className="h-12 w-12 mx-auto text-primary" />
        <h1 className="text-3xl font-bold font-headline text-primary mt-2">
          My Token Information
        </h1>
        <p className="text-muted-foreground">
          View your current token status and generate a new one if needed.
        </p>
      </div>

      <Card className="shadow-lg text-center">
        <CardHeader>
          <CardTitle className="text-xl">Your Current Token Number</CardTitle>
          <CardDescription className="flex items-center justify-center gap-2">
            <Calendar className="h-4 w-4" /> {currentDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-7xl font-extrabold text-primary tracking-wider">
            {token}
          </p>
          <p className="text-muted-foreground mt-2">
            Please show this token at the registration counter.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generate a New Token</CardTitle>
          <CardDescription>
            If you need a new token, you can generate one here. Please note that
            generating a new token will invalidate your current one.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button size="lg" asChild>
            <Link to="/dashboard/token/generate">
              <RefreshCw className="mr-2 h-5 w-5" />
              Generate New Token
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
