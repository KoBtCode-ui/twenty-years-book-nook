import forest from "@/assets/covers/art-forest.jpg";
import diaryLamp from "@/assets/covers/art-diary-lamp.jpg";
import letters from "@/assets/covers/art-letters.jpg";
import lotusLake from "@/assets/covers/art-lotus-lake.jpg";
import southernRiver from "@/assets/covers/art-southern-river.jpg";
import highlandPines from "@/assets/covers/art-highland-pines.jpg";
import motherPaddy from "@/assets/covers/art-mother-paddy.jpg";
import rainField from "@/assets/covers/art-rain-field.jpg";
import citadelKids from "@/assets/covers/art-citadel-kids.jpg";
import steelSunrise from "@/assets/covers/art-steel-sunrise.jpg";
import redBanner from "@/assets/covers/art-red-banner.jpg";

// Real published covers (thumbnails from bookstore listings), used to identify each book.
import cAnMayDiVang from "@/assets/real-covers/an-may-di-vang.jpg";
import cBupSenXanh from "@/assets/real-covers/bup-sen-xanh.jpg";
import cDangThuyTram from "@/assets/real-covers/dang-thuy-tram.jpg";
import cDatRungPhuongNam from "@/assets/real-covers/dat-rung-phuong-nam.jpg";
import cDauChanNguoiLinh from "@/assets/real-covers/dau-chan-nguoi-linh.jpg";
import cDinhBang from "@/assets/real-covers/dinh-bang.jpg";
import cHonDat from "@/assets/real-covers/hon-dat.jpg";
import cKyHoaChienHao from "@/assets/real-covers/ky-hoa-chien-hao.jpg";
import cLaCoTheuSauChuVang from "@/assets/real-covers/la-co-theu-sau-chu-vang.jpg";
import cLaThuThoiChien from "@/assets/real-covers/la-thu-thoi-chien.jpg";
import cLyTuTrong from "@/assets/real-covers/ly-tu-trong.jpg";
import cNguoiMeCamSung from "@/assets/real-covers/nguoi-me-cam-sung.jpg";
import cNoiBuonChienTranh from "@/assets/real-covers/noi-buon-chien-tranh.jpg";
import cQueNoi from "@/assets/real-covers/que-noi.jpg";
import cRuoiTrau from "@/assets/real-covers/ruoi-trau.jpg";
import cSongNhuAnh from "@/assets/real-covers/song-nhu-anh.jpg";
import cThepDaToiTheDay from "@/assets/real-covers/thep-da-toi-the-day.jpg";
import cThoiXaVang from "@/assets/real-covers/thoi-xa-vang.jpg";
import cTuoiThoDuDoi from "@/assets/real-covers/tuoi-tho-du-doi.jpg";
import cVoThiSau from "@/assets/real-covers/vo-thi-sau.jpg";
import cVuADinh from "@/assets/real-covers/vu-a-dinh.jpg";

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
  /** Real published cover, when we have one; otherwise the illustrated `art` cover is shown. */
  cover?: string;
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
    cover: cDangThuyTram,
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
    cover: cLaThuThoiChien,
    tone: "brick",
    link: "https://dantri.com.vn/thoi-su/hen-dung-ngay-3041975-se-tra-loi-cau-hoi-hanh-phuc-la-gi-20170429161505008.htm",
  },
];

