import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { artists, orders, products, users } from "../data/mockDb";
import { getProductsByArtist } from "../data/helpers";
import UploadModal from "../../components/UploadModal";
import UploadSingleForm from "../../components/UploadSingleForm";
import UploadAlbumForm from "../../components/UploadAlbumForm";
import UploadMerchForm from "../../components/UploadMerchForm";

export default function ProfilePageArtist() {
  const { user, isLoggedIn } = useAuth();
  const currentArtist =
    artists.find((artist) => artist.user_id === user?._id) || artists[0];
  const artistProducts = getProductsByArtist(currentArtist?._id);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSingleOpen, setIsSingleOpen] = useState(false);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  const [isMerchOpen, setIsMerchOpen] = useState(false);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
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

          <div className="relative mt-1">
            <button
              type="button"
              className="rounded-full bg-accent px-5 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-accent/85 inline-flex items-center gap-2"
              onClick={() => setShowUploadMenu((v) => !v)}
            >
              + Upload
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {showUploadMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUploadMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 z-20 w-[180px] bg-[#1a1a1a] border border-white/[0.1] rounded-xl shadow-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUploadMenu(false);
                      setIsSingleOpen(true);
                    }}
                    className="w-full text-left px-4 py-3 text-[13px] text-white/85 hover:bg-white/[0.05] transition-colors flex items-center gap-2.5"
                  >
                    <span className="text-[16px] leading-none">♪</span> Single
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowUploadMenu(false);
                      setIsAlbumOpen(true);
                    }}
                    className="w-full text-left px-4 py-3 text-[13px] text-white/85 hover:bg-white/[0.05] transition-colors border-t border-white/[0.04] flex items-center gap-2.5"
                  >
                    <span className="text-[16px] leading-none">◐</span> Album
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowUploadMenu(false);
                      setIsMerchOpen(true);
                    }}
                    className="w-full text-left px-4 py-3 text-[13px] text-white/85 hover:bg-white/[0.05] transition-colors border-t border-white/[0.04] flex items-center gap-2.5"
                  >
                    <span className="text-[16px] leading-none">✦</span> Merch
                  </button>
                </div>
              </>
            )}
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
        isOpen={isSingleOpen}
        onClose={() => setIsSingleOpen(false)}
        title="Upload Single"
        icon="♪"
      >
        <UploadSingleForm
          onCancel={() => setIsSingleOpen(false)}
          onSuccess={() => setIsSingleOpen(false)}
        />
      </UploadModal>

      <UploadModal
        isOpen={isAlbumOpen}
        onClose={() => setIsAlbumOpen(false)}
        title="Upload Album"
        icon="◐"
        width={640}
      >
        <UploadAlbumForm
          onCancel={() => setIsAlbumOpen(false)}
          onSuccess={() => setIsAlbumOpen(false)}
        />
      </UploadModal>

      <UploadModal
        isOpen={isMerchOpen}
        onClose={() => setIsMerchOpen(false)}
        title="Upload Merch"
        icon="✦"
        width={680}
      >
        <UploadMerchForm
          onCancel={() => setIsMerchOpen(false)}
          onSuccess={() => setIsMerchOpen(false)}
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
  const artistOrders = orders.filter((order) =>
    order.items.some((item) => item.artist_id === artistId),
  );

  const totalRevenue = artistOrders.reduce((sum, order) => {
    const subtotal = order.items
      .filter((item) => item.artist_id === artistId)
      .reduce((s, item) => s + item.unit_price * (item.quantity || 1), 0);
    return sum + subtotal;
  }, 0);

  const now = new Date();
  const thisMonthSales = artistOrders.reduce((sum, order) => {
    const orderDate = new Date(order.created_at);
    if (
      orderDate.getFullYear() === now.getFullYear() &&
      orderDate.getMonth() === now.getMonth()
    ) {
      const subtotal = order.items
        .filter((item) => item.artist_id === artistId)
        .reduce((s, item) => s + item.unit_price * (item.quantity || 1), 0);
      return sum + subtotal;
    }
    return sum;
  }, 0);

  const fanMap = {};
  artistOrders.forEach((order) => {
    const itemsForArtist = order.items.filter(
      (item) => item.artist_id === artistId,
    );
    if (itemsForArtist.length === 0) return;
    const uid = order.user_id;
    fanMap[uid] = fanMap[uid] || { purchases: 0, lastPurchase: null };
    fanMap[uid].purchases += itemsForArtist.reduce(
      (s, item) => s + (item.quantity || 1),
      0,
    );
    const date = new Date(order.created_at);
    if (!fanMap[uid].lastPurchase || date > fanMap[uid].lastPurchase) {
      fanMap[uid].lastPurchase = date;
    }
  });
  const fanCount = Object.keys(fanMap).length;

  const ordersCount = artistOrders.length;

  const revenueHistory = artistOrders
    .map((order) => ({
      date: new Date(order.created_at),
      revenue: order.items
        .filter((item) => item.artist_id === artistId)
        .reduce((s, item) => s + item.unit_price * (item.quantity || 1), 0),
    }))
    .sort((a, b) => a.date - b.date);

  const chartLength = 26;
  const chartValues = Array.from({ length: chartLength }, (_, index) =>
    revenueHistory[index] ? revenueHistory[index].revenue : 0,
  );
  const maxChartValue = Math.max(...chartValues, 1);
  const chartPoints = chartValues
    .map((value, index) => {
      const pointY = 100 - Math.round((value / maxChartValue) * 65 + 15);
      return `${(index / (chartLength - 1)) * 100},${pointY}`;
    })
    .join(" ");
  const chartArea = `0,100 ${chartPoints} 100,100`;

  const orderMix = artistOrders.reduce(
    (mix, order) => {
      order.items.forEach((item) => {
        if (item.artist_id !== artistId) return;
        const revenue = item.unit_price * (item.quantity || 1);
        const product = products.find((p) => p._id === item.product_id);
        if (product?.type === "merch") {
          mix.merch += revenue;
        } else if (product?.type === "single" || product?.type === "album") {
          mix.digital += revenue;
        } else {
          mix.bundle += revenue;
        }
      });
      return mix;
    },
    { digital: 0, merch: 0, bundle: 0 },
  );

  const totalMix = orderMix.digital + orderMix.merch + orderMix.bundle || 1;
  const digitalPct = Math.round((orderMix.digital / totalMix) * 100);
  const merchPct = Math.round((orderMix.merch / totalMix) * 100);
  const bundlePct = 100 - digitalPct - merchPct;

  const orderMixData = [
    { color: "#00d9ff", label: "Digital", value: digitalPct },
    { color: "#9d6dff", label: "Merch", value: merchPct },
    { color: "#ffd700", label: "Bundle", value: bundlePct },
  ];

  const pieStyle = {
    background: `conic-gradient(#00d9ff 0% ${digitalPct}%, #9d6dff ${digitalPct}% ${digitalPct + merchPct}%, #ffd700 ${digitalPct + merchPct}% 100%)`,
  };

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

      <div className="grid grid-cols-[1.5fr_1fr] gap-3 mb-4">
        <div className="rounded-[8px] border border-white/10 bg-[#1c1c1e] p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[18px] font-extrabold text-white">
              Revenue · last 30 days
            </h3>
            <span className="text-[16px] font-medium text-white/60">THB</span>
          </div>
          <div className="relative h-[150px]">
            <div className="absolute inset-0 flex flex-col justify-between text-[9px] text-white/25">
              <span>{Math.ceil(maxChartValue)}</span>
              <span>{Math.ceil(maxChartValue * 0.66)}</span>
              <span>{Math.ceil(maxChartValue * 0.33)}</span>
              <span>0</span>
            </div>
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-x-4 inset-y-0 h-full w-[calc(100%-1rem)]"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="artistRevenueFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.34" />
                  <stop offset="100%" stopColor="#9d6dff" stopOpacity="0.08" />
                </linearGradient>
              </defs>
              <line
                x1="0"
                x2="100"
                y1="38"
                y2="38"
                stroke="rgba(255,255,255,0.18)"
                strokeDasharray="1.4 1.4"
              />
              <line
                x1="0"
                x2="100"
                y1="65"
                y2="65"
                stroke="rgba(255,255,255,0.13)"
                strokeDasharray="1.4 1.4"
              />
              <line
                x1="0"
                x2="100"
                y1="92"
                y2="92"
                stroke="rgba(255,255,255,0.1)"
                strokeDasharray="1.4 1.4"
              />
              <polygon points={chartArea} fill="url(#artistRevenueFill)" />
              <polyline
                points={chartPoints}
                fill="none"
                stroke="#00d9ff"
                strokeWidth="1.7"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>

        <div className="rounded-[8px] border border-white/10 bg-[#1c1c1e] p-5">
          <h3 className="text-[18px] font-extrabold text-white mb-4">
            Order mix
          </h3>
          <div className="flex items-center justify-center gap-8">
            <div
              className="h-[118px] w-[118px] rounded-full grid place-items-center"
              style={pieStyle}
            >
              <div className="h-[58px] w-[58px] rounded-full bg-[#1c1c1e]" />
            </div>
            <div className="space-y-2 text-[12px] text-white/75">
              {orderMixData.map((item) => (
                <OrderLegend
                  key={item.label}
                  color={item.color}
                  label={item.label}
                  value={`${item.value}%`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[8px] border border-white/10 bg-[#1c1c1e] p-4">
        <h3 className="text-[16px] font-extrabold mb-3">Recent sales</h3>
        {artistOrders.slice(0, 6).map((order) => (
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

function OrderLegend({ color, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-block h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-[12px] text-white/75">
        {label}
        <span className="ml-2 font-semibold text-white">{value}</span>
      </span>
    </div>
  );
}
