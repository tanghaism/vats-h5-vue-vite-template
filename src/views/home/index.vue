<template>
  <van-radio-group v-model="rootStore.lang" @change="handleLangChange">
    <van-radio name="zh" shape="square">中文</van-radio>
    <van-radio name="ja" shape="square">日文</van-radio>
    <van-radio name="en" shape="square">英文</van-radio>
  </van-radio-group>

  <p class="text-center mt-[24px]">当前语言：{{ $t('common.test') }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
});
</script>

<script setup lang="ts">
import { Local } from '@/utils/storage';
import { LANG } from '@/constants/local';
import { useI18n } from 'vue-i18n';
import { useRootStore } from '@/store/root';
import { loadMessage } from '@/utils/i18n';

const rootStore = useRootStore();
const { setLocaleMessage, locale, getLocaleMessage } = useI18n();

console.log(locale, getLocaleMessage(rootStore.lang));

const handleLangChange = async (_lang: string) => {
  Local.set(LANG, _lang);
  const { messages } = await loadMessage(_lang);
  locale.value = _lang;
  setLocaleMessage(_lang, messages.default);
};
</script>

<style lang="scss" scoped></style>
