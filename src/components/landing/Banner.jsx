import logoImg from "../../assets/landing-page/logo.png";

const textShadow = "shadow-black/40 [text-shadow:0_1px_8px_var(--tw-shadow-color)]";

export default function Banner() {
  return (
    <div className="absolute left-[4%] top-[18%] z-50 flex flex-col gap-2 md:left-[10%] md:top-[30%] md:gap-6">
      <img src={logoImg} alt="AUDTLIST" className="h-14 w-auto object-contain md:h-37.5" />
      <p className={`font-['Plus_Jakarta_Sans',sans-serif] text-[10px] font-normal tracking-[0.12em] text-white md:ml-16 md:text-[clamp(12px,1.4vw,20px)] md:tracking-[0.18em] ${textShadow}`}>
        DROP YOUR SOUND INTO THE ZONE
      </p>
      <p className={`ml-32 font-['Plus_Jakarta_Sans',sans-serif] text-[clamp(9px,1.1vw,15px)] font-normal leading-[1.8] tracking-widest text-white/90 ${textShadow}`}>
        YOUR SOUND, YOUR SPACE
        <br />
        A SPACE BUILT FOR INDEPENDENT ARTISTS
        <br />
        TO CREATE, RELEASE, AND MONETIZE THEIR
        <br />
        WORK WITHOUT LIMITS.
      </p>
      <p className={`ml-48 font-['Plus_Jakarta_Sans',sans-serif] text-[clamp(9px,1.1vw,15px)] font-normal leading-[1.8] tracking-widest text-white/90 ${textShadow}`}>
        A MARKETPLACE FOR MUSIC, MERCH, AND
        <br />
        CREATIVE IDENTITY
      </p>
    </div>
  );
}
