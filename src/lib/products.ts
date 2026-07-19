
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
  { id: "u-fullset", name: "Senior Full Set Uniform", price: 150, image: "https://i.imgur.com/1fbiekL.png", warning: "Leather Boots are not included", category: "general" },
  { id: "u-capbadge", name: "Cap Badge", price: 5, image: "https://i.imgur.com/JIdT4K7.png", category: "general" },
  { id: "u-armlet-l", name: 'Badge Armlet 5" x 4" (Left Arm)', price: 5, image: "https://i.imgur.com/VK63Ni0.jpeg", category: "general" },
  { id: "u-armlet-r", name: 'Badge Armlet 6" x 4.8" (Right Arm)', price: 6, image: "https://i.imgur.com/CINLTAU.png", category: "general" },
  { id: "u-tie", name: "Sky Blue Tie", price: 10, image: "https://i.imgur.com/fyTulvZ.png", category: "general" },
  { id: "u-haversack", name: "Haversack", image: "https://i.imgur.com/cyr7yGr.png", variants: ["Normal", "Extra Long"], sizePriceMap: [{label:"Normal",price:11.4},{label:"Extra Long",price:12.6}], category: "general" },
  { id: "u-haversack-loops", name: "Haversack Metal Loops & Slide", price: 10.8, image: "https://i.imgur.com/wVj42hh.png", category: "general" },
  { id: "u-haversack-btn", name: "Haversack Metal Button", price: 5.4, image: "https://i.imgur.com/POLYjs4.png", category: "general" },
  { id: "u-belt", name: "BB Leather Belt", price: 40, image: "https://i.imgur.com/nASqumk.png", sizes: ["32","36","40","44","48"], category: "general" },
  { id: "u-sock", name: "Navy Blue Sock", price: 8.5, image: "https://i.imgur.com/hWg44bZ.jpeg", category: "general" },
  { id: "u-fscap", name: "Field Service Cap", price: 12.5, image: "https://i.imgur.com/RS8al3N.png", sizes: ["XS-54CM","S-56CM","M-58CM","L-60CM","XL-62CM"], category: "general" },
  { id: "u-mufti", name: "Senior Mufti", price: 25, image: "https://i.imgur.com/gxajo5o.png", sizes: ["XS-34","S-36","M-38","L-40","XL-42","XXL-42","3XL-44"], category: "general" },
  { id: "u-longshirt", name: "Senior Long Sleeve Shirt", image: "https://i.imgur.com/JGqGR8U.png", sizePriceMap: [
    {label:"XXS-38",price:36},{label:"XS-40",price:36},{label:"S-42",price:36},{label:"M-44",price:36},{label:"L-46",price:36},
    {label:"XL-48",price:38},{label:"XXL-50",price:38},{label:"3XL-52",price:38},
  ], category: "general" },
  { id: "u-trouser", name: "Senior Trouser", image: "https://i.imgur.com/8mldryD.png", sizePriceMap: [
    {label:'24"',price:36},{label:'26"',price:36},{label:'28"',price:36},{label:'30"',price:36},{label:'32"',price:36},{label:'34"',price:36},{label:'36"',price:36},{label:'38"',price:36},
    {label:'40"',price:40},{label:'42"',price:40},{label:'44"',price:40},
  ], category: "general" },
  { id: "u-tshirt", name: "Senior BB T-Shirt", price: 30, image: "https://i.imgur.com/DAx9xwp.png", sizes: ["S","M","L","XL","XXL","3XL"], category: "general" },
];

