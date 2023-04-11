const THEMES = {
  light: 'light',
  dark: 'dark'
}
const DEFAULT_THEME = THEMES.light;
const THEME_STORAGE_KEY = 'my-theme';

function getTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  return THEMES[savedTheme] || DEFAULT_THEME;
}

function setTheme(theme) {
  const themeSwitcher = document.querySelector('#themeToogle');

  themeSwitcher.setAttribute('data-theme', theme);
  themeSwitcher.setAttribute('aria-label', `Toggle theme (${theme})`);
  document.documentElement.setAttribute('data-bs-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function initThemeSwitcherListener() {
  const themeSwitcher = document.querySelector('#themeToogle');

  themeSwitcher.addEventListener('click', e => {
    e.preventDefault();
    const theme = getTheme() === THEMES.light ? THEMES.dark : THEMES.light;
    setTheme(theme);
  })
}

export function initTheme() {
  setTheme(getTheme());
  initThemeSwitcherListener();
}
