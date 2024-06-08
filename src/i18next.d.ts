import 'i18next';
import HOME_VI from '@/locales/vi/home.json';
import PRODUCT_VI from '@/locales/vi/product.json';
import { defaultNS, resources } from '@/i18n/i18n';

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: typeof defaultNS;
    // custom resources type
    resources: (typeof resources)['vi'];
    // other
  }
}
