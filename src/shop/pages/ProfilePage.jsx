import { useState, useRef } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useFollow } from "../../contexts/FollowContext";
import { useWishlist } from "../context/WishlistContext";
import { useCollection } from "../context/CollectionContext";
import { findArtistById, getProductWithDetails } from "../data/helpers";

export default function ProfilePage() {
  const { user, isLoggedIn } = useAuth();
  const { collectionIds } = useCollection();
  const { followedArtistIds } = useFollow();
  const { wishlistedIds } = useWishlist();

  const [activeTab, setActiveTab] = useState("collection");
  const [bannerUrl, setBannerUrl] = useState(
    () => localStorage.getItem("userBannerUrl") || ""
  );
  const [avatarUrl, setAvatarUrl] = useState(
    () => localStorage.getItem("userAvatarUrl") || ""
  );

  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const handleImageChange = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target.result;
      if (type === "banner") {
        setBannerUrl(url);
        localStorage.setItem("userBannerUrl", url);
      } else {
        setAvatarUrl(url);
        localStorage.setItem("userAvatarUrl", url);
      }
    };
    reader.readAsDataURL(file);
  };

  const tabs = [
    { key: "collection", label: "collection", count: collectionIds.length },
    { key: "following", label: "following", count: followedArtistIds.length },
    { key: "wishlist", label: "wishlist", count: wishlistedIds.length },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* ── Banner ── */}
      <div
        className="relative h-75 bg-cover bg-center bg-white/5 cursor-pointer group"
        style={bannerUrl ? { backgroundImage: `url(${bannerUrl})` } : {}}
        onClick={() => bannerInputRef.current?.click()}
      >
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-black/55 text-white text-[13px] px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
            Change banner
          </span>
        </div>
        <input
          ref={bannerInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleImageChange(e, "banner")}
        />
      </div>

      {/* ── Profile info ── */}
      <div className="px-[10%] -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar */}
          <div
            className="relative w-32 h-32 rounded-2xl overflow-hidden bg-bg-card border-4 border-bg shadow-xl shrink-0 cursor-pointer group"
            onClick={() => avatarInputRef.current?.click()}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white/10 text-white text-[2.5rem] font-bold">
                {user?.email?.[0]?.toUpperCase() || "?"}
              </div>
            )}
            <div className="absolute inset-0 bg-black/45 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, "avatar")}
            />
          </div>

          {/* Info */}
          <div className="flex-1 pt-2">
            <h1 className="text-white text-[2rem] font-bold tracking-tight truncate max-w-xl">
              {user?.email}
            </h1>
            <p className="text-white/40 text-[14px] mt-1">Fan account</p>
          </div>
        </div>
      </div>

      {/* ── Tabs + Content ── */}
      <div className="px-[10%] mt-10">
        {/* Tab bar */}
        <div className="flex items-center gap-1 border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-[14px] font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab.key
                  ? "border-white text-white"
                  : "border-transparent text-white/45 hover:text-white/70"
              }`}
            >
              {tab.label}{" "}
              <span className={activeTab === tab.key ? "text-white/60" : "text-white/30"}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="py-8">
          {activeTab === "collection" && (
            <ProductGrid
              ids={collectionIds}
              emptyMessage="No purchases yet"
            />
          )}
          {activeTab === "following" && (
            <ArtistGrid
              ids={followedArtistIds}
              emptyMessage="Not following any artists yet"
            />
          )}
          {activeTab === "wishlist" && (
            <ProductGrid
              ids={wishlistedIds}
              emptyMessage="No items in wishlist"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ProductGrid({ ids, emptyMessage }) {
  const products = ids.map((id) => getProductWithDetails(id)).filter(Boolean);

  if (products.length === 0) {
    return (
      <div className="py-8">
        <p className="text-white/40 text-[14px]">{emptyMessage}</p>
        <Link to="/shop" className="text-accent text-[13px] hover:underline mt-1 inline-block">
          Browse the shop →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
      {products.map((p) => (
        <Link key={p._id} to={`/product/${p.slug}`} className="flex flex-col gap-2 no-underline group">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-bg-card">
            <img
              src={p.cover_url}
              alt={p.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-white/85 text-[13px] font-medium truncate group-hover:text-white transition-colors">
              {p.title}
            </p>
            <p className="text-white/40 text-[11px] truncate">{p.artist?.name || "Unknown"}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function ArtistGrid({ ids, emptyMessage }) {
  const artists = ids.map((id) => findArtistById(id)).filter(Boolean);

  if (artists.length === 0) {
    return (
      <div className="py-8">
        <p className="text-white/40 text-[14px]">{emptyMessage}</p>
        <Link to="/shop" className="text-accent text-[13px] hover:underline mt-1 inline-block">
          Discover artists →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
      {artists.map((artist) => (
        <Link
          key={artist._id}
          to={`/artist/${artist.slug}`}
          className="flex flex-col gap-2 no-underline group"
        >
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-bg-card">
            <img
              src={artist.banner_url}
              alt={artist.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-white/85 text-[13px] font-medium truncate group-hover:text-white transition-colors">
              {artist.name}
            </p>
            <p className="text-white/40 text-[11px] truncate">{artist.location}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
