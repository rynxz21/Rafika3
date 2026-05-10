/* ============================================================
   📁 gallery.config.js
   Semua data konten ada di sini.
   Untuk menambah foto/video/kenangan/timeline:
   cukup tambah objek baru di array yang sesuai.
   JANGAN ubah nama key yang sudah ada.
============================================================ */

/* ----------------------------------------------------------
   🖼️ GALERI UTAMA
   type: "image" | "video"
   color: warna aksen frame (hex)
---------------------------------------------------------- */
export const galleryData = [
  {
    id: 1,
    url: "/foto1.jpg",
    type: "image",
    quote: "Setiap senyummu adalah alasan hariku jauh lebih indah.",
    color: "#ffb6d9",
  },
  {
    id: 2,
    url: "/video1.mp4",
    type: "video",
    quote: "Momen favorit yang selalu ingin aku putar ulang.",
    color: "#ffd36e",
  },
  {
    id: 3,
    url: "/foto2.jpg",
    type: "image",
    quote: "Dalam diam pun, pesonamu selalu punya cara untuk bercerita.",
    color: "#ffffff",
  },
  {
    id: 4,
    url: "/foto3.jpg",
    type: "image",
    quote: "Terima kasih sudah menjadi bagian paling berharga dalam hidupku.",
    color: "#ff9ed2",
  },
  {
    id: 11,
    url: "/diy2.jpeg",
    type: "image",
    quote: "Setiap momen sederhana bersamamu terasa begitu istimewa.",
    color: "#2f99db",
  },
  {
    id: 12,
    url: "/mirror.jpeg",
    type: "image",
    quote: "Kadang setiap cermin bisa memantulkan keindahan yang berbeda, seperti kamu yang selalu berhasil membuatku terpesona.",
    color: "#9effd0",
  },
  {
    id: 13,
    url: "/motor.jpg",
    type: "image",
    quote: "Motor ini mungkin kecil, tapi kenangan yang kita buat di atasnya terasa begitu besar.",
    color: "#32079f",
  },
  // ✏️ Tambah foto/video baru di sini:
  // { id: 11, url: "/foto_baru.jpg", type: "image", quote: "...", color: "#ffb6d9" },
]

/* ----------------------------------------------------------
   🔐 GALERI SECRET
   Hanya muncul setelah password benar
---------------------------------------------------------- */
export const secretData = [
  {
    id: 5,
    url: "/foto4.jpg",
    type: "image",
    quote: "Dunia terasa lebih tenang saat aku bersamamu.",
    color: "#ffd86e",
  },
  {
    id: 6,
    url: "/foto5.jpg",
    type: "image",
    quote: "Kehadiranmu adalah anugerah yang selalu aku syukuri.",
    color: "#ffffff",
  },
  {
    id: 7,
    url: "/foto6.jpg",
    type: "image",
    quote: "Tetaplah di sini, menjadi bintang paling terang di langitku.",
    color: "#ffb7df",
  },
  {
    id: 8,
    url: "/video2.mp4",
    type: "video",
    quote: "Semua kenangan ini terasa hidup lagi.",
    color: "#ffd36e",
  },
  {
    id: 9,
    url: "/video3.mp4",
    type: "video",
    quote: "Aku ingin waktu berjalan lebih lambat saat bersamamu.",
    color: "#ffffff",
  },
  {
    id: 10,
    url: "/video4.mp4",
    type: "video",
    quote: "Cerita kecil yang selalu ingin aku simpan.",
    color: "#ff9ed2",
  },
  // ✏️ Tambah secret foto/video baru di sini
]

/* ----------------------------------------------------------
   🌌 CONSTELLATION MAP
   Setiap bintang = satu kenangan.
   x, y: posisi dalam persen (0–100) dari layar
   size: ukuran bintang (1 = kecil, 3 = besar)
   Bintang yang terhubung (lines) didefinisikan
   di constellationLines di bawah.
---------------------------------------------------------- */
export const constellationStars = [
  {
    id: "s1",
    x: 20,
    y: 25,
    size: 2.2,
    label: "Pertemuan Pertama",
    message: "Saat itu aku tidak tahu, bahwa hari itu akan mengubah segalanya. Kamu datang seperti bintang jatuh yang langsung membuatku terpana.",
    color: "#ffb6d9",
  },
  {
    id: "s2",
    x: 42,
    y: 15,
    size: 1.6,
    label: "Kesan Pertama",
    message: "AGAK TAKUT, tapi LUCU BANGET baru pertama kali liat langsung dibelikan susu wkwkwk.",
    color: "#ffffff",
  },
  {
    id: "s3",
    x: 68,
    y: 22,
    size: 2.0,
    label: "Momen Bersama",
    message: "kalo orang lain ketawa sampe perut sakit, kita perut sakitnya karena makanan ga datang datang hahah.",
    color: "#ffd36e",
  },
  {
    id: "s4",
    x: 15,
    y: 52,
    size: 1.4,
    label: "Momen Diam",
    message: "Diam bersamamu terasa lebih hangat dari apapun yah meski agak canggung.",
    color: "#ff9ed2",
  },
  {
    id: "s5",
    x: 38,
    y: 44,
    size: 2.8,
    label: "Bintang Utama",
    message: "Di tengah semua keindahan dunia ini, kamu yang paling bersinar.",
    color: "#ffb7df",
    isMain: true, // bintang utama — lebih besar & bercahaya
  },
  {
    id: "s6",
    x: 65,
    y: 50,
    size: 1.8,
    label: "motor",
    message: "kamu sampe cari tutorial naik motorku hahah.",
    color: "#ffffff",
  },
  {
    id: "s7",
    x: 82,
    y: 38,
    size: 1.5,
    label: "Foto Pertama",
    message: "Aku suka diajak foto karena sebenarnya aku tidak ingin melupakan keanangan hari itu.",
    color: "#ffd86e",
  },
  {
    id: "s8",
    x: 25,
    y: 72,
    size: 1.6,
    label: "Malam Yang Dingin",
    message: "Malam yang dingin, tapi hangat karena kamu.",
    color: "#ffb6d9",
  },
  {
    id: "s9",
    x: 55,
    y: 70,
    size: 2.0,
    label: "Kata yang Diucapkan",
    message: "Akhirnya terucap juga dan dunia terasa jauh lebih ringan.",
    color: "#ff9ed2",
  },
  {
    id: "s10",
    x: 78,
    y: 68,
    size: 1.3,
    label: "Hari Ini",
    message: "Setiap hari bersamamu adalah kenangan baru yang ingin aku simpan.",
    color: "#ffffff",

  },
  // ✏️ Tambah bintang/kenangan baru di sini:
  // { id: "s11", x: 50, y: 85, size: 1.5, label: "...", message: "...", color: "#ffb6d9" },
]

