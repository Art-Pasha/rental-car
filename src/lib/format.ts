// "5858" -> "5 858" (детермінований формат, без розбіжностей між сервером і клієнтом)
export const formatMileage = (value: number) =>
  String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

// "SUV" -> "Suv" (як у макеті)
export const formatType = (type: string) =>
  type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();