export const letterToIndex = (letter) => {
    const upper = letter.trim().toUpperCase();
    return upper.charCodeAt(0) - 65;
}