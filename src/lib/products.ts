
export type SizeVariant = { label: string; price: number };
export type Product = {
  id: string;
  name: string;
  price?: number; // fixed price OR undefined if size-dependent
  image: string;
  warning?: string;
  sizes?: string[]; // simple dropdown, uses fixed price
  sizePriceMap?: SizeVariant[]; // variants with per-size prices
  variants?: string[]; // e.g. Normal/Extra Long, Basic/Advanced
  category: string;
  advancedSurcharge?: number; // added to base price when "Advanced" variant selected
};

export const UNIFORM_GENERAL: Product[] = [
  { id: "u-fullset", name: "Senior Full Set Uniform", price: 150, image: "https://picsum.photos/seed/u-fullset/500/500", warning: "Leather Boots are not included", category: "general" },
  { id: "u-capbadge", name: "Cap Badge", price: 5, image: "https://picsum.photos/seed/u-capbadge/500/500", category: "general" },
  { id: "u-armlet-l", name: 'Badge Armlet 5" x 4" (Left Arm)', price: 5, image: "https://picsum.photos/seed/u-armlet-l/500/500", category: "general" },
  { id: "u-armlet-r", name: 'Badge Armlet 6" x 4.8" (Right Arm)', price: 6, image: "https://picsum.photos/seed/u-armlet-r/500/500", category: "general" },
  { id: "u-tie", name: "Sky Blue Tie", price: 10, image: "https://picsum.photos/seed/u-tie/500/500", category: "general" },
  { id: "u-haversack", name: "Haversack", image: "https://picsum.photos/seed/u-haversack/500/500", variants: ["Normal", "Extra Long"], sizePriceMap: [{label:"Normal",price:11.4},{label:"Extra Long",price:12.6}], category: "general" },
  { id: "u-haversack-loops", name: "Haversack Metal Loops & Slide", price: 10.8, image: "https://picsum.photos/seed/u-haversack-loops/500/500", category: "general" },
  { id: "u-haversack-btn", name: "Haversack Metal Button", price: 5.4, image: "https://picsum.photos/seed/u-haversack-btn/500/500", category: "general" },
  { id: "u-belt", name: "BB Leather Belt", price: 40, image: "https://picsum.photos/seed/u-belt/500/500", sizes: ["32","36","40","44","48"], category: "general" },
  { id: "u-sock", name: "Navy Blue Sock", price: 8.5, image: "https://picsum.photos/seed/u-sock/500/500", category: "general" },
  { id: "u-fscap", name: "Field Service Cap", price: 12.5, image: "https://picsum.photos/seed/u-fscap/500/500", sizes: ["XS-54CM","S-56CM","M-58CM","L-60CM","XL-62CM"], category: "general" },
  { id: "u-mufti", name: "Senior Mufti", price: 25, image: "https://picsum.photos/seed/u-mufti/500/500", sizes: ["XS-34","S-36","M-38","L-40","XL-42","XXL-42","3XL-44"], category: "general" },
  { id: "u-longshirt", name: "Senior Long Sleeve Shirt", image: "https://picsum.photos/seed/u-longshirt/500/500", sizePriceMap: [
    {label:"XXS-38",price:36},{label:"XS-40",price:36},{label:"S-42",price:36},{label:"M-44",price:36},{label:"L-46",price:36},
    {label:"XL-48",price:38},{label:"XXL-50",price:38},{label:"3XL-52",price:38},
  ], category: "general" },
  { id: "u-trouser", name: "Senior Trouser", image: "https://picsum.photos/seed/u-trouser/500/500", sizePriceMap: [
    {label:'24"',price:36},{label:'26"',price:36},{label:'28"',price:36},{label:'30"',price:36},{label:'32"',price:36},{label:'34"',price:36},{label:'36"',price:36},{label:'38"',price:36},
    {label:'40"',price:40},{label:'42"',price:40},{label:'44"',price:40},
  ], category: "general" },
  { id: "u-tshirt", name: "Senior BB T-Shirt", price: 30, image: "https://picsum.photos/seed/u-tshirt/500/500", sizes: ["S","M","L","XL","XXL","3XL"], category: "general" },
];

export const UNIFORM_ACCESSORIES: Product[] = [
  { id: "a-chev-lcpl", name: "Cheveron L/Cpl", price: 11, image: "https://picsum.photos/seed/a-chev-lcpl/500/500", category: "accessories" },
  { id: "a-chev-cpl", name: "Cheveron Cpl", price: 11.5, image: "https://picsum.photos/seed/a-chev-cpl/500/500", category: "accessories" },
  { id: "a-chev-sgt", name: "Cheveron Sgt", price: 12, image: "https://picsum.photos/seed/a-chev-sgt/500/500", category: "accessories" },
  { id: "a-chev-ssgt", name: "Cheveron S/Sgt", price: 12.5, image: "https://picsum.photos/seed/a-chev-ssgt/500/500", category: "accessories" },
  { id: "a-fsr-lcpl", name: "Field Service Rank L/Cpl", price: 5, image: "https://picsum.photos/seed/a-fsr-lcpl/500/500", category: "accessories" },
  { id: "a-fsr-cpl", name: "Field Service Rank Cpl", price: 5.5, image: "https://picsum.photos/seed/a-fsr-cpl/500/500", category: "accessories" },
  { id: "a-fsr-sgt", name: "Field Service Rank Sgt", price: 6, image: "https://picsum.photos/seed/a-fsr-sgt/500/500", category: "accessories" },
  { id: "a-fsr-ssgt", name: "Field Service Rank S/Sgt", price: 6.5, image: "https://picsum.photos/seed/a-fsr-ssgt/500/500", category: "accessories" },
  { id: "a-lanyard", name: "NCO Lanyard", price: 11, image: "https://picsum.photos/seed/a-lanyard/500/500", category: "accessories" },
  { id: "a-red-sash", name: "Red Sash", price: 60, image: "https://picsum.photos/seed/a-red-sash/500/500", category: "accessories" },
  { id: "a-blue-sash", name: "Blue Sash", price: 60, image: "https://picsum.photos/seed/a-blue-sash/500/500", category: "accessories" },
];

