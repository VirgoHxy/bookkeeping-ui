/**
 * 交易类型
 * out表示支出 in表示收入
 */
export enum TradeType {
  out = 0,
  in = 1,
  goodsOut = 2,
  goodsIn = 3,
  teaIn = 4
}

export enum TradeTypeText {
  out = "借钱",
  in = "还钱",
  goodsOut = "买商品",
  goodsIn = "卖商品",
  teaIn = "茶钱"
}

/**
 * 支付类型数组
 */
export const tradeTypeColumns = [
  {
    text: TradeTypeText.out,
    value: TradeType.out
  },
  {
    text: TradeTypeText.in,
    value: TradeType.in
  },
  {
    text: TradeTypeText.goodsOut,
    value: TradeType.goodsOut
  },
  {
    text: TradeTypeText.goodsIn,
    value: TradeType.goodsIn
  },
  {
    text: TradeTypeText.teaIn,
    value: TradeType.teaIn
  }
];

/**
 * 支付类型
 */
export enum PayType {
  cash = 0,
  wechat = 1,
  ali = 2
}

export enum PayTypeText {
  cash = "现金",
  wechat = "微信",
  ali = "支付宝"
}

/**
 * 支付类型数组
 */
export const payTypeColumns = [
  {
    text: PayTypeText.cash,
    value: PayType.cash
  },
  {
    text: PayTypeText.wechat,
    value: PayType.wechat
  },
  {
    text: PayTypeText.ali,
    value: PayType.ali
  }
];

/**
 * 结清状态类型
 */
export enum SettleType {
  dailySettle = 0,
  dailyOwe = 1,
  settle = 2,
  owe = 3
}

export enum SettleTypeText {
  dailySettle = "当天结清",
  dailyOwe = "当天欠账",
  settle = "结清",
  owe = "欠账"
}

/**
 * 顾客
 */
export class Customer {
  id: number;
  name: string;
  tel: string;
  remark?: string;
}

/**
 * 交易记录
 */
export class CustomerRecord {
  customId: Customer["id"];
  name: Customer["name"];
  tel: Customer["tel"];
  moneyRecordList: MoneyRecord[];
}

/**
 * 交易记录
 */
export class MoneyRecord {
  id: number;
  customId: number;
  money: number;
  tradeType: TradeType;
  payType: PayType;
}
