addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const songId = urlParams.get('id');

    document.querySelector('#updateBtn').addEventListener('click', async () => {
        await updateSongWithID(songId);
    });

    if (songId) {
        let song = await fetchSongWithId(songId);

        if (song) {
            document.querySelector("#title").value = song.title;
            document.querySelector("#artist").value = song.artist;
            document.querySelector("#popularity").value = song.popularity;
            document.querySelector("#releaseDate").value = song.releaseDate.substring(0, 10); // Format date to YYYY-MM-DD
            document.querySelector("#genre").value = song.genre.join(", ");
        } else {
            console.error('Song not found');
        }
    } else {
        console.error('No song ID provided in the URL');
    }
});

async function updateSongWithID(id) {
    // Create song object   
    let genreValue = document.querySelector("#genre").value;

    const song = {
        _id: id,
        title: document.querySelector("#title").value,
        artist: document.querySelector("#artist").value,
        popularity: document.querySelector("#popularity").value,
        releaseDate: document.querySelector("#releaseDate").value,
        genre: genreValue ? genreValue.split(",").map(g => g.trim()) : []
    }

    const result = await updateSong(song)

    if(result) {
        alert('Updated song successfully');
    } else {
        document.querySelector("#error").innerHTML = 'Cannot update song';
    }
}