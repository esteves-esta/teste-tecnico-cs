import { CalendarDate, type DateValue, getLocalTimeZone } from "@internationalized/date"
import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'

export function formatToCalendarDate(date: DateValue | undefined) {
  if (!date) return undefined
  return new CalendarDate(date.year, date.month, date.day)
}

export function formatDate(date: DateValue | undefined) {
  if (!date) return undefined
  const dateObj = new CalendarDate(date.year, date.month, date.day).toDate(getLocalTimeZone())
  return format(dateObj, "dd 'de' MMMM 'de' yyyy", {
    locale: ptBR
  })
}

export function formatToDate(date: DateValue | undefined) {
  if (!date) return undefined
  return new CalendarDate(date.year, date.month, date.day).toDate(getLocalTimeZone())

}
