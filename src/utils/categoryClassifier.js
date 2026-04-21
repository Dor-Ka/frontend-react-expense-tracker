import { CATEGORY_OPTIONS } from "../constants/categories";

const CATEGORY_KEYWORDS = {
  Food: [
    "lunch", "dinner", "breakfast", "meal", "food", "restaurant", "cafe",
    "grocery", "supermarket", "eat", "drink", "coffee", "tea", "snack",
    "午餐", "晚餐", "早餐", "吃饭", "餐厅", "饭馆", "外卖", "奶茶",
    "咖啡", "超市", "买菜", "零食", "水果", "饮料", "肯德基", "麦当劳",
    "必胜客", "汉堡王", "星巴克", "瑞幸", "海底捞", "火锅", "烧烤",
    "披萨", "寿司", "日料", "韩餐", "中餐", "西餐", "快餐", "小吃",
    "面包", "蛋糕", "甜点", "水果店", "菜市场", "便利店", "7-11",
    "全家", "罗森",
    "西瓜", "苹果", "香蕉", "橙子", "草莓", "葡萄", "桃子", "梨", "樱桃",
    "猕猴桃", "芒果", "菠萝", "榴莲", "柚子", "柠檬", "哈密瓜", "木瓜",
    "火龙果", "杨梅", "荔枝", "龙眼", "椰子", "石榴", "柿子", "山楂",
    "枣", "无花果", "枇杷", "杨桃", "山竹", "莲雾", "番石榴", "百香果",
    "白菜", "萝卜", "土豆", "西红柿", "番茄", "黄瓜", "茄子", "辣椒",
    "豆角", "南瓜", "冬瓜", "苦瓜", "丝瓜", "芹菜", "韭菜", "菠菜",
    "生菜", "油麦菜", "空心菜", "娃娃菜", "甘蓝", "花菜", "西兰花",
    "洋葱", "大蒜", "姜", "葱", "香菜", "胡萝卜", "山药", "莲藕", "芋头",
    "红薯", "紫薯", "马铃薯",
    "猪肉", "牛肉", "羊肉", "鸡肉", "鸭肉", "鹅肉", "鱼肉", "虾", "蟹",
    "海鲜", "火腿", "香肠", "培根", "牛排", "猪排", "羊排", "鸡翅",
    "鸡腿", "鸡胸肉",
    "米饭", "面条", "包子", "饺子", "馒头", "粥", "饼干", "汉堡", "三明治",
    "饭团", "煎饼", "油条", "豆浆", "豆腐", "豆皮", "腐竹",
    "牛奶", "酸奶", "果汁", "可乐", "雪碧", "矿泉水", "纯净水", "啤酒",
    "红酒", "白酒", "鸡尾酒",
    "薯片", "巧克力", "糖果", "坚果", "瓜子", "花生", "开心果", "腰果",
    "核桃", "杏仁", "葡萄干", "蜜饯", "果脯", "肉干", "肉脯", "辣条",
    "调料", "酱油", "醋", "盐", "糖", "味精", "鸡精", "料酒", "生抽",
    "老抽", "蚝油", "番茄酱", "沙拉酱", "豆瓣酱", "老干妈", "火锅底料",
    "烧烤料"
  ],
  Transport: [
    "uber", "taxi", "cab", "bus", "train", "subway", "metro", "flight",
    "gas", "fuel", "parking", "uber", "lyft", "bike", "scooter",
    "滴滴", "出租车", "公交", "地铁", "高铁", "飞机", "机票",
    "加油", "停车", "共享单车", "电动车", "网约车", "顺风车",
    "打车", "火车票", "机票", "船票", "过路费", "高速费", "油费",
    "代驾", "租车", "共享汽车"
  ],
  Entertainment: [
    "movie", "cinema", "film", "game", "music", "concert", "ticket",
    "netflix", "spotify", "youtube", "gaming", "hobby", "sports", "gym",
    "电影", "看电影", "游戏", "KTV", "唱歌", "演唱会", "门票",
    "健身", "运动", "旅游", "旅行", "酒店", "住宿", "游乐园",
    "动物园", "博物馆", "展览", "话剧", "音乐会", "球赛", "游泳",
    "瑜伽", "舞蹈", "剧本杀", "密室逃脱", "桌游", "酒吧", "夜店",
    "按摩", "SPA", "美甲", "美发", "美容", "纹身", "射箭", "攀岩"
  ],
  Bills: [
    "rent", "electricity", "water", "internet", "phone", "mobile", "bill",
    "insurance", "subscription", "membership", "loan", "credit", "tax",
    "房租", "电费", "水费", "网费", "话费", "手机费", "物业费",
    "暖气费", "燃气费", "保险", "订阅", "会员", "贷款", "信用卡",
    "税费", "罚款", "罚单", "学费", "培训费", "考试费", "报名费",
    "维修费", "快递费", "运费", "邮费", "服务费", "手续费"
  ]
};

export const categorizeByTitle = (title) => {
  if (!title || typeof title !== "string") {
    return "Other";
  }

  const lowerTitle = title.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerTitle.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }

  return "Other";
};

export const getCategorySuggestion = (title) => {
  const category = categorizeByTitle(title);
  return {
    category,
    isSuggested: category !== "Other"
  };
};
