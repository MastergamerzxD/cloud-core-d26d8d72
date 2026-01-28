import { useState } from "react";
import ClientLayout from "@/components/client/ClientLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Gift, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function ClientRedeem() {
  const { user } = useAuth();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [redeemed, setRedeemed] = useState<{ amount: number } | null>(null);

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      // Check if gift card exists and is valid
      const { data: giftCard, error: fetchError } = await supabase
        .from("gift_cards")
        .select("*")
        .eq("code", code.toUpperCase())
        .eq("status", "active")
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (!giftCard) {
        toast.error("Invalid or expired gift card code");
        return;
      }

      if (giftCard.expires_at && new Date(giftCard.expires_at) < new Date()) {
        toast.error("This gift card has expired");
        return;
      }

      // Get user's wallet
      const { data: wallet, error: walletError } = await supabase
        .from("user_wallets")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (walletError) throw walletError;

      if (!wallet) {
        // Create wallet if doesn't exist
        const { data: newWallet, error: createError } = await supabase
          .from("user_wallets")
          .insert({ user_id: user.id })
          .select()
          .single();

        if (createError) throw createError;
      }

      const targetWallet = wallet || (await supabase
        .from("user_wallets")
        .select("*")
        .eq("user_id", user.id)
        .single()).data;

      const newBalance = (targetWallet?.balance || 0) + giftCard.current_balance;

      // Update wallet balance
      const { error: updateWalletError } = await supabase
        .from("user_wallets")
        .update({ balance: newBalance })
        .eq("user_id", user.id);

      if (updateWalletError) throw updateWalletError;

      // Record wallet transaction
      const { error: txError } = await supabase
        .from("wallet_transactions")
        .insert({
          wallet_id: targetWallet?.id,
          user_id: user.id,
          amount: giftCard.current_balance,
          type: "credit",
          source: "gift_card",
          reference_id: giftCard.id,
          description: `Redeemed gift card ${giftCard.code}`,
          balance_after: newBalance,
        });

      if (txError) throw txError;

      // Mark gift card as redeemed
      const { error: redeemError } = await supabase
        .from("gift_cards")
        .update({
          status: "redeemed",
          redeemed_by: user.id,
          redeemed_at: new Date().toISOString(),
          current_balance: 0,
        })
        .eq("id", giftCard.id);

      if (redeemError) throw redeemError;

      setRedeemed({ amount: giftCard.current_balance });
      toast.success("Gift card redeemed successfully!");
      setCode("");
    } catch (error: any) {
      console.error("Error redeeming gift card:", error);
      toast.error(error.message || "Failed to redeem gift card");
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

  return (
    <ClientLayout>
      <div className="max-w-xl mx-auto space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Redeem Gift Card</h2>
          <p className="text-muted-foreground">
            Enter your gift card code to add funds to your wallet
          </p>
        </div>

        {redeemed ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gift Card Redeemed!</h3>
              <p className="text-2xl font-bold text-primary mb-2">
                {formatCurrency(redeemed.amount)}
              </p>
              <p className="text-muted-foreground mb-6">
                has been added to your wallet
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => setRedeemed(null)}>
                  Redeem Another
                </Button>
                <Button variant="outline" asChild>
                  <a href="/dashboard/wallet">View Wallet</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Enter Gift Card Code</CardTitle>
                  <CardDescription>
                    The code is usually in format GC-XXXX-XXXX-XXXX
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRedeem} className="space-y-4">
                <div className="space-y-2">
                  <Label>Gift Card Code</Label>
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="GC-XXXX-XXXX-XXXX"
                    className="text-center font-mono text-lg uppercase"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading || !code}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Gift className="mr-2 h-4 w-4" />
                  )}
                  Redeem Gift Card
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </ClientLayout>
  );
}
