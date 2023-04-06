<script setup lang="ts">
import {
  Customer,
  MoneyRecord,
  PayType,
  payTypeColumns,
  SettleType,
  TradeType,
  tradeTypeColumns
} from "@/class-type";
import { showToast, TagType } from "vant";
import { computed, reactive, ref } from "vue";
const customerList: Customer[] = reactive([
  {
    id: 1,
    name: "张三",
    tel: "13000000000",
    remark: "1组"
  },
  {
    id: 2,
    name: "李四",
    tel: "1310000000",
    remark: "2组"
  },
  {
    id: 3,
    name: "王五",
    tel: "1320000000",
    remark: "3组"
  }
]);
const activeCustomerId = ref(null);
const payTypePickerShow = ref(false);
const customerPickerShow = ref(false);
const customerColumns = customerList.map(ele => ({
  text: ele.name,
  value: ele.id
}));
const customerRecordList = reactive([
  {
    customId: 1,
    name: "张三",
    tel: "13000000000",
    moneyRecordList: [
      {
        id: 0,
        customId: 1,
        money: 200,
        tradeType: TradeType.in,
        payType: PayType.cash
      },
      {
        id: 0,
        customId: 1,
        money: 200,
        tradeType: TradeType.out,
        payType: PayType.wechat
      }
    ]
  },
  {
    customId: 2,
    name: "李四",
    tel: "1310000000",
    moneyRecordList: [
      {
        id: 0,
        customId: 2,
        money: 50,
        tradeType: TradeType.in,
        payType: PayType.ali
      },
      {
        id: 1,
        customId: 2,
        money: 100,
        tradeType: TradeType.out,
        payType: PayType.cash
      }
    ]
  }
]);
const customerRecordShow = ref(false);
const customerRecordForm = reactive({
  money: null,
  tradeType: TradeType.out,
  payType: PayType.cash,
  custom: {} as Customer
});
const customTagComputed = computed(() => (moneyRecordList: MoneyRecord[]) => {
  const money = getSumOfCustomerMoney(moneyRecordList);
  const absMoney = Math.abs(money);
  const tagInfo: { tagType?: TagType; text?: string } = {};
  if (money > 0) {
    tagInfo.tagType = "primary";
    tagInfo.text = `补还 ${absMoney}`;
  } else if (money == 0) {
    tagInfo.tagType = "success";
    tagInfo.text = "当天结清";
  } else {
    tagInfo.tagType = "danger";
    tagInfo.text = `当天欠账 ${absMoney}`;
  }
  return tagInfo;
});
const moneyRecordShow = ref(false);
const moneyRecordForm = reactive({
  money: null,
  tradeType: TradeType.out,
  payType: PayType.cash
});
const settleComputed = computed(() => (moneyRecordList: MoneyRecord[]) => {
  const money = getSumOfCustomerMoney(moneyRecordList);
  if (money > 0) {
    // 暂时
    return -1;
  } else if (money == 0) {
    return SettleType.dailySettle;
  } else {
    return SettleType.dailyOwe;
  }
});
const tradeTypeTagComputed = computed(() => (moneyRecord: MoneyRecord) => {
  const tagInfo: { tagType?: TagType; text?: string } = {};
  const tradeType = moneyRecord.tradeType;
  const tradeTypeText =
    tradeTypeColumns.filter(ele => ele.value == tradeType)[0]?.text || "未知";
  tagInfo.text = tradeTypeText;
  if (tradeType == TradeType.out) {
    tagInfo.tagType = "danger";
  } else if (tradeType == TradeType.in) {
    tagInfo.tagType = "success";
  }
  return tagInfo;
});

const payTypeTagComputed = computed(() => (moneyRecord: MoneyRecord) => {
  const tagInfo: { color?: string; text?: string } = {};
  const payType = moneyRecord.payType;
  const payTypeText =
    payTypeColumns.filter(ele => ele.value == payType)[0]?.text || "未知";
  tagInfo.text = payTypeText;
  if (payType == PayType.cash) {
    tagInfo.color = "#f77a2a";
  } else if (payType == PayType.wechat) {
    tagInfo.color = "#11981a";
  } else if (payType == PayType.ali) {
    tagInfo.color = "#1989fa";
  }
  return tagInfo;
});

