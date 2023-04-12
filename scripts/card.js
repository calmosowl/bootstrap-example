function getCardTemplate(card) {
  return `
        <article class="card">
          <img src="${card.src}" class="card-img-top object-fit-cover" width="356" height="200" alt="${card.title}">
          <div class="card-body">
            <h2 class="card-title">${card.title}</h2>
            <div class="collapse line-clamp-2" id="collapse-${card.id}">
              <p class="card-text text-secondary text-break">${card.description}</p>
            </div>
            <button class="btn btn-transparent my-2 p-0 fw-medium d-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-${card.id}"
                    aria-expanded="false"
                    aria-controls="collapse-${card.id}">
              Show more...
            </button>
          </div>
          <div class="card-footer bg-transparent">
            <div class="d-flex flex-wrap gap-4">
              <button class="btn btn-primary">Save to collection</button>
              <button class="btn btn-outline-devider">Share</button>
            </div>
          </div>
        </article>
      `;
}

export class Card {
  constructor(id, src, title, description, parentSelector) {
    this.id = id;
    this.parent = document.querySelector(parentSelector);
    this.src = src;
    this.title = title;
    this.description = description;
    this.element = document.createElement('div');
    this.element.classList.add('col');
  }

  render() {
    this.element.innerHTML = getCardTemplate(this);
    this.parent.append(this.element);
  }
}
