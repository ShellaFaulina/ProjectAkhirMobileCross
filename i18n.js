import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import en from './locales/en';
import id from './locales/id';

const i18n = new I18n({ en, id });
i18n.enableFallback = true;

// Ambil hanya 'en' dari 'en-US' atau 'id' dari 'id-ID'
i18n.locale = Localization.locale?.split('-')[0] || 'en';

export default i18n;
