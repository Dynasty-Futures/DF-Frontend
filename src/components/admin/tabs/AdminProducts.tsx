import { useState } from 'react';
import { Package, Plus, Edit, Power, PowerOff, Tag, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { AdminDataTable, Column } from '../AdminDataTable';
import { AdminStatusBadge, AdminPlanBadge } from '../AdminStatusBadge';
import { mockPlans, mockPromoCodes, type MockPlan, type MockPromoCode } from '@/data/mockAdminData';

export function AdminProducts() {
  const [activeTab, setActiveTab] = useState('plans');
  const [editPlan, setEditPlan] = useState<MockPlan | null>(null);
  const [createPromo, setCreatePromo] = useState(false);
  const [featureToggles, setFeatureToggles] = useState({
    dailyPayouts: true,
    fiveDayPayouts: true,
    standardEval: true,
    advancedEval: true,
    dynastyEval: true,
  });

  const formatCurrency = (value: number | null) => value !== null ? `$${value.toLocaleString()}` : '—';

  const planColumns: Column<MockPlan>[] = [
    { key: 'name', header: 'Plan', sortable: true, render: (item) => <AdminPlanBadge plan={item.name} /> },
    { key: 'accountSize', header: 'Account Size', sortable: true },
    { key: 'price', header: 'Price', sortable: true, render: (item) => `$${item.price}` },
    { key: 'activationFee', header: 'Activation', render: (item) => item.activationFee > 0 ? `$${item.activationFee}` : '—' },
    { key: 'evalReset', header: 'Eval Reset', render: (item) => item.evalReset > 0 ? `$${item.evalReset}` : '—' },
    { key: 'fundedReset', header: 'Funded Reset', render: (item) => `$${item.fundedReset}` },
    { key: 'profitTarget', header: 'Profit Target', render: (item) => formatCurrency(item.profitTarget) },
    { key: 'maxDrawdown', header: 'Drawdown', render: (item) => formatCurrency(item.maxDrawdown) },
    { key: 'dailyLossLimit', header: 'DLL', render: (item) => formatCurrency(item.dailyLossLimit) },
    { key: 'payoutType', header: 'Payout', render: (item) => (
      <Badge variant="outline" className="bg-muted/20">{item.payoutType}</Badge>
    )},
    { key: 'status', header: 'Status', render: (item) => <AdminStatusBadge status={item.status} /> },
    { key: 'actions', header: '', render: (item) => (
      <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => setEditPlan(item)}>
        <Edit className="h-3 w-3 mr-1" /> Edit
      </Button>
    )},
  ];

  const promoColumns: Column<MockPromoCode>[] = [
    { key: 'code', header: 'Code', sortable: true, render: (item) => (
      <span className="font-mono bg-muted/20 px-2 py-1 rounded">{item.code}</span>
    )},
    { key: 'discountType', header: 'Discount', render: (item) => (
      <span>{item.discountType === 'percent' ? `${item.discountValue}%` : `$${item.discountValue}`}</span>
    )},
    { key: 'duration', header: 'Duration', render: (item) => (
      <Badge variant="outline" className="bg-muted/20">{item.duration}</Badge>
    )},
    { key: 'usageLimit', header: 'Usage', render: (item) => `${item.usageCount}/${item.usageLimit || '∞'}` },
    { key: 'eligiblePlans', header: 'Eligible Plans', render: (item) => item.eligiblePlans.join(', ') },
    { key: 'startDate', header: 'Start', sortable: true },
    { key: 'endDate', header: 'End', render: (item) => item.endDate || '—' },
    { key: 'status', header: 'Status', render: (item) => <AdminStatusBadge status={item.status} /> },
    { key: 'actions', header: 'Actions', render: (item) => (
      <Button size="sm" variant="ghost" className="h-7 px-2">
        {item.status === 'Active' ? <PowerOff className="h-3 w-3" /> : <Power className="h-3 w-3" />}
      </Button>
    )},
  ];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/20 border border-border/30">
          <TabsTrigger value="plans">Plans & Rules</TabsTrigger>
          <TabsTrigger value="promos">Promotions</TabsTrigger>
          <TabsTrigger value="toggles">Feature Toggles</TabsTrigger>
        </TabsList>

        {/* Plans & Rules */}
        <TabsContent value="plans" className="mt-4">
          <AdminDataTable
            data={mockPlans}
            columns={planColumns}
            keyField="id"
            searchable
            searchPlaceholder="Search plans..."
          />
        </TabsContent>

        {/* Promotions */}
        <TabsContent value="promos" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setCreatePromo(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Promo Code
            </Button>
          </div>
          <AdminDataTable
            data={mockPromoCodes}
            columns={promoColumns}
            keyField="id"
            searchable
            searchPlaceholder="Search promo codes..."
          />
        </TabsContent>

        {/* Feature Toggles */}
        <TabsContent value="toggles" className="mt-4">
          <div className="rounded-2xl border border-border/30 bg-gradient-card p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ToggleLeft className="h-5 w-5" />
              Global Feature Toggles
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border/30">
                <div>
                  <p className="font-medium">Daily Payouts</p>
                  <p className="text-sm text-muted-foreground">Allow traders to request daily payouts</p>
                </div>
                <Switch
                  checked={featureToggles.dailyPayouts}
                  onCheckedChange={(checked) => setFeatureToggles({ ...featureToggles, dailyPayouts: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border/30">
                <div>
                  <p className="font-medium">5-Day Payouts</p>
                  <p className="text-sm text-muted-foreground">Allow traders to request 5-day payouts</p>
                </div>
                <Switch
                  checked={featureToggles.fiveDayPayouts}
                  onCheckedChange={(checked) => setFeatureToggles({ ...featureToggles, fiveDayPayouts: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border/30">
                <div>
                  <p className="font-medium">Standard Plan Evaluations</p>
                  <p className="text-sm text-muted-foreground">Accept new Standard plan signups</p>
                </div>
                <Switch
                  checked={featureToggles.standardEval}
                  onCheckedChange={(checked) => setFeatureToggles({ ...featureToggles, standardEval: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border/30">
                <div>
                  <p className="font-medium">Advanced Plan Evaluations</p>
                  <p className="text-sm text-muted-foreground">Accept new Advanced plan signups</p>
                </div>
                <Switch
                  checked={featureToggles.advancedEval}
                  onCheckedChange={(checked) => setFeatureToggles({ ...featureToggles, advancedEval: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border/30">
                <div>
                  <p className="font-medium">Dynasty Plan Evaluations</p>
                  <p className="text-sm text-muted-foreground">Accept new Dynasty plan signups</p>
                </div>
                <Switch
                  checked={featureToggles.dynastyEval}
                  onCheckedChange={(checked) => setFeatureToggles({ ...featureToggles, dynastyEval: checked })}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Plan Sheet */}
      <Sheet open={!!editPlan} onOpenChange={() => setEditPlan(null)}>
        <SheetContent className="w-full sm:max-w-md">
          {editPlan && (
            <>
              <SheetHeader>
                <SheetTitle>Edit {editPlan.name} Plan</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Price ($)</label>
                    <Input type="number" defaultValue={editPlan.price} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Activation Fee ($)</label>
                    <Input type="number" defaultValue={editPlan.activationFee} className="mt-1" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Eval Reset Fee ($)</label>
                    <Input type="number" defaultValue={editPlan.evalReset} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Funded Reset Fee ($)</label>
                    <Input type="number" defaultValue={editPlan.fundedReset} className="mt-1" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Profit Target ($)</label>
                  <Input type="number" defaultValue={editPlan.profitTarget ?? ''} className="mt-1" placeholder="N/A for Dynasty" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Max Drawdown ($)</label>
                    <Input type="number" defaultValue={editPlan.maxDrawdown} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Daily Loss Limit ($)</label>
                    <Input type="number" defaultValue={editPlan.dailyLossLimit} className="mt-1" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Status</label>
                  <Select defaultValue={editPlan.status}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" onClick={() => setEditPlan(null)} className="flex-1">Cancel</Button>
                  <Button onClick={() => setEditPlan(null)} className="flex-1">Save Changes</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
