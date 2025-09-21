import ShoppingCartHeader from "../ui/ShoppingCartHeader";
import ShopingCartGrid from "../ui/ShopingCartGrid";
import {
  useDeleteCartItem,
  useDeleteCartItems,
  useGetCartInfo,
  useUpdateCartItem,
} from "../hooks";
import { useEffect, useState } from "react";
import type { CartItem } from "../types";

const ShoppingCartPage = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  const { data: cartInfo, isSuccess } = useGetCartInfo();
  const { mutate: clearCart } = useDeleteCartItems();
  const { mutate: removeCartItem } = useDeleteCartItem();
  const { mutate: updateCartItem } = useUpdateCartItem();

  const clearState = () => {
    setCartItems([]);
    setIsEmpty(true);
    setSubTotal(0);
    setItemCount(0);
  };

  useEffect(() => {
    if (isSuccess && cartInfo.success && cartInfo.data) {
      const items = cartInfo.data.cartItems || [];
      setCartItems(items);
      setIsEmpty(items.length === 0);
      setSubTotal(cartInfo.data.total || 0);
      setItemCount(cartInfo.data.itemCount || 0);
    } else {
      clearState();
    }
  }, [isSuccess, cartInfo]);

  const handleClearCart = () => {
    clearState();
    clearCart();
  };

  const handleRemoveItem = (productId: number) => {
    removeCartItem(productId);
  };

  const handleDecrease = (productId: number) => {
    const cartItem = cartItems.find((item) => item.productId === productId);
    if (!cartItem) return;
    updateCartItem({
      productId: cartItem.productId,
      quantity: cartItem.quantity - 1,
    });
  };

  const handleIncrease = (productId: number) => {
    const cartItem = cartItems.find((item) => item.productId === productId);
    if (!cartItem) return;
    updateCartItem({
      productId: cartItem.productId,
      quantity: cartItem.quantity + 1,
    });
  };

  const handleInput = (value: number, productId: number) => {
    const cartItem = cartItems.find((item) => item.productId === productId);
    if (!cartItem) return;
    updateCartItem({
      productId: cartItem.productId,
      quantity: value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 pt-8 pb-24">
        <ShoppingCartHeader isEmpty={isEmpty} displayCount={itemCount} />
        <ShopingCartGrid
          isEmpty={isEmpty}
          cartItems={cartItems}
          cartTotal={subTotal}
          onClearCart={handleClearCart}
          onRemoveItem={handleRemoveItem}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
          onInput={handleInput}
        />
      </div>
    </div>
  );
};

export default ShoppingCartPage;
