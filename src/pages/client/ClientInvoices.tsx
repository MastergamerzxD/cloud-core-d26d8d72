import { useEffect, useState } from "react";
import ClientLayout from "@/components/client/ClientLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Receipt, Loader2, Download, CreditCard, Eye } from "lucide-react";
import { format } from "date-fns";

interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  tax_amount: number | null;
  total_amount: number;
  status: string;
  due_date: string;
  paid_date: string | null;
  created_at: string;
}

export default function ClientInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInvoices(data || []);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "secondary",
      paid: "default",
      overdue: "destructive",
      cancelled: "outline",
      refunded: "outline",
    };
    return colors[status] || "secondary";
  };

  if (isLoading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Invoices</h2>
          <p className="text-muted-foreground">View and pay your invoices</p>
        </div>

        {invoices.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Receipt className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Invoices</h3>
              <p className="text-muted-foreground">
                You don't have any invoices yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <Card key={invoice.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Receipt className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-mono font-medium">{invoice.invoice_number}</p>
                        <p className="text-sm text-muted-foreground">
                          Due: {format(new Date(invoice.due_date), "MMMM dd, yyyy")}
                        </p>
                        {invoice.paid_date && (
                          <p className="text-sm text-green-600">
                            Paid: {format(new Date(invoice.paid_date), "MMMM dd, yyyy")}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          Subtotal: {formatCurrency(invoice.amount)}
                        </p>
                        {invoice.tax_amount && invoice.tax_amount > 0 && (
                          <p className="text-sm text-muted-foreground">
                            Tax: {formatCurrency(invoice.tax_amount)}
                          </p>
                        )}
                        <p className="text-lg font-bold">{formatCurrency(invoice.total_amount)}</p>
                        <Badge variant={getStatusColor(invoice.status) as any}>
                          {invoice.status}
                        </Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" /> PDF
                        </Button>
                        {(invoice.status === "pending" || invoice.status === "overdue") && (
                          <Button size="sm">
                            <CreditCard className="h-4 w-4 mr-1" /> Pay
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
