export const anchorPopover = (width, height) => {
    return {
        horizontal: document.documentElement.clientWidth / 2 - (width / 2),
        vertical: document.documentElement.clientHeight / 2 - (height / 2)
    }
}