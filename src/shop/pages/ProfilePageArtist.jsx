import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { artists, orders, users } from "../data/mockDb";
import { getProductsByArtist } from "../data/helpers";
import UploadModal from "../../components/UploadModal";
import UploadSingleForm from "../../components/UploadSingleForm";

export default function ProfilePageArtist() {
  const { user, isLoggedIn } = useAuth();
  const currentArtist =
    artists.find((artist) => artist.user_id === user?._id) || artists[0];
  const artistProducts = getProductsByArtist(currentArtist?._id);
  const [activeTab, setActiveTab] = useState("overview");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [bannerUrl, setBannerUrl] = useState(
    () =>
      localStorage.getItem("artistBannerUrl") ||
      currentArtist?.banner_url ||
      "",
  );
  const [avatarUrl, setAvatarUrl] = useState(
    () => localStorage.getItem("artistAvatarUrl") || "",
  );

  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const merchCount = artistProducts.filter(
    (product) => product.type === "merch",
  ).length;
  const albumCount = artistProducts.filter(
    (product) => product.type === "album",
  ).length;
  const singleCount = artistProducts.filter(
    (product) => product.type === "single",
  ).length;
  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "fans", label: "Fans" },
    { key: "merch", label: "Merch", count: merchCount },
    { key: "album", label: "Album", count: albumCount },
    { key: "single", label: "Single", count: singleCount },
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
    if (activeTab === "album") {
      return product.type === "album";
    }
    if (activeTab === "single") {
      return product.type === "single";
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
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-full h-full object-cover"
              />
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
            onClick={() => setIsUploadOpen(true)}
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
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={
                    activeTab === tab.key ? "text-white/60" : "text-white/30"
                  }
                >
                  {" "}
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === "overview" ? (
            <ArtistOverview artist={currentArtist} products={artistProducts} />
          ) : activeTab === "fans" ? (
            <FansList artistId={currentArtist?._id} />
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        title="Upload Single"
        icon="♪"
      >
        <UploadSingleForm
          onCancel={() => setIsUploadOpen(false)}
          onSuccess={() => setIsUploadOpen(false)}
        />
      </UploadModal>
    </div>
  );
}

// ArtistInfo removed — profile tab replaced by Overview and Fans

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