/** Twenty more books on the same theme: youth, war and the will to live beautifully. */
export const shelfBooks: Book[] = [
  { id: "noi-buon-chien-tranh", title: "Nỗi buồn chiến tranh", author: "Bảo Ninh", tag: "Tiểu thuyết · 1990", genre: "Tiểu thuyết", blurb: "Ký ức của người lính Kiên sau chiến tranh, đan xen tình yêu, mất mát và nỗi day dứt khôn nguôi.", art: rainField, cover: cNoiBuonChienTranh, tone: "ink" },
  { id: "dau-chan-nguoi-linh", title: "Dấu chân người lính", author: "Nguyễn Minh Châu", tag: "Tiểu thuyết · 1972", genre: "Tiểu thuyết", blurb: "Những người lính trẻ trên mặt trận Đường 9 – Khe Sanh và vẻ đẹp của tình đồng đội.", art: forest, cover: cDauChanNguoiLinh, tone: "forest" },
  { id: "hon-dat", title: "Hòn Đất", author: "Anh Đức", tag: "Tiểu thuyết · 1966", genre: "Tiểu thuyết", blurb: "Cuộc chiến đấu kiên cường của người dân vùng Hòn Đất, Kiên Giang, và hình tượng chị Sứ.", art: motherPaddy, cover: cHonDat, tone: "brick" },
  { id: "song-nhu-anh", title: "Sống như Anh", author: "Trần Đình Vân", tag: "Ký · 1965", genre: "Truyện ngắn & ký", blurb: "Cuộc đời anh hùng Nguyễn Văn Trỗi qua lời kể của người vợ trẻ, chị Phan Thị Quyên.", art: letters, cover: cSongNhuAnh, tone: "rose" },
  { id: "nguoi-me-cam-sung", title: "Người mẹ cầm súng", author: "Nguyễn Thi", tag: "Truyện ký · 1965", genre: "Truyện ngắn & ký", blurb: "Chân dung chị Út Tịch, người mẹ Nam Bộ vừa nuôi con vừa cầm súng giữ làng.", art: motherPaddy, cover: cNguoiMeCamSung, tone: "teal" },
  { id: "thoi-xa-vang", title: "Thời xa vắng", author: "Lê Lựu", tag: "Tiểu thuyết · 1986", genre: "Tiểu thuyết", blurb: "Giang Minh Sài và những năm tuổi trẻ sống theo ý muốn của người khác.", art: rainField, cover: cThoiXaVang, tone: "ochre" },
  { id: "an-may-di-vang", title: "Ăn mày dĩ vãng", author: "Chu Lai", tag: "Tiểu thuyết · 1991", genre: "Tiểu thuyết", blurb: "Người lính trinh sát Hai Hùng đi tìm lại quá khứ và tình yêu sau chiến tranh.", art: southernRiver, cover: cAnMayDiVang, tone: "ink" },
  { id: "thep-da-toi-the-day", title: "Thép đã tôi thế đấy", author: "N. Ostrovsky", tag: "Tiểu thuyết · 1934", genre: "Tiểu thuyết", blurb: "Pavel Korchagin và ý chí sắt thép — cuốn sách gối đầu của nhiều thế hệ thanh niên Việt Nam.", art: steelSunrise, cover: cThepDaToiTheDay, tone: "brick" },
  { id: "bat-khuat", title: "Bất khuất", author: "Nguyễn Đức Thuận", tag: "Hồi ký · 1967", genre: "Nhật ký & hồi ký", blurb: "Những năm tháng tù đày ở Côn Đảo và một tinh thần không bao giờ khuất phục.", art: steelSunrise, tone: "ink" },
  { id: "tuoi-tho-du-doi", title: "Tuổi thơ dữ dội", author: "Phùng Quán", tag: "Tiểu thuyết · 1988", genre: "Thiếu nhi & lịch sử", blurb: "Những thiếu niên trinh sát ở Huế: hồn nhiên, tinh nghịch mà dũng cảm phi thường.", art: citadelKids, cover: cTuoiThoDuDoi, tone: "brick" },
  { id: "dat-rung-phuong-nam", title: "Đất rừng phương Nam", author: "Đoàn Giỏi", tag: "Tiểu thuyết · 1957", genre: "Thiếu nhi & lịch sử", blurb: "Hành trình lưu lạc của bé An qua sông nước, rừng tràm miền Tây Nam Bộ.", art: southernRiver, cover: cDatRungPhuongNam, tone: "ochre" },
  { id: "la-co-theu-sau-chu-vang", title: "Lá cờ thêu sáu chữ vàng", author: "Nguyễn Huy Tưởng", tag: "Truyện lịch sử · 1960", genre: "Thiếu nhi & lịch sử", blurb: "Trần Quốc Toản tuổi mười sáu cùng lá cờ thêu sáu chữ vàng ra trận.", art: redBanner, cover: cLaCoTheuSauChuVang, tone: "brick" },
  { id: "ruoi-trau", title: "Ruồi trâu", author: "E. L. Voynich", tag: "Tiểu thuyết · 1897", genre: "Tiểu thuyết", blurb: "Chàng Ruồi trâu và cuộc đấu tranh cho tự do nước Ý — cuốn sách từng đi cùng bao lớp thanh niên Việt Nam.", art: rainField, cover: cRuoiTrau, tone: "ink" },
  { id: "ky-hoa-chien-hao", title: "Ký họa trong chiến hào", author: "Phạm Thanh Tâm", tag: "Nhật ký · Điện Biên Phủ 1954", genre: "Nhật ký & hồi ký", blurb: "Nhật ký và những bức ký họa của một người lính trẻ giữa chiến dịch Điện Biên Phủ.", art: forest, cover: cKyHoaChienHao, tone: "forest" },
  { id: "bup-sen-xanh", title: "Búp sen xanh", author: "Sơn Tùng", tag: "Tiểu thuyết · 1981", genre: "Thiếu nhi & lịch sử", blurb: "Tuổi thơ và tuổi trẻ của Bác Hồ, từ làng Sen quê nhà đến ngày ra đi tìm đường cứu nước.", art: lotusLake, cover: cBupSenXanh, tone: "teal" },
  { id: "dinh-bang", title: "Đội thiếu niên du kích Đình Bảng", author: "Xuân Sách", tag: "Truyện thiếu nhi", genre: "Thiếu nhi & lịch sử", blurb: "Những thiếu niên làng Đình Bảng làm liên lạc, trinh sát, cùng người lớn đánh giặc.", art: citadelKids, cover: cDinhBang, tone: "brick" },
  { id: "que-noi", title: "Quê nội", author: "Võ Quảng", tag: "Truyện thiếu nhi", genre: "Thiếu nhi & lịch sử", blurb: "Cục và Cù Lao lớn lên ở một làng quê miền Trung những ngày đầu sau Cách mạng tháng Tám.", art: southernRiver, cover: cQueNoi, tone: "sky" },
  { id: "vu-a-dinh", title: "Vừ A Dính", author: "Tô Hoài", tag: "Truyện thiếu nhi", genre: "Thiếu nhi & lịch sử", blurb: "Cậu bé người Mông dũng cảm làm liên lạc cho bộ đội giữa núi rừng Tây Bắc.", art: highlandPines, cover: cVuADinh, tone: "teal" },
  { id: "vo-thi-sau", title: "Võ Thị Sáu", author: "Hoài Lộc · Bùi Việt Thanh", tag: "Truyện tranh lịch sử", genre: "Thiếu nhi & lịch sử", blurb: "Người nữ anh hùng tuổi trẻ đất Đỏ và những năm tháng không khuất phục ở Côn Đảo.", art: steelSunrise, cover: cVoThiSau, tone: "rose" },
  { id: "ly-tu-trong", title: "Lý Tự Trọng", author: "Bùi Việt Thanh", tag: "Truyện tranh lịch sử", genre: "Thiếu nhi & lịch sử", blurb: "Người thanh niên cộng sản đầu tiên, hy sinh khi mới mười bảy tuổi.", art: redBanner, cover: cLyTuTrong, tone: "brick" },
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
