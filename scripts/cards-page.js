import { Card } from "./card.js";
import { getCards } from "./api-service.js";
import { generateString } from "./helpers.js";

let currentPage = 1;

// Add a "Show More" button for text longer than 2 lines
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

export function generateCards(pageIndex = 1) {
  currentPage = pageIndex;

  getCards(currentPage)
    .then(data => {
      data.forEach(({author, download_url}) => {
        new Card(generateString(6), download_url, author, generateString(300), '.photo-cards-grid')
          .render();
      });
    })
    .then(addShowMoreButtons);
}

export function initInfiniteScroll() {
  const handleInfiniteScroll = () => {
    const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 1;

    if (endOfPage) {
      generateCards(currentPage + 1);
    }
  };

  window.addEventListener("scroll", handleInfiniteScroll);
}
