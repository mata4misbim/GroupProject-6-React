import logoImg from "../../assets/landing-page/logo.png";

const textShadow = "shadow-black/40 [text-shadow:0_1px_8px_var(--tw-shadow-color)]";

export default function Banner() {
  return (
    <div className="absolute left-[60%] top-[40%] z-50 flex flex-col gap-6 whitespace-nowrap">
      <img src={logoImg} alt="AUDTLIST" className="h-[150px] w-auto object-contain" />
      <p
        className={`ml-16 mt-4 font-['Space_Mono',monospace] text-xl font-normal tracking-[0.18em] text-white ${textShadow}`}
      >
        DROP YOUR SOUND INTO THE ZONE
      </p>
      <p
        className={`ml-32 font-['Space_Mono',monospace] text-[15px] font-normal leading-[1.8] tracking-[0.1em] text-white/90 ${textShadow}`}
      >
        YOUR SOUND, YOUR SPACE
        <br />
        A SPACE BUILT FOR INDEPENDENT ARTISTS
        <br />
        TO CREATE, RELEASE, AND MONETIZE THEIR
        <br />
        WORK WITHOUT LIMITS.
      </p>
      <p
        className={`ml-48 font-['Space_Mono',monospace] text-[15px] font-normal leading-[1.8] tracking-[0.1em] text-white/90 ${textShadow}`}
      >
        A MARKETPLACE FOR MUSIC, MERCH, AND
        <br />
        CREATIVE IDENTITY
      </p>
    </div>
  );
}
