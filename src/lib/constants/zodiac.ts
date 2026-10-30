const ANIMALS = [
  '鼠', '牛', '虎', '兔', '龙', '蛇',
  '马', '羊', '猴', '鸡', '狗', '猪',
] as const;

const XING: number[][] = [
  [3], // 子刑卯
  [10, 7], // 丑刑戌、未
  [5, 8], // 寅刑巳、申
  [0], // 卯刑子
  [4], // 辰自刑
  [2, 8], // 巳刑寅、申
  [6], // 午自刑
  [1, 10], // 未刑丑、戌
  [2, 5], // 申刑寅、巳
  [9], // 酉自刑
  [1, 7], // 戌刑丑、未
  [11], // 亥自刑
];

const HAI: [number, number][] = [
  [0, 7], [1, 6], [2, 5], [3, 4], [8, 11], [9, 10],
];
const PO: [number, number][] = [
  [0, 9], [1, 4], [2, 11], [3, 6], [5, 8], [7, 10],
];
const LIU_HE: [number, number][] = [
  [0, 1], [2, 11], [3, 10], [4, 9], [5, 8], [6, 7],
];
const SAN_HE: number[][] = [
  [8, 0, 4], // 申子辰
  [11, 3, 7], // 亥卯未
  [2, 6, 10], // 寅午戌
  [5, 9, 1], // 巳酉丑
];

function invertPairs(pairs: [number, number][]): Map<number, number[]> {
  const map = new Map<number, number[]>();
  for (const [a, b] of pairs) {
    map.set(a, [...(map.get(a) ?? []), b]);
    map.set(b, [...(map.get(b) ?? []), a]);
  }
  return map;
}

const HAI_MAP = invertPairs(HAI);
const PO_MAP = invertPairs(PO);
const LIU_HE_MAP = invertPairs(LIU_HE);

export interface ZodiacRelations {
  chong: string;
  xing: string[];
  hai: string[];
  po: string[];
  sanHe: string[];
  liuHe: string[];
}

export function zodiacRelations(animal: string): ZodiacRelations | null {
  const index = ANIMALS.indexOf(animal as (typeof ANIMALS)[number]);
  if (index < 0) return null;

  const sanHeGroup = SAN_HE.find((group) => group.includes(index)) ?? [];

  return {
    chong: ANIMALS[(index + 6) % 12]!,
    xing: XING[index]!.map((i) => ANIMALS[i]!),
    hai: (HAI_MAP.get(index) ?? []).map((i) => ANIMALS[i]!),
    po: (PO_MAP.get(index) ?? []).map((i) => ANIMALS[i]!),
    sanHe: sanHeGroup.filter((i) => i !== index).map((i) => ANIMALS[i]!),
    liuHe: (LIU_HE_MAP.get(index) ?? []).map((i) => ANIMALS[i]!),
  };
}

export const XIU_GROUPS = [
  { direction: '东方', xiu: ['角', '亢', '氐', '房', '心', '尾', '箕'] },
  { direction: '北方', xiu: ['斗', '牛', '女', '虚', '危', '室', '壁'] },
  { direction: '西方', xiu: ['奎', '娄', '胃', '昴', '毕', '觜', '参'] },
  { direction: '南方', xiu: ['井', '鬼', '柳', '星', '张', '翼', '轸'] },
] as const;

export function xiuGroup(name: string) {
  return XIU_GROUPS.find((group) => group.xiu.includes(name as never)) ?? XIU_GROUPS[0];
}

export function seasonOf(month: number): string {
  if (month >= 3 && month <= 5) return '春';
  if (month >= 6 && month <= 8) return '夏';
  if (month >= 9 && month <= 11) return '秋';
  return '冬';
}
