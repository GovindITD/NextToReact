
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileDown, Eye, Pill, Stethoscope, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const consultations = [
  {
    date: '2024-07-15',
    doctor: 'Dr. John Smith',
    department: 'Cardiology',
    diagnosis: 'Hypertension',
    prescription: [
        { name: 'Lisinopril 10mg', dosage: '1 tablet daily' },
        { name: 'Amlodipine 5mg', dosage: '1 tablet daily' }
    ],
    followUp: 'Follow up in 3 months with a blood pressure diary.'
  },
  {
    date: '2024-06-22',
    doctor: 'Dr. Michael Brown',
    department: 'Orthopedics',
    diagnosis: 'Knee Sprain',
    prescription: [
        { name: 'Ibuprofen 400mg', dosage: 'As needed for pain' },
        { name: 'Physiotherapy', dosage: '3 sessions per week for 2 weeks' }
    ],
    followUp: 'Follow up in 2 weeks or if pain worsens.'
  },
];


export default function ConsultationHistoryPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Stethoscope className="h-12 w-12 mx-auto text-primary" />
        <h1 className="text-3xl font-bold font-headline text-primary mt-2">
          Consultation History
        </h1>
        <p className="text-muted-foreground">
          A record of your past consultations with our doctors.
        </p>
      </div>

        <Card>
            <CardHeader>
                <CardTitle>Your Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {consultations.map((consult, index) => (
                    <Card key={index} className="shadow-md">
                        <CardHeader>
                           <div className="flex justify-between items-start">
                             <div>
                                <CardTitle className="text-xl text-primary">{consult.doctor}</CardTitle>
                                <CardDescription>{consult.department} | {consult.date}</CardDescription>
                             </div>
                             <Button variant="outline" size="sm"><Eye className="mr-2 h-4 w-4" /> View Prescription</Button>
                           </div>
                        </CardHeader>
                        <CardContent>
                            <h4 className="font-semibold">Diagnosis: <span className="font-normal">{consult.diagnosis}</span></h4>
                             <div className="mt-4">
                                <h5 className="font-semibold">Medications:</h5>
                                <ul className="list-disc pl-5 text-muted-foreground">
                                    {consult.prescription.map((p, i) => <li key={i}>{p.name} - {p.dosage}</li>)}
                                </ul>
                            </div>
                            <div className="mt-4">
                                <h5 className="font-semibold">Follow-up Instructions:</h5>
                                <p className="text-muted-foreground">{consult.followUp}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
              </div>
            </CardContent>
        </Card>
        <div className="text-center">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Clinical Records
          </Button>
        </div>
    </div>
  );
}