/* ----------------------------------------------------------
   Garis penghubung antar bintang (konstelasi)
   Isi dengan pasangan id bintang yang ingin dihubungkan
---------------------------------------------------------- */
export const constellationLines = [
  ["s1", "s2"],
  ["s2", "s3"],
  ["s1", "s4"],
  ["s4", "s5"],
  ["s2", "s5"],
  ["s5", "s6"],
  ["s3", "s7"],
  ["s6", "s7"],
  ["s4", "s8"],
  ["s8", "s9"],
  ["s5", "s9"],
  ["s6", "s9"],
  ["s9", "s10"],
  ["s7", "s10"],
]

/* ----------------------------------------------------------
   📅 TIMELINE KENANGAN
   date: tanggal bebas (string, bisa "14 Feb 2024" dll)
   caption: deskripsi singkat momen
   url: opsional — foto/video yang menyertai momen ini
   type: "image" | "video" | null (jika tanpa media)
   mood: "sweet" | "funny" | "precious" | "magical"
         → menentukan warna aksen card
---------------------------------------------------------- */
export const timelineData = [
  {
    id: "t1",
    date: "Date Pertama",
    label: "Pertemuan",
    caption: "Waktu berjalan aneh hari itu — terlalu cepat saat bersamamu, terlalu lambat saat kamu pergi.",
    url: "/first.jpeg",
    type: "image",
    mood: "precious",
  },
  {
    id: "t2",
    date: "Titik balik",
    label: "Pesan candaan",
    caption: "ketika itu ternyata kamu pernah minta bonceng, dan skrg kesampaian.",
    url: "/chat.jpg",
    type: "image",
    mood: "sweet",
  },
  {
    id: "t3",
    date: "Boncengan Pertama",
    label: "Momen Bersama",
    caption: "Ciee kesampaian naik motor bareng, walaupun cuma sebentar tapi itu momen yang lucu banget buat diingat.",
    url: "/motor.jpg",
    type: "image",
    mood: "funny",
  },
  {
    id: "t4",
    date: "Date kedua",
    label: "Momen Diam",
    caption: "Tidak ada kata-kata. Hanya kehadiran yang cukup. kita lebih banyak berjalan daripada berbicara karena nyari kado di mrDIY itu susah hahah.",
    url: "/diy.jpeg",
    type: "image",
    mood: "precious",
  },
  {
    id: "t5",
    date: "Suatu Malam",
    label: "Di Bawah Bintang",
    caption: "Kamu udah bilang pake jaket tebel aja takut kedinginan, tapi ternyata malah kedinginan karena aku lupa bawa jaket wkwk. Tapi itu jadi momen yang lucu dan magis buat diingat.",
    url: "/mirror.jpeg",
    type: "image",
    mood: "magical",
  },
  {
    id: "t6",
    date: "Foto ala ala",
    label: "Sipaling Foto",
    caption: "Kamu bilang ga mau difoto, tapi ternyata kamu yang paling banyak foto wkwk. Momen ini jadi kenangan lucu yang selalu bikin aku senyum.",
    url: "/diy2.jpeg",
    type: "image",
    mood: "sweet",
  },
  {
    id: "t7",
    date: "Hari Ini",
    label: "Masih Di Sini",
    caption: "Dan di sini kita masih bersama. Semoga selalu.",
    url: "/photobut.mp4",
    type: "video",
    mood: "precious",
  },
  // ✏️ Tambah momen baru di sini:
  // { id: "t8", date: "...", label: "...", caption: "...", url: "/foto_baru.jpg", type: "image", mood: "sweet" },
]

/* ----------------------------------------------------------
   🎨 MOOD COLORS
   Warna aksen untuk setiap mood di timeline
   Bisa diubah sesuai selera
---------------------------------------------------------- */
export const moodColors = {
  sweet:    { accent: "#ffb6d9", glow: "rgba(255,182,217,0.15)" },
  funny:    { accent: "#ffd36e", glow: "rgba(255,211,110,0.15)" },
  precious: { accent: "#ff9ed2", glow: "rgba(255,158,210,0.15)" },
  magical:  { accent: "#c8b4ff", glow: "rgba(200,180,255,0.15)" },
}