function getSumOfCustomerMoney(moneyRecordList: MoneyRecord[]) {
  if (moneyRecordList instanceof Array) {
    return moneyRecordList.reduce((start, ele) => {
      if (ele.tradeType == TradeType.in) {
        return start + ele.money;
      } else if (ele.tradeType == TradeType.out) {
        return start - ele.money;
      }
    }, 0);
  } else {
    return 0;
  }
}
function closeMoneyRecordOverlay() {
  moneyRecordShow.value = false;
  moneyRecordForm.money = null;
  moneyRecordForm.tradeType = TradeType.out;
}
function submitMoneyRecordForm() {
  const money = Math.abs(moneyRecordForm.money);
  addMoneyRecord(money, moneyRecordForm.tradeType, moneyRecordForm.payType);
  closeMoneyRecordOverlay();
}
function addMoneyRecord(money: number, tradeType: TradeType, payType: PayType) {
  const customRecord = customerRecordList.find(
    ele => ele.customId == activeCustomerId.value
  );
  const moneyRecordList = customRecord.moneyRecordList;
  moneyRecordList.push({
    id: 998,
    customId: customRecord.customId,
    money,
    tradeType,
    payType
  });
}
function clearMoneyRecord(name: string, moneyRecordList: MoneyRecord[]) {
  const money = getSumOfCustomerMoney(moneyRecordList);
  if (money >= 0) {
    showToast({
      message: `未找到${name}的欠账`,
      icon: "info"
    });
  } else {
    payTypePickerShow.value = true;
  }
}
function closeCustomerRecordOverlay() {
  customerRecordShow.value = false;
  customerRecordForm.money = null;
  customerRecordForm.tradeType = TradeType.out;
  customerRecordForm.custom = {} as Customer;
}
function addCustomerRecord() {
  const customRecord = customerRecordList.find(
    ele => ele.customId == customerRecordForm.custom.id
  );
  if (customRecord) {
    showToast({
      message: `${customerRecordForm.custom.name}已存在`,
      icon: "info"
    });
    return;
  }
  customerRecordList.push({
    customId: customerRecordForm.custom.id,
    name: customerRecordForm.custom.name,
    tel: customerRecordForm.custom.tel,
    moneyRecordList: [
      {
        id: 999,
        customId: customerRecordForm.custom.id,
        money: customerRecordForm.money,
        tradeType: customerRecordForm.tradeType,
        payType: customerRecordForm.payType
      }
    ]
  });
}
function submitCustomerRecordForm() {
  addCustomerRecord();
  closeCustomerRecordOverlay();
}
function confirmCustomerPicker({ selectedOptions }) {
  const custom = customerList.filter(
    ele => ele.id == selectedOptions[0].value
  )[0];
  customerPickerShow.value = false;
  customerRecordForm.custom = custom ? custom : ({} as Customer);
}
function confirmPayTypePicker({ selectedOptions }) {
  const customRecord = customerRecordList.find(
    ele => ele.customId == activeCustomerId.value
  );
  const moneyRecordList = customRecord.moneyRecordList;
  const money = getSumOfCustomerMoney(moneyRecordList);
  const absMoney = Math.abs(money);
  payTypePickerShow.value = false;
  addMoneyRecord(absMoney, TradeType.in, selectedOptions[0].value);
}
</script>

