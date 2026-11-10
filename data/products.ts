export type Occasion = "Wedding" | "Evening" | "Casual" | "Festive";
export type Category = "Kanjivaram" | "Banarasi" | "Chanderi" | "Bridal";

export type Colour = { name: string; hex: string };

export type Product = {
  id: string;
  name: string;
  images: string[];
  price: number;
  mrp: number;
  fabric: string;
  occasion: Occasion;
  category: Category;
  sizes: string[];
  colors: Colour[];
  isNew?: boolean;
};

const ALL_SIZES = ["Free Size (5.5m + 0.8m Blouse)"];
const img = (name: string) => `/images/${name}.jpg`;

export const products: Product[] = [
  {
    id: "emerald-kanjivaram-saree",
    name: "Vaidurya Emerald Kanjivaram Saree",
    images: [img("saree-emerald-kanjivaram"), img("saree-emerald-detail")],
    price: 48500,
    mrp: 56000,
    fabric: "Pure mulberry silk with antique gold korvai temple borders and heavy zari pallu",
    occasion: "Wedding",
    category: "Kanjivaram",
    sizes: ALL_SIZES,
    colors: [
      { name: "Emerald", hex: "#165B4C" },
      { name: "Gold", hex: "#D4AF37" },
    ],
    isNew: true,
  },
  {
    id: "royal-blue-banarasi-saree",
    name: "Neelambari Banarasi Katan Saree",
    images: [img("saree-royal-blue"), img("saree-blue-detail")],
    price: 38900,
    mrp: 44000,
    fabric: "Handwoven pure katan silk with silver-gilt floral jaal and meenakari motifs",
    occasion: "Festive",
    category: "Banarasi",
    sizes: ALL_SIZES,
    colors: [
      { name: "Sapphire", hex: "#1B3B6F" },
      { name: "Silver", hex: "#C5C6C7" },
    ],
    isNew: true,
  },
  {
    id: "crimson-bridal-saree",
    name: "Sindhoori Heritage Bridal Saree",
    images: [img("saree-crimson-bridal"), img("saree-bridal-detail")],
    price: 68000,
    mrp: 78000,
    fabric: "Heavy heritage bridal silk woven with 24kt gold electroplated zari and zardozi borders",
    occasion: "Wedding",
    category: "Bridal",
    sizes: ALL_SIZES,
    colors: [
      { name: "Crimson", hex: "#9B111E" },
      { name: "Antique Gold", hex: "#B8860B" },
    ],
    isNew: true,
  },
  {
    id: "mustard-paithani-saree",
    name: "Mayura Mustard Paithani Silk Saree",
    images: [img("saree-mustard-paithani"), img("saree-paithani-detail")],
    price: 42000,
    mrp: 49000,
    fabric: "Pure silk with contrast magenta peacock (mor) and lotus motifs and woven zari pallu",
    occasion: "Festive",
    category: "Kanjivaram",
    sizes: ALL_SIZES,
    colors: [
      { name: "Mustard", hex: "#E1AD01" },
      { name: "Magenta", hex: "#CA1F7B" },
    ],
    isNew: true,
  },
  {
    id: "chanderi-sage-saree",
    name: "Vasant Sage Chanderi Silk Saree",
    images: [img("saree-chanderi-sage"), img("saree-blush-organza")],
    price: 24500,
    mrp: 29000,
    fabric: "Fine handwoven sheer Chanderi silk with delicate silver zari floral bootis",
    occasion: "Casual",
    category: "Chanderi",
    sizes: ALL_SIZES,
    colors: [
      { name: "Sage Green", hex: "#8A9A86" },
      { name: "Silver", hex: "#D8D8D8" },
    ],
    isNew: true,
  },
  {
    id: "tissue-gold-saree",
    name: "Swarna Molten Gold Tissue Silk Saree",
    images: [img("saree-tissue-gold"), img("craft-zari")],
    price: 52000,
    mrp: 59000,
    fabric: "Gleaming metallic gold tissue silk drape with rich woven antique bronze borders",
    occasion: "Evening",
    category: "Banarasi",
    sizes: ALL_SIZES,
    colors: [
      { name: "Champagne Gold", hex: "#D4AF37" },
      { name: "Bronze", hex: "#8C6239" },
    ],
    isNew: true,
  },
  {
    id: "tussar-rust-saree",
    name: "Aranya Rust Terracotta Tussar Saree",
    images: [img("saree-tussar-rust"), img("saree-plum-silk")],
    price: 28500,
    mrp: 33000,
    fabric: "Artisanal hand-spun wild Tussar silk with traditional temple borders and tribal motifs",
    occasion: "Casual",
    category: "Chanderi",
    sizes: ALL_SIZES,
    colors: [
      { name: "Rust", hex: "#B7410E" },
      { name: "Ochre", hex: "#CC7722" },
    ],
    isNew: true,
  },
  {
    id: "wine-brocade-saree",
    name: "Draksha Wine Brocade Silk Saree",
    images: [img("saree-wine-brocade"), img("saree-pink-bridal")],
    price: 34000,
    mrp: 39500,
    fabric: "Opulent micro-woven gold zari buttis on pure wine mulberry silk with heavy brocade pallu",
    occasion: "Evening",
    category: "Banarasi",
    sizes: ALL_SIZES,
    colors: [
      { name: "Wine", hex: "#5C1D24" },
      { name: "Gold", hex: "#D4AF37" },
    ],
    isNew: true,
  },
];

