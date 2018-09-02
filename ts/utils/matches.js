export default function (element) {
    return (element.matchesSelector ||
        element.webkitMatchesSelector ||
        element.mozMatchesSelector ||
        element.oMatchesSelector ||
        element.msMatchesSelector).bind(element);
}