<template>
  <van-collapse accordion v-model="activeCustomerId">
    <van-collapse-item
      v-for="customRecord in customerRecordList"
      :key="customRecord.customId"
      :name="customRecord.customId"
    >
      <template #title>
        <div>
          {{ customRecord.name
          }}{{ customRecord.tel ? `（${customRecord.tel}）` : "" }}
          <van-tag
            :type="customTagComputed(customRecord.moneyRecordList).tagType"
          >
            {{ customTagComputed(customRecord.moneyRecordList).text }}
          </van-tag>
        </div>
      </template>
      <van-list>
        <van-cell
          v-for="moneyRecord in customRecord.moneyRecordList"
          :key="moneyRecord.id"
          :value="moneyRecord.money"
        >
          <template #title>
            <van-tag
              class="mr-2"
              :type="tradeTypeTagComputed(moneyRecord).tagType"
              >{{ tradeTypeTagComputed(moneyRecord).text }}</van-tag
            >
            <van-tag :color="payTypeTagComputed(moneyRecord).color">{{
              payTypeTagComputed(moneyRecord).text
            }}</van-tag>
          </template>
        </van-cell>
      </van-list>
      <div class="flex-bc">
        <van-button
          type="primary"
          class="w-1/3"
          @click="moneyRecordShow = true"
        >
          添加
        </van-button>
        <van-button
          type="success"
          class="w-1/3"
          @click="
            clearMoneyRecord(customRecord.name, customRecord.moneyRecordList)
          "
          :disabled="
            settleComputed(customRecord.moneyRecordList) !== SettleType.dailyOwe
          "
        >
          结清
        </van-button>
      </div>
    </van-collapse-item>
  </van-collapse>

  <van-button
    block
    round
    type="primary"
    class="absolute-boittom width"
    @click="customerRecordShow = true"
  >
    添加人员
  </van-button>

  <van-overlay :show="moneyRecordShow" @click="closeMoneyRecordOverlay">
    <div class="wrapper absolute-center box-ctnr" @click.stop>
      <van-form @submit="submitMoneyRecordForm">
        <van-cell-group inset>
          <h3 class="flex-c">添加金额记录</h3>
          <van-field name="type" label="交易类型">
            <template #input>
              <van-radio-group
                v-model="moneyRecordForm.tradeType"
                direction="horizontal"
              >
                <van-radio
                  v-for="item in tradeTypeColumns.slice(0, 2)"
                  :key="item.value"
                  :name="item.value"
                  >{{ item.text }}</van-radio
                >
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="payType" label="支付类型">
            <template #input>
              <van-radio-group v-model="moneyRecordForm.payType">
                <van-radio
                  v-for="item in payTypeColumns"
                  :key="item.value"
                  :name="item.value"
                  class="mb-2"
                  >{{ item.text }}</van-radio
                >
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            v-model="moneyRecordForm.money"
            type="number"
            name="money"
            label="金额"
            placeholder="金额"
            :rules="[{ required: true, message: '请填写正数金额' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </van-overlay>
  <van-overlay :show="customerRecordShow" @click="closeCustomerRecordOverlay">
    <div class="wrapper absolute-center box-ctnr" @click.stop>
      <van-form @submit="submitCustomerRecordForm">
        <van-cell-group inset>
          <h3 class="flex-c">添加人员记录</h3>
          <van-field
            v-model="customerRecordForm.custom.name"
            is-link
            readonly
            label="人员"
            placeholder="选择人员"
            @click="customerPickerShow = true"
          />
          <van-field name="type" label="交易类型">
            <template #input>
              <van-radio-group
                v-model="customerRecordForm.tradeType"
                direction="horizontal"
              >
                <van-radio
                  v-for="item in tradeTypeColumns.slice(0, 2)"
                  :key="item.value"
                  :name="item.value"
                  >{{ item.text }}</van-radio
                >
              </van-radio-group>
            </template>
          </van-field>
          <van-field name="payType" label="支付类型">
            <template #input>
              <van-radio-group v-model="customerRecordForm.payType">
                <van-radio
                  v-for="item in payTypeColumns"
                  :key="item.value"
                  :name="item.value"
                  class="mb-2"
                  >{{ item.text }}</van-radio
                >
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            v-model="customerRecordForm.money"
            type="number"
            name="money"
            label="金额"
            placeholder="金额"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </van-overlay>
  <van-popup v-model:show="customerPickerShow" round position="bottom">
    <van-picker
      title="请选择人员"
      :columns="customerColumns"
      @cancel="customerPickerShow = false"
      @confirm="confirmCustomerPicker"
    />
  </van-popup>
  <van-popup v-model:show="payTypePickerShow" round position="bottom">
    <van-picker
      title="请选择支付类型"
      :columns="payTypeColumns"
      @cancel="payTypePickerShow = false"
      @confirm="confirmPayTypePicker"
    />
  </van-popup>
</template>

<style lang="scss" scoped>
:deep(.van-contact-list__bottom) {
  position: absolute;
}
</style>
