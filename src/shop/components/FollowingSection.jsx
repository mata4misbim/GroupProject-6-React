import { Link } from "react-router-dom";
import { useFollow } from "../../contexts/FollowContext";
import { findArtistById } from "../data/helpers";

export default function FollowingSection() {
  const { followedArtistIds, followCount } = useFollow();

  const artists = followedArtistIds
    .map((id) => findArtistById(id))
    .filter(Boolean);

  if (followCount === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-white/40 text-[14px]">
          You're not following any artists yet
        </p>
        <Link
          to="/shop"
          className="text-accent text-[13px] hover:underline mt-1 inline-block"
        >
          Discover artists →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-white text-[1.2rem] font-bold mb-4">
        Following ({followCount})
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {artists.map((artist) => (
          <Link
            key={artist._id}
            to={`/artist/${artist.slug}`}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-white/15 transition-all no-underline"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden bg-bg-card">
              <img
                src={artist.banner_url?.replace("1200x400", "200x200")}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-white/85 text-[13px] font-medium text-center truncate w-full">
              {artist.name}
            </p>
            <p className="text-white/40 text-[11px] text-center truncate w-full">
              {artist.location}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
