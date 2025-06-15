type Sanitizer = (value: string) => string;

function sanitizeEmail(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/<script.*?>.*?<\/script>/gi, "") // Eliminar scripts
    .replace(/<\/?[^>]+(>|$)/g, "") // Eliminar HTML
    .replace(/[^\w@.-]+/g, "") // ← Solo permite letras, números, _, @, ., -
    .replace(/\s+/g, "");
}

function sanitizeText(value: string): string {
  return value
    .trim()
    .replace(/<script.*?>.*?<\/script>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/[;"!]/g, "")
    .replace(/[^a-zA-Z0-9\s',:.?-ÁÉÍÓÚáéíóúÑñüÜ]/g, "");
}

function sanitizeUsername(value: string): string {
  return value
    .trim()
    .replace(/<script.*?>.*?<\/script>/gi, "") // Eliminar scripts
    .replace(/<\/?[^>]+(>|$)/g, "") // Eliminar HTML
    .replace(/[^\w-]/g, "") // Solo letras, números, _, -
    .replace(/\s+/g, ""); // Eliminar espacios
}

function sanitizeDate(value: string): string {
  // Solo permite dígitos y guiones para formato YYYY-MM-DD
  return value.trim().replace(/[^0-9-]/g, "");
}

function sanitizeSelect(value: string): string {
  // Para selects asumimos valores predefinidos, así que solo limpiamos HTML
  return value
    .trim()
    .replace(/<script.*?>.*?<\/script>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, "");
}

function sanitizeSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\- ]/g, "") // permite solo letras minúsculas, números y guiones
    .replace(/\s+/g, "-"); // espacios por guiones
}

function sanitizeKeywords(value: string): string {
  return value
    .trim()
    .replace(/<script.*?>.*?<\/script>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/[^a-zA-Z0-9,\s\-ÁÉÍÓÚáéíóúÑñüÜ]/g, "") // letras, números, comas y guiones
    .replace(/\s*,\s*/g, ","); // elimina espacios innecesarios entre palabras clave
}

function sanitizeUrl(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/<script.*?>.*?<\/script>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, "");
}

function sanitizePassword(value: string): string {
  return value
    .trim()
    .replace(/<script.*?>.*?<\/script>/gi, "") // Eliminar scripts
    .replace(/<\/?[^>]+(>|$)/g, ""); // Eliminar etiquetas HTML
}

/**
 * Diccionario de sanitizadores por tipo de input.
 */
function getSanitizer(type: string): Sanitizer {
  switch (type) {
    case "email":
      return sanitizeEmail;
    case "text":
      return sanitizeText;
    case "date":
      return sanitizeDate;
    case "select":
      return sanitizeSelect;
    case "slug":
      return sanitizeSlug;
    case "keywords":
      return sanitizeKeywords;
    case "url":
      return sanitizeUrl;
    case "username":
      return sanitizeUsername;
    case "password":
      return sanitizePassword;
    default:
      return v => v;
  }
}

export {
  sanitizeEmail,
  sanitizeText,
  sanitizeUsername,
  sanitizeDate,
  sanitizeSelect,
  sanitizeSlug,
  sanitizeKeywords,
  sanitizeUrl,
  sanitizePassword,
  getSanitizer,
};
