import mongoose from "mongoose";
import { Category } from "../models/categoryModel";
import { Subcategory } from "../models/subCategory";
import { Product } from "../models/productModel";
import { ProductVariants } from "../models/productVariantModel";


const seedDatabase = async () => {
  try {


    // Clear existing data
    // await ProductVariants.deleteMany({});
    // await Product.deleteMany({});
    // await Subcategory.deleteMany({});
    // await Category.deleteMany({});
    console.log("Cleared existing data");

    // ============================================
    // STEP 1: INSERT CATEGORIES (10 - All Clothing)
    // ============================================
    const categories = [
      {
        _id: new mongoose.Types.ObjectId("673a1234567890abcdef0001"),
        name: "Men's Clothing",
        slug: "mens-clothing",
        subcategories: []
      },
      {
        _id: new mongoose.Types.ObjectId("673a1234567890abcdef0002"),
        name: "Women's Clothing",
        slug: "womens-clothing",
        subcategories: []
      },
      {
        _id: new mongoose.Types.ObjectId("673a1234567890abcdef0003"),
        name: "Kids Clothing",
        slug: "kids-clothing",
        subcategories: []
      },
      {
        _id: new mongoose.Types.ObjectId("673a1234567890abcdef0004"),
        name: "Activewear",
        slug: "activewear",
        subcategories: []
      },
      {
        _id: new mongoose.Types.ObjectId("673a1234567890abcdef0005"),
        name: "Outerwear",
        slug: "outerwear",
        subcategories: []
      },
      {
        _id: new mongoose.Types.ObjectId("673a1234567890abcdef0006"),
        name: "Footwear",
        slug: "footwear",
        subcategories: []
      },
      {
        _id: new mongoose.Types.ObjectId("673a1234567890abcdef0007"),
        name: "Accessories",
        slug: "accessories",
        subcategories: []
      },
      {
        _id: new mongoose.Types.ObjectId("673a1234567890abcdef0008"),
        name: "Ethnic Wear",
        slug: "ethnic-wear",
        subcategories: []
      },
      {
        _id: new mongoose.Types.ObjectId("673a1234567890abcdef0009"),
        name: "Innerwear",
        slug: "innerwear",
        subcategories: []
      },
      {
        _id: new mongoose.Types.ObjectId("673a1234567890abcdef0010"),
        name: "Sleepwear",
        slug: "sleepwear",
        subcategories: []
      }
    ];

    await Category.insertMany(categories);
    console.log("✓ Inserted 10 clothing categories");

    // ============================================
    // STEP 2: INSERT SUBCATEGORIES (50 total - 5 per category)
    // ============================================
    const subcategories = [
      // Men's Clothing subcategories (5)
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0001"),
        name: "T-Shirts",
        slug: "mens-t-shirts",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0001")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0002"),
        name: "Shirts",
        slug: "mens-shirts",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0001")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0003"),
        name: "Jeans",
        slug: "mens-jeans",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0001")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0004"),
        name: "Trousers",
        slug: "mens-trousers",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0001")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0005"),
        name: "Suits & Blazers",
        slug: "mens-suits-blazers",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0001")
      },

      // Women's Clothing subcategories (5)
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0006"),
        name: "Dresses",
        slug: "womens-dresses",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0002")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0007"),
        name: "Tops & Tunics",
        slug: "womens-tops-tunics",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0002")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0008"),
        name: "Jeans",
        slug: "womens-jeans",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0002")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0009"),
        name: "Skirts",
        slug: "womens-skirts",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0002")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0010"),
        name: "Ethnic Kurtas",
        slug: "womens-ethnic-kurtas",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0002")
      },

      // Kids Clothing subcategories (5)
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0011"),
        name: "Boys T-Shirts",
        slug: "boys-t-shirts",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0003")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0012"),
        name: "Girls Dresses",
        slug: "girls-dresses",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0003")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0013"),
        name: "Kids Jeans",
        slug: "kids-jeans",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0003")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0014"),
        name: "Kids Shorts",
        slug: "kids-shorts",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0003")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0015"),
        name: "Kids Ethnic Wear",
        slug: "kids-ethnic-wear",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0003")
      },

      // Activewear subcategories (5)
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0016"),
        name: "Track Pants",
        slug: "track-pants",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0004")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0017"),
        name: "Sports T-Shirts",
        slug: "sports-t-shirts",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0004")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0018"),
        name: "Yoga Pants",
        slug: "yoga-pants",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0004")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0019"),
        name: "Sports Jackets",
        slug: "sports-jackets",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0004")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0020"),
        name: "Gym Shorts",
        slug: "gym-shorts",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0004")
      },

      // Outerwear subcategories (5)
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0021"),
        name: "Winter Jackets",
        slug: "winter-jackets",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0005")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0022"),
        name: "Leather Jackets",
        slug: "leather-jackets",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0005")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0023"),
        name: "Hoodies",
        slug: "hoodies",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0005")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0024"),
        name: "Windcheaters",
        slug: "windcheaters",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0005")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0025"),
        name: "Raincoats",
        slug: "raincoats",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0005")
      },

      // Footwear subcategories (5)
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0026"),
        name: "Sneakers",
        slug: "sneakers",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0006")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0027"),
        name: "Formal Shoes",
        slug: "formal-shoes",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0006")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0028"),
        name: "Sandals",
        slug: "sandals",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0006")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0029"),
        name: "Boots",
        slug: "boots",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0006")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0030"),
        name: "Slippers",
        slug: "slippers",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0006")
      },

      // Accessories subcategories (5)
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0031"),
        name: "Belts",
        slug: "belts",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0007")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0032"),
        name: "Wallets",
        slug: "wallets",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0007")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0033"),
        name: "Caps & Hats",
        slug: "caps-hats",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0007")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0034"),
        name: "Scarves",
        slug: "scarves",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0007")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0035"),
        name: "Sunglasses",
        slug: "sunglasses",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0007")
      },

      // Ethnic Wear subcategories (5)
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0036"),
        name: "Sarees",
        slug: "sarees",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0008")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0037"),
        name: "Kurta Sets",
        slug: "kurta-sets",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0008")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0038"),
        name: "Sherwanis",
        slug: "sherwanis",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0008")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0039"),
        name: "Lehenga Choli",
        slug: "lehenga-choli",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0008")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0040"),
        name: "Salwar Suits",
        slug: "salwar-suits",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0008")
      },

      // Innerwear subcategories (5)
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0041"),
        name: "Men's Briefs",
        slug: "mens-briefs",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0009")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0042"),
        name: "Men's Vests",
        slug: "mens-vests",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0009")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0043"),
        name: "Women's Bras",
        slug: "womens-bras",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0009")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0044"),
        name: "Women's Panties",
        slug: "womens-panties",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0009")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0045"),
        name: "Thermal Wear",
        slug: "thermal-wear",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0009")
      },

      // Sleepwear subcategories (5)
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0046"),
        name: "Nightsuits",
        slug: "nightsuits",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0010")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0047"),
        name: "Nightdresses",
        slug: "nightdresses",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0010")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0048"),
        name: "Robes",
        slug: "robes",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0010")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0049"),
        name: "Pajamas",
        slug: "pajamas",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0010")
      },
      {
        _id: new mongoose.Types.ObjectId("673a2234567890abcdef0050"),
        name: "Loungewear",
        slug: "loungewear",
        parentCategoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0010")
      }
    ];

    await Subcategory.insertMany(subcategories);
    console.log("✓ Inserted 50 subcategories (5 per category)");

    // Update categories with their subcategory references
    await Category.findByIdAndUpdate("673a1234567890abcdef0001", {
      subcategories: ["673a2234567890abcdef0001", "673a2234567890abcdef0002", "673a2234567890abcdef0003", "673a2234567890abcdef0004", "673a2234567890abcdef0005"]
    });
    await Category.findByIdAndUpdate("673a1234567890abcdef0002", {
      subcategories: ["673a2234567890abcdef0006", "673a2234567890abcdef0007", "673a2234567890abcdef0008", "673a2234567890abcdef0009", "673a2234567890abcdef0010"]
    });
    await Category.findByIdAndUpdate("673a1234567890abcdef0003", {
      subcategories: ["673a2234567890abcdef0011", "673a2234567890abcdef0012", "673a2234567890abcdef0013", "673a2234567890abcdef0014", "673a2234567890abcdef0015"]
    });
    await Category.findByIdAndUpdate("673a1234567890abcdef0004", {
      subcategories: ["673a2234567890abcdef0016", "673a2234567890abcdef0017", "673a2234567890abcdef0018", "673a2234567890abcdef0019", "673a2234567890abcdef0020"]
    });
    await Category.findByIdAndUpdate("673a1234567890abcdef0005", {
      subcategories: ["673a2234567890abcdef0021", "673a2234567890abcdef0022", "673a2234567890abcdef0023", "673a2234567890abcdef0024", "673a2234567890abcdef0025"]
    });
    await Category.findByIdAndUpdate("673a1234567890abcdef0006", {
      subcategories: ["673a2234567890abcdef0026", "673a2234567890abcdef0027", "673a2234567890abcdef0028", "673a2234567890abcdef0029", "673a2234567890abcdef0030"]
    });
    await Category.findByIdAndUpdate("673a1234567890abcdef0007", {
      subcategories: ["673a2234567890abcdef0031", "673a2234567890abcdef0032", "673a2234567890abcdef0033", "673a2234567890abcdef0034", "673a2234567890abcdef0035"]
    });
    await Category.findByIdAndUpdate("673a1234567890abcdef0008", {
      subcategories: ["673a2234567890abcdef0036", "673a2234567890abcdef0037", "673a2234567890abcdef0038", "673a2234567890abcdef0039", "673a2234567890abcdef0040"]
    });
    await Category.findByIdAndUpdate("673a1234567890abcdef0009", {
      subcategories: ["673a2234567890abcdef0041", "673a2234567890abcdef0042", "673a2234567890abcdef0043", "673a2234567890abcdef0044", "673a2234567890abcdef0045"]
    });
    await Category.findByIdAndUpdate("673a1234567890abcdef0010", {
      subcategories: ["673a2234567890abcdef0046", "673a2234567890abcdef0047", "673a2234567890abcdef0048", "673a2234567890abcdef0049", "673a2234567890abcdef0050"]
    });
    console.log("✓ Updated category-subcategory relationships");

    // ============================================
    // STEP 3: INSERT PRODUCTS (10 - All Clothing)
    // ============================================
    const products = [
      {
        _id: new mongoose.Types.ObjectId("673a3334567890abcdef0001"),
        title: "Classic Cotton T-Shirt",
        color: "Navy Blue",
        brand: "Levi's",
        categoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0001"), // Men's Clothing
        subCategoryId: new mongoose.Types.ObjectId("673a2234567890abcdef0001"), // T-Shirts
        basePrice: 899,
        images: [
          {
            secure_url: "https://example.com/mens-tshirt-navy-1.jpg",
            public_id: "mens_tshirt_navy_1"
          },
          {
            secure_url: "https://example.com/mens-tshirt-navy-2.jpg",
            public_id: "mens_tshirt_navy_2"
          }
        ],
        description: "Premium 100% cotton t-shirt with regular fit, perfect for everyday wear",
        isActive: true,
        variantIds: []
      },
      {
        _id: new mongoose.Types.ObjectId("673a3334567890abcdef0002"),
        title: "Floral Summer Dress",
        color: "Pink",
        brand: "Zara",
        categoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0002"), // Women's Clothing
        subCategoryId: new mongoose.Types.ObjectId("673a2234567890abcdef0006"), // Dresses
        basePrice: 1999,
        images: [
          {
            secure_url: "https://example.com/floral-dress-pink-1.jpg",
            public_id: "floral_dress_pink_1"
          }
        ],
        description: "Beautiful floral print summer dress with adjustable straps and flowing silhouette",
        isActive: true,
        variantIds: []
      },
      {
        _id: new mongoose.Types.ObjectId("673a3334567890abcdef0003"),
        title: "Kids Denim Jeans",
        color: "Blue",
        brand: "Gap Kids",
        categoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0003"), // Kids Clothing
        subCategoryId: new mongoose.Types.ObjectId("673a2234567890abcdef0013"), // Kids Jeans
        basePrice: 1299,
        images: [
          {
            secure_url: "https://example.com/kids-jeans-blue-1.jpg",
            public_id: "kids_jeans_blue_1"
          }
        ],
        description: "Comfortable stretch denim jeans for kids with adjustable waist",
        isActive: true,
        variantIds: []
      },
      {
        _id: new mongoose.Types.ObjectId("673a3334567890abcdef0004"),
        title: "Performance Track Pants",
        color: "Black",
        brand: "Adidas",
        categoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0004"), // Activewear
        subCategoryId: new mongoose.Types.ObjectId("673a2234567890abcdef0016"), // Track Pants
        basePrice: 1599,
        images: [
          {
            secure_url: "https://example.com/track-pants-black-1.jpg",
            public_id: "track_pants_black_1"
          }
        ],
        description: "Moisture-wicking track pants with zippered pockets and tapered fit",
        isActive: true,
        variantIds: []
      },
      {
        _id: new mongoose.Types.ObjectId("673a3334567890abcdef0005"),
        title: "Leather Biker Jacket",
        color: "Brown",
        brand: "H&M",
        categoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0005"), // Outerwear
        subCategoryId: new mongoose.Types.ObjectId("673a2234567890abcdef0022"), // Leather Jackets
        basePrice: 4999,
        images: [
          {
            secure_url: "https://example.com/leather-jacket-brown-1.jpg",
            public_id: "leather_jacket_brown_1"
          },
          {
            secure_url: "https://example.com/leather-jacket-brown-2.jpg",
            public_id: "leather_jacket_brown_2"
          }
        ],
        description: "Genuine leather biker jacket with asymmetric zip and multiple pockets",
        isActive: true,
        variantIds: []
      },
      {
        _id: new mongoose.Types.ObjectId("673a3334567890abcdef0006"),
        title: "White Leather Sneakers",
        color: "White",
        brand: "Nike",
        categoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0006"), // Footwear
        subCategoryId: new mongoose.Types.ObjectId("673a2234567890abcdef0026"), // Sneakers
        basePrice: 2499,
        images: [
          {
            secure_url: "https://example.com/white-sneakers-1.jpg",
            public_id: "white_sneakers_1"
          }
        ],
        description: "Classic white leather sneakers with cushioned sole and breathable lining",
        isActive: true,
        variantIds: []
      },
      {
        _id: new mongoose.Types.ObjectId("673a3334567890abcdef0007"),
        title: "Genuine Leather Belt",
        color: "Black",
        brand: "Tommy Hilfiger",
        categoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0007"), // Accessories
        subCategoryId: new mongoose.Types.ObjectId("673a2234567890abcdef0031"), // Belts
        basePrice: 1299,
        images: [
          {
            secure_url: "https://example.com/leather-belt-black-1.jpg",
            public_id: "leather_belt_black_1"
          }
        ],
        description: "Premium genuine leather belt with polished metal buckle, perfect for formal and casual wear",
        isActive: true,
        variantIds: []
      },
      {
        _id: new mongoose.Types.ObjectId("673a3334567890abcdef0008"),
        title: "Silk Saree with Embroidery",
        color: "Red",
        brand: "Fabindia",
        categoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0008"), // Ethnic Wear
        subCategoryId: new mongoose.Types.ObjectId("673a2234567890abcdef0036"), // Sarees
        basePrice: 3499,
        images: [
          {
            secure_url: "https://example.com/silk-saree-red-1.jpg",
            public_id: "silk_saree_red_1"
          }
        ],
        description: "Beautiful pure silk saree with intricate golden embroidery and matching blouse piece",
        isActive: true,
        variantIds: []
      },
      {
        _id: new mongoose.Types.ObjectId("673a3334567890abcdef0009"),
        title: "Cotton Boxer Shorts Pack",
        color: "Multicolor",
        brand: "Jockey",
        categoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0009"), // Innerwear
        subCategoryId: new mongoose.Types.ObjectId("673a2234567890abcdef0041"), // Men's Briefs
        basePrice: 699,
        images: [
          {
            secure_url: "https://example.com/boxer-shorts-multi-1.jpg",
            public_id: "boxer_shorts_multi_1"
          }
        ],
        description: "Pack of 3 breathable cotton boxer shorts with elastic waistband",
        isActive: true,
        variantIds: []
      },
      {
        _id: new mongoose.Types.ObjectId("673a3334567890abcdef0010"),
        title: "Cozy Cotton Nightsuit",
        color: "Gray",
        brand: "Van Heusen",
        categoryId: new mongoose.Types.ObjectId("673a1234567890abcdef0010"), // Sleepwear
        subCategoryId: new mongoose.Types.ObjectId("673a2234567890abcdef0046"), // Nightsuits
        basePrice: 1199,
        images: [
          {
            secure_url: "https://example.com/nightsuit-gray-1.jpg",
            public_id: "nightsuit_gray_1"
          }
        ],
        description: "Comfortable 2-piece cotton nightsuit with button-down top and elastic waist pants",
        isActive: true,
        variantIds: []
      }
    ];

    await Product.insertMany(products);
    console.log("✓ Inserted 10 clothing products");

    // ============================================
    // STEP 4: INSERT PRODUCT VARIANTS (30 total - 3 per product)
    // ============================================
    const productVariants = [
      // Product 1 (Men's T-Shirt) - 3 variants
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0001"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0001"),
        size: "M",
        price: 899,
        quantity: 100,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0002"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0001"),
        size: "L",
        price: 899,
        quantity: 120,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0003"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0001"),
        size: "XL",
        price: 999,
        quantity: 80,
        isActive: true
      },

      // Product 2 (Women's Dress) - 3 variants
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0004"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0002"),
        size: "S",
        price: 1999,
        quantity: 50,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0005"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0002"),
        size: "M",
        price: 1999,
        quantity: 60,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0006"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0002"),
        size: "L",
        price: 2099,
        quantity: 40,
        isActive: true
      },

      // Product 3 (Kids Jeans) - 3 variants
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0007"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0003"),
        size: "5-6 Years",
        price: 1299,
        quantity: 70,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0008"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0003"),
        size: "7-8 Years",
        price: 1299,
        quantity: 65,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0009"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0003"),
        size: "9-10 Years",
        price: 1399,
        quantity: 55,
        isActive: true
      },

      // Product 4 (Track Pants) - 3 variants
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0010"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0004"),
        size: "M",
        price: 1599,
        quantity: 90,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0011"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0004"),
        size: "L",
        price: 1599,
        quantity: 100,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0012"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0004"),
        size: "XL",
        price: 1699,
        quantity: 75,
        isActive: true
      },

      // Product 5 (Leather Jacket) - 3 variants
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0013"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0005"),
        size: "M",
        price: 4999,
        quantity: 30,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0014"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0005"),
        size: "L",
        price: 4999,
        quantity: 35,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0015"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0005"),
        size: "XL",
        price: 5199,
        quantity: 25,
        isActive: true
      },

      // Product 6 (Sneakers) - 3 variants
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0016"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0006"),
        size: "UK 8",
        price: 2499,
        quantity: 60,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0017"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0006"),
        size: "UK 9",
        price: 2499,
        quantity: 70,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0018"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0006"),
        size: "UK 10",
        price: 2499,
        quantity: 55,
        isActive: true
      },

      // Product 7 (Leather Belt) - 3 variants
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0019"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0007"),
        size: "32",
        price: 1299,
        quantity: 80,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0020"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0007"),
        size: "34",
        price: 1299,
        quantity: 90,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0021"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0007"),
        size: "36",
        price: 1299,
        quantity: 75,
        isActive: true
      },

      // Product 8 (Silk Saree) - 3 variants
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0022"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0008"),
        size: "5.5 meters",
        price: 3499,
        quantity: 40,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0023"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0008"),
        size: "6 meters",
        price: 3699,
        quantity: 35,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0024"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0008"),
        size: "6.5 meters",
        price: 3899,
        quantity: 30,
        isActive: true
      },

      // Product 9 (Boxer Shorts) - 3 variants
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0025"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0009"),
        size: "M",
        price: 699,
        quantity: 150,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0026"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0009"),
        size: "L",
        price: 699,
        quantity: 140,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0027"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0009"),
        size: "XL",
        price: 749,
        quantity: 120,
        isActive: true
      },

      // Product 10 (Nightsuit) - 3 variants
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0028"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0010"),
        size: "M",
        price: 1199,
        quantity: 85,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0029"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0010"),
        size: "L",
        price: 1199,
        quantity: 95,
        isActive: true
      },
      {
        _id: new mongoose.Types.ObjectId("673a4434567890abcdef0030"),
        productId: new mongoose.Types.ObjectId("673a3334567890abcdef0010"),
        size: "XL",
        price: 1299,
        quantity: 70,
        isActive: true
      }
    ];

    await ProductVariants.insertMany(productVariants);
    console.log("✓ Inserted 30 product variants (3 per product)");

    // ============================================
    // STEP 5: UPDATE PRODUCTS WITH VARIANT REFERENCES
    // ============================================
    await Product.findByIdAndUpdate("673a3334567890abcdef0001", {
      variantIds: ["673a4434567890abcdef0001", "673a4434567890abcdef0002", "673a4434567890abcdef0003"]
    });
    await Product.findByIdAndUpdate("673a3334567890abcdef0002", {
      variantIds: ["673a4434567890abcdef0004", "673a4434567890abcdef0005", "673a4434567890abcdef0006"]
    });
    await Product.findByIdAndUpdate("673a3334567890abcdef0003", {
      variantIds: ["673a4434567890abcdef0007", "673a4434567890abcdef0008", "673a4434567890abcdef0009"]
    });
    await Product.findByIdAndUpdate("673a3334567890abcdef0004", {
      variantIds: ["673a4434567890abcdef0010", "673a4434567890abcdef0011", "673a4434567890abcdef0012"]
    });
    await Product.findByIdAndUpdate("673a3334567890abcdef0005", {
      variantIds: ["673a4434567890abcdef0013", "673a4434567890abcdef0014", "673a4434567890abcdef0015"]
    });
    await Product.findByIdAndUpdate("673a3334567890abcdef0006", {
      variantIds: ["673a4434567890abcdef0016", "673a4434567890abcdef0017", "673a4434567890abcdef0018"]
    });
    await Product.findByIdAndUpdate("673a3334567890abcdef0007", {
      variantIds: ["673a4434567890abcdef0019", "673a4434567890abcdef0020", "673a4434567890abcdef0021"]
    });
    await Product.findByIdAndUpdate("673a3334567890abcdef0008", {
      variantIds: ["673a4434567890abcdef0022", "673a4434567890abcdef0023", "673a4434567890abcdef0024"]
    });
    await Product.findByIdAndUpdate("673a3334567890abcdef0009", {
      variantIds: ["673a4434567890abcdef0025", "673a4434567890abcdef0026", "673a4434567890abcdef0027"]
    });
    await Product.findByIdAndUpdate("673a3334567890abcdef0010", {
      variantIds: ["673a4434567890abcdef0028", "673a4434567890abcdef0029", "673a4434567890abcdef0030"]
    });
    console.log("✓ Updated product-variant relationships");

    console.log("\n✅ Database seeding completed successfully!");


  } catch (error) {
    console.error("Error seeding database:", error);

  }
};

// Run the seed function
export default seedDatabase();