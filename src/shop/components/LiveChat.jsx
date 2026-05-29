import { useState, useEffect, useRef } from "react";

// =============================================================================
// LIVE CHAT — แชทปลอม สุ่มข้อความขึ้นเองทุก 2-5 วินาที
// =============================================================================
// ทำให้รู้สึก "มีคนดูอยู่จริง" ในหน้า Live
// - ข้อความสุ่มจาก pool ด้านล่าง
// - ชื่อผู้ใช้ + สีสุ่ม → ดูเหมือนหลายคนคุยกันจริง
// - auto-scroll ลงล่างเมื่อมีข้อความใหม่
// - ผู้ใช้พิมพ์ส่งข้อความเองได้ (เก็บใน state ไม่ส่งไปไหน)
// =============================================================================

// pool ข้อความสุ่ม (เปลี่ยน-เพิ่มได้ตามใจ)
const FAKE_MESSAGES = [
  "this track is unreal 🔥",
  "greetings from Bangkok!",
  "when's the vinyl drop?",
  "turn up the bass 🎸",
  "been waiting all week for this",
  "😭😭 so good",
  "love the vibe tonight",
  "anyone else from CM?",
  "first time catching them live ✨",
  "this should be on Spotify",
  "what's the next song called?",
  "incredible production quality",
  "🎵🎵🎵",
  "vibes immaculate",
  "where can I buy merch?",
  "playing this on repeat all week",
  "the drums hit different live",
  "shoutout from Phuket 🌴",
  "5 stars no notes",
  "any tour dates coming up?",
  "this is my song!",
  "absolutely lovely",
  "soundcheck was perfect btw",
];

// pool ชื่อผู้ใช้สุ่ม
const FAKE_USERS = [
  "moonchild", "rainynights", "vinylhead", "echo_22", "lostsignal",
  "soft_static", "neon_pulse", "midnightfm", "wavelength", "ghostcore",
  "static__", "lo_fi_kid", "sunsetdrive", "ember.x", "velvet_dreams",
  "cassette42", "fadetoblack", "808s_n_more", "indie_souls", "pulse_rider",
];

// สีสำหรับชื่อ user (สุ่มจาก list — แต่ user คนเดียวกันได้สีเดียวกัน)
const USER_COLORS = ["#7BAEFF", "#D4537E", "#1D9E75", "#BA7517", "#9D6DFF", "#F4A261"];

function getUserColor(username) {
  const seed = username.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  return USER_COLORS[seed % USER_COLORS.length];
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function LiveChat({ liveId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const containerRef = useRef(null);

  // ── สุ่มข้อความขึ้นเอง ──
  useEffect(() => {
    let cancelled = false;

    const pushFakeMessage = () => {
      if (cancelled) return;
      const user = randomFrom(FAKE_USERS);
      const text = randomFrom(FAKE_MESSAGES);
      setMessages((prev) => [
        ...prev.slice(-30), // เก็บแค่ 30 ข้อความล่าสุด (ไม่ให้กิน memory)
        { id: Date.now() + Math.random(), user, text, color: getUserColor(user), self: false },
      ]);
      // ดีเลย์สุ่ม 2-5 วินาที
      const nextDelay = 2000 + Math.random() * 3000;
      setTimeout(pushFakeMessage, nextDelay);
    };

    // ใส่ข้อความเริ่มต้น 4 อันก่อน
    for (let i = 0; i < 4; i++) {
      const user = randomFrom(FAKE_USERS);
      const text = randomFrom(FAKE_MESSAGES);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + Math.random() + i, user, text, color: getUserColor(user), self: false },
      ]);
    }

    // เริ่มสุ่มต่อหลัง 3 วินาที
    const t = setTimeout(pushFakeMessage, 3000);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [liveId]);

  // ── auto-scroll ลงล่างเมื่อมีข้อความใหม่ ──
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  // ── ผู้ใช้ส่งข้อความ ──
  const handleSend = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), user: "you", text, color: "#fc3c44", self: true },
    ]);
    setInput("");
  };

  return (
    <aside className="w-[320px] shrink-0 bg-[#141414] border border-white/[0.08] rounded-lg flex flex-col h-[600px]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/[0.08] flex items-center gap-2 shrink-0">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="text-white/90 text-[14px] font-semibold">Live chat</span>
      </div>

      {/* Messages */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-2"
      >
        {messages.map((m) => (
          <div key={m.id} className="text-[13px] leading-[1.4]">
            <span style={{ color: m.color }} className="font-semibold">
              {m.user}
            </span>
            <span className="text-white/70 ml-1.5">{m.text}</span>
          </div>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="px-3 py-3 border-t border-white/[0.08] flex gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say something…"
          maxLength={140}
          className="flex-1 bg-white/[0.05] border border-white/10 rounded-md px-3 py-2 text-[13px] text-white/85 placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="px-3 py-2 rounded-md bg-accent text-white text-[12px] font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent-hover transition-colors"
        >
          Send
        </button>
      </form>
    </aside>
  );
}
