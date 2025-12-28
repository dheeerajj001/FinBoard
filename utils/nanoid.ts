export function nanoid(size = 10) {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * 36).toString(36)
  ).join('');
}

