import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, FileText, TrendingUp, Users, CreditCard, Server } from "lucide-react";
import { useState } from "react";

export default function AdminReports() {
  const [period, setPeriod] = useState("month");

  const reports = [
    {
      title: "Revenue Report",
      description: "Total revenue, transactions, and payment breakdown",
      icon: TrendingUp,
      type: "revenue",
    },
    {
      title: "User Report",
      description: "User registrations, activity, and demographics",
      icon: Users,
      type: "users",
    },
    {
      title: "Orders Report",
      description: "Order volume, status distribution, and trends",
      icon: FileText,
      type: "orders",
    },
    {
      title: "VPS Usage Report",
      description: "Active instances, resource utilization, and expiries",
      icon: Server,
      type: "vps",
    },
    {
      title: "Payment Report",
      description: "Transaction success rates, payment methods, and failures",
      icon: CreditCard,
      type: "payments",
    },
  ];

  const handleExport = (type: string) => {
    // TODO: Implement report export
    console.log(`Exporting ${type} report for period: ${period}`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
            <p className="text-muted-foreground">Generate and export business reports</p>
          </div>

          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 90 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <Card key={report.type}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <report.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <CardTitle className="mt-4">{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleExport(report.type)}
                  >
                    <Download className="mr-2 h-4 w-4" /> CSV
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleExport(report.type)}
                  >
                    <Download className="mr-2 h-4 w-4" /> PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
