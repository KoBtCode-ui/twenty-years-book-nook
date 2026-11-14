import forest from "@/assets/covers/art-forest.jpg";
import diaryLamp from "@/assets/covers/art-diary-lamp.jpg";
import letters from "@/assets/covers/art-letters.jpg";
import lotusLake from "@/assets/covers/art-lotus-lake.jpg";
import southernRiver from "@/assets/covers/art-southern-river.jpg";
import starryHill from "@/assets/covers/art-starry-hill.jpg";
import highlandPines from "@/assets/covers/art-highland-pines.jpg";
import skyDawn from "@/assets/covers/art-sky-dawn.jpg";
import motherPaddy from "@/assets/covers/art-mother-paddy.jpg";
import rainField from "@/assets/covers/art-rain-field.jpg";
import citadelKids from "@/assets/covers/art-citadel-kids.jpg";
import steelSunrise from "@/assets/covers/art-steel-sunrise.jpg";
import ivoryComb from "@/assets/covers/art-ivory-comb.jpg";
import redBanner from "@/assets/covers/art-red-banner.jpg";

export type Tone = "forest" | "brick" | "ochre" | "ink" | "night" | "sky" | "rose" | "teal";

export const GENRES = ["Tất cả", "Nhật ký & hồi ký", "Tiểu thuyết", "Truyện ngắn & ký", "Thiếu nhi & lịch sử"] as const;
export type Genre = Exclude<(typeof GENRES)[number], "Tất cả">;

export type Book = {
  id: string;
  title: string;
  author: string;
  tag: string;
  genre: Genre;
  blurb: string;
  art: string;
  tone: Tone;
  link?: string;
};

const search = (q: string) => `https://www.fahasa.com/searchengine?q=${encodeURIComponent(q)}`;

/** Three companion books shown right after the featured diary. */
export const companions: Book[] = [
  {
    id: "dang-thuy-tram",
    title: "Nhật ký Đặng Thùy Trâm",
    author: "Đặng Thùy Trâm",
    tag: "Nhật ký · 1968—1970",
    genre: "Nhật ký & hồi ký",
    blurb: "Những trang viết của một nữ bác sĩ trẻ nơi tuyến lửa Đức Phổ, Quảng Ngãi.",
    art: diaryLamp,
    tone: "forest",
    link: "https://www.fahasa.com/nhat-ky-dang-thuy-tram-tai-ban-2026.html",
  },
  {
    id: "hanh-phuc-la-gi",
    title: "Hạnh phúc là gì?",
    author: "Nguyễn Văn Thạc · Phạm Như Anh",
    tag: "Thư tình · Ký ức",
    genre: "Nhật ký & hồi ký",
    blurb: "Những bức thư và bài thơ còn lại sau một lời hẹn chưa kịp thành.",
    art: lotusLake,
    tone: "rose",
    link: "https://nhandan.vn/ra-mat-cuon-thu-tinh-cua-liet-sy-nguyen-van-thac-va-chi-pham-nhu-anh-post502166.html",
  },
  {
    id: "la-thu-thoi-chien",
    title: "Những lá thư thời chiến Việt Nam",
    author: "Đặng Vương Hưng sưu tầm, biên soạn",
    tag: "Thư thời chiến · 2015",
    genre: "Nhật ký & hồi ký",
    blurb: "Những lá thư riêng nối dài câu chuyện của cả một thế hệ.",
    art: letters,
    tone: "brick",
    link: "https://dantri.com.vn/thoi-su/hen-dung-ngay-3041975-se-tra-loi-cau-hoi-hanh-phuc-la-gi-20170429161505008.htm",
  },
];

