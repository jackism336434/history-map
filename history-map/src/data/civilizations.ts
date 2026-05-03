import { content as ancientEgyptContent } from "./content/ancient-egypt";
import { content as mesopotamiaContent } from "./content/mesopotamia";
import { content as indusValleyContent } from "./content/indus-valley";
import { content as ancientGreeceContent } from "./content/ancient-greece";
import { content as romanContent } from "./content/roman";
import { content as carthaginianContent } from "./content/carthaginian";
import { content as persianContent } from "./content/persian";
import { content as ptolemaicContent } from "./content/ptolemaic";
import { content as chineseContent } from "./content/chinese";

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
    id: "chinese",
    nameZh: "中华文明",
    nameEn: "Chinese Civilization",
    era: "medieval",
    volumeTitle: "汉代之光",
    subtitle: "丝路起点的千年帝都",
    coverImage: "/cities/changan.jpg",
    cities: ["Chang'an"],
    content: chineseContent,
  },
];