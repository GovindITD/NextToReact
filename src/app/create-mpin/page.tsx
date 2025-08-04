"use client";
import React from "react";
import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "../../components/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/components/ui/card";
import { Input } from "../../components/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function CreateMpinPage() {
  const navigate = useNavigate();
  const [mpin, setMpin] = useState(new Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    setMpin([...mpin.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move focus to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !mpin[index] && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]!.focus();
      }
    }
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredMpin = mpin.join("");
    if (enteredMpin.length === 4) {
      // In a real app, you would save the MPIN here.
      console.log(`MPIN created: ${enteredMpin}`);
      navigate("/dashboard");
    } else {
      alert("Please enter a 4-digit MPIN.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-sm">
        <Card className="shadow-2xl border-none">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold font-headline text-primary">
              Create new MPIN
            </CardTitle>
            <CardDescription>
              To login quicker on the Tenwek App
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleConfirm} className="space-y-8">
              <div className="flex justify-center gap-2 sm:gap-4">
                {mpin.map((data, index) => {
                  return (
                    <Input
                      key={index}
                      type="password"
                      maxLength={1}
                      className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-bold"
                      value={data}
                      onChange={(e) =>
                        handleChange(e.target as HTMLInputElement, index)
                      }
                      onFocus={(e) => e.target.select()}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      // ref={(el) => (inputRefs.current[index] = el)}
                    />
                  );
                })}
              </div>
              <Button
                type="submit"
                className="w-full text-lg h-12 bg-primary hover:bg-primary/90"
              >
                Confirm
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
