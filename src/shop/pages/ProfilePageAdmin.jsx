import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { artists, products, users } from "../data/mockDb";
import { getAllProductsWithArtist, getStats } from "../data/helpers";

export default function ProfilePageAdmin() {
  const { user, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [bannerUrl, setBannerUrl] = useState(
    () => localStorage.getItem("adminBannerUrl") || "",
  );
  const [avatarUrl, setAvatarUrl] = useState(
    () => localStorage.getItem("adminAvatarUrl") || "",
  );

  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const stats = getStats();
  const publishedProducts = products.filter(
    (product) => product.status === "published" && !product.deleted_at,
  );
  const pendingProducts = products.filter(
    (product) => product.status === "draft",
  );

  const tabs = [
    { key: "overview", label: "overview", count: 4 },
    { key: "users", label: "users", count: users.length },
    { key: "artists", label: "artists", count: artists.length },
    { key: "products", label: "products", count: publishedProducts.length },
  ];

  const handleImageChange = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target.result;
      if (type === "banner") {
        setBannerUrl(url);
        localStorage.setItem("adminBannerUrl", url);
      } else {
        setAvatarUrl(url);
        localStorage.setItem("adminAvatarUrl", url);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-bg font-['Plus_Jakarta_Sans',sans-serif]">
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

      <div className="px-[10%] -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div
            className="relative w-32 h-32 rounded-2xl overflow-hidden bg-bg-card border-4 border-bg shadow-xl shrink-0 cursor-pointer group"
            onClick={() => avatarInputRef.current?.click()}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white/10 text-white text-[2.5rem] font-bold">
                {(user?.display_name || user?.email || "A")[0]?.toUpperCase()}
              </div>
            )}
            <div className="absolute inset-0 bg-black/45 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-[12px] font-semibold">Edit</span>
            </div>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, "avatar")}
            />
          </div>

          <div className="flex-1 pt-2">
            <h1 className="text-white text-[2rem] font-bold tracking-tight truncate max-w-xl">
              {user?.display_name || user?.email}
            </h1>
            <p className="text-white/40 text-[14px] mt-1">Admin account</p>
          </div>
        </div>
      </div>

      <div className="px-[10%] mt-10">
        <div className="flex flex-wrap items-center gap-1 border-b border-white/10">
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
              <span
                className={
                  activeTab === tab.key ? "text-white/60" : "text-white/30"
                }
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === "overview" && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Users" value={stats.users} />
              <StatCard label="Artists" value={stats.artists} />
              <StatCard label="Published" value={publishedProducts.length} />
              <StatCard label="Drafts" value={pendingProducts.length} />
            </div>
          )}
          {activeTab === "users" && <UserGrid />}
          {activeTab === "artists" && <ArtistGrid />}
          {activeTab === "products" && <ProductGrid />}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-lg bg-bg-card border border-white/10 p-5">
      <p className="text-white/40 text-[12px] uppercase tracking-[0.08em]">
        {label}
      </p>
      <p className="text-white text-[2rem] font-bold mt-2">{value}</p>
    </div>
  );
}

function UserGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((item) => (
        <div
          key={item._id}
          className="rounded-lg bg-bg-card border border-white/10 p-4"
        >
          <p className="text-white/85 text-[14px] font-semibold truncate">
            {item.display_name || item.username}
          </p>
          <p className="text-white/40 text-[12px] truncate mt-1">
            {item.email}
          </p>
          <p className="text-white/35 text-[11px] uppercase tracking-[0.08em] mt-3">
            {item.user_type} · {item.status}
          </p>
        </div>
      ))}
    </div>
  );
}

function ArtistGrid() {
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
            <p className="text-white/40 text-[11px] truncate">
              {artist.location}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function ProductGrid() {
  const productList = getAllProductsWithArtist();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
      {productList.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product.slug}`}
          className="flex flex-col gap-2 no-underline group"
        >
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-bg-card">
            <img
              src={product.cover_url}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-white/85 text-[13px] font-medium truncate group-hover:text-white transition-colors">
              {product.title}
            </p>
            <p className="text-white/40 text-[11px] truncate">
              {product.artist?.name || "Unknown"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
