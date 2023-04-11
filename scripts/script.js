window.addEventListener('DOMContentLoaded', () => {
  generateCards(1);
  addShowMoreButtons();
  themeToggle();
});

function addShowMoreButtons() {
  const cards = document.querySelectorAll('.photo-cards-grid .card');

  cards.forEach(card => {
    let collapseTrigger = card.querySelector('[data-bs-toggle="collapse"');
    let collapse = card.querySelector('.line-clamp-2');

    if (collapse.clientHeight < collapse.scrollHeight) {
      collapseTrigger.classList.remove('d-none');
    }
  })
}

//Theme toogle
function themeToggle() {
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

  themeSwitcher.addEventListener('click', e => {
    e.preventDefault();

    const theme = themeSwitcher.getAttribute('data-theme');
    localStorage.setItem('theme', theme);
    setTheme(theme);
    addThemeAttributes(theme);
  })
}

// Service
const getResource = async (url) => {
  const res = await fetch(url);

  if(!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};

const getCards = async (page) => {
  return await getResource(`https://picsum.photos/v2/list?page=${page}&limit=9`);
}

// Card
let currentPage = 1;

function generateCards(pageIndex) {
  currentPage = pageIndex;

  class Card {
    constructor(src, title, description, parentSelector) {
      this.parent = document.querySelector(parentSelector);
      this.src = src;
      this.title = title;
      this.description = description;
    }

    render() {
      const element = document.createElement('div');

      element.classList.add('col');

      element.innerHTML = `
        <div class="card">
          <img src="${this.src}" class="card-img-top object-fit-cover" width="356" height="200" alt="${this.title}">
          <div class="card-body">
            <h2 class="card-title">${this.title}</h2>
            <div class="collapse line-clamp-2" id="collapse1">
              <p class="card-text text-secondary">${this.description}</p>
            </div>
            <button class="btn btn-transparent my-2 p-0 fw-medium d-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse1"
                    aria-expanded="false"
                    aria-controls="collapse1">
              Show more...
            </button>
          </div>
          <div class="card-footer bg-transparent">
            <div class="d-flex flex-wrap gap-4">
              <button class="btn btn-primary">Save to collection</button>
              <button class="btn btn-outline-devider">Share</button>
            </div>
          </div>
        </div>
      `;

      this.parent.append(element);
    }
  }

  getCards(currentPage)
    .then(data => {
      data.forEach(({author, download_url}) => {
        new Card(download_url, author, 'desk', '.photo-cards-grid')
          .render();
      });
  });
}

const handleInfiniteScroll = () => {
  const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 1;

  if (endOfPage) {
    generateCards(currentPage + 1);
  }
};

window.addEventListener("scroll", handleInfiniteScroll);
