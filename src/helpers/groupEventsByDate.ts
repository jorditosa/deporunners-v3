import { Event } from '../interfaces/events.interface'

interface EventGroup {
  label: string;
  events: Event[];
}

const MONTH_LABELS = [
  'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny',
  'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'
]

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

export function groupEventsByDate(events: Event[]): EventGroup[] {
  const sorted = [...events].sort(
    (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  )

  const today = startOfDay(new Date())
  const endOfWeek = new Date(today)
  endOfWeek.setDate(endOfWeek.getDate() + (7 - today.getDay()))

  const groups: EventGroup[] = []

  for (const event of sorted) {
    const eventDate = new Date(event.start_date.replace(/-/g, '/'))
    let label: string

    if (isSameDay(eventDate, today)) {
      label = 'Avui'
    } else if (eventDate >= today && eventDate < endOfWeek) {
      label = 'Aquesta setmana'
    } else {
      label = `${MONTH_LABELS[eventDate.getMonth()]} ${eventDate.getFullYear()}`
    }

    const group = groups.find(g => g.label === label)
    if (group) {
      group.events.push(event)
    } else {
      groups.push({ label, events: [event] })
    }
  }

  return groups
}
