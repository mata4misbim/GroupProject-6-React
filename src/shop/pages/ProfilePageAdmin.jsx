import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ORDER_STATUS_LABELS } from "../data/constants";
import {
  artists,
  merch,
  orders,
  products,
  tracks,
  users,
} from "../data/mockDb";
import { getAllProductsWithArtist } from "../data/helpers";

export default function ProfilePageAdmin() {
  const { user, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("30");
  const [bannerUrl, setBannerUrl] = useState(
    () => localStorage.getItem("adminBannerUrl") || "",
  );
  const [avatarUrl, setAvatarUrl] = useState(
    () => localStorage.getItem("adminAvatarUrl") || "",
  );

  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const publishedProducts = products.filter(
    (product) => product.status === "published" && !product.deleted_at,
  );

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "revenue", label: "Revenue" },
    { key: "orders", label: "Orders", count: orders.length },
    { key: "users", label: "Users", count: users.length },
    { key: "artists", label: "Artists", count: artists.length },
    { key: "products", label: "Products", count: publishedProducts.length },
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
          {activeTab === "overview" && (
            <AdminOverview
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
              onViewOrders={() => setActiveTab("orders")}
            />
          )}
          {activeTab === "revenue" && <RevenueDashboard />}
          {activeTab === "orders" && <OrdersDashboard />}
          {activeTab === "users" && <UserGrid />}
          {activeTab === "artists" && <ArtistGrid />}
          {activeTab === "products" && <ProductGrid />}
        </div>
      </div>
    </div>
  );
}

