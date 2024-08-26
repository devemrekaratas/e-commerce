export const formatCategoryText = (text: string) => {
  return text
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const slugify = (text: string, value: any = '', separator: string = '-'): string => {
  const turkishChars: Record<string, string> = {
      "ı": "i",
      "ö": "o",
      "ü": "u",
      "ş": "s",
      "ğ": "g",
      "ç": "c",
  }

const pattern = new RegExp(Object.keys(turkishChars).join("|"), "g")

  let slug = text
      .toLowerCase()
      .replace(pattern, (char) => turkishChars[char] || char)
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "") 

  if( value != ''){
     slug+= (separator + value)
  }

  return slug
}

export const getIdFromSlug = (slug: string, separator: string = '-'): number => {
  const parts = slug.split(separator)
  const lastPart = parts.pop()

  if (lastPart && /^\d+$/.test(lastPart)) {
      return parseInt(lastPart, 10)
  }
  return 0
}

export const addFavorite = (product: any, favorites: Ref<any[]>) => {
  favorites.value ||= []
  const index = favorites.value.findIndex(item => item.id === product.id);
  index === -1 ? favorites.value.push(product) : favorites.value.splice(index, 1)
}