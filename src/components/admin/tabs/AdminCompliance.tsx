import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, DollarSign, AlertTriangle, Download } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function AdminCompliance() {
  const [activeTab, setActiveTab] = useState('queue');

  const reviewItems = [
    { type: 'KYC Review Needed', count: 5, icon: Users },
    { type: 'Tax Form Missing', count: 8, icon: FileText },
    { type: 'Payouts on Hold', count: 3, icon: DollarSign },
    { type: 'Correlation Flagged', count: 2, icon: AlertTriangle },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="bg-muted/20 border border-border/30">
        <TabsTrigger value="queue">Review Queue</TabsTrigger>
        <TabsTrigger value="reporting">Reporting</TabsTrigger>
      </TabsList>

      <TabsContent value="queue" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviewItems.map((item) => (
            <Card key={item.type} className="border-border/30 bg-gradient-card">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <item.icon className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold text-foreground">{item.count}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.type}</p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1">Open Case</Button>
                  <Button size="sm" variant="outline">Assign</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="reporting" className="mt-4 space-y-6">
        {/* Chart placeholders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border/30 bg-gradient-card">
            <CardHeader><CardTitle className="text-base">KYC Completion Rate</CardTitle></CardHeader>
            <CardContent><Skeleton className="h-48 w-full" /></CardContent>
          </Card>
          <Card className="border-border/30 bg-gradient-card">
            <CardHeader><CardTitle className="text-base">Tax Form Completion Rate</CardTitle></CardHeader>
            <CardContent><Skeleton className="h-48 w-full" /></CardContent>
          </Card>
          <Card className="border-border/30 bg-gradient-card lg:col-span-2">
            <CardHeader><CardTitle className="text-base">Payout Volume by Month</CardTitle></CardHeader>
            <CardContent><Skeleton className="h-48 w-full" /></CardContent>
          </Card>
        </div>

        {/* Export buttons */}
        <div className="flex flex-wrap gap-3">
          <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export Payout Ledger</Button>
          <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export 1099 List (US)</Button>
          <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export Non-US List</Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
