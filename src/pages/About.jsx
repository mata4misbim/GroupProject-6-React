import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";

const stats = [
  { value: "1,200+", label: "Independent Artists" },
  { value: "48,000+", label: "Albums & Tracks" },
  { value: "120+", label: "Countries Reached" },
  { value: "82%", label: "Revenue to Artists" },
];

const team = [
  {
    name: "Akkarawin Suchaichit",
    role: "Tech leader & Co-Founder",
    bio: "ใครก็ไม่รู้ที่เดินผ่านทางมา.",
    avatar: "https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/689829239_953654557377465_7521679864309062780_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=tDUzHRvKoYIQ7kNvwGPoIir&_nc_oc=AdrxrswvO68BE4pa8lh9YSlrgYPyMA9BcjNPHkECGh6VoWqnq5e87794-aPNbx87wL588dnuk3KbFLgLGs1Le8cX&_nc_zt=23&_nc_ht=scontent.fkkc3-1.fna&_nc_gid=UOyG1dGINHSEgy0QyuVzYA&_nc_ss=7b2a8&oh=00_Af4kEfj2eWGCPQYbpOslMzgQp_gGXd3RBWW3nq4csZ18qg&oe=6A150100",
  },
  {
    name: "Jinvaramas Piklunklin",
    role: "Product lead & Co-Founder",
    bio: "Full-stack engineer obsessed with audio. Built the first version of the player in a weekend, hasn't slept properly since.",
    avatar: "https://placehold.co/120x120/2c2c2e/fc3c44?text=JP",
  },
  {
    name: "Kasidate Sae-eaw",
    role: "Tech agile coach",
    bio: "Worked with independent labels across Southeast Asia for a decade. Knows every artist personally — or almost.",
    avatar: "https://placehold.co/120x120/2c2c2e/fc3c44?text=KS",
  },
  {
    name: "Thaweeratch Khongrachata",
    role: "Product designer",
    bio: "Obsessed with dark UIs and good typography. Thinks the best interface is the one that gets out of the music's way.",
    avatar: "https://placehold.co/120x120/2c2c2e/fc3c44?text=TK",
  },
  {
    name: "Mata Chobmee",
    role: "Backend engineer",
    bio: "Keeps the servers running and the money flowing. If you see a smooth checkout, you can thank him.",
    avatar: "https://placehold.co/120x120/2c2c2e/fc3c44?text=MC",
  },
  {
    name: "Piyawat Kamton",
    role: "Team coordinator",
    bio: "Immensely organized and somehow keeps us all on track. If you email support, there's a good chance you'll hear back from him.",
    avatar: "https://placehold.co/120x120/2c2c2e/fc3c44?text=PK",
  },
];

