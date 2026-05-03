export interface AncientCity {
  nameZh: string;
  nameEn: string;
  ancientName: string;
  lng: number;
  lat: number;
  period: string;
  description: string;
  image: string;
}

export const ANCIENT_CITIES: AncientCity[] = [
  {
    nameZh: "长安",
    nameEn: "Chang'an",
    ancientName: "Cháng'ān · 長安",
    lng: 108.94,
    lat: 34.26,
    period: "汉唐 · 公元前202年—公元904年",
    description:
      "西汉与隋唐的都城，丝绸之路的东端起点。百万人口的世界级都会，见证了千年繁华与文明交汇。",
    image: "/cities/changan.jpg",
  },
  {
    nameZh: "罗马",
    nameEn: "Roma",
    ancientName: "Rōma · Roma",
    lng: 12.5,
    lat: 41.9,
    period: "罗马帝国 · 公元前753年—公元476年",
    description:
      "永恒之城，地中海世界的中心。从共和到帝国，罗马的法律、建筑与道路网络影响了整个西方文明。",
    image: "/cities/roma.jpg",
  },
  {
    nameZh: "巴比伦",
    nameEn: "Babylon",
    ancientName: "Bābilu · 𒆳𒆍𒀭𒈨)",
    lng: 44.42,
    lat: 32.54,
    period: "美索不达米亚 · 公元前2300年—公元前539年",
    description:
      "两河流域的明珠，汉谟拉比法典的诞生地。空中花园与巴别塔的传说至今令人神往。",
    image: "/cities/babylon.jpg",
  },
  {
    nameZh: "雅典",
    nameEn: "Athens",
    ancientName: "Athḗnai · ΑΘΗΝΑΙ",
    lng: 23.73,
    lat: 37.98,
    period: "古希腊 · 公元前3000年—公元322年",
    description:
      "西方文明的摇篮，民主与哲学的发源地。帕特农神庙矗立于卫城之上，庇护着苏格拉底与柏拉图的智慧。",
    image: "/cities/athens.jpg",
  },
  {
    nameZh: "孟斐斯",
    nameEn: "Memphis",
    ancientName: "Men-nefer · 𓉔𓏏𓊪𓏏𓇯",
    lng: 31.25,
    lat: 29.85,
    period: "古埃及 · 公元前3100年—公元前2200年",
    description:
      "下埃及的古都，金字塔建造者的城市。拉美西斯二世在此加冕，尼罗河的馈赠滋养了辉煌的法老文明。",
    image: "/cities/memphis.jpg",
  },
  {
    nameZh: "巴克特里亚",
    nameEn: "Bactria",
    ancientName: "Baktriš · 𐬁𐬀𐬰𐬙𐬭𐬌",
    lng: 69.2,
    lat: 37.5,
    period: "大夏 · 公元前2500年—公元8世纪",
    description:
      "中亚的十字路口，丝绸之路的关键节点。希腊、波斯、印度与游牧文明在此交融，留下了璀璨的巴克特里亚宝藏。",
    image: "/cities/bactria.jpg",
  },
  {
    nameZh: "亚历山大",
    nameEn: "Alexandria",
    ancientName: "Alexándreia · ΑΛΕΞΑΝΔΡΕΙΑ",
    lng: 29.92,
    lat: 31.2,
    period: "托勒密王朝 · 公元前331年—公元641年",
    description:
      "法老遗产与希腊智慧的交汇。亚历山大图书馆收藏了人类知识的精华，灯塔照亮了地中海的航路。",
    image: "/cities/alexandria.jpg",
  },
  {
    nameZh: "迦太基",
    nameEn: "Carthage",
    ancientName: "Qart-ḥadašt · 𐤒𐤓𐤕 𐤇𐤃𐤔𐤕",
    lng: 10.24,
    lat: 36.85,
    period: "迦太基 · 公元前814年—公元前146年",
    description:
      "腓尼基人的海上霸国，汉尼拔的故土。与罗马争霸百年，虽终陷落，其航海与商业遗产永存。",
    image: "/cities/carthage.jpg",
  },
  {
    nameZh: "波斯波利斯",
    nameEn: "Persepolis",
    ancientName: "Pārsa · 𐎱𐎠𐎼𐎿",
    lng: 52.89,
    lat: 29.93,
    period: "阿契美尼德帝国 · 公元前518年—公元前330年",
    description:
      "万王之王的仪式之都，波斯帝国的心脏。百柱大厅与浮雕廊道展示了帝国的恢弘与多元。",
    image: "/cities/persepolis.jpg",
  },
  {
    nameZh: "摩亨佐达罗",
    nameEn: "Mohenjo-daro",
    ancientName: "Mūhi-jo-daro · موهن جو دڑو",
    lng: 68.14,
    lat: 27.32,
    period: "印度河文明 · 公元前2500年—公元前1900年",
    description:
      "印度河谷的砖城，城市规划的先驱。精密的排水系统与标准化砖块，展现了五千年前的高度文明。",
    image: "/cities/mohenjo-daro.jpg",
  },
  {
    nameZh: "提卡尔",
    nameEn: "Tikal",
    ancientName: "Tik'al · Ṯiki'",
    lng: -89.63,
    lat: 17.22,
    period: "玛雅 · 公元前200年—公元900年",
    description:
      "玛雅文明最伟大的城邦之一，深藏于危地马拉热带雨林之中。神庙塔楼刺破林冠，石刻铭文记录着王朝的兴衰与星辰的运行。",
    image: "/cities/tikal.jpg",
  },
  {
    nameZh: "君士坦丁堡",
    nameEn: "Constantinople",
    ancientName: "Kōnstantinoúpolis · Κωνσταντινούπολις",
    lng: 28.98,
    lat: 41.01,
    period: "拜占庭 · 公元330年—1453年",
    description:
      "东罗马帝国的永恒之都，欧亚交界的堡垒。圣索菲亚大教堂的穹顶下，希腊正教的光芒照耀了千年。",
    image: "/cities/constantinople.jpg",
  },
  {
    nameZh: "比尔卡",
    nameEn: "Birka",
    ancientName: "Birka · Björkö",
    lng: 17.37,
    lat: 59.38,
    period: "维京 · 公元800年—975年",
    description:
      "维京时代波罗的海最重要的贸易据点，斯堪的纳维亚的第一个城市。来自东方的银币与东方的丝绸在此交汇。",
    image: "/cities/birka.jpg",
  },
  {
    nameZh: "巴格达",
    nameEn: "Baghdad",
    ancientName: "Madīnat as-Salām · مدينة السلام",
    lng: 44.36,
    lat: 33.31,
    period: "阿拔斯 · 公元762年—1258年",
    description:
      "阿拔斯王朝的圆形之城，伊斯兰黄金时代的知识心脏。智慧之宫汇聚了从希腊到印度的全部学术遗产。",
    image: "/cities/baghdad.jpg",
  },
  {
    nameZh: "喀喇和林",
    nameEn: "Karakorum",
    ancientName: "Kharakhorum · Хархорин",
    lng: 102.83,
    lat: 47.20,
    period: "蒙古 · 公元1220年—1260年",
    description:
      "蒙古帝国的第一个都城，草原上的世界会议厅。窝阔台汗在此建城，东西方的使节、商人与匠人齐聚于此。",
    image: "/cities/karakorum.jpg",
  },
  {
    nameZh: "吴哥",
    nameEn: "Angkor",
    ancientName: "Yasodharapura · យសោធរបុរ",
    lng: 103.85,
    lat: 13.41,
    period: "高棉 · 公元802年—1431年",
    description:
      "高棉帝国的圣城，世界上最大的前工业时代城市。吴哥窟的塔尖倒映在护城河中，是人间对天界的模仿。",
    image: "/cities/angkor.jpg",
  },
];
