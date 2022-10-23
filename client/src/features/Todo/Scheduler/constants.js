export const dateFormat = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}

export const dateInputFormat = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
}

export const formatDateInput = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1 >= 10 ? date.getMonth() + 1: `0${date.getMonth() + 1}`}-${date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`}`
}