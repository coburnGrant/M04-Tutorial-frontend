// Event listener for dom content loaded
const apiUrl = 'https://verdant-bolder-reward.glitch.me/api/songs'; // 'http://localhost:3000/api/songs'

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch(apiUrl);

    const songs = await response.json();

    console.log(songs);

    let html = ''

    for(let song of songs) {
        html += `<li>${song.title} - ${song.artist}</li>`;
    }

    document.querySelector('#addedsong').innerHTML = html;
});