export function LOAD_LANGUAGES_TRANSLATIONS (state, languages) {
  state.translation = languages
  state.isLoadedTranslation = true
}

export function LOAD_LANGUAGES (state, languages) {
  state.languages = languages
}

export function SET_LANG (state, lang) {
  state.lang = lang;
  localStorage.setItem('language', lang);
}

export function SET_APP_INFO (state, api) {
  state.api = api;
}
