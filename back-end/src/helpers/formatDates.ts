import { format } from 'date-fns'

const formatDates = (date) => {
    const newDate = format(date, 'dd/MM/yyyy')

    return newDate
}

export { formatDates }
