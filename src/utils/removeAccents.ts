export function removeAccents(rawString: string) {
  const stringWithoutAccents = rawString
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

  return stringWithoutAccents
}
