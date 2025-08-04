
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const centers = [
  {
    name: 'Tenwek',
    address: '123 Health St, Wellness City, 10101',
  },
  {
    name: 'Annex',
    address: '456 Cure Ave, Metropolis, 20202',
  },
  {
    name: 'Ngito',
    address: '789 Life Rd, Suburbia, 30303',
  },
  {
    name: 'Kaboson',
    address: '101 Vitality Blvd, Lakeview, 40404',
  },
];

export default function BookInvestigationCenterSelectionPage() {
  const router = useRouter();
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline text-primary">Book an Investigation</h1>
        <p className="text-muted-foreground">Please select a hospital center to proceed.</p>
      </div>
      <div className="max-w-2xl mx-auto space-y-4">
        {centers.map((center) => (
          <Link href={`/dashboard/investigations?center=${encodeURIComponent(center.name)}`} key={center.name}>
             <Card className="hover:bg-accent/50 hover:shadow-md transition-all">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Building className="h-8 w-8 text-accent" />
                        <div>
                            <p className="font-bold text-lg">{center.name}</p>
                            <p className="text-sm text-muted-foreground">{center.address}</p>
                        </div>
                    </div>
                    <ChevronRight className="h-6 w-6 text-muted-foreground" />
                </CardContent>
             </Card>
          </Link>
        ))}
      </div>
      <div className="text-center">
        <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
    </div>
  );
}
