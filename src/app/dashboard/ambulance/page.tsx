
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Ambulance, Phone, MapPin, LocateFixed, Clock, User, AlertTriangle, LifeBuoy } from 'lucide-react';

const ambulanceTypes = [
  { id: 'bls', name: 'Basic Life Support (BLS)' },
  { id: 'als', name: 'Advanced Life Support (ALS)' },
  { id: 'icu', name: 'ICU Ambulance' },
  { id: 'mortuary', name: 'Mortuary Van' },
];

const ambulanceCharges = [
    { type: 'Basic Life Support (BLS)', baseFare: 'KES 1500', perKm: 'KES 50' },
    { type: 'Advanced Life Support (ALS)', baseFare: 'KES 3000', perKm: 'KES 80' },
    { type: 'ICU Ambulance', baseFare: 'KES 5000', perKm: 'KES 120' },
    { type: 'Mortuary Van', baseFare: 'KES 2000', perKm: 'KES 60' },
];

const bookingHistory = [
    { id: 'AMB123', date: '2024-07-28', type: 'Advanced Life Support (ALS)', from: 'Kinoo, Nairobi', to: 'Medicare Hospital, Nairobi', status: 'Completed' },
    { id: 'AMB124', date: '2024-07-30', type: 'Basic Life Support (BLS)', from: 'Westlands, Nairobi', to: 'Medicare Annex', status: 'In Progress' },
    { id: 'AMB125', date: '2024-07-25', type: 'ICU Ambulance', from: 'Thika Road, Nairobi', to: 'Medicare Hospital, Nairobi', status: 'Cancelled' },
];

export default function AmbulancePage() {
    const router = useRouter();
    const [requestType, setRequestType] = useState('now');

    const handleRequestSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would handle the form submission, API calls, etc.
        // For this demo, we'll just navigate to the tracking page for a mock booking.
        router.push('/dashboard/ambulance/track/AMB124');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <Ambulance className="h-12 w-12 mx-auto text-destructive" />
                <h1 className="text-3xl font-bold font-headline text-primary mt-2">Ambulance Services</h1>
                <p className="text-muted-foreground">Request, track, and manage your emergency transport.</p>
            </div>
            
            <Card className="bg-destructive/10 border-destructive/20">
                <CardContent className="p-4 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                    <AlertTriangle className="h-8 w-8 text-destructive flex-shrink-0" />
                    <div className="flex-grow">
                        <p className="font-bold text-destructive">In case of a critical emergency, please call us directly.</p>
                        <p className="text-sm text-destructive/80">Our team is available 24/7 to assist you immediately.</p>
                    </div>
                    <Button size="lg" variant="destructive" asChild className="w-full md:w-auto mt-2 md:mt-0">
                        <a href="tel:+1-800-123-4567">
                            <Phone className="mr-2 h-5 w-5" /> Call Emergency Helpline
                        </a>
                    </Button>
                </CardContent>
            </Card>

            <Tabs defaultValue="request" className="w-full">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-10">
                    <TabsTrigger value="request">Request Ambulance</TabsTrigger>
                    <TabsTrigger value="history">Booking History</TabsTrigger>
                    <TabsTrigger value="charges">Ambulance Charges</TabsTrigger>
                </TabsList>
                <TabsContent value="request">
                    <Card>
                        <CardHeader>
                            <CardTitle>New Ambulance Request</CardTitle>
                            <CardDescription>Fill out the form below to request an ambulance. All fields are required.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleRequestSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-base">Pickup Location</Label>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <div className="relative flex-grow">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                            <Input required className="pl-10" placeholder="Enter street, landmark, or area" />
                                        </div>
                                        <Button type="button" variant="outline" className="w-full sm:w-auto">
                                            <LocateFixed className="mr-2 h-4 w-4" /> Use GPS
                                        </Button>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-base">Ambulance Type</Label>
                                    <Select required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select ambulance type..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ambulanceTypes.map(type => (
                                                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="condition" className="text-base">Patient's Condition (Briefly)</Label>
                                    <Textarea id="condition" placeholder="e.g., Chest pain, accident, difficulty breathing..." required />
                                </div>
                                
                                <div className="space-y-3">
                                    <Label className="text-base">Schedule Request</Label>
                                    <RadioGroup defaultValue="now" value={requestType} onValueChange={setRequestType}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="now" id="now" />
                                            <Label htmlFor="now">Request Immediately</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="later" id="later" />
                                            <Label htmlFor="later">Schedule for Later</Label>
                                        </div>
                                    </RadioGroup>
                                    {requestType === 'later' && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-0 sm:pl-6 pt-2">
                                            <Input type="date" required />
                                            <Input type="time" required />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contact" className="text-base">Contact Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input id="contact" type="tel" placeholder="e.g. 0712345678" required className="pl-10" />
                                    </div>
                                </div>
                                
                                <Button type="submit" size="lg" className="w-full">
                                    <Ambulance className="mr-2 h-5 w-5" /> Submit Request
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="history">
                     <Card>
                        <CardHeader>
                            <CardTitle>Your Ambulance Requests</CardTitle>
                            <CardDescription>Here is a list of your past and ongoing ambulance bookings.</CardDescription>
                        </CardHeader>
                        <CardContent className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Booking ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="hidden sm:table-cell">Type</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bookingHistory.map(booking => (
                                        <TableRow key={booking.id}>
                                            <TableCell className="font-medium">{booking.id}</TableCell>
                                            <TableCell>{booking.date}</TableCell>
                                            <TableCell className="hidden sm:table-cell">{booking.type}</TableCell>
                                            <TableCell>
                                                <Badge variant={booking.status === 'Completed' ? 'default' : booking.status === 'Cancelled' ? 'destructive' : 'secondary'}>
                                                    {booking.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {booking.status === 'In Progress' ? (
                                                     <Button asChild variant="default" size="sm">
                                                        <Link href={`/dashboard/ambulance/track/${booking.id}`}>Track Live</Link>
                                                    </Button>
                                                ) : (
                                                     <Button variant="outline" size="sm">Details</Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="charges">
                     <Card>
                        <CardHeader>
                            <CardTitle>Standard Ambulance Charges</CardTitle>
                            <CardDescription>Estimated charges for our ambulance services. Actual cost may vary based on traffic and other factors.</CardDescription>
                        </CardHeader>
                        <CardContent className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Ambulance Type</TableHead>
                                        <TableHead>Base Fare (First 5km)</TableHead>
                                        <TableHead>Price per Addl. km</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {ambulanceCharges.map(charge => (
                                        <TableRow key={charge.type}>
                                            <TableCell className="font-medium">{charge.type}</TableCell>
                                            <TableCell>{charge.baseFare}</TableCell>
                                            <TableCell>{charge.perKm}</TableCell>
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
