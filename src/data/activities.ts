export interface ActivityGroup {
  title: string;
  items: string[];
}

/**
 * Every 宜/忌 term emitted by lunar-javascript 1.7.7 (the meta term "无" is
 * excluded). Grouped for browsing; the picker is the only way to choose an
 * activity, so this list must stay complete.
 */
export const ACTIVITY_GROUPS: ActivityGroup[] = [
  {
    title: '婚嫁',
    items: [
      '嫁娶',
      '纳采',
      '订盟',
      '问名',
      '纳婿',
      '冠笄',
      '裁衣',
      '合帐',
      '归宁',
      '分居',
    ],
  },
  {
    title: '祭祀祈福',
    items: [
      '祭祀',
      '祈福',
      '求嗣',
      '开光',
      '塑绘',
      '斋醮',
      '酬神',
      '谢土',
      '安香',
      '普渡',
      '解除',
    ],
  },
  {
    title: '建设修造',
    items: [
      '动土',
      '修造',
      '起基',
      '定磉',
      '拆卸',
      '上梁',
      '竖柱',
      '作梁',
      '架马',
      '盖屋',
      '安门',
      '修门',
      '开柱眼',
      '合脊',
      '平治道涂',
      '修饰垣墙',
      '补垣',
      '塞穴',
      '筑堤',
      '坏垣',
      '破屋',
      '开池',
      '开渠',
      '掘井',
      '放水',
      '开厕',
      '安碓磑',
      '造桥',
      '造船',
      '造车器',
      '造畜稠',
      '造仓',
      '造庙',
      '安机械',
      '出火',
      '挂匾',
      '雕刻',
    ],
  },
  {
    title: '商业财务',
    items: [
      '开市',
      '交易',
      '立券',
      '纳财',
      '开仓',
      '出货财',
      '置产',
      '进人口',
      '赴任',
      '词讼',
      '求医',
      '治病',
      '针灸',
      '探病',
      '入学',
      '习艺',
      '雇佣',
      '乘船',
    ],
  },
  {
    title: '出行搬迁',
    items: ['出行', '移徙', '入宅', '安床'],
  },
  {
    title: '丧葬',
    items: [
      '安葬',
      '破土',
      '启钻',
      '修坟',
      '立碑',
      '开生坟',
      '合寿木',
      '入殓',
      '移柩',
      '除服',
      '成服',
      '行丧',
      '归岫',
    ],
  },
  {
    title: '农事畜牧',
    items: [
      '栽种',
      '牧养',
      '纳畜',
      '教牛马',
      '畋猎',
      '捕捉',
      '取渔',
      '结网',
      '割蜜',
      '断蚁',
      '伐木',
    ],
  },
  {
    title: '生活日常',
    items: [
      '沐浴',
      '理发',
      '扫舍',
      '整手足甲',
      '会亲友',
      '经络',
      '作灶',
    ],
  },
  {
    title: '其他',
    items: ['馀事勿取', '诸事不宜'],
  },
];

export const DEFAULT_ACTIVITY = '嫁娶';

/**
 * Activities that actually appear in 时辰-level 宜/忌 lists. The hour
 * vocabulary (32 terms) is much smaller than the day vocabulary, so the
 * picker is filtered when the query scope is 吉时.
 */
export const HOUR_ACTIVITY_GROUPS: ActivityGroup[] = [
  {
    title: '婚嫁',
    items: ['嫁娶', '订婚'],
  },
  {
    title: '祭祀祈福',
    items: ['祭祀', '祈福', '求嗣', '开光', '斋醮', '酬神'],
  },
  {
    title: '建设修造',
    items: ['修造', '动土', '上梁', '盖屋', '合脊', '造桥', '造船', '造庙'],
  },
  {
    title: '商业财务',
    items: [
      '开市',
      '交易',
      '求财',
      '赴任',
      '开仓',
      '进人口',
      '词讼',
      '见贵',
      '乘船',
    ],
  },
  {
    title: '出行搬迁',
    items: ['出行', '移徙', '入宅', '安床'],
  },
  {
    title: '丧葬',
    items: ['安葬', '入殓'],
  },
  {
    title: '生活日常',
    items: ['作灶'],
  },
];

export const ALL_ACTIVITIES = ACTIVITY_GROUPS.flatMap((group) => group.items);

export const HOUR_ACTIVITIES = HOUR_ACTIVITY_GROUPS.flatMap(
  (group) => group.items,
);

export const DEFAULT_HOUR_ACTIVITY = '祈福';