function AdminOverview({ timeRange, onTimeRangeChange, onViewOrders }) {
  const revenuePoints = [
    64, 64, 70, 69, 78, 75, 68, 68, 55, 54, 38, 34, 36, 44, 48, 53, 58, 65, 72,
    66, 77, 74, 79, 75, 68,
  ];
  const chartPoints = revenuePoints
    .map(
      (value, index) =>
        `${(index / (revenuePoints.length - 1)) * 100},${100 - value}`,
    )
    .join(" ");
  const chartArea = `0,100 ${chartPoints} 100,100`;
  const topArtists = [
    {
      name: "BABYMONSTER",
      sales: 213,
      revenue: "48,210",
      change: "+22%",
      image: artists[0]?.banner_url,
      positive: true,
    },
    {
      name: "Anyma",
      sales: 178,
      revenue: "41,880",
      change: "+11%",
      image: artists[1]?.banner_url,
      positive: true,
    },
    {
      name: "aespa",
      sales: 156,
      revenue: "33,940",
      change: "-4%",
      image: artists[2]?.banner_url,
      positive: false,
    },
  ];
  const latestOrders = getOrderRows()
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 3);

  return (
    <section className="rounded-[10px] border border-white/10 bg-[#141416] text-white font-['Noto_Sans_Thai','TikTok_Sans',sans-serif] p-4 -mx-2">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h2 className="text-[22px] leading-tight font-extrabold text-white">
            WELCOME BACK
          </h2>
        </div>
        <select
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value)}
          className="h-9 rounded-[6px] border border-white/10 bg-[#1f1f23] px-3 text-[13px] font-medium text-white/70 outline-none cursor-pointer hover:border-white/25 focus:border-brand-purple"
        >
          <option value="1">Last 1 day</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-3">
        <OverviewMetric
          active
          label="TOTAL REVENUE"
          value="฿842,310"
          detail="+12.4%"
        />
        <OverviewMetric label="AVG ORDER VALUE" value="฿428" detail="+3.1%" />
        <OverviewMetric label="ORDERS" value="1,968" detail="+8.0%" />
        <OverviewMetric label="ACTIVE ARTISTS" value="142" detail="+6 new" />
      </div>

      <div className="grid grid-cols-[1.5fr_1fr] gap-3 mb-3">
        <div className="rounded-[8px] border border-white/10 bg-[#1c1c1e] p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[18px] font-extrabold text-white">
              Revenue · {timeRange} {timeRange === "1" ? "day" : "days"}
            </h3>
            <span className="text-[16px] font-medium text-white/60">THB</span>
          </div>
          <div className="relative h-[150px]">
            <div className="absolute inset-0 flex flex-col justify-between text-[9px] text-white/25">
              <span>85</span>
              <span>63</span>
              <span>41</span>
              <span>19</span>
            </div>
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-x-4 inset-y-0 h-full w-[calc(100%-1rem)]"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="adminRevenueFill"
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
              <polygon points={chartArea} fill="url(#adminRevenueFill)" />
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
            <div className="h-[118px] w-[118px] rounded-full bg-[conic-gradient(#00d9ff_0_58%,#9d6dff_58%_90%,#ffd700_90%_100%)] grid place-items-center">
              <div className="h-[58px] w-[58px] rounded-full bg-[#1c1c1e]" />
            </div>
            <div className="space-y-2 text-[12px] text-white/75">
              <OrderLegend color="#00d9ff" label="Digital" value="58%" />
              <OrderLegend color="#9d6dff" label="Merch" value="32%" />
              <OrderLegend color="#ffd700" label="Bundle" value="10%" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[8px] border border-white/10 bg-[#1c1c1e] p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[18px] font-extrabold text-white">
              Top artists
            </h3>
            <Link
              to="/artist"
              className="text-[11px] font-bold text-white/70 no-underline hover:text-white"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-[1fr_56px_76px_48px] gap-3 border-b border-dashed border-white/15 pb-2 text-[8px] font-bold uppercase text-white/45">
            <span>Artist</span>
            <span>Sales</span>
            <span>Revenue</span>
            <span className="text-right">%</span>
          </div>
          {topArtists.map((artist) => (
            <div
              key={artist.name}
              className="grid grid-cols-[1fr_56px_76px_48px] items-center gap-3 border-b border-dashed border-white/10 py-3 text-[11px] text-white/75 last:border-b-0"
            >
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={artist.image}
                  alt=""
                  className="h-6 w-6 rounded-full object-cover bg-white/10"
                />
                <span className="truncate font-extrabold text-white">
                  {artist.name}
                </span>
              </div>
              <span>{artist.sales}</span>
              <span>{artist.revenue}</span>
              <span
                className={`text-right font-bold ${artist.positive ? "text-[#00956e]" : "text-[#ff3b57]"}`}
              >
                {artist.change}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-[8px] border border-white/10 bg-[#1c1c1e] p-4">
          <h3 className="text-[18px] font-extrabold text-white mb-3">
            Latest Orders
          </h3>
          <div className="grid grid-cols-[90px_1fr_86px] gap-3 border-b border-dashed border-white/15 pb-2 text-[8px] font-bold uppercase text-white/45">
            <span>Order</span>
            <span>Products</span>
            <span className="text-right">Total</span>
          </div>
          <div>
            {latestOrders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-[90px_1fr_86px] items-center gap-3 border-b border-dashed border-white/15 py-3 text-[11px] text-white/75 last:border-b-0"
              >
                <span className="font-extrabold text-white">{order.id}</span>
                <div className="min-w-0">
                  <p className="truncate font-bold text-white/85">
                    {order.products}
                  </p>
                  <p className="mt-0.5 truncate text-[10px] text-white/40">
                    {order.status} · {order.date}
                  </p>
                </div>
                <span className="text-right font-extrabold text-white">
                  THB {order.total.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={onViewOrders}
            className="mt-4 mx-auto block h-8 w-[168px] rounded-[8px] bg-white text-[#080817] text-[12px] font-extrabold cursor-pointer transition hover:bg-brand-cyan hover:text-[#080817]"
          >
            View all orders
          </button>
        </div>
      </div>
    </section>
  );
}

function OverviewMetric({ label, value, detail, active = false }) {
  return (
    <div
      className={`min-h-[102px] rounded-[8px] border p-4 ${
        active ? "border-white/10 bg-[#789199]" : "border-white/10 bg-[#1c1c1e]"
      }`}
    >
      <p
        className={`text-[12px] uppercase tracking-[0] ${active ? "text-[#111827]/75" : "text-white/55"}`}
      >
        {label}
      </p>
      <p
        className={`mt-1 text-[26px] leading-tight font-extrabold ${active ? "text-[#080817]" : "text-white"}`}
      >
        {value}
      </p>
      <p className="mt-1 text-[12px] font-semibold text-[#00956e]">{detail}</p>
    </div>
  );
}

function OrderLegend({ color, label, value }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span>
        {label} <b>{value}</b>
      </span>
    </div>
  );
}

function RevenueDashboard() {
  const rows = [
    ["Digital downloads", "1,142 orders", "฿489,620", "+14.2%"],
    ["Merchandise", "612 orders", "฿269,540", "+9.8%"],
    ["Bundles", "214 orders", "฿83,150", "+4.1%"],
  ];

  return (
    <section className="rounded-[10px] border border-white/10 bg-[#141416] p-5 text-white">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[12px] uppercase text-white/45">Finance</p>
          <h2 className="text-[24px] font-extrabold">Revenue</h2>
        </div>
        <button className="h-9 rounded-[7px] border border-white/10 bg-white/5 px-4 text-[13px] font-bold text-white/75 cursor-pointer hover:bg-white/10">
          Export report
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <AdminPanelCard
          label="Gross revenue"
          value="฿842,310"
          detail="+12.4%"
        />
        <AdminPanelCard label="Platform fees" value="฿84,231" detail="10.0%" />
        <AdminPanelCard
          label="Artist payout"
          value="฿758,079"
          detail="Queued"
        />
      </div>
      <div className="mt-4 rounded-[8px] border border-white/10 bg-[#1c1c1e] p-4">
        <div className="grid grid-cols-[1fr_130px_120px_80px] gap-3 border-b border-white/10 pb-2 text-[11px] uppercase text-white/45">
          <span>Channel</span>
          <span>Volume</span>
          <span>Revenue</span>
          <span className="text-right">Trend</span>
        </div>
        {rows.map(([channel, volume, revenue, trend]) => (
          <div
            key={channel}
            className="grid grid-cols-[1fr_130px_120px_80px] gap-3 border-b border-white/10 py-3 text-[13px] text-white/75 last:border-b-0"
          >
            <span className="font-bold text-white">{channel}</span>
            <span>{volume}</span>
            <span>{revenue}</span>
            <span className="text-right font-bold text-[#00d9ff]">{trend}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function getOrderRows() {
  return orders.map((order) => {
    const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
    const productPreview = order.items
      .map((item) => item.title_snapshot)
      .slice(0, 2)
      .join(", ");

    return {
      id: order._id,
      products:
        order.items.length > 2
          ? `${productPreview} +${order.items.length - 2}`
          : productPreview,
      items: itemCount,
      total: order.total,
      status: ORDER_STATUS_LABELS[order.status] || order.status,
      date: new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(order.created_at),
      createdAt: new Date(order.created_at),
    };
  });
}

function OrdersDashboard() {
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const platformFees = orders.reduce(
    (sum, order) => sum + order.platform_fee,
    0,
  );
  const activeOrders = orders.filter((order) =>
    ["pending_payment", "paid", "partially_shipped"].includes(order.status),
  ).length;
  const rows = getOrderRows();

  return (
    <section className="rounded-[10px] border border-white/10 bg-[#141416] p-5 text-white">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[12px] uppercase text-white/45">
            Order management
          </p>
          <h2 className="text-[24px] font-extrabold">Orders</h2>
        </div>
        <span className="rounded-full border border-[#ffd700]/30 bg-[#ffd700]/10 px-3 py-1 text-[12px] font-bold text-[#ffd700]">
          {activeOrders} active
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <AdminPanelCard
          label="Total orders"
          value={orders.length}
          detail="All time"
        />
        <AdminPanelCard
          label="Gross sales"
          value={`THB ${totalRevenue.toLocaleString()}`}
          detail="Customer paid"
        />
        <AdminPanelCard
          label="Platform fees"
          value={`THB ${platformFees.toLocaleString()}`}
          detail="15% fee"
        />
      </div>
      <div className="mt-4 rounded-[8px] border border-white/10 bg-[#1c1c1e] p-4 overflow-x-auto">
        <div className="min-w-[720px]">
          <div className="grid grid-cols-[120px_1fr_70px_100px_130px_90px] gap-3 border-b border-white/10 pb-2 text-[11px] uppercase text-white/45">
            <span>Order</span>
            <span>Products</span>
            <span>Items</span>
            <span>Total</span>
            <span>Status</span>
            <span className="text-right">Date</span>
          </div>
          {rows.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-[120px_1fr_70px_100px_130px_90px] gap-3 border-b border-white/10 py-3 text-[13px] text-white/75 last:border-b-0"
            >
              <span className="font-bold text-white">{order.id}</span>
              <span className="truncate">{order.products}</span>
              <span>{order.items}</span>
              <span>THB {order.total.toLocaleString()}</span>
              <span className="font-bold text-[#9d6dff]">{order.status}</span>
              <span className="text-right">{order.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function AdminPanelCard({ label, value, detail }) {
  return (
    <div className="rounded-[8px] border border-white/10 bg-[#1c1c1e] p-4">
      <p className="text-[12px] uppercase text-white/45">{label}</p>
      <p className="mt-1 text-[24px] font-extrabold text-white">{value}</p>
      <p className="mt-1 text-[12px] font-bold text-[#00d9ff]">{detail}</p>
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
  const [productTab, setProductTab] = useState("tracks");
  const productList = getAllProductsWithArtist();
  const trackProducts = productList.filter(
    (product) => product.type !== "merch",
  );
  const merchProducts = productList.filter(
    (product) => product.type === "merch",
  );
  const moderationProducts = productList.filter(
    (product) => product.status !== "published" || product.deleted_at,
  );
  const visibleProducts =
    productTab === "tracks"
      ? trackProducts
      : productTab === "merch"
        ? merchProducts
        : moderationProducts;
  const productTabs = [
    { key: "tracks", label: "Tracks", count: tracks.length },
    { key: "merch", label: "Merch", count: merch.length },
    {
      key: "moderation",
      label: "Moderation",
      count: moderationProducts.length,
    },
  ];

  return (
    <section className="rounded-[10px] border border-white/10 bg-[#141416] p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-[12px] uppercase text-white/45">Catalog admin</p>
          <h2 className="text-[24px] font-extrabold text-white">Products</h2>
        </div>
        <div className="flex rounded-[8px] border border-white/10 bg-black/20 p-1">
          {productTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setProductTab(tab.key)}
              className={`h-9 rounded-[6px] px-4 text-[13px] font-bold cursor-pointer transition ${
                productTab === tab.key
                  ? "bg-white text-[#080817]"
                  : "text-white/55 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}{" "}
              <span
                className={
                  productTab === tab.key ? "text-[#080817]/60" : "text-white/35"
                }
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {productTab === "moderation" && visibleProducts.length === 0 ? (
        <div className="rounded-[8px] border border-white/10 bg-[#1c1c1e] p-8 text-center">
          <p className="text-[18px] font-extrabold text-white">
            Moderation queue is clear
          </p>
          <p className="mt-2 text-[13px] text-white/45">
            Drafts, hidden items, and deleted products will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
          {visibleProducts.map((product) => (
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
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase text-white/55">
                    {product.type}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-[#00d9ff]">
                    {product.status}
                  </span>
                </div>
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
      )}
    </section>
  );
}