/** Twenty more books on the same theme: youth, war and the will to live beautifully. */
export const shelfBooks: Book[] = [
  { id: "noi-buon-chien-tranh", title: "Nỗi buồn chiến tranh", author: "Bảo Ninh", tag: "Tiểu thuyết · 1990", genre: "Tiểu thuyết", blurb: "Ký ức của người lính Kiên sau chiến tranh, đan xen tình yêu, mất mát và nỗi day dứt khôn nguôi.", art: rainField, tone: "ink" },
  { id: "dau-chan-nguoi-linh", title: "Dấu chân người lính", author: "Nguyễn Minh Châu", tag: "Tiểu thuyết · 1972", genre: "Tiểu thuyết", blurb: "Những người lính trẻ trên mặt trận Đường 9 – Khe Sanh và vẻ đẹp của tình đồng đội.", art: forest, tone: "forest" },
  { id: "hon-dat", title: "Hòn Đất", author: "Anh Đức", tag: "Tiểu thuyết · 1966", genre: "Tiểu thuyết", blurb: "Cuộc chiến đấu kiên cường của người dân vùng Hòn Đất, Kiên Giang, và hình tượng chị Sứ.", art: motherPaddy, tone: "brick" },
  { id: "rung-xa-nu", title: "Rừng xà nu", author: "Nguyễn Trung Thành", tag: "Truyện ngắn · 1965", genre: "Truyện ngắn & ký", blurb: "Làng Xô Man và cánh rừng xà nu bất khuất, biểu tượng sức sống của người Tây Nguyên.", art: highlandPines, tone: "brick" },
  { id: "song-nhu-anh", title: "Sống như Anh", author: "Trần Đình Vân", tag: "Ký · 1965", genre: "Truyện ngắn & ký", blurb: "Cuộc đời anh hùng Nguyễn Văn Trỗi qua lời kể của người vợ trẻ, chị Phan Thị Quyên.", art: letters, tone: "rose" },
  { id: "dat-nuoc-dung-len", title: "Đất nước đứng lên", author: "Nguyên Ngọc", tag: "Tiểu thuyết · 1955", genre: "Tiểu thuyết", blurb: "Anh hùng Núp và dân làng Kông Hoa đứng lên giữa đại ngàn Tây Nguyên.", art: highlandPines, tone: "forest" },
  { id: "nhung-ngoi-sao-xa-xoi", title: "Những ngôi sao xa xôi", author: "Lê Minh Khuê", tag: "Truyện ngắn · 1971", genre: "Truyện ngắn & ký", blurb: "Ba cô gái thanh niên xung phong trên cao điểm Trường Sơn: hồn nhiên, mơ mộng và gan dạ.", art: starryHill, tone: "night" },
  { id: "chiec-luoc-nga", title: "Chiếc lược ngà", author: "Nguyễn Quang Sáng", tag: "Truyện ngắn · 1966", genre: "Truyện ngắn & ký", blurb: "Tình cha con của ông Sáu và bé Thu, gửi trọn vào một chiếc lược ngà.", art: ivoryComb, tone: "ochre" },
  { id: "nguoi-me-cam-sung", title: "Người mẹ cầm súng", author: "Nguyễn Thi", tag: "Truyện ký · 1965", genre: "Truyện ngắn & ký", blurb: "Chân dung chị Út Tịch, người mẹ Nam Bộ vừa nuôi con vừa cầm súng giữ làng.", art: motherPaddy, tone: "teal" },
  { id: "vung-troi", title: "Vùng trời", author: "Hữu Mai", tag: "Tiểu thuyết · 1971", genre: "Tiểu thuyết", blurb: "Những phi công trẻ của không quân nhân dân trên bầu trời miền Bắc.", art: skyDawn, tone: "sky" },
  { id: "manh-trang-cuoi-rung", title: "Mảnh trăng cuối rừng", author: "Nguyễn Minh Châu", tag: "Truyện ngắn · 1970", genre: "Truyện ngắn & ký", blurb: "Một chuyến xe đêm trên đường Trường Sơn và mối tình trong trẻo như ánh trăng.", art: starryHill, tone: "teal" },
  { id: "thoi-xa-vang", title: "Thời xa vắng", author: "Lê Lựu", tag: "Tiểu thuyết · 1986", genre: "Tiểu thuyết", blurb: "Giang Minh Sài và những năm tuổi trẻ sống theo ý muốn của người khác.", art: rainField, tone: "ochre" },
  { id: "an-may-di-vang", title: "Ăn mày dĩ vãng", author: "Chu Lai", tag: "Tiểu thuyết · 1991", genre: "Tiểu thuyết", blurb: "Người lính trinh sát Hai Hùng đi tìm lại quá khứ và tình yêu sau chiến tranh.", art: southernRiver, tone: "ink" },
  { id: "thep-da-toi-the-day", title: "Thép đã tôi thế đấy", author: "N. Ostrovsky", tag: "Tiểu thuyết · 1934", genre: "Tiểu thuyết", blurb: "Pavel Korchagin và ý chí sắt thép — cuốn sách gối đầu của nhiều thế hệ thanh niên Việt Nam.", art: steelSunrise, tone: "brick" },
  { id: "bat-khuat", title: "Bất khuất", author: "Nguyễn Đức Thuận", tag: "Hồi ký · 1967", genre: "Nhật ký & hồi ký", blurb: "Những năm tháng tù đày ở Côn Đảo và một tinh thần không bao giờ khuất phục.", art: steelSunrise, tone: "ink" },
  { id: "nhat-ky-chu-cam-phong", title: "Nhật ký chiến tranh", author: "Chu Cẩm Phong", tag: "Nhật ký thời chiến", genre: "Nhật ký & hồi ký", blurb: "Trang nhật ký của nhà văn – nhà báo trẻ hy sinh ở Quảng Nam, chân thực và đầy chất thơ.", art: diaryLamp, tone: "forest" },
  { id: "tuoi-tho-du-doi", title: "Tuổi thơ dữ dội", author: "Phùng Quán", tag: "Tiểu thuyết · 1988", genre: "Thiếu nhi & lịch sử", blurb: "Những thiếu niên trinh sát ở Huế: hồn nhiên, tinh nghịch mà dũng cảm phi thường.", art: citadelKids, tone: "brick" },
  { id: "dat-rung-phuong-nam", title: "Đất rừng phương Nam", author: "Đoàn Giỏi", tag: "Tiểu thuyết · 1957", genre: "Thiếu nhi & lịch sử", blurb: "Hành trình lưu lạc của bé An qua sông nước, rừng tràm miền Tây Nam Bộ.", art: southernRiver, tone: "ochre" },
  { id: "kim-dong", title: "Kim Đồng", author: "Tô Hoài", tag: "Truyện thiếu nhi", genre: "Thiếu nhi & lịch sử", blurb: "Người đội viên đầu tiên, anh liên lạc nhỏ dũng cảm của núi rừng Việt Bắc.", art: forest, tone: "teal" },
  { id: "la-co-theu-sau-chu-vang", title: "Lá cờ thêu sáu chữ vàng", author: "Nguyễn Huy Tưởng", tag: "Truyện lịch sử · 1960", genre: "Thiếu nhi & lịch sử", blurb: "Trần Quốc Toản tuổi mười sáu cùng lá cờ thêu sáu chữ vàng ra trận.", art: redBanner, tone: "brick" },
].map((b) => ({ ...b, link: search(b.title) }) as Book);

export const allBooks: Book[] = [...companions, ...shelfBooks];

export function filterBooks(books: Book[], genre: string, query: string): Book[] {
  const q = query.trim().toLowerCase();
  return books.filter(
    (b) =>
      (genre === "Tất cả" || b.genre === genre) &&
      (!q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)),
  );
}