const rightAward = (id: string, name: string, price: number, group: string, image?: string, allowAdvanced = true): Product => ({
  id, name, price,
  image: image ?? `https://picsum.photos/seed/${id}/500/500`,
  category: `right-${group}`,
  variants: allowAdvanced ? ["Basic","Advanced"] : undefined,
  advancedSurcharge: allowAdvanced ? 0.6 : undefined,
});

export const RIGHT_AWARDS: Record<string, { title: string; items: Product[] }> = {
  compulsory: { title: "Compulsory", items: [
    rightAward("ra-target","Target Award",4,"compulsory", "https://i.imgur.com/ky8EAGQ.png", false),
    rightAward("ra-christed","Christian Education",8,"compulsory"),
    rightAward("ra-drill","Drill",9,"compulsory"),
    rightAward("ra-recruit","Recruitment",4,"compulsory"),
  ]},
  "group-a": { title: "Group A – Interest", items: [
    rightAward("ra-art","Art",7,"group-a"),
    rightAward("ra-bandmans","Bandmans",8,"group-a"),
    rightAward("ra-bugler","Bugler",11,"group-a"),
    rightAward("ra-drummer","Drummer",8,"group-a"),
    rightAward("ra-piper","Piper",12.5,"group-a"),
    rightAward("ra-craft","Craft",4,"group-a"),
    rightAward("ra-comm","Communications",6,"group-a"),
    rightAward("ra-computer","Computer Knowledge",4,"group-a"),
    rightAward("ra-finance","Financial Stewardship",4.5,"group-a"),
    rightAward("ra-hobbies","Hobbies",4,"group-a"),
    rightAward("ra-intl","International Relations",6.5,"group-a"),
    rightAward("ra-natural","Natural Awareness",4,"group-a"),
  ]},
  "group-b": { title: "Group B – Adventure", items: [
    rightAward("ra-camping","Camping",10,"group-b"),
    rightAward("ra-expedition","Expedition",4,"group-b"),
    rightAward("ra-water","Water Adventure",8,"group-b"),
  ]},
  "group-c": { title: "Group C – Community", items: [
    rightAward("ra-citizenship","Citizenship",9,"group-c"),
    rightAward("ra-commservice","Community Service",4,"group-c"),
    rightAward("ra-envcon","Environmental Conservation",4,"group-c"),
    rightAward("ra-firstaid","First Aid",6.5,"group-c", "https://i.imgur.com/bXgxWoH.jpeg"),
    rightAward("ra-fire","Fire & Rescue",7,"group-c"),
    rightAward("ra-lifesave","Life Saving",7.5,"group-c"),
    rightAward("ra-safety","Safety",8,"group-c"),
    rightAward("ra-social","Social Entrepreneurship",4,"group-c"),
    rightAward("ra-sustain","Sustainability",5.5,"group-c"),
  ]},
  "group-d": { title: "Group D – Physical", items: [
    rightAward("ra-athletics","Athletics",7.5,"group-d"),
    rightAward("ra-gym","Gymnastics",5.5,"group-d"),
    rightAward("ra-martial","Martial Arts",6,"group-d"),
    rightAward("ra-pt","Physical Training",7.5,"group-d"),
    rightAward("ra-sports","Sports",4,"group-d"),
    rightAward("ra-swim","Swimming",6,"group-d"),
  ]},
};

const leftAward = (id: string, name: string, price: number, group: string): Product => ({
  id, name, price, image: `https://picsum.photos/seed/${id}/500/500`, category: `left-${group}`,
});

export const LEFT_AWARDS: Record<string, { title: string; items: Product[] }> = {
  service: { title: "Service Award", items: [
    leftAward("la-jlink","Junior Link",7,"service"),
    leftAward("la-jservice","Junior Service",6.5,"service"),
    leftAward("la-1yr","One Year Service",6,"service"),
    leftAward("la-3yr","Three Year Service",8.5,"service"),
    leftAward("la-long","Long Year Service",11,"service"),
  ]},
  special: { title: "Special Award", items: [
    leftAward("la-bronze","Bronze Scholarship",4,"special"),
    leftAward("la-silver","Silver Scholarship",4,"special"),
    leftAward("la-gold","Gold Scholarship",4,"special"),
  ]},
};

export const RIGHT_GROUPS = [
  { slug: "compulsory", label: "Compulsory" },
  { slug: "group-a", label: "Group A – Interest" },
  { slug: "group-b", label: "Group B – Adventure" },
  { slug: "group-c", label: "Group C – Community" },
  { slug: "group-d", label: "Group D – Physical" },
];

export const LEFT_GROUPS = [
  { slug: "service", label: "Service Award" },
  { slug: "special", label: "Special Award" },
];
