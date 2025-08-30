export function formatUTF(str: string) {
  const el = document.createElement('p');
  el.innerHTML = str;
  return el.textContent;
}