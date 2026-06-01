import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { artists } from "../data/mockDb";
import { getArtistGenres, getProductsByArtist } from "../data/helpers";

export default function ProfilePageArtist() {
  const { user, isLoggedIn } = useAuth();
  const currentArtist =
    artists.find((artist) => artist.user_id === user?._id) || artists[0];
  const artistProducts = getProductsByArtist(currentArtist?._id);
  const artistGenres = getArtistGenres(currentArtist?._id);
  const [activeTab, setActiveTab] = useState("products");
  const [bannerUrl, setBannerUrl] = useState(
    () => localStorage.getItem("artistBannerUrl") || currentArtist?.banner_url || ""
  );
  const [avatarUrl, setAvatarUrl] = useState(
    () => localStorage.getItem("artistAvatarUrl") || ""
  );

  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const digitalCount = artistProducts.filter(
    (product) => product.type === "single" || product.type === "album"
  ).length;
  const merchCount = artistProducts.filter((product) => product.type === "merch").length;
  const tabs = [
    { key: "products", label: "products", count: artistProducts.length },
    { key: "digital", label: "digital", count: digitalCount },
    { key: "merch", label: "merch", count: merchCount },
    { key: "profile", label: "profile", count: artistGenres.length },
  ];

  const handleImageChange = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target.result;
      if (type === "banner") {
        setBannerUrl(url);
        localStorage.setItem("artistBannerUrl", url);
      } else {
        setAvatarUrl(url);
        localStorage.setItem("artistAvatarUrl", url);
      }
    };
    reader.readAsDataURL(file);
  };

  const filteredProducts = artistProducts.filter((product) => {
    if (activeTab === "digital") {
      return product.type === "single" || product.type === "album";
    }
    if (activeTab === "merch") {
      return product.type === "merch";
    }
    return true;
  });

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
              <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <img
                src={currentArtist?.banner_url}
                alt={currentArtist?.name}
                className="w-full h-full object-cover"
              />
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
              {currentArtist?.name || user?.display_name || user?.email}
            </h1>
            <p className="text-white/40 text-[14px] mt-1">Artist account</p>
            <p className="text-white/55 text-[14px] mt-3 max-w-2xl">
              {currentArtist?.bio}
            </p>
          </div>

          <button
            type="button"
            className="mt-1 rounded-full bg-accent px-5 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-accent/85"
            onClick={() => window.alert("Add product form coming soon.")}
          >
            + Add product
          </button>
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
              <span className={activeTab === tab.key ? "text-white/60" : "text-white/30"}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === "profile" ? (
            <ArtistInfo artist={currentArtist} genres={artistGenres} />
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
}

function ArtistInfo({ artist, genres }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="rounded-lg bg-bg-card border border-white/10 p-5 lg:col-span-2">
        <p className="text-white/40 text-[12px] uppercase tracking-[0.08em]">Bio</p>
        <p className="text-white/75 text-[14px] leading-6 mt-3">{artist?.bio}</p>
      </div>
      <div className="rounded-lg bg-bg-card border border-white/10 p-5">
        <p className="text-white/40 text-[12px] uppercase tracking-[0.08em]">Details</p>
        <p className="text-white/75 text-[14px] mt-3">{artist?.location}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {genres.map((genre) => (
            <span
              key={genre._id}
              className="rounded-full border border-white/10 px-3 py-1 text-[12px] text-white/60"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="py-8">
        <p className="text-white/40 text-[14px]">No products here yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
      {products.map((product) => (
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
            <p className="text-white/40 text-[11px] truncate">{product.type}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
