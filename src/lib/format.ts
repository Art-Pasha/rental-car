// "5858" -> "5 858" (детермінований формат, без розбіжностей між сервером і клієнтом)
export const formatMileage = (value: number) =>
  String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

// "SUV" -> "Suv" (як у макеті)
export const formatType = (type: string) =>
  type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

export const formatDigits = (value: string) =>
  value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// "https://.../9582-ai.jpg" -> "9582" (так в макеті отримується Article)
export const getArticle = (img: string) => img.match(/\/(\d+)[^/]*$/)?.[1];