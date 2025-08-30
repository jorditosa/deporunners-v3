export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
  const newDate = new Date(dateString.replace(/-/g, '/'));

  if (isNaN(newDate.getTime())) {
    return "Fecha inválida";
  }

  return newDate.toLocaleDateString('ca-ES', options);
}
