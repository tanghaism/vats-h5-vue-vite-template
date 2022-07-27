import { defineStore, StoreGetters } from 'pinia';
import { LANG } from '@/constants/local';
import { Local } from '@/utils/storage';
import { TState, TActions } from './index.d';

export const useRootStore = defineStore<string, TState, StoreGetters<unknown>, TActions>('root', {
  state() {
    return {
      lang: Local.get(LANG) ?? 'zh',
    };
  },
  actions: {
    async setLang(lang) {
      this.lang = lang;
    },
  },
});
