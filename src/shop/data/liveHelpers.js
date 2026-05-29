// =============================================================================
// LIVE HELPERS — ฟังก์ชันเสริมสำหรับ Live feature
// =============================================================================
// ⭐ เอา 4 ฟังก์ชันนี้ไปเพิ่มท้ายไฟล์ src/data/helpers.js ของเดิม
//    (ไม่ใช่แทนที่ทั้งไฟล์ — แค่เพิ่มต่อท้าย)
// =============================================================================

import { liveStreams } from "./mockDb/liveStreams";
import { findArtistById } from "./helpers"; // ของเดิม

// หา live ตาม id
export const findLiveById = (id) => liveStreams.find((l) => l._id === id);

// สุ่ม live ขึ้นมา 1 อัน (สำหรับการ์ดหน้าแรก)
// ใช้ Date เป็น seed เพื่อให้ refresh เร็วๆ ไม่เปลี่ยน (เปลี่ยนทุก 5 นาที)
export const getRandomLive = () => {
  const seed = Math.floor(Date.now() / (5 * 60 * 1000));
  const idx = seed % liveStreams.length;
  return liveStreams[idx];
};

// เอา live ทั้งหมดพร้อมข้อมูล artist พ่วงมา
export const getAllLivesWithArtist = () => {
  return liveStreams.map((l) => ({
    ...l,
    artist: findArtistById(l.artist_id),
  }));
};

// ===========================================================================
// คำนวณ timestamp ปัจจุบันของ live → ทำให้ทุกคนเห็นจุดเดียวกัน
// ===========================================================================
//
// หลักคิด: live เริ่มเมื่อ started_at → ปัจจุบันผ่านไปกี่วินาที
//          เอามา modulo ความยาวคลิป → จุดที่ควรเล่นใน loop
//
// ตัวอย่าง: คลิปยาว 10 นาที (600 วิ), live เริ่ม 47 นาทีก่อน (2820 วิ)
//          2820 % 600 = 420 วิ → ตอนนี้ทุกคนดูที่ 7:00 ของ loop
//
export const getCurrentLiveTimestamp = (startedAt, clipDurationSec) => {
  const elapsedMs = Date.now() - new Date(startedAt).getTime();
  const elapsedSec = Math.max(0, Math.floor(elapsedMs / 1000));
  return elapsedSec % clipDurationSec;
};

// คำนวณว่า live ผ่านไปกี่นาที (สำหรับโชว์ "Live for 47 min")
export const getLiveElapsedMinutes = (startedAt) => {
  const elapsedMs = Date.now() - new Date(startedAt).getTime();
  return Math.max(0, Math.floor(elapsedMs / 60000));
};

// คำนวณจำนวนคนดูสุ่มแบบ "ดูสมจริง"
// ใช้ live_id + ชั่วโมง เป็น seed → เลขเปลี่ยนทุกชั่วโมง ไม่กระตุก
export const getViewerCount = (liveId) => {
  const hourSeed = Math.floor(Date.now() / (60 * 60 * 1000));
  const idSeed = liveId.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  return 800 + ((hourSeed * idSeed) % 2400); // 800–3200 คน
};
