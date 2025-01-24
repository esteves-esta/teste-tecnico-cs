export function debounce(handlerFn: () => void, delay: number) {
  let timeoutid = null;
  if (timeoutid) {
    clearTimeout(timeoutid)
    timeoutid = null;
  }

  const timeout = window.setTimeout(() => {
    handlerFn();
  }, delay)

  timeoutid = timeout;
  return timeoutid
}


export function getHighlightedHtml(name: string, comparingString: string) {
  if (comparingString === '') {
    return name
  }

  const highlight = comparingString.trim()

  /* https://stackoverflow.com/questions/62785923/how-to-highlight-the-search-text-in-autocomplete#62786914 */

  const escapeRegExp = (str = '') => str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')

  const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi')

  const parts = name.split(regex)

  let nameHighlighted = ''
  parts
    .filter((part) => part)
    .forEach((part) => {
      nameHighlighted += regex.test(part) ? `<strong>${part}</strong>` : `${part}`
    })
  return `${nameHighlighted}`
}
