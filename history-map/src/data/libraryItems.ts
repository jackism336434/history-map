import { content as guixuTukao } from "./content/library/guixu-tukao";
import { content as tianwenZhi } from "./content/library/tianwen-zhi";
import { content as huangdiNeijing } from "./content/library/huangdi-neijing";
import { content as shanhaiJing } from "./content/library/shanhai-jing";
import { content as urukuTablet } from "./content/library/uruku-tablet";
import { content as hanShuDili } from "./content/library/han-shu-dili";
import { content as resGestae } from "./content/library/res-gestae";
import { content as shahnamehFragment } from "./content/library/shahnameh-fragment";
import { content as persepolisArchive } from "./content/library/persepolis-archive";
import { content as tangLiudian } from "./content/library/tang-liudian";
import { content as silkRoadJournal } from "./content/library/silk-road-journal";
import { content as ibnBattutaExcerpt } from "./content/library/ibn-battuta-excerpt";
import { content as nestorianStele } from "./content/library/nestorian-stele";
import { content as borobudurSutra } from "./content/library/borobudur-sutra";

export type LibraryCategory = "origins" | "empires" | "encounters";

export interface LibraryItem {
  id: string;
  titleZh: string;
  titleEn: string;
  category: LibraryCategory;
  excerpt: string;
  fullText: string;
  year: number;
  regionZh: string;
  regionEn: string;
  reference: string;
  authorZh: string;
  authorEn: string;
  civId: string | null;
  coverImage: string;
}

export const CATEGORY_LABELS: Record<LibraryCategory, { zh: string; en: string; zhSub: string }> = {
  origins: { zh: "文明的起源", en: "ORIGINS OF CIVILIZATION", zhSub: "从洪荒到城邦" },
  empires: { zh: "帝国的兴衰", en: "RISE AND FALL OF EMPIRES", zhSub: "王权与秩序" },
  encounters: { zh: "交流与碰撞", en: "ENCOUNTERS AND EXCHANGES", zhSub: "丝路与大洋" },
};

