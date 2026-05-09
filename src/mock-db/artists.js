export const ARTISTS = [
  {
    id: "a1",                    // ID ของ Profile นี้เอง
    user_id: "u2",               // เชื่อมกลับไปที่ user_type: "ARTIST" ในไฟล์ users.js
    slug: "old-world-vultures",
    name: "Old World Vultures",
    bio: "วงดนตรี indie rock จากกรุงเทพ",
    location: "Bangkok, Thailand",
    banner_url: "https://example.com/banners/owv.jpg",
    genre_ids: ["g1", "g8"],      // เชื่อมไปที่ Rock (g1) และ Indie (g8) ในไฟล์ genres.js
    status: "active",
    shipping_address: {
      line1: "123 ซ.ลาดพร้าว 71",
      city: "กรุงเทพ",
      postal_code: "10230",
      country: "TH"
    },
    payout_method: {
      type: "promptpay",
      account_info: {
        phone_number: "0812345678",
        account_name: "Old World Vultures"
      }
    },
    payout_balance: 0,
    created_at: "2026-05-09T06:00:00Z",
    updated_at: "2026-05-09T06:00:00Z"
  }
];