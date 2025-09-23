import AddressCard from "../ui/AddressCard";
import ContactCard from "../ui/ContactCard";
import PaymentCard from "../ui/PaymentCard";
import ItemsReview from "../ui/ItemsReview";
import OrderSummary from "../ui/OrderSummary";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header simple */}
      <div className="bg-background/80 sticky top-0 z-30 border-b">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Proceder a la compra</h1>
          <Button
            variant="secondary"
            className="gap-2"
            onClick={() => navigate("/shopping-cart")}
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al carrito
          </Button>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto px-8 pt-8 pb-16">
        {/* 8-point grid: gap-8, p-6 en cards, space-y-4 internamente */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-6">
            <AddressCard />
            <ContactCard />
            <PaymentCard />
            <ItemsReview />
          </div>

          <div className="space-y-6">
            <OrderSummary onPlaceOrder={() => navigate("/orders/success")} />
          </div>
        </div>
      </div>
    </div>
  );
}
