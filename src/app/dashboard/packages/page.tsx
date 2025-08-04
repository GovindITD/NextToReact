
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, ChevronRight } from 'lucide-react';
import { opdPackages, ipdPackages } from './data';
import { Badge } from '@/components/ui/badge';

const PackageCard = ({ pkg }: { pkg: typeof opdPackages[0] }) => (
    <Link href={`/dashboard/packages/${pkg.id}`}>
        <Card className="hover:shadow-lg hover:border-primary/50 transition-all h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-primary font-headline">{pkg.name}</CardTitle>
                <CardDescription className="line-clamp-2 sm:line-clamp-3">{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end mt-auto pt-4">
                <div className="flex justify-between items-center">
                    <p className="text-lg sm:text-xl font-bold">KES {pkg.totalAmount.toLocaleString()}</p>
                    <div className="flex items-center text-muted-foreground text-sm">
                        Details <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                </div>
            </CardContent>
        </Card>
    </Link>
);


export default function PackagesPage() {
    const [opdSearch, setOpdSearch] = useState('');
    const [ipdSearch, setIpdSearch] = useState('');

    const filteredOpdPackages = opdPackages.filter(p => p.name.toLowerCase().includes(opdSearch.toLowerCase()));
    const filteredIpdPackages = ipdPackages.filter(p => p.name.toLowerCase().includes(ipdSearch.toLowerCase()));


    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold font-headline text-primary">Health Package Information</h1>
                <p className="text-muted-foreground">Explore our OPD and IPD health packages.</p>
            </div>

            <Tabs defaultValue="opd" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="opd">OPD Packages</TabsTrigger>
                    <TabsTrigger value="ipd">IPD Packages</TabsTrigger>
                </TabsList>
                <TabsContent value="opd">
                    <Card>
                        <CardHeader>
                            <CardTitle>Out-Patient Department Packages</CardTitle>
                            <CardDescription>Browse our packages for out-patient services and checkups.</CardDescription>
                            <div className="relative pt-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground mt-2" />
                                <Input 
                                    placeholder="Search by package name..."
                                    value={opdSearch}
                                    onChange={(e) => setOpdSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredOpdPackages.map(pkg => (
                                    <PackageCard key={pkg.id} pkg={pkg} />
                                ))}
                            </div>
                            {filteredOpdPackages.length === 0 && (
                                <p className="text-center text-muted-foreground py-8">No packages found for your search.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="ipd">
                     <Card>
                        <CardHeader>
                            <CardTitle>In-Patient Department Packages</CardTitle>
                            <CardDescription>Browse our packages for in-patient procedures and stays.</CardDescription>
                             <div className="relative pt-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground mt-2" />
                                <Input 
                                    placeholder="Search by package name..."
                                    value={ipdSearch}
                                    onChange={(e) => setIpdSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredIpdPackages.map(pkg => (
                                    <PackageCard key={pkg.id} pkg={pkg} />
                                ))}
                            </div>
                             {filteredIpdPackages.length === 0 && (
                                <p className="text-center text-muted-foreground py-8">No packages found for your search.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