export const UNIFORM_ACCESSORIES: Product[] = [
  { id: "a-chev-lcpl", name: "Cheveron L/Cpl", price: 11, image: "https://i.imgur.com/RyNCbzV.png", category: "accessories" },
  { id: "a-chev-cpl", name: "Cheveron Cpl", price: 11.5, image: "https://i.imgur.com/0CXf1Kt.png", category: "accessories" },
  { id: "a-chev-sgt", name: "Cheveron Sgt", price: 12, image: "https://i.imgur.com/aBWus4l.png", category: "accessories" },
  { id: "a-chev-ssgt", name: "Cheveron S/Sgt", price: 12.5, image: "https://i.imgur.com/IFILs5x.png", category: "accessories" },
  { id: "a-fsr-lcpl", name: "Field Service Rank L/Cpl", price: 5, image: "https://i.imgur.com/I43Dmfa.png", category: "accessories" },
  { id: "a-fsr-cpl", name: "Field Service Rank Cpl", price: 5.5, image: "https://i.imgur.com/d3pnTut.png", category: "accessories" },
  { id: "a-fsr-sgt", name: "Field Service Rank Sgt", price: 6, image: "https://i.imgur.com/bokZzxL.png", category: "accessories" },
  { id: "a-fsr-ssgt", name: "Field Service Rank S/Sgt", price: 6.5, image: "https://i.imgur.com/SVirhYY.png", category: "accessories" },
  { id: "a-lanyard", name: "NCO Lanyard", price: 11, image: "https://i.imgur.com/EtDnzUD.png", category: "accessories" },
  { id: "a-red-sash", name: "Red Sash", price: 60, image: "https://i.imgur.com/6MuH6L6.png", category: "accessories" },
  { id: "a-blue-sash", name: "Blue Sash", price: 60, image: "https://i.imgur.com/HIqxdyg.png", category: "accessories" },
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
    rightAward("ra-target","Target Award",4,"compulsory", "https://i.imgur.com/9QDc9Hp.png", false),
    rightAward("ra-christed","Christian Education",8,"compulsory", "https://i.imgur.com/P5qHqHd.png"),
    rightAward("ra-drill","Drill",9,"compulsory", "https://i.imgur.com/xDmhRhC.png"),
    rightAward("ra-recruit","Recruitment",4,"compulsory", "https://i.imgur.com/D8R0GQ5.png"),
  ]},
  "group-a": { title: "Group A – Interest", items: [
    rightAward("ra-art","Art",7,"group-a", "https://i.imgur.com/e4Tnd2I.png"),
    rightAward("ra-bandmans","Bandmans",8,"group-a", "https://i.imgur.com/wUb4LFL.png"),
    rightAward("ra-bugler","Bugler",11,"group-a", "https://i.imgur.com/PZBbUi8.png"),
    rightAward("ra-drummer","Drummer",8,"group-a", "https://i.imgur.com/THI4CW5.png"),
    rightAward("ra-piper","Piper",12.5,"group-a", "https://i.imgur.com/P4CT2V2.png"),
    rightAward("ra-craft","Craft",4,"group-a", "https://i.imgur.com/KKMYpSb.png"),
    rightAward("ra-comm","Communications",6,"group-a", "https://i.imgur.com/zLwsZWh.png"),
    rightAward("ra-computer","Computer Knowledge",4,"group-a", "https://i.imgur.com/VZllTEy.png"),
    rightAward("ra-finance","Financial Stewardship",4.5,"group-a", "https://i.imgur.com/ytaOfov.png"),
    rightAward("ra-hobbies","Hobbies",4,"group-a", "https://i.imgur.com/zMqyRS2.png"),
    rightAward("ra-intl","International Relations",6.5,"group-a", "https://i.imgur.com/oe7nLkf.png"),
    rightAward("ra-natural","Natural Awareness",4,"group-a", "https://i.imgur.com/F4B8uZi.png"),
  ]},
  "group-b": { title: "Group B – Adventure", items: [
    rightAward("ra-camping","Camping",10,"group-b", "https://i.imgur.com/lsJfj22.png"),
    rightAward("ra-expedition","Expedition",4,"group-b", "https://i.imgur.com/2AiuSx3.png"),
    rightAward("ra-water","Water Adventure",8,"group-b", "https://i.imgur.com/LXLpMwx.png"),
  ]},
  "group-c": { title: "Group C – Community", items: [
    rightAward("ra-citizenship","Citizenship",9,"group-c", "https://i.imgur.com/OBYf1zk.png"),
    rightAward("ra-commservice","Community Service",4,"group-c", "https://i.imgur.com/c4jcI0P.png"),
    rightAward("ra-envcon","Environmental Conservation",4,"group-c", "https://i.imgur.com/8QZEM8P.png"),
    rightAward("ra-firstaid","First Aid",6.5,"group-c", "https://i.imgur.com/bXgxWoH.jpeg"),
    rightAward("ra-fire","Fire & Rescue",7,"group-c", "https://i.imgur.com/mMBBY9s.png"),
    rightAward("ra-lifesave","Life Saving",7.5,"group-c", "https://i.imgur.com/YwnAI7b.png"),
    rightAward("ra-safety","Safety",8,"group-c", "https://i.imgur.com/OKwBUIH.png"),
    rightAward("ra-social","Social Entrepreneurship",4,"group-c", "https://i.imgur.com/0zIJP31.png"),
    rightAward("ra-sustain","Sustainability",5.5,"group-c", "https://i.imgur.com/wQk2TSy.png"),
  ]},
  "group-d": { title: "Group D – Physical", items: [
    rightAward("ra-athletics","Athletics",7.5,"group-d", "https://i.imgur.com/58J8a6K.png"),
    rightAward("ra-gym","Gymnastics",5.5,"group-d", "https://i.imgur.com/gVib86r.png"),
    rightAward("ra-martial","Martial Arts",6,"group-d", "https://i.imgur.com/ydVFuMG.png"),
    rightAward("ra-pt","Physical Training",7.5,"group-d", "https://i.imgur.com/vPirsm2.png"),
    rightAward("ra-sports","Sports",4,"group-d", "https://i.imgur.com/Eq1Ixas.png"),
    rightAward("ra-swim","Swimming",6,"group-d", "https://i.imgur.com/oAMSRla.png"),
  ]},
};

const leftAward = (id: string, name: string, price: number, group: string, image?: string): Product => ({
  id, name, price, image: image ?? `https://picsum.photos/seed/${id}/500/500`, category: `left-${group}`,
});

export const LEFT_AWARDS: Record<string, { title: string; items: Product[] }> = {
  service: { title: "Service Award", items: [
    leftAward("la-jlink","Junior Link",7,"service"),
    leftAward("la-jservice","Junior Service",6.5,"service", "https://i.imgur.com/Z3CTa0T.png"),
    leftAward("la-1yr","One Year Service",6,"service", "https://i.imgur.com/HYk1PvN.png"),
    leftAward("la-3yr","Three Year Service",8.5,"service", "https://i.imgur.com/C7RYf9N.png"),
    leftAward("la-long","Long Year Service",11,"service", "https://i.imgur.com/KLXiVu1.png"),
  ]},
  special: { title: "Special Award", items: [
    leftAward("la-bronze","Bronze Scholarship",4,"special", "https://i.imgur.com/og2ugqA.png"),
    leftAward("la-silver","Silver Scholarship",4,"special", "https://i.imgur.com/eTqDpn5.png"),
    leftAward("la-gold","Gold Scholarship",4,"special", "https://i.imgur.com/DSwgTvb.png"),
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
