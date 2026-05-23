import { Outlet } from "react-router-dom";
import AudioPlayer from "./components/audio/AudioPlayer";
import CartDrawer from "./components/cart/CartDrawer";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

export default function ShopLayout() {
  return (
    <WishlistProvider>
      <CartProvider>
        <AudioPlayerProvider>
          <Outlet />
          <CartDrawer />
          <AudioPlayer />
        </AudioPlayerProvider>
      </CartProvider>
    </WishlistProvider>
  );
}
