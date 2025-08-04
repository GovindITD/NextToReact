
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { allUsers } from '@/lib/users';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CheckCircle, ChevronsUpDown, Calendar as CalendarIcon, Video } from 'lucide-react';


const upcomingTeleconsultations = [
  {
    doctor: "Dr. Evelyn Reed",
    specialty: "Psychiatrist",
    date: "2024-09-16",
    time: "11:00 AM",
    status: "Confirmed",
    center: "Telemedicine",
  },
  {
    doctor: "Dr. Ben Carter",
    specialty: "General Physician",
    date: "2024-09-22",
    time: "03:00 PM",
    status: "Confirmed",
    center: "Telemedicine",
  },
];

const pastTeleconsultations = [
  {
    doctor: "Dr. Olivia Chen",
    specialty: "Nutritionist",
    date: "2024-07-18",
    time: "02:00 PM",
    center: "Telemedicine",
    status: "Completed",
  },
];

const doctors = [
    { value: "dr. evelyn reed", label: "Dr. Evelyn Reed", specialty: "Psychiatrist" },
    { value: "dr. ben carter", label: "Dr. Ben Carter", specialty: "General Physician" },
    { value: "dr. olivia chen", label: "Dr. Olivia Chen", specialty: "Nutritionist" },
];

const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM",
];

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    Confirmed: "default",
    Pending: "secondary",
    Completed: "outline",
    Cancelled: "destructive",
  };
  

export default function TeleconsultationsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const center = searchParams.get('center');
    const defaultTab = center ? "book" : "upcoming";

    const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [selectedProfile, setSelectedProfile] = useState<any | null>(allUsers[0]);
    const [bookingStep, setBookingStep] = useState('selectDoctor');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [doctorComboboxOpen, setDoctorComboboxOpen] = useState(false);

    const handleBook = () => {
        router.push('/dashboard/teleconsultation/payment');
    }

  
    const renderBookingContent = () => {
        if (showConfirmation) {
            const doctor = doctors.find(d => d.value === selectedDoctor);
            return (
                <div className="p-4 sm:p-8">
                    <h3 className="text-2xl font-bold font-headline text-primary mb-4 text-center">Confirm Teleconsultation</h3>
                    <Card className="max-w-md mx-auto">
                        <CardHeader>
                            <CardTitle>Consultation Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p><strong>Patient:</strong> {selectedProfile?.name}</p>
                            <p><strong>Center:</strong> {decodeURIComponent(center!)} (Telemedicine)</p>
                            <p><strong>Doctor:</strong> {doctor?.label} ({doctor?.specialty})</p>
                            <p><strong>Date:</strong> {selectedDate?.toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {selectedSlot}</p>
                        </CardContent>
                    </Card>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                        <Button variant="outline" onClick={() => setShowConfirmation(false)} className="w-full sm:w-auto">Back</Button>
                        <Button onClick={handleBook} className="w-full sm:w-auto">Proceed to Payment</Button>
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-6 p-4">
                {/* Step 1: Select Doctor */}
                <div>
                    <Label className="text-lg font-semibold">1. Select a Doctor</Label>
                    <Popover open={doctorComboboxOpen} onOpenChange={setDoctorComboboxOpen}>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={doctorComboboxOpen}
                            className="w-full justify-between"
                            >
                            {selectedDoctor
                                ? doctors.find((doctor) => doctor.value === selectedDoctor)?.label
                                : "Select doctor..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                            <Command>
                                <CommandInput placeholder="Search doctor..." />
                                <CommandEmpty>No doctor found.</CommandEmpty>
                                <CommandGroup>
                                    {doctors.map((doctor) => (
                                    <CommandItem
                                        key={doctor.value}
                                        value={doctor.value}
                                        onSelect={(currentValue) => {
                                            setSelectedDoctor(currentValue === selectedDoctor ? null : currentValue);
                                            setDoctorComboboxOpen(false);
                                            setBookingStep('selectDate');
                                        }}
                                    >
                                        <CheckCircle
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedDoctor === doctor.value ? "opacity-100" : "opacity-0"
                                        )}
                                        />
                                        {doctor.label}
                                    </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Step 2: Select Date */}
                {bookingStep !== 'selectDoctor' && (
                     <div>
                        <Label className="text-lg font-semibold">2. Select a Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !selectedDate && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={(date) => { setSelectedDate(date); if(date) setBookingStep('selectSlot'); }}
                                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                )}

                {/* Step 3: Select Time Slot */}
                {bookingStep !== 'selectDoctor' && bookingStep !== 'selectDate' && selectedDate && (
                    <div>
                        <Label className="text-lg font-semibold">3. Select a Time Slot</Label>
                        <Select onValueChange={(value) => { setSelectedSlot(value); setBookingStep('confirm'); }} value={selectedSlot || ''}>
                            <SelectTrigger>
                                <SelectValue placeholder="-- Select a Time Slot --" />
                            </SelectTrigger>
                            <SelectContent>
                                {timeSlots.map(slot => (
                                    <SelectItem key={slot} value={slot}>
                                        {slot}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
                
                 {bookingStep === 'confirm' && selectedSlot && selectedProfile && (
                    <div className="flex justify-end pt-4">
                        <Button onClick={() => setShowConfirmation(true)} size="lg">Confirm Teleconsultation</Button>
                    </div>
                 )}
            </div>
        );
    }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline text-primary">
          Teleconsultation
        </h1>
        <p className="text-muted-foreground">
          Manage your upcoming and past online consultations.
        </p>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-10">
          <TabsTrigger value="book">Book New</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="book">
          <Card>
            <CardHeader>
              <CardTitle>Book a New Teleconsultation</CardTitle>
              <CardDescription>
                {center ? `Finding a doctor for an online consultation. Your physical location is ${decodeURIComponent(center)}.` : 'Please select a hospital center to book a teleconsultation.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {center ? (
                <>
                 <div className="flex justify-end mb-4">
                    <Button asChild variant="outline">
                        <Link href="/dashboard/teleconsultation/book">Change Center</Link>
                    </Button>
                </div>
                {renderBookingContent()}
                </>
              ) : (
                <div className="text-center p-8">
                    <p className="mb-4 text-muted-foreground">You need to select a hospital center before you can book a teleconsultation.</p>
                    <Button asChild>
                        <Link href="/dashboard/teleconsultation/book">Select a Center</Link>
                    </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Teleconsultations</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingTeleconsultations.map((appt, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{appt.doctor}</div>
                        <div className="text-sm text-muted-foreground">{appt.specialty}</div>
                      </TableCell>
                      <TableCell>
                        {new Date(appt.date).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'})} at {appt.time}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariantMap[appt.status]}>{appt.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="default" size="sm"><Video className="mr-0 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Join Call</span></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle>Past Teleconsultations</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastTeleconsultations.map((appt, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{appt.doctor}</div>
                        <div className="text-sm text-muted-foreground">{appt.specialty}</div>
                      </TableCell>
                      <TableCell>
                      {new Date(appt.date).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'})} at {appt.time}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={statusVariantMap[appt.status]}>{appt.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
