addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);

    const songId = urlParams.get('id');

    if (songId) {
        let song = await fetchSongWithId(songId);

        console.log(song);

        if (song) {
            document.querySelector("h1").innerText = song.title;

            let html = `
                <h3>Artist - ${song.artist}</h3>
                <p>Popularity - ${song.popularity}</p>
                <p>Release Date - ${song.releaseDate}</p>
            `;

            document.querySelector("div").innerHTML = html
        } else {
            console.error('Song not found');
        }
    } else {
        console.error('No song ID provided in the URL');
    }
});