"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeyRound, Mail, ShieldAlert } from "lucide-react";
import { Button } from "../components/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/components/ui/card";
import { Input } from "../components/components/ui/input";
import { Label } from "../components/components/ui/label";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd have authentication logic here.
    // For this demo, we'll just navigate to the mpin creation page.
    navigate("/create-mpin");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 border border-primary/20">
              <ShieldAlert className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold font-headline text-primary">
              MediAssist
            </CardTitle>
            <CardDescription>
              Sign in to access your patient portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="userId">User ID (Email or Mobile)</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="userId"
                    type="text"
                    placeholder="e.g., user@example.com"
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full text-lg h-12 bg-primary hover:bg-primary/90"
              >
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex justify-center w-full">
              <Button asChild variant="link" className="p-0 h-auto">
                <Link to="/generate-password">Generate/Forgot Password</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
