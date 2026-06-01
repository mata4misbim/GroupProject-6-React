## สถานะโปรเจกต์

✅ **พร้อมใช้งาน**

- Nav bar → ทำงาน
- Footer → ทำงาน
- Dark mode → รองรับ
- Responsive → มี flex-wrap

🔄 **พัฒนาต่อ**

- เพิ่มหน้าสินค้า (Products)
- เพิ่มหน้ารายละเอียดสินค้า
- เพิ่มระบบ Cart
- เชื่อมต่อ API / Database



# Music Store - เว็บไซต์ขายเครื่องดนตรี

## ภาพรวมโปรเจกต์

| รายการ        | รายละเอียด                  |
| ------------- | --------------------------- |
| **Framework** | React 19 + Vite 8           |
| **ภาษา**      | JavaScript (JSX)            |
| **CSS**       | Vanilla CSS + CSS Variables |
| **Port**      | http://localhost:5173       |

---

## โครงสร้างไฟล์

```
src/
├── main.jsx          # Entry point หลัก
├── App.jsx           # Root component
├── App.css           # Global styles
├── index.css         # Reset & base styles
└── components/
    ├── Nav.jsx       # Navigation bar
    └── Footer.jsx    # Footer
```

---

## ไฟล์และการทำงาน

### 1. [main.jsx](src/main.jsx)

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

**หน้าที่:**

- เป็นจุดเริ่มต้นของ React app
- `createRoot` → สร้าง React root จาก DOM element `#root`
- `StrictMode` → ช่วยตรวจจับ code ที่ล้าสมัยและ side effects ที่อาจมีปัญหา

---

### 2. [App.jsx](src/App.jsx)

```jsx
import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

export default function App() {
  return (
    <>
      <Nav />
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <h1>ยินดีต้อนรับสู่ Music Store 🎵</h1>
      </main>
      <Footer />
    </>
  );
}
```

**หน้าที่:**

- Root component หลักของแอป
- รวม Nav + เนื้อหาหลัก + Footer เข้าด้วยกัน
- ใช้ `<>` (Fragment) เพื่อ return หลาย element โดยไม่ต้องมี wrapper div

---

### 3. [components/Nav.jsx](src/components/Nav.jsx)

```jsx
export default function Nav() {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <h1 style={styles.logo}>🎵 Music Store</h1>
        <ul style={styles.menu}>
          <li>
            <a href="#" style={styles.link}>
              หน้าหลัก
            </a>
          </li>
          <li>
            <a href="#" style={styles.link}>
              สินค้า
            </a>
          </li>
          <li>
            <a href="#" style={styles.link}>
              ติดต่อ
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
```

**หน้าที่:** แสดง navigation bar ด้านบน

**Styles:**
| Property | Value |
|----------|-------|
| Background | `#222` (ดำ) |
| Logo color | `#f0c040` (ทอง) |
| Layout | Flexbox (space-between) |

---

### 4. [components/Footer.jsx](src/components/Footer.jsx)

```jsx
export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.title}>เกี่ยวกับเรา</h3>
          <p style={styles.text}>...</p>
        </div>
        <div style={styles.section}>
          <h3 style={styles.title}>ลิงก์</h3>
          ...
        </div>
        <div style={styles.section}>
          <h3 style={styles.title}>ติดต่อ</h3>
          ...
        </div>
      </div>
      <div style={styles.copyright}>
        © 2026 Music Store. All rights reserved.
      </div>
    </footer>
  );
}
```

**หน้าที่:** แสดง footer ด้านล่าง

**โครงสร้าง 3 คอลัมน์:**

1. **เกี่ยวกับเรา** - คำอธิบายร้าน
2. **ลิงก์** - ลิงก์นำทาง
3. **ติดต่อ** - ข้อมูลติดต่อ (ที่อยู่, เบอร์, อีเมล)

**Styles:**
| Property | Value |
|----------|-------|
| Background | `#333` (เทาเข้ม) |
| Title color | `#f0c040` (ทอง) |
| Layout | Flexbox + flex-wrap (responsive) |

---

### 5. [App.css](src/App.css)

```css
:root {
  --font-display: "Caesar Dressing", system-ui;
  --font-body: "TikTok Sans", "Noto Sans Thai", sans-serif;
  --font-ui: "Montserrat", sans-serif;

  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-md: 21px;
  --text-lg: 28px;
  --text-xl: 37px;
  --text-2xl: 50px;

  --color-bg: #e7f2ef;
  --color-accent: #6c63ff;
  --color-text-dark: #0f172a;
  --radius: 12px;
}
```

**หน้าที่:** กำหนด CSS variables สำหรับ:

- **Fonts** → Caesar Dressing, TikTok Sans, Noto Sans Thai, Montserrat
- **Font sizes** → xs, sm, base, md, lg, xl, 2xl
- **Colors** → พื้นหลัง, accent, ข้อความ
- **Spacing** → ระยะห่าง (1-8)

---

### 6. [index.css](src/index.css)

```css
:root {
  --text: #6b6375;
  --text-h: #08060d;
  --bg: #fff;
  --accent: #aa3bff;
  ...
}

@media (prefers-color-scheme: dark) {
  :root {
    --text: #9ca3af;
    --text-h: #f3f4f6;
    --bg: #16171d;
    ...
  }
}
```

**หน้าที่:**

- Base styles และ CSS reset
- กำหนดตัวแปรสีหลัก
- **Dark mode support** → ตรวจจับ `prefers-color-scheme: dark` และเปลี่ยนสีอัตโนมัติ

---

## การติดตั้งและรันโปรเจกต์

```bash
# ติดตั้ง dependencies
npm install

# รัน development server
npm run dev

# Build สำหรับ production
npm run build

# Preview production build
npm run preview
```

---

## เทคโนโลยีที่ใช้

| เทคโนโลยี    | เวอร์ชัน |
| ------------ | -------- |
| React        | ^19.2.5  |
| Vite         | ^8.0.10  |
| Tailwind CSS | ^4.2.4   |
| ESLint       | ^10.2.1  |

---

