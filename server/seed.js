import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://127.0.0.1:27017/sales_website";

const sampleProducts = [
  {
    name: "Espresso Đậm Đà",
    price: 45000,
    description: "Cà phê espresso nguyên chất, hương vị đậm đà và mạnh mẽ. Hoàn hảo để bắt đầu ngày mới.",
    category: "espresso",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&q=80"
  },
  {
    name: "Cappuccino Ý",
    price: 55000,
    description: "Sự kết hợp hoàn hảo giữa espresso, sữa nóng và bọt sữa mịn màng. Hương vị cân bằng tuyệt vời.",
    category: "cappuccino",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80"
  },
  {
    name: "Latte Vanilla",
    price: 50000,
    description: "Cà phê latte với hương vanilla ngọt ngào, phù hợp cho những ai thích vị nhẹ nhàng.",
    category: "latte",
    image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=500&q=80"
  },
  {
    name: "Cold Brew Nguyên Chất",
    price: 60000,
    description: "Cà phê ủ lạnh 24 giờ, vị ngọt tự nhiên, không đắng. Thức uống hoàn hảo cho mùa hè.",
    category: "cold brew",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&q=80"
  },
  {
    name: "Americano",
    price: 40000,
    description: "Espresso pha loãng với nước nóng, vị đắng nhẹ và thanh thoát.",
    category: "espresso",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80"
  },
  {
    name: "Mocha Sô-cô-la",
    price: 58000,
    description: "Sự kết hợp tuyệt vời giữa cà phê espresso, sô-cô-la đậm đà và sữa nóng.",
    category: "latte",
    image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=500&q=80"
  },
  {
    name: "Cappuccino Caramel",
    price: 58000,
    description: "Cappuccino đặc biệt với sốt caramel ngọt ngào, thơm lừng quyến rũ.",
    category: "cappuccino",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&q=80"
  },
  {
    name: "Latte Matcha",
    price: 62000,
    description: "Sự kết hợp độc đáo giữa cà phê và trà xanh matcha Nhật Bản cao cấp.",
    category: "latte",
    image: "https://images.unsplash.com/photo-1536013018329-0b54a6d5e8fc?w=500&q=80"
  },
  {
    name: "Espresso Macchiato",
    price: 48000,
    description: "Espresso với một chút bọt sữa, giữ nguyên hương vị mạnh mẽ của cà phê.",
    category: "espresso",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500&q=80"
  },
  {
    name: "Cold Brew Vanilla",
    price: 65000,
    description: "Cold brew thơm mát kết hợp với vanilla ngọt dịu, hoàn hảo cho những ngày nóng bức.",
    category: "cold brew",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80"
  },
  {
    name: "Flat White",
    price: 52000,
    description: "Đặc sản từ Úc với lớp microfoam mịn màng, vị cà phê đậm đà hơn cappuccino.",
    category: "latte",
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=500&q=80"
  },
  {
    name: "Iced Cappuccino",
    price: 57000,
    description: "Cappuccino phiên bản lạnh với đá viên, sảng khoái và tỉnh táo.",
    category: "cappuccino",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&q=80"
  }
];

async function seedDatabase() {
  try {
    console.log("🔄 Đang kết nối MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Đã kết nối MongoDB");

    // Xóa tất cả products cũ
    console.log("🗑️  Đang xóa dữ liệu cũ...");
    await Product.deleteMany({});
    console.log("✅ Đã xóa dữ liệu cũ");

    // Thêm products mới
    console.log("📦 Đang thêm sản phẩm mẫu...");
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Đã thêm ${products.length} sản phẩm vào database`);

    console.log("\n📋 Danh sách sản phẩm:");
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} - ${p.price.toLocaleString('vi-VN')}đ`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Lỗi:", error);
    process.exit(1);
  }
}

seedDatabase();

