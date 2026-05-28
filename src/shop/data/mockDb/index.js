// =============================================================================
// MOCK DB — INDEX (Barrel Export)
// =============================================================================
// Re-export ทุก collection ในไฟล์เดียว
// → import จาก './mockDb' ได้แทนที่จะ import ทีละไฟล์
//
// Usage:
//   import { products, artists, tracks } from './mockDb'
//   // หรือ
//   import { db } from './mockDb'
//   db.products, db.artists, ...
// =============================================================================

import { users } from "./users";
import { genres } from "./genres";
import { artists } from "./artists";
import { products } from "./products";
import { tracks } from "./tracks";
import { albums } from "./albums";
import { merch } from "./merch";
import { orders } from "./orders";

// Named exports (ใช้แบบ destructured)
export { users, genres, artists, products, tracks, albums, merch, orders };

// Group export (ใช้แบบ namespace)
export const db = {
  users,
  genres,
  artists,
  products,
  tracks,
  albums,
  merch,
  orders,
};

// Default export
export default db;