export const LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: "guixu-tukao",
    titleZh: "归墟图考·卷三",
    titleEn: "Registers of the Abyss · Vol. III",
    category: "origins",
    excerpt: "凡四海之极，皆有待考之域。山川之变、城郭之废、典章之佚，皆为前朝不传之秘。",
    fullText: guixuTukao,
    year: -200,
    regionZh: "中原及四海",
    regionEn: "Central Plains and Beyond",
    reference: "MS-704-G",
    authorZh: "佚名·晋代抄本",
    authorEn: "Anonymous · Jin Dynasty Copy",
    civId: null,
    coverImage: "/library/guixu-tukao.svg",
  },
  {
    id: "tianwen-zhi",
    titleZh: "天文志·星经",
    titleEn: "Celestial Records · Star Canon",
    category: "origins",
    excerpt: "斗柄所指，天下皆春。二十八年宿环列于天极，日月五星行于其间，其道有常，其变有度。",
    fullText: tianwenZhi,
    year: -100,
    regionZh: "东亚全域",
    regionEn: "East Asia",
    reference: "MS-312-T",
    authorZh: "司马迁·《史记》天官书",
    authorEn: "Sima Qian · Records of the Grand Historian",
    civId: null,
    coverImage: "/library/tianwen-zhi.svg",
  },
  {
    id: "huangdi-neijing",
    titleZh: "黄帝内经·素问",
    titleEn: "Inner Canon of the Yellow Emperor · Basic Questions",
    category: "origins",
    excerpt: "阴阳者，天地之道也，万物之纲纪，变化之父母，生杀之本始，神明之府也。",
    fullText: huangdiNeijing,
    year: -300,
    regionZh: "中原",
    regionEn: "Central Plains",
    reference: "MS-108-H",
    authorZh: "佚名·战国至西汉编",
    authorEn: "Anonymous · Warring States to Western Han",
    civId: null,
    coverImage: "/library/huangdi-neijing.svg",
  },
  {
    id: "shanhai-jing",
    titleZh: "山海经·海外经",
    titleEn: "Classic of Mountains and Seas · Outer Lands",
    category: "origins",
    excerpt: "海外自东南陬至东北陬者，有结匈国、南山、比翼鸟，其状如凫而一翼一目，相得乃飞。",
    fullText: shanhaiJing,
    year: -400,
    regionZh: "古中国及域外",
    regionEn: "Ancient China and Beyond",
    reference: "MS-055-S",
    authorZh: "佚名·战国至汉初编",
    authorEn: "Anonymous · Warring States to Early Han",
    civId: null,
    coverImage: "/library/shanhai-jing.svg",
  },
  {
    id: "uruku-tablet",
    titleZh: "乌鲁克泥版·创世铭文",
    titleEn: "Uruk Creation Tablet · Enuma Elish Fragment",
    category: "origins",
    excerpt: "当上方的天尚未命名，下方的地尚无称谓，唯有阿普苏初生与穆木·提亚马特——万物之源泉。",
    fullText: urukuTablet,
    year: -2100,
    regionZh: "两河流域",
    regionEn: "Mesopotamia",
    reference: "MS-017-E",
    authorZh: "苏美尔祭司·乌鲁克抄本",
    authorEn: "Sumerian Priest · Uruk Copy",
    civId: "mesopotamia",
    coverImage: "/library/uruku-tablet.svg",
  },
  {
    id: "han-shu-dili",
    titleZh: "汉书·地理志",
    titleEn: "Book of Han · Geography Treatise",
    category: "empires",
    excerpt: "天下郡国百有三，县邑千三百四十四。户口之盛，版图之广，皆前代所未有也。",
    fullText: hanShuDili,
    year: 92,
    regionZh: "汉帝国全域",
    regionEn: "Han Empire Territories",
    reference: "MS-441-H",
    authorZh: "班固·东汉",
    authorEn: "Ban Gu · Eastern Han",
    civId: null,
    coverImage: "/library/han-shu-dili.svg",
  },
  {
    id: "res-gestae",
    titleZh: "奥古斯都功业录",
    titleEn: "Res Gestae Divi Augusti",
    category: "empires",
    excerpt: "吾年十九，以私人之策举义兵，复共和于危难之中。元老院、骑士与罗马人民，皆尊吾为首。",
    fullText: resGestae,
    year: 14,
    regionZh: "地中海全域",
    regionEn: "Mediterranean",
    reference: "MS-289-R",
    authorZh: "屋大维·罗马铭刻",
    authorEn: "Augustus · Roman Inscription",
    civId: "roman",
    coverImage: "/library/res-gestae.svg",
  },
  {
    id: "shahnameh-fragment",
    titleZh: "列王纪残篇",
    titleEn: "Shahnameh Fragment",
    category: "empires",
    excerpt: "扎尔与卢达芭的故事，是火焰与玫瑰的结合——白发的英雄来自大山，黑眸的公主生于王宫。",
    fullText: shahnamehFragment,
    year: 1010,
    regionZh: "波斯高原",
    regionEn: "Persian Plateau",
    reference: "MS-623-F",
    authorZh: "菲尔多西·加兹尼王朝",
    authorEn: "Ferdowsi · Ghaznavid Era",
    civId: "persian",
    coverImage: "/library/shahnameh-fragment.svg",
  },
  {
    id: "persepolis-archive",
    titleZh: "波斯波利斯档案",
    titleEn: "Persepolis Fortification Archive",
    category: "empires",
    excerpt: "大流士二十二年，皮什亚乌瓦达地区输送谷物五百库尔，经司库伊蒂马验证，盖印存档。",
    fullText: persepolisArchive,
    year: -500,
    regionZh: "波斯帝国全域",
    regionEn: "Persian Empire",
    reference: "MS-336-P",
    authorZh: "阿契美尼德行政官",
    authorEn: "Achaemenid Administrator",
    civId: "persian",
    coverImage: "/library/persepolis-archive.svg",
  },
  {
    id: "tang-liudian",
    titleZh: "唐六典·户部",
    titleEn: "Tang Six Statutes · Ministry of Revenue",
    category: "empires",
    excerpt: "天下户八百九十万，口四千六百万有奇。赋税之法，租庸调三者并行，计丁授田，按丁征税。",
    fullText: tangLiudian,
    year: 738,
    regionZh: "大唐帝国全域",
    regionEn: "Tang Empire",
    reference: "MS-557-T",
    authorZh: "李林甫等奉敕编",
    authorEn: "Li Linfu et al. · Imperial Commission",
    civId: "tang",
    coverImage: "/library/tang-liudian.svg",
  },
  {
    id: "silk-road-journal",
    titleZh: "丝路行纪·西域传",
    titleEn: "Silk Road Travel Journal · Western Regions",
    category: "encounters",
    excerpt: "出玉门关西行三日，至伊吾。自伊吾至高昌四百里，沿途烽燧相望，商胡贩客时见于道。",
    fullText: silkRoadJournal,
    year: 630,
    regionZh: "河西走廊至中亚",
    regionEn: "Hexi Corridor to Central Asia",
    reference: "MS-481-S",
    authorZh: "玄奘·大唐西域记",
    authorEn: "Xuanzang · Great Tang Records",
    civId: "tang",
    coverImage: "/library/silk-road-journal.svg",
  },
  {
    id: "ibn-battuta-excerpt",
    titleZh: "伊本·白图泰行纪摘录",
    titleEn: "Ibn Battuta's Rihla · Excerpt",
    category: "encounters",
    excerpt: "我抵达了印度斯坦，这是世界上最辽阔的国度之一。其人口之众、物产之丰，非亲历者不能信也。",
    fullText: ibnBattutaExcerpt,
    year: 1333,
    regionZh: "摩洛哥至中国",
    regionEn: "Morocco to China",
    reference: "MS-778-B",
    authorZh: "伊本·白图泰·口述",
    authorEn: "Ibn Battuta · Dictated",
    civId: null,
    coverImage: "/library/ibn-battuta-excerpt.svg",
  },
  {
    id: "nestorian-stele",
    titleZh: "景教碑文拓本",
    titleEn: "Nestorian Stele Inscription",
    category: "encounters",
    excerpt: "真常之道，妙而复兴。景风东扇，法浪西归。大秦有声，流溉此方。",
    fullText: nestorianStele,
    year: 781,
    regionZh: "长安至地中海",
    regionEn: "Chang'an to Mediterranean",
    reference: "MS-615-N",
    authorZh: "景净·唐代碑刻",
    authorEn: "Jingjing · Tang Dynasty Inscription",
    civId: "tang",
    coverImage: "/library/nestorian-stele.svg",
  },
  {
    id: "borobudur-sutra",
    titleZh: "婆罗浮屠经卷",
    titleEn: "Borobudur Sutra Scroll",
    category: "encounters",
    excerpt: "此岸即彼岸。当善萨行者观照世间，见苦集灭道，于一切法中无所执着，即为到彼岸。",
    fullText: borobudurSutra,
    year: 800,
    regionZh: "爪哇至中土",
    regionEn: "Java to Central Plains",
    reference: "MS-842-K",
    authorZh: "佚名·夏连特拉王朝",
    authorEn: "Anonymous · Sailendra Dynasty",
    civId: "khmer",
    coverImage: "/library/borobudur-sutra.svg",
  },
];