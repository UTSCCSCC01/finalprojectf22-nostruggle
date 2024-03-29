export const timerBreakInterval = [
    '0:10',
    '05:00',
    '10:00',
    '15:00',
    '20:00',   
    '25:00',
    '30:00',
    '35:00',
    '40:00',
    '45:00',
    '50:00',
    '55:00',
    '60:00',
    '75:00',
    '90:00'
]

export const defaultTimerBreakInterval = '25:00'

export const defaultTimerBreakTime = '5:00'


export const timeFormat = "^((([0-1]?[0-9]|[2]?[0-3]):)?[0-5]?[0-9]:)?[0-5]?[0-9]$"

export const convertSecondsToString = (seconds) => {
    let date = new Date(seconds * 1000)
    let time = date.toISOString()
    return seconds / 60 / 60 >= 1 ? time.slice(11, 19) : time.slice(14, 19)
}