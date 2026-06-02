import {
  validateCoverFile,
  validateTitle,
  validateDescription,
  validatePrice,
  validateAudioFile,
} from "./uploadValidation";

export const ALBUM_LIMITS = {
  MIN_TRACKS: 2,
  MAX_TRACKS: 30,
};

export const validateTrack = (track, index) => {
  const prefix = `Track ${index + 1}`;
  if (track.type === "existing") {
    if (!track.track_id) return `${prefix}: missing reference to single`;
    if (!track.title) return `${prefix}: missing title`;
    return null;
  }
  if (track.type === "new") {
    if (!track.file) return `${prefix}: please choose an audio file`;
    const audioErr = validateAudioFile(track.file);
    if (audioErr) return `${prefix}: ${audioErr.toLowerCase()}`;
    if (!track.title || !track.title.trim()) return `${prefix}: please enter track title`;
    return null;
  }
  return `${prefix}: unknown track type`;
};

export const validateTracklist = (tracks) => {
  if (!Array.isArray(tracks) || tracks.length === 0) return "Tracklist is required — add at least 2 tracks";
  if (tracks.length < ALBUM_LIMITS.MIN_TRACKS) return `Album must have at least ${ALBUM_LIMITS.MIN_TRACKS} tracks (1 track = single)`;
  if (tracks.length > ALBUM_LIMITS.MAX_TRACKS) return `Too many tracks (max ${ALBUM_LIMITS.MAX_TRACKS})`;
  const existingIds = tracks.filter((t) => t.type === "existing").map((t) => t.track_id);
  const dupes = existingIds.filter((id, i) => existingIds.indexOf(id) !== i);
  if (dupes.length > 0) return `Duplicate track selected (${dupes[0]}) — pick each single only once`;
  return null;
};

export const validateAlbumForm = (form) => {
  const errors = {
    cover: validateCoverFile(form.cover),
    title: validateTitle(form.title),
    description: validateDescription(form.description),
    price: validatePrice(form.price, form.nameYourPrice),
    tracklist: validateTracklist(form.tracks),
  };
  if (!errors.tracklist && form.tracks) {
    for (let i = 0; i < form.tracks.length; i++) {
      const trackErr = validateTrack(form.tracks[i], i);
      if (trackErr) { errors.tracklist = trackErr; break; }
    }
  }
  const cleaned = Object.fromEntries(Object.entries(errors).filter(([, v]) => v !== null));
  return { isValid: Object.keys(cleaned).length === 0, errors: cleaned };
};
