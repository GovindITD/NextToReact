
'use client';

import { useParams, useRouter } from 'next/navigation';
import { opdPackages, ipdPackages } from '../data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Stethoscope, Beaker, Pill, X, FileText, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const departmentIcons = {
    'Consultation': <Stethoscope className="h-5 w-5 mr-2" />,
    'Lab': <Beaker className="h-5 w-5 mr-2" />,
    'Radiology': <X className="h-5 w-5 mr-2" />,
    'Medicine': <Pill className="h-5 w-5 mr-2" />,
    'Other': <FileText className="h-5 w-5 mr-2" />,
} as const;


export default function PackageDetailPage() {
    const params = useParams();
    const router = useRouter();
    const packageId = params.id as string;
    
    const allPackages = [...opdPackages, ...ipdPackages];
    const pkg = allPackages.find(p => p.id === packageId);

    if (!pkg) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold text-destructive">Package not found</h1>
                <p className="text-muted-foreground">The package you are looking for does not exist.</p>
            </div>
        );
    }

    const groupedItems = pkg.items.reduce((acc, item) => {
        const { department } = item;
        if (!acc[department]) {
            acc[department] = [];
        }
        acc[department].push(item);
        return acc;
    }, {} as Record<string, typeof pkg.items>);


    return (
        <div className="max-w-4xl mx-auto space-y-8">
             <Card className="overflow-hidden shadow-lg">
                <CardHeader className="bg-primary/10">
                    <div className="flex justify-between items-start">
                        <div>
                            <Badge variant="secondary" className="mb-2">{pkg.type}</Badge>
                            <CardTitle className="text-3xl font-headline text-primary">{pkg.name}</CardTitle>
                            <CardDescription>{pkg.description}</CardDescription>
                        </div>
                        <div className="text-right">
                             <p className="text-3xl font-bold text-primary">KES {pkg.totalAmount.toLocaleString()}</p>
                             <p className="text-sm text-muted-foreground">Total Package Cost</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 font-headline">Package Inclusions</h3>
                    <div className="space-y-6">
                       {Object.entries(groupedItems).map(([department, items]) => (
                           <div key={department}>
                                <div className="flex items-center text-accent-foreground mb-3">
                                    {departmentIcons[department as keyof typeof departmentIcons] || departmentIcons['Other']}
                                    <h4 className="text-lg font-semibold">{department}</h4>
                                </div>
                                <ul className="space-y-2 pl-7 list-disc list-inside">
                                    {items.map((item, index) => (
                                        <li key={index} className="text-muted-foreground">
                                            {item.name}
                                        </li>
                                    ))}
                                </ul>
                           </div>
                       ))}
                    </div>
                </CardContent>
             </Card>
              <div className="text-center">
                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
            </div>
        </div>
    );
}
