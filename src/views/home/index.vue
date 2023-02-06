<script setup lang="ts">
import { ref } from "vue";

const active = ref("money");
</script>

<template>
  <div class="container">
    <RouterView />
  </div>
  <van-tabbar v-model="active" route>
    <van-tabbar-item icon="friends-o" name="enter" to="/enter">
      录入
    </van-tabbar-item>
    <van-tabbar-item icon="balance-o" name="money" to="/money">
      金钱
    </van-tabbar-item>
    <van-tabbar-item icon="orders-o" name="record" to="/record">
      记录
    </van-tabbar-item>
  </van-tabbar>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  height: calc(100% - 50px);
}
</style>