const values = [
  {
    icon: "🎵",
    title: "Artists First",
    body: "Every product decision starts with one question: does this help the artist? We take a smaller cut so creators keep more of what they make.",
    bg: "",
  },
  {
    icon: "🔊",
    title: "Hear Before You Buy",
    body: "Music is something you feel, not read about. Every release on Audtlist comes with previews so you know exactly what you're supporting.",
    bg: "",
  },
  {
    icon: "📦",
    title: "Own It for Real",
    body: "Vinyl, CDs, merch — things you can hold. We believe physical music carries meaning that streams can't replicate.",
    bg: "",
  },
  {
    icon: "🌏",
    title: "Local Scenes, Global Reach",
    body: "Born in Bangkok, loved everywhere. We spotlight Southeast Asian artists while making it easy for the world to find them.",
    bg: "",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] font-['Plus_Jakarta_Sans',sans-serif]">

      {/* Hero */}
      <section className="relative overflow-hidden px-[10%] pt-24 pb-20">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, #fc3c44 0%, transparent 60%), radial-gradient(circle at 70% 70%, #fc3c44 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-3xl">
          <p className="text-accent text-[13px] font-semibold tracking-[0.12em] uppercase mb-4">
            Our story
          </p>
          <h1 className="text-white text-[48px] font-bold leading-[1.1] tracking-tight mb-6">
            Built for artists.
            <br />
            <span className="text-white/40">Loved by listeners.</span>
          </h1>
          <p className="text-white/60 text-[17px] leading-relaxed max-w-xl">
            Audtlist started as a simple frustration — independent musicians
            were spending years making music only to hand the majority of every
            sale to a platform that didn't know their name. We built something
            different.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-[10%] py-16 border-y border-white/8 bg-[#141414]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[1200px]">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-white text-accent text-[36px] font-bold leading-none mb-1">
                {s.value}
              </p>
              <p className="text-white/45 text-[13px]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="px-[10%] py-20 max-w-[1200px]">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-accent text-[13px] font-semibold tracking-[0.12em] uppercase mb-4">
              Mission
            </p>
            <h2 className="text-white text-[32px] font-bold leading-tight mb-5">
              Music should sustain the people who make it.
            </h2>
            <p className="text-white/55 text-[15px] leading-relaxed mb-4">
              Streaming pays fractions of a cent per play. We offer a
              marketplace where fans buy directly — downloads, vinyl, merch —
              and artists keep 82% of every transaction.
            </p>
            <p className="text-white/55 text-[15px] leading-relaxed">
              No algorithms deciding who gets heard. No label gatekeeping. Just
              music, money back to creators, and a community that actually
              cares.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <img
              src="https://placehold.co/600x400/1c1c1e/fc3c44?text=Music+for+Everyone"
              alt="Audtlist mission"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-[10%] py-20 bg-[#141414] border-y border-white/8">
        <div className="max-w-[1200px]">
          <p className="text-accent text-[13px] font-semibold tracking-[0.12em] uppercase mb-4">
            What we believe
          </p>
          <h2 className="text-white text-[32px] font-bold mb-12">Our values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="relative rounded-2xl p-6 border border-white/8 hover:border-white/15 transition-colors overflow-hidden"
                style={{
                  backgroundColor: "#2c2c2e",
                  ...(v.bg && {
                    backgroundImage: `url(${v.bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }),
                }}
              >
                {v.bg && (
                  <div className="absolute inset-0 bg-black/60 rounded-2xl" />
                )}
                <div className="relative z-10">
                  <span className="text-3xl block mb-4">{v.icon}</span>
                  <h3 className="text-white font-semibold text-[16px] mb-2">
                    {v.title}
                  </h3>
                  <p className="text-white/50 text-[13px] leading-relaxed">
                    {v.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-[10%] py-20 max-w-[1200px]">
        <p className="text-accent text-[13px] font-semibold tracking-[0.12em] uppercase mb-4">
          The team
        </p>
        <h2 className="text-white text-[32px] font-bold mb-12">
          People behind the music
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-[#2c2c2e] rounded-2xl p-6 border border-white/8"
            >
              <div className="w-20 h-20 rounded-full mb-4 overflow-hidden ring-2 ring-accent/40 ring-offset-2 ring-offset-[#2c2c2e]">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-white font-semibold text-[15px] mb-0.5">
                {member.name}
              </h3>
              <p className="text-accent text-[12px] font-medium mb-3">
                {member.role}
              </p>
              <p className="text-white/50 text-[13px] leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-[10%] py-20 bg-[#141414] border-t border-white/8">
        <div className="max-w-2xl">
          <h2 className="text-white text-[32px] font-bold mb-4">
            Ready to explore?
          </h2>
          <p className="text-white/50 text-[15px] mb-8">
            Browse thousands of independent releases — or list yours. Every
            purchase goes directly to the artist.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="px-6 py-3 rounded-full bg-accent text-white font-semibold text-[15px] hover:bg-[#e8333b] shadow-[0_4px_16px_rgba(252,60,68,0.35)] transition-all no-underline"
            >
              Browse Music
            </Link>
            <a
              href="mailto:hello@audtlist.com"
              className="px-6 py-3 rounded-full border border-white/25 text-white/80 font-semibold text-[15px] hover:border-white/50 hover:bg-white/8 transition-all no-underline"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
      <Footer simple />
    </div>
  );
}
