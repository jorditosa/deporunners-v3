export const formatHour = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' };
  const newDate = new Date(dateString.replace(/-/g, '/'));

  if (isNaN(newDate.getTime())) {
    return "Hora inválida";
  }

  return newDate.toLocaleTimeString('ca-ES', options).split(':')[0] + ":" + newDate.toLocaleTimeString('ca-ES', options).split(':')[1];
}
