import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";

export default function TermsConditions() {
  const [activeTab, setActiveTab] = useState("fan");

  const tabs = [
    { role: "fan",    label: "Fans",    color: "#1a1a40" },
    { role: "artist", label: "Artists", color: "#2d2d60" },
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#f7f8fc", color: "#1a1a2e", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, #f0f1fb 0%, #eef0fb 100%)", color: "#1a1a2e", padding: "56px 24px 48px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em" }}>
          Terms &amp; <em style={{ fontStyle: "italic" }}>Conditions</em>
        </h1>
        <p style={{ marginTop: "10px", fontSize: "15px", color: "#5a5a7a" }}>
          Please read these terms carefully before using Audtlist.
        </p>
      </div>

      <div style={{ padding: "24px 24px 0" }}>
        <Link to="/"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#fff", textDecoration: "none", fontSize: "13px", fontWeight: 600, background: "#1a1a40", borderRadius: "8px", padding: "8px 18px", letterSpacing: "0.03em", boxShadow: "0 2px 8px rgba(26,26,64,0.2)", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#0a0a1a"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#1a1a40"; }}
        >
          ← Back to home
        </Link>
      </div>

      {/* MAIN */}
      <main style={{ flex: 1, maxWidth: "860px", margin: "0 auto", width: "100%", padding: "32px 24px 80px" }}>

        {/* ROLE TABS */}
        <div style={{ display: "flex", border: "1px solid #e4e4ef", borderRadius: "8px", overflow: "hidden", marginBottom: "48px" }}>
          {tabs.map(({ role, label, color }, i) => (
            <button
              key={role}
              onClick={() => setActiveTab(role)}
              style={{
                flex: 1,
                padding: "10px 12px",
                border: "none",
                borderRight: i < tabs.length - 1 ? "1px solid #e4e4ef" : "none",
                background: activeTab === role ? color : "#fff",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                color: activeTab === role ? "#fff" : "#5a5a7a",
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

      <Footer simple />

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
      background: "#f0f1fb",
      border: "1px solid #d0d2f0",
      borderRadius: "8px",
    }}>

      {/* PIE CHART */}
      {/*
        Circle: center (100,100) r=80  — angles in SVG convention (0°=right, CW+)
        Slices start from top (270°) going clockwise:
          Slice 1 "your share"   85%  → ends at 216°  path large-arc=1
          Slice 2 "platform fee" 10%  → ends at 252°  path large-arc=0
          Slice 3 "payment fees"  5%  → ends at 270°  path large-arc=0
        Key coordinates:
          top       = (100, 20)
          216°      = (35.3, 53.0)
          252°      = (75.3, 23.9)
      */}
      <svg width="170" height="170" viewBox="0 0 200 200" style={{ flexShrink: 0 }}>
        <path d="M 100 100 L 100 20 A 80 80 0 1 1 35.3 53 Z"     fill="#2d8c6e" />
        <path d="M 100 100 L 35.3 53 A 80 80 0 0 1 75.3 23.9 Z"  fill="#1b5e47" />
        <path d="M 100 100 L 75.3 23.9 A 80 80 0 0 1 100 20 Z"   fill="#91c4b4" />

        {/* white dividers */}
        <line x1="100" y1="100" x2="100"  y2="20"   stroke="white" strokeWidth="1.5" />
        <line x1="100" y1="100" x2="35.3" y2="53"   stroke="white" strokeWidth="1.5" />
        <line x1="100" y1="100" x2="75.3" y2="23.9" stroke="white" strokeWidth="1.5" />

        {/* label "your share" — midpoint angle 63°, r=45 → (120, 140) */}
        <rect x="93"  y="130" width="54" height="16" rx="2" fill="#1a1a40" />
        <text x="120" y="142" textAnchor="middle" fontSize="9.5" fill="white" fontFamily="Plus Jakarta Sans, sans-serif">your share</text>

        {/* label "platform fee" — midpoint angle 234°, r=50 → (71, 60) */}
        <rect x="42"  y="52"  width="58" height="16" rx="2" fill="#1a1a40" />
        <text x="71"  y="64"  textAnchor="middle" fontSize="9.5" fill="white" fontFamily="Plus Jakarta Sans, sans-serif">platform fee</text>

        {/* label "payment fees" — midpoint angle 261°, r=60 → (91, 41) */}
        <rect x="61"  y="33"  width="60" height="16" rx="2" fill="#1a1a40" />
        <text x="91"  y="45"  textAnchor="middle" fontSize="9.5" fill="white" fontFamily="Plus Jakarta Sans, sans-serif">payment fees</text>
      </svg>

      {/* TEXT */}
      <div style={{ flex: 1, minWidth: "180px" }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "22px", color: "#1a1a2e", marginBottom: "10px" }}>
          Pricing
        </p>
        <p style={{ fontSize: "13px", color: "#5a5a7a", lineHeight: 1.65, marginBottom: "10px" }}>
          Artist accounts are free. We make money through a <strong>flat 10% platform fee on all products</strong> — music and merch alike (payment processor fees are separate and vary by transaction size).
        </p>
      </div>

    </div>
  );
}

function SectionHeader({ num, label, title, pillText, pillBg, pillColor }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", marginBottom: "32px", paddingBottom: "20px", borderBottom: "1px solid #e4e4ef" }}>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "64px", lineHeight: 1, fontWeight: 400, color: "#c8c8ef", flexShrink: 0 }}>
        {num}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8585a8", marginBottom: "4px" }}>
          {label}
        </p>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "28px", fontWeight: 600, color: "#1a1a2e" }}>
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
              border: "1px solid #e4e4ef",
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
              <p style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a2e", marginBottom: "5px" }}>{item.title}</p>
              <p style={{ fontSize: "13px", color: "#5a5a7a", lineHeight: 1.65 }}>{item.desc}</p>
              {item.callout && item.callout}
            </div>
          </div>
        );
      })}
    </div>
  );
}
