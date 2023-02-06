<script setup lang="ts">
import { ContactListItem } from "vant";
import { ref } from "vue";

const chosenContactId = ref("1");
const personList = ref([
  {
    id: "1",
    name: "张三",
    tel: "13000000000"
  },
  {
    id: "2",
    name: "李四",
    tel: "1310000000"
  }
]) as unknown as ContactListItem[];
const onAdd = _contact => {};
const onEdit = _contact => {};
const onSelect = _contact => {};
</script>

<template>
  <van-contact-list
    v-model="chosenContactId"
    :list="personList"
    addText="添加人员"
    @add="onAdd"
    @edit="onEdit"
    @select="onSelect"
  />
</template>

<style scoped></style>
