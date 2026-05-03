import { content as ancientEgyptContent } from "./content/ancient-egypt";
import { content as mesopotamiaContent } from "./content/mesopotamia";
import { content as indusValleyContent } from "./content/indus-valley";
import { content as mayaContent } from "./content/maya";
import { content as ancientGreeceContent } from "./content/ancient-greece";
import { content as romanContent } from "./content/roman";
import { content as carthaginianContent } from "./content/carthaginian";
import { content as persianContent } from "./content/persian";
import { content as ptolemaicContent } from "./content/ptolemaic";
import { content as bactrianContent } from "./content/bactrian";
import { content as byzantineContent } from "./content/byzantine";
import { content as vikingContent } from "./content/viking";
import { content as abbasidContent } from "./content/abbasid";
import { content as mongolContent } from "./content/mongol";
import { content as tangContent } from "./content/tang";
import { content as khmerContent } from "./content/khmer";

export type Era = "ancient" | "classical" | "medieval";

export interface Civilization {
  id: string;
  nameZh: string;
  nameEn: string;
  era: Era;
  volumeTitle: string;
  subtitle: string;
  coverImage: string;
  cities: string[];
  content: string;
}

export const ERA_LABELS: Record<Era, { zh: string; en: string }> = {
  ancient: { zh: "远古", en: "ANCIENT" },
  classical: { zh: "古典", en: "CLASSICAL ERA" },
  medieval: { zh: "中世纪", en: "MEDIEVAL" },
};

export const CIVILIZATIONS: Civilization[] = [
  {
    id: "ancient-egypt",
    nameZh: "古埃及文明",
    nameEn: "Ancient Egypt",
    era: "ancient",
    volumeTitle: "法老之城",
    subtitle: "尼罗河馈赠的千年辉煌",
    coverImage: "/cities/memphis.jpg",
    cities: ["Memphis", "Alexandria"],
    content: ancientEgyptContent,
  },
  {
    id: "mesopotamia",
    nameZh: "美索不达米亚文明",
    nameEn: "Mesopotamia",
    era: "ancient",
    volumeTitle: "两河明珠",
    subtitle: "文明曙光最初的绽放",
    coverImage: "/cities/babylon.jpg",
    cities: ["Babylon"],
    content: mesopotamiaContent,
  },
  {
    id: "indus-valley",
    nameZh: "印度河文明",
    nameEn: "Indus Valley",
    era: "ancient",
    volumeTitle: "砖城之谜",
    subtitle: "五千年前的城市规划先驱",
    coverImage: "/cities/mohenjo-daro.jpg",
    cities: ["Mohenjo-daro"],
    content: indusValleyContent,
  },
  {
    id: "maya",
    nameZh: "玛雅文明",
    nameEn: "Maya",
    era: "ancient",
    volumeTitle: "丛林星辰",
    subtitle: "雨林深处的天文与金字塔",
    coverImage: "/cities/tikal.jpg",
    cities: ["Tikal"],
    content: mayaContent,
  },
  {
    id: "ancient-greece",
    nameZh: "古希腊文明",
    nameEn: "Ancient Greece",
    era: "classical",
    volumeTitle: "民主之源",
    subtitle: "理性与美的永恒摇篮",
    coverImage: "/cities/athens.jpg",
    cities: ["Athens"],
    content: ancientGreeceContent,
  },
  {
    id: "roman",
    nameZh: "罗马文明",
    nameEn: "Roman Civilization",
    era: "classical",
    volumeTitle: "罗马雄风",
    subtitle: "从台伯河畔到世界尽头",
    coverImage: "/cities/roma.jpg",
    cities: ["Roma"],
    content: romanContent,
  },
  {
    id: "carthaginian",
    nameZh: "迦太基文明",
    nameEn: "Carthage",
    era: "classical",
    volumeTitle: "海上霸国",
    subtitle: "腓尼基人的紫色帝国",
    coverImage: "/cities/carthage.jpg",
    cities: ["Carthage"],
    content: carthaginianContent,
  },
  {
    id: "persian",
    nameZh: "波斯文明",
    nameEn: "Persian Empire",
    era: "classical",
    volumeTitle: "万王之都",
    subtitle: "横跨三大洲的帝国荣光",
    coverImage: "/cities/persepolis.jpg",
    cities: ["Persepolis"],
    content: persianContent,
  },
  {
    id: "ptolemaic",
    nameZh: "托勒密文明",
    nameEn: "Ptolemaic Egypt",
    era: "classical",
    volumeTitle: "灯塔之港",
    subtitle: "希腊与法老智慧的交融",
    coverImage: "/cities/alexandria.jpg",
    cities: ["Alexandria"],
    content: ptolemaicContent,
  },
  {
    id: "bactrian",
    nameZh: "巴克特里亚文明",
    nameEn: "Bactria",
    era: "classical",
    volumeTitle: "丝路咽喉",
    subtitle: "东西方文明交汇的前沿",
    coverImage: "/cities/bactria.jpg",
    cities: ["Bactria"],
    content: bactrianContent,
  },
  {
    id: "byzantine",
    nameZh: "拜占庭文明",
    nameEn: "Byzantine Empire",
    era: "medieval",
    volumeTitle: "永恒之焰",
    subtitle: "千年帝都与新罗马的余晖",
    coverImage: "/cities/constantinople.jpg",
    cities: ["Constantinople"],
    content: byzantineContent,
  },
  {
    id: "viking",
    nameZh: "维京文明",
    nameEn: "Vikings",
    era: "medieval",
    volumeTitle: "北海怒涛",
    subtitle: "长船、诸神与未知的海洋",
    coverImage: "/cities/birka.jpg",
    cities: ["Birka"],
    content: vikingContent,
  },
  {
    id: "abbasid",
    nameZh: "阿拔斯文明",
    nameEn: "Abbasid Caliphate",
    era: "medieval",
    volumeTitle: "智慧之宫",
    subtitle: "伊斯兰黄金时代的知识心脏",
    coverImage: "/cities/baghdad.jpg",
    cities: ["Baghdad"],
    content: abbasidContent,
  },
  {
    id: "mongol",
    nameZh: "蒙古文明",
    nameEn: "Mongol Empire",
    era: "medieval",
    volumeTitle: "万骑纵横",
    subtitle: "草原上的世界征服者",
    coverImage: "/cities/karakorum.jpg",
    cities: ["Karakorum"],
    content: mongolContent,
  },
  {
    id: "tang",
    nameZh: "盛唐文明",
    nameEn: "Tang Dynasty",
    era: "medieval",
    volumeTitle: "盛世华章",
    subtitle: "万国来朝的东方帝国",
    coverImage: "/cities/changan.jpg",
    cities: ["Chang'an"],
    content: tangContent,
  },
  {
    id: "khmer",
    nameZh: "高棉文明",
    nameEn: "Khmer Empire",
    era: "medieval",
    volumeTitle: "众神之城",
    subtitle: "热带雨林中的石头宇宙",
    coverImage: "/cities/angkor.jpg",
    cities: ["Angkor"],
    content: khmerContent,
  },
];