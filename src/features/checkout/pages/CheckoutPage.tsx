import ShippingFormCard, {
  type ShippingFormValues,
} from "../ui/ShippingFormCard";
import PaymentCard from "../ui/PaymentCard";
import ItemsReview from "../ui/ItemsReview";
import OrderSummary from "../ui/OrderSummary";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetCartInfo } from "@/features/shopping-cart/hooks";
import { useState } from "react";
import { usePostOrder } from "@/features/orders/hooks";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { data, isSuccess } = useGetCartInfo();
  const { mutate: postOrder } = usePostOrder();

  const [shipForm, setShipForm] = useState<ShippingFormValues>({
    shippingAddress: "",
    phoneNumber: "",
    notes: "",
  });

  const totals = {
    itemCount: data?.data?.itemCount || 0,
    subTotal: data?.data?.total || 0,
  };

  const handlePlaceOrder = () => {
    postOrder({
      cartItems: data?.data?.cartItems || [],
      notes: shipForm.notes || "",
      phoneNumber: shipForm.phoneNumber,
      shippingAddress: shipForm.shippingAddress,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-6">
            <ShippingFormCard onChange={setShipForm} />
            <PaymentCard />
            {isSuccess && data?.data && (
              <ItemsReview items={data.data.cartItems} />
            )}
          </div>

          <div className="space-y-6">
            <OrderSummary totals={totals} onPlaceOrder={handlePlaceOrder} />
          </div>
        </div>
      </div>
    </div>
  );
}
