
export const capitalizeName = name => {
    let words = name.split(" ");

    let newWords = [];
    words.forEach(word => {
        newWords.push(word.charAt(0).toUpperCase() + word.slice(1));
    })

    return newWords.join(" ");
}
