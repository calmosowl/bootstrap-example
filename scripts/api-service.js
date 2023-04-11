async function getResource(url) {
  const res = await fetch(url);

  if(!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};

export async function getCards(page) {
  return await getResource(`https://picsum.photos/v2/list?page=${page}&limit=9`);
}