function ArtistOverview({ artist }) {
  const artistId = artist?._id;
  // total revenue for this artist (sum of item.price * qty)
  const totalRevenue = orders.reduce((sum, order) => {
    const itemsForArtist = order.items.filter(
      (it) => it.artist_id === artistId,
    );
    const subtotal = itemsForArtist.reduce(
      (s, it) => s + it.unit_price * (it.quantity || 1),
      0,
    );
    return sum + subtotal;
  }, 0);

  // this month sales
  const now = new Date();
  const thisMonthSales = orders.reduce((sum, order) => {
    const oDate = new Date(order.created_at);
    if (
      oDate.getFullYear() === now.getFullYear() &&
      oDate.getMonth() === now.getMonth()
    ) {
      const itemsForArtist = order.items.filter(
        (it) => it.artist_id === artistId,
      );
      const subtotal = itemsForArtist.reduce(
        (s, it) => s + it.unit_price * (it.quantity || 1),
        0,
      );
      return sum + subtotal;
    }
    return sum;
  }, 0);

  // fans (unique users who bought artist items)
  const fanMap = {};
  orders.forEach((order) => {
    const itemsForArtist = order.items.filter(
      (it) => it.artist_id === artistId,
    );
    if (itemsForArtist.length === 0) return;
    const uid = order.user_id;
    fanMap[uid] = fanMap[uid] || { purchases: 0, lastPurchase: null };
    const qty = itemsForArtist.reduce((s, it) => s + (it.quantity || 1), 0);
    fanMap[uid].purchases += qty;
    const date = new Date(order.created_at);
    if (!fanMap[uid].lastPurchase || date > fanMap[uid].lastPurchase)
      fanMap[uid].lastPurchase = date;
  });
  const fanCount = Object.keys(fanMap).length;

  // orders count (orders that include artist)
  const ordersCount = orders.filter((order) =>
    order.items.some((it) => it.artist_id === artistId),
  ).length;

  return (
    <section className="rounded-[10px] border border-white/10 bg-[#141416] p-4 text-white">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[12px] uppercase text-white/45">Overview</p>
          <h2 className="text-[20px] font-extrabold">
            Artist dashboard · {artist?.name}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-4">
        <OverviewMetric
          label="TOTAL REVENUE"
          value={`฿${totalRevenue.toLocaleString()}`}
          detail="gross"
          active
        />
        <OverviewMetric
          label="THIS MONTH SALE"
          value={`฿${thisMonthSales.toLocaleString()}`}
          detail="month"
        />
        <OverviewMetric label="ORDERS" value={ordersCount} detail="orders" />
        <OverviewMetric label="FANS" value={fanCount} detail="unique buyers" />
      </div>

      <div className="rounded-[8px] border border-white/10 bg-[#1c1c1e] p-4">
        <h3 className="text-[16px] font-extrabold mb-3">Recent sales</h3>
        {orders
          .filter((o) => o.items.some((it) => it.artist_id === artistId))
          .slice(0, 6)
          .map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between py-2 border-b border-white/6 text-white/75 last:border-b-0"
            >
              <div>
                <div className="font-bold text-white">{order._id}</div>
                <div className="text-[13px]">
                  {new Date(order.created_at).toLocaleDateString()}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white">
                  ฿
                  {order.items
                    .filter((i) => i.artist_id === artistId)
                    .reduce((s, i) => s + i.unit_price * (i.quantity || 1), 0)
                    .toLocaleString()}
                </div>
                <div className="text-[13px]">
                  Items:{" "}
                  {order.items.filter((i) => i.artist_id === artistId).length}
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

function FansList({ artistId }) {
  const map = {};
  orders.forEach((order) => {
    const items = order.items.filter((it) => it.artist_id === artistId);
    if (!items.length) return;
    const uid = order.user_id;
    map[uid] = map[uid] || { purchases: 0, last: null };
    map[uid].purchases += items.reduce((s, it) => s + (it.quantity || 1), 0);
    const d = new Date(order.created_at);
    if (!map[uid].last || d > map[uid].last) map[uid].last = d;
  });

  const fanEntries = Object.keys(map).map((uid) => {
    const u = users.find((x) => x._id === uid) || {
      display_name: uid,
      email: "",
    };
    return { user: u, purchases: map[uid].purchases, last: map[uid].last };
  });

  if (fanEntries.length === 0) {
    return (
      <div className="py-8 text-white/40">
        No fans yet — no purchases found.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {fanEntries.map(({ user, purchases, last }) => (
        <div
          key={user._id}
          className="rounded-lg bg-bg-card border border-white/10 p-4 flex items-center justify-between"
        >
          <div>
            <div className="font-bold text-white">
              {user.display_name || user.username}
            </div>
            <div className="text-white/60 text-[13px]">{user.email}</div>
          </div>
          <div className="text-right">
            <div className="font-extrabold text-white">
              {purchases} purchases
            </div>
            <div className="text-white/60 text-[13px]">
              Last: {last?.toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function OverviewMetric({ label, value, detail, active = false }) {
  return (
    <div
      className={`min-h-[88px] rounded-[8px] border p-4 ${active ? "border-white/10 bg-[#789199]" : "border-white/10 bg-[#1c1c1e]"}`}
    >
      <p
        className={`text-[12px] uppercase ${active ? "text-[#111827]/75" : "text-white/55"}`}
      >
        {label}
      </p>
      <p
        className={`mt-1 text-[20px] leading-tight font-extrabold ${active ? "text-[#080817]" : "text-white"}`}
      >
        {value}
      </p>
      <p className="mt-1 text-[12px] font-semibold text-white/60">{detail}</p>
    </div>
  );
}
