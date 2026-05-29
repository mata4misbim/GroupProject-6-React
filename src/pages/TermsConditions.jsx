import { useState } from "react";
import Footer from "../components/common/Footer";

export default function TermsConditions() {
  const [activeTab, setActiveTab] = useState("fan");

  const tabs = [
    { role: "fan",    label: "Fans",    color: "#3a6ea8" },
    { role: "artist", label: "Artists", color: "#2d8c6e" },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f7f6f2", color: "#1a1a1a", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* HERO */}
      <div style={{ background: "#1c1c1e", color: "#e8e6df", padding: "64px 24px 48px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.01em" }}>
          Terms &amp; <em style={{ fontStyle: "italic", color: "#e8533a" }}>Conditions</em>
        </h1>
      </div>

      {/* MAIN */}
      <main style={{ flex: 1, maxWidth: "860px", margin: "0 auto", width: "100%", padding: "48px 24px 80px" }}>

        {/* ROLE TABS */}
        <div style={{ display: "flex", border: "1px solid #d9d7d0", borderRadius: "8px", overflow: "hidden", marginBottom: "48px" }}>
          {tabs.map(({ role, label, color }, i) => (
            <button
              key={role}
              onClick={() => setActiveTab(role)}
              style={{
                flex: 1,
                padding: "10px 12px",
                border: "none",
                borderRight: i < tabs.length - 1 ? "1px solid #d9d7d0" : "none",
                background: activeTab === role ? color : "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                color: activeTab === role ? "#fff" : "#3a3a3a",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "currentColor", opacity: 0.7, display: "inline-block", flexShrink: 0 }} />
              {label}
            </button>
          ))}
        </div>

        {/* FANS */}
        {activeTab === "fan" && (
          <div key="fan" style={{ animation: "fadeIn 0.3s ease" }}>
            <SectionHeader
              num="01" label="Role" title="Fans"
              pillText="Listener" pillBg="#ddeaf8" pillColor="#3a6ea8"
            />
            <Rules items={[
              { icon: "🎧", title: "Support Artists Directly",  desc: "Stream music, purchase digital tracks, and buy physical merchandise — your money goes straight to the artists you love, without a middleman taking most of it." },
              { icon: "📀", title: "Manage Your Downloads",     desc: "While streaming is available for all purchases, we strongly recommend downloading files to your personal devices. If an artist removes content or a copyright issue arises, we cannot guarantee continued access." },
              { icon: "🔇", title: "Community Rules",           desc: "Re-uploading copyrighted content or using purchased material for commercial purposes without permission is strictly prohibited and may result in account suspension." },
            ]} />
          </div>
        )}

        {/* ARTISTS */}
        {activeTab === "artist" && (
          <div key="artist" style={{ animation: "fadeIn 0.3s ease" }}>
            <SectionHeader
              num="02" label="Role" title="Artists"
              pillText="Creator" pillBg="#d5ede6" pillColor="#2d8c6e"
            />
            <Rules items={[
              { icon: "🎸", title: "100% Ownership — Always", desc: "You retain full ownership and copyright of all your work. Audtlist is simply a platform to host, stream, and sell on your behalf — we make no claims over your art." },
              {
                icon: "🎤", title: "Revenue Share",
                desc: "You keep the majority of what you earn, paid directly to your PayPal account.",
                callout: <RevenueChart />,
              },
              { icon: "🎼", title: "Original Work Only",   desc: "All uploads must be your original work. Cover songs are strictly prohibited unless you have obtained written authorization from the copyright owner prior to uploading." },
            ]} />
          </div>
        )}

      </main>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ── Pie chart: Bandcamp-style revenue breakdown ── */
function RevenueChart() {
  return (
    <div style={{
      display: "flex",
      gap: "32px",
      alignItems: "center",
      flexWrap: "wrap",
      marginTop: "12px",
      padding: "24px",
      background: "#f0faf6",
      border: "1px solid #a8dcc8",
      borderRadius: "8px",
    }}>

      {/* PIE CHART */}
      {/*
        Circle: center (100,100) r=80  — angles in SVG convention (0°=right, CW+)
        Slices start from top (270°) going clockwise:
          Slice 1 "your share"   82%  → ends at 205.2°  path large-arc=1
          Slice 2 "platform fee" 13%  → ends at 252°    path large-arc=0
          Slice 3 "payment fees"  5%  → ends at 270°    path large-arc=0
        Key coordinates:
          top       = (100, 20)
          205.2°    = (27.6, 66)
          252°      = (75.3, 23.9)
      */}
      <svg width="170" height="170" viewBox="0 0 200 200" style={{ flexShrink: 0 }}>
        <path d="M 100 100 L 100 20 A 80 80 0 1 1 27.6 66 Z"     fill="#2d8c6e" />
        <path d="M 100 100 L 27.6 66 A 80 80 0 0 1 75.3 23.9 Z"  fill="#1b5e47" />
        <path d="M 100 100 L 75.3 23.9 A 80 80 0 0 1 100 20 Z"   fill="#91c4b4" />

        {/* white dividers */}
        <line x1="100" y1="100" x2="100"  y2="20"   stroke="white" strokeWidth="1.5" />
        <line x1="100" y1="100" x2="27.6" y2="66"   stroke="white" strokeWidth="1.5" />
        <line x1="100" y1="100" x2="75.3" y2="23.9" stroke="white" strokeWidth="1.5" />

        {/* label "your share" — midpoint angle 57.6°, r=45 → (124, 138) */}
        <rect x="97"  y="130" width="54" height="16" rx="2" fill="#1c1c1e" />
        <text x="124" y="142" textAnchor="middle" fontSize="9.5" fill="white" fontFamily="DM Sans, sans-serif">your share</text>

        {/* label "platform fee" — midpoint angle 228.6°, r=50 → (67, 63) */}
        <rect x="38"  y="55"  width="58" height="16" rx="2" fill="#1c1c1e" />
        <text x="67"  y="67"  textAnchor="middle" fontSize="9.5" fill="white" fontFamily="DM Sans, sans-serif">platform fee</text>

        {/* label "payment fees" — midpoint angle 261°, r=60 → (91, 41) */}
        <rect x="61"  y="33"  width="60" height="16" rx="2" fill="#1c1c1e" />
        <text x="91"  y="45"  textAnchor="middle" fontSize="9.5" fill="white" fontFamily="DM Sans, sans-serif">payment fees</text>
      </svg>

      {/* TEXT */}
      <div style={{ flex: 1, minWidth: "180px" }}>
        <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: "#1a1a1a", marginBottom: "10px" }}>
          Pricing
        </p>
        <p style={{ fontSize: "13px", color: "#2a6050", lineHeight: 1.65, marginBottom: "10px" }}>
          Artist accounts are free. We make money through a <strong>10% revenue share on merch sales</strong> and <strong>15% on digital music</strong> (payment processor fees are separate and vary by transaction size).
        </p>
        <p style={{ fontSize: "13px", color: "#2a6050", lineHeight: 1.65 }}>
          The remainder — <strong style={{ color: "#2d8c6e" }}>82% on average</strong> — goes directly into your PayPal account, typically within 24 to 48 hours.
        </p>
      </div>

    </div>
  );
}

function SectionHeader({ num, label, title, pillText, pillBg, pillColor }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", marginBottom: "32px", paddingBottom: "20px", borderBottom: "1px solid #d9d7d0" }}>
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "64px", lineHeight: 1, fontWeight: 400, color: "#d9d7d0", flexShrink: 0 }}>
        {num}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3a3a3a", marginBottom: "4px" }}>
          {label}
        </p>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", fontWeight: 400, color: "#1a1a1a" }}>
          {title}{" "}
          <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 500, padding: "2px 8px", borderRadius: "20px", marginLeft: "6px", verticalAlign: "middle", background: pillBg, color: pillColor }}>
            {pillText}
          </span>
        </h2>
      </div>
    </div>
  );
}

function Rules({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
      {items.map((item, i) => {
        const isFirst = i === 0;
        const isLast  = i === items.length - 1;
        const isOnly  = items.length === 1;
        const radius  = isOnly   ? "8px"
                      : isFirst  ? "8px 8px 0 0"
                      : isLast   ? "0 0 8px 8px"
                      : "0";
        return (
          <div
            key={i}
            style={{
              background: "#fff",
              border: "1px solid #d9d7d0",
              borderRadius: radius,
              padding: "20px 24px",
              display: "grid",
              gridTemplateColumns: "28px 1fr",
              gap: "16px",
              alignItems: "start",
            }}
          >
            <div style={{ fontSize: "22px", marginTop: "2px" }}>{item.icon}</div>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a1a", marginBottom: "5px" }}>{item.title}</p>
              <p style={{ fontSize: "13px", color: "#3a3a3a", lineHeight: 1.65 }}>{item.desc}</p>
              {item.callout && item.callout}
            </div>
          </div>
        );
      })}
    </div>
  );
}
