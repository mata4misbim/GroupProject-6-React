// แนะนำให้เก็บ artist_id ไว้เป็นตัวแปรกลาง ถ้าเป็นข้อมูลจำลองชุดเดียวกัน
const MOCK_ARTIST_ID = "64f1234567890abcdef12345";

export const PRODUCTS = [
  {
    id: "p1", // เพิ่ม id ของ product เองด้วยสำหรับเป็น Primary Key ในฝั่ง Frontend
    artist_id: MOCK_ARTIST_ID,
    type: "single",
    title: "Crimson Dawn (Single)",
    slug: "crimson-dawn",
    description: "เพลงเปิดอัลบั้ม Midnight Echoes",
    price: 30,
    name_your_price: false,
    cover_url: "https://example.com/covers/crimson.jpg",
    status: "published",
    deleted_at: null,
    created_at: "2026-05-09T06:00:00Z", // ใช้ ISO String แทน new Date() จะช่วยให้ข้อมูลคงที่เวลาเทส
    updated_at: "2026-05-09T06:00:00Z",
  },
  {
    id: "p2",
    artist_id: MOCK_ARTIST_ID,
    type: "album",
    title: "Midnight Echoes",
    slug: "midnight-echoes",
    description: "อัลบั้มเต็มชุดแรกของวง",
    price: 250,
    name_your_price: false,
    cover_url: "https://example.com/covers/midnight.jpg",
    status: "published",
    deleted_at: null,
    created_at: "2026-05-09T06:00:00Z",
    updated_at: "2026-05-09T06:00:00Z",
  },
  {
    id: "p3",
    artist_id: MOCK_ARTIST_ID,
    type: "merch",
    title: "Exquisite Cadaver Shirt",
    slug: "exquisite-cadaver-shirt",
    description: "เสื้อยืดวง Old World Vultures",
    price: 980,
    name_your_price: false,
    cover_url: "https://example.com/covers/shirt.jpg",
    status: "published",
    deleted_at: null,
    created_at: "2026-05-09T06:00:00Z",
    updated_at: "2026-05-09T06:00:00Z",
  },
];
