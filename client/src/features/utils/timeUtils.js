export const convertTimeStringToSeconds = (time) => {
    const args = time.split(":").reverse()
    const seconds = args.reduce(
        (total, current, index) => {
            return total + (parseInt(current) * (Math.pow(60, index)))
        }, 
        0
    )
    return seconds
}