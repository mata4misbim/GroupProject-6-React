import { useState } from "react";
import Footer from "../components/common/Footer";

const cardDesigns = [
  {
    id: 1,
    gradient: "linear-gradient(135deg, #1a0533 0%, #9d6dff 50%, #fc3c44 100%)",
    label: "Neon Burst",
  },
  {
    id: 2,
    gradient: "linear-gradient(135deg, #0d0d1a 0%, #00d9ff 60%, #9d6dff 100%)",
    label: "Electric Blue",
  },
  {
    id: 3,
    gradient: "linear-gradient(135deg, #1a0a00 0%, #fc3c44 50%, #ff7c00 100%)",
    label: "Ember",
  },
  {
    id: 4,
    gradient: "linear-gradient(135deg, #001a10 0%, #00ff87 50%, #00d9ff 100%)",
    label: "Aurora",
  },
  {
    id: 5,
    gradient: "linear-gradient(135deg, #0a0015 0%, #6c00ff 40%, #ff0080 100%)",
    label: "Synthwave",
  },
  {
    id: 6,
    gradient: "linear-gradient(135deg, #1a1200 0%, #ffd700 50%, #ff8c00 100%)",
    label: "Gold Rush",
  },
  {
    id: 7,
    gradient: "linear-gradient(135deg, #000d1a 0%, #0066ff 50%, #00d9ff 100%)",
    label: "Deep Ocean",
  },
  {
    id: 8,
    gradient: "linear-gradient(135deg, #0d001a 0%, #ff0080 50%, #ffd700 100%)",
    label: "Candy",
  },
  {
    id: 9,
    gradient: "linear-gradient(135deg, #03030f 0%, #2c2c4e 40%, #9d6dff 100%)",
    label: "Midnight",
  },
  {
    id: 10,
    gradient: "linear-gradient(135deg, #001010 0%, #00d9ff 30%, #00ff87 70%, #ffd700 100%)",
    label: "Prism",
  },
];

const amounts = [
  { value: 200, label: "฿200" },
  { value: 500, label: "฿500" },
  { value: 1000, label: "฿1,000" },
  { value: 2000, label: "฿2,000" },
];

export default function GiftCardsPage() {
  const [selectedCard, setSelectedCard] = useState(cardDesigns[0]);
  const [selectedAmount, setSelectedAmount] = useState(2000);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-[#03030f] font-['Plus_Jakarta_Sans',sans-serif] text-white">
      {/* Page header */}
      <div className="border-b border-white/8 bg-[#0a0a1a] px-[10%] py-12">
        <h1 className="mb-3 text-4xl font-bold tracking-tight">Gift Cards</h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-white/55">
          Give the gift of music. Gift cards can be used to purchase digital
          releases, vinyl, merchandise, and more from independent artists on
          our platform.
        </p>
      </div>

      {/* Main content */}
      <div className="px-[10%] py-14">
        <div className="flex gap-14">
          {/* Left — card preview + design picker */}
          <div className="flex flex-col gap-6" style={{ width: "420px", flexShrink: 0 }}>
            {/* Large card preview */}
            <div
              className="relative flex h-[240px] w-full items-end overflow-hidden rounded-2xl p-6"
              style={{ background: selectedCard.gradient }}
            >
              {/* Decorative circles */}
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-20"
                style={{ background: "rgba(255,255,255,0.3)", filter: "blur(24px)" }}
              />
              <div
                className="pointer-events-none absolute -bottom-8 left-8 h-32 w-32 rounded-full opacity-15"
                style={{ background: "rgba(255,255,255,0.4)", filter: "blur(20px)" }}
              />

              {/* Amount badge */}
              <div className="absolute right-5 top-5 rounded-full bg-black/40 px-3 py-1 text-sm font-semibold backdrop-blur-sm">
                ฿{selectedAmount.toLocaleString()} THB
              </div>

              {/* Brand */}
              <div className="z-10">
                <p className="mb-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/60">
                  Gift Card
                </p>
                <p className="text-2xl font-bold tracking-tight">AUDTLIST</p>
              </div>
            </div>

            {/* Design picker grid */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-white/40">
                Choose a design
              </p>
              <div className="grid grid-cols-5 gap-2">
                {cardDesigns.map((design) => (
                  <button
                    key={design.id}
                    onClick={() => setSelectedCard(design)}
                    className="relative h-12 w-full overflow-hidden rounded-lg transition-all duration-150"
                    style={{
                      background: design.gradient,
                      outline:
                        selectedCard.id === design.id
                          ? "2px solid #fc3c44"
                          : "2px solid transparent",
                      outlineOffset: "2px",
                    }}
                    title={design.label}
                  />
                ))}
              </div>
            </div>

            {/* Info box */}
            <div className="rounded-xl border border-white/8 bg-[#1c1c2e] p-4">
              <p className="mb-1 text-sm font-semibold text-white/80">
                How it works
              </p>
              <ul className="space-y-1.5 text-[13px] text-white/50">
                <li>• Recipient gets a unique code via email</li>
                <li>• Works on all digital and physical purchases</li>
                <li>• Never expires — use anytime</li>
                <li>• Can be combined with other gift cards</li>
              </ul>
            </div>
          </div>

          {/* Right — form */}
          <div className="flex flex-1 flex-col gap-7">
            {/* Amount selector */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-white/70">
                Choose value
              </label>
              <div className="flex gap-3">
                {amounts.map((a) => (
                  <button
                    key={a.value}
                    onClick={() => setSelectedAmount(a.value)}
                    className="rounded-lg border px-5 py-2.5 text-sm font-semibold transition-all duration-150"
                    style={
                      selectedAmount === a.value
                        ? {
                            background: "#fc3c44",
                            borderColor: "#fc3c44",
                            color: "#fff",
                          }
                        : {
                            background: "transparent",
                            borderColor: "rgba(255,255,255,0.15)",
                            color: "rgba(255,255,255,0.65)",
                          }
                    }
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* From */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white/70">
                From
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full rounded-xl border border-white/12 bg-[#1c1c2e] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#9d6dff]"
              />
            </div>

            {/* To */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white/70">
                To (email)
              </label>
              <input
                type="email"
                placeholder="recipient@email.com"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full rounded-xl border border-white/12 bg-[#1c1c2e] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#9d6dff]"
              />
            </div>

            {/* Message */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white/70">
                Message{" "}
                <span className="font-normal text-white/35">(optional)</span>
              </label>
              <textarea
                placeholder="Write a personal message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full resize-none rounded-xl border border-white/12 bg-[#1c1c2e] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#9d6dff]"
              />
            </div>

            {/* Delivery option */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-white/70">
                Delivery
              </label>
              <div className="flex gap-3">
                {["Send by email", "Print it out"].map((opt) => (
                  <button
                    key={opt}
                    className="rounded-lg border border-white/12 bg-[#1c1c2e] px-4 py-2.5 text-sm text-white/60 transition-colors hover:border-white/25 hover:text-white/90"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary + CTA */}
            <div className="mt-2 flex items-center justify-between rounded-2xl border border-white/8 bg-[#1c1c2e] p-5">
              <div>
                <p className="text-xs text-white/40">Total</p>
                <p className="text-2xl font-bold">฿{selectedAmount.toLocaleString()} THB</p>
              </div>
              <button className="rounded-xl bg-[#fc3c44] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e8333b]">
                Continue to checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