export const productById = (id: string) => products.find((p) => p.id === id)!;

export type Look = {
  label: string;
  productId: string;
  accent: string;
};

export const showcaseLooks: Look[] = [
  { label: "Kanjivaram Silk", productId: "emerald-kanjivaram-saree", accent: "#E5ECE8" },
  { label: "Banarasi Katan", productId: "royal-blue-banarasi-saree", accent: "#E4E8F2" },
  { label: "Heritage Bridal", productId: "crimson-bridal-saree", accent: "#F6E8E6" },
  { label: "Paithani Weave", productId: "mustard-paithani-saree", accent: "#F8F1DE" },
];

export const occasions = [
  { title: "Bridal & Muhurtham", image: img("saree-crimson-bridal"), count: "64 sarees" },
  { title: "Evening Receptions", image: img("saree-tissue-gold"), count: "42 sarees" },
  { title: "Temple & Heritage", image: img("saree-emerald-kanjivaram"), count: "58 sarees" },
  { title: "Festive Celebrations", image: img("saree-tussar-rust"), count: "76 sarees" },
];

export const lookbook = [
  { image: img("saree-crimson-bridal"), caption: "The Muhurtham Bride" },
  { image: img("saree-royal-blue"), caption: "Banaras Nights" },
  { image: img("saree-emerald-kanjivaram"), caption: "Temple Kanjivaram" },
  { image: img("saree-chanderi-sage"), caption: "Courtyard Chanderi" },
  { image: img("saree-mustard-paithani"), caption: "Paithani Heritage" },
  { image: img("saree-tissue-gold"), caption: "Molten Gold Gala" },
  { image: img("saree-tussar-rust"), caption: "Earthy Tussar" },
  { image: img("saree-wine-brocade"), caption: "Imperial Wine Brocade" },
];

export const instagramFeed = [
  img("saree-emerald-detail"),
  img("saree-chanderi-sage"),
  img("saree-bridal-detail"),
  img("saree-royal-blue"),
  img("saree-paithani-detail"),
  img("saree-tissue-gold"),
  img("saree-blue-detail"),
  img("saree-tussar-rust"),
  img("saree-crimson-bridal"),
  img("saree-mustard-paithani"),
];

export const testimonials = [
  {
    name: "Ananya R.",
    location: "Mumbai",
    avatar: img("avatar-2"),
    quote:
      "My Kanjivaram arrived wrapped like an heirloom. The zari catches light in every photo — my mother cried before I did.",
  },
  {
    name: "Meera S.",
    location: "Bengaluru",
    avatar: img("avatar-4"),
    quote:
      "My wedding saree arrived in the most exquisite heirloom box. The pure silk drape and weight of the pallu was breathtaking.",
  },
  {
    name: "Kavya N.",
    location: "Delhi",
    avatar: img("avatar-1"),
    quote:
      "Effortless, quietly luxurious, and the blouse matching was spot on. Kancheepuram Vakula Silks is now my first stop for every occasion.",
  },
];

export const avatars = [img("avatar-1"), img("avatar-2"), img("avatar-3"), img("avatar-4")];
