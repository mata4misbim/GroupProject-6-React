import { Outlet } from "react-router-dom";
import AudioPlayer from "./components/audio/AudioPlayer";
import CartDrawer from "./components/cart/CartDrawer";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { FollowProvider } from "../contexts/FollowContext";
import { CollectionProvider } from "./context/CollectionContext";

export default function ShopLayout() {
  return (
    <WishlistProvider>
      <FollowProvider>
        <CollectionProvider>
          <CartProvider>
            <AudioPlayerProvider>
              <Outlet />
              <CartDrawer />
              <AudioPlayer />
            </AudioPlayerProvider>
          </CartProvider>
        </CollectionProvider>
      </FollowProvider>
    </WishlistProvider>
  );
}
