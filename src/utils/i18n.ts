import { createI18n } from 'vue-i18n';
import { Locale } from 'vant';
import { LANG } from '@/constants/local';
import { Local } from '@/utils/storage';

const langMap: Record<string, Record<'vant', string>> = {
  zh: {
    vant: 'zh-CN',
  },
  ja: {
    vant: 'ja-JP',
  },
  en: {
    vant: 'en-US',
  },
};

// 异步加载语言包的方法
export async function loadMessage(lang: string) {
  let defaultLocal, vantMessage;
  switch (lang) {
    case 'en':
      defaultLocal = import.meta.glob(`../locales/en/*.ts`);
      vantMessage = await import('vant/lib/locale/lang/en-US');
      break;
    case 'ja':
      defaultLocal = import.meta.glob(`../locales/ja/*.ts`);
      vantMessage = await import('vant/lib/locale/lang/ja-JP');
      break;
    default:
      defaultLocal = import.meta.glob(`../locales/zh/*.ts`);
      vantMessage = await import('vant/lib/locale/lang/zh-CN');
      break;
  }

  Locale.use(langMap[lang].vant, vantMessage.default);

  const message: Record<string, any> = {};

  for (const item in defaultLocal) {
    const fileName = item.replace(`../locales/${lang}/`, '').replace('.ts', '');
    const langObject = (await defaultLocal[item]?.()) as Record<string, any>;
    message[fileName] = langObject.default;
  }

  return {
    message,
  };
}

// 初始化
export async function initI18n() {
  const lang = Local.get(LANG) ?? 'zh';
  const { message } = await loadMessage(lang);
  return createI18n({
    locale: lang,
    fallbackLocale: 'zh',
    messages: {
      [lang]: message,
    },
  });
}
