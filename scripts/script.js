window.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.photo-card');

  cards.forEach(card => {
    let collapseTrigger = card.querySelector('[data-bs-toggle="collapse"');
    let collapse = card.querySelector('.line-clamp-2');

    if (collapse.clientHeight < collapse.scrollHeight) {
      collapseTrigger.classList.remove('d-none');
    }
  })

  //Theme toogle
  const themeSwitcher = document.querySelector('#themeToogle');
  const storedTheme = localStorage.getItem('theme');


  const getPreferredTheme = () => {
    if (storedTheme) {
      return storedTheme;
    }
  }

  const setTheme = theme => {
   document.documentElement.setAttribute('data-bs-theme', theme)
  }

  setTheme(getPreferredTheme());

  const addThemeAttributes = (theme) => {
    if (theme === 'dark') {
      themeSwitcher.setAttribute('data-theme', 'light');
      themeSwitcher.setAttribute('aria-label', `Toggle theme (light)`);
    } else {
      themeSwitcher.setAttribute('data-theme', 'dark');
      themeSwitcher.setAttribute('aria-label', `Toggle theme (dark)`);
    }
  }

  addThemeAttributes(getPreferredTheme());

  themeSwitcher.addEventListener('click', () => {
    const theme = themeSwitcher.getAttribute('data-theme');
    localStorage.setItem('theme', theme);
    setTheme(theme);
    addThemeAttributes(theme);
  })
});
