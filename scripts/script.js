// Event listener for dom content loaded
document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch(songsApiURL);

    const songs = await response.json();

    console.log(songs);

    let html = ''

    for(let song of songs) {
        let songID = song._id;

        html += `
        <li>
        ${song.title} - ${song.artist}- <a href="details.html?id=${songID}">Details</a> - <a href="edit.html?id=${songID}">Edit</a>
        </li>
        `;
    }

    document.querySelector('#list_of_songs').innerHTML = html;
});