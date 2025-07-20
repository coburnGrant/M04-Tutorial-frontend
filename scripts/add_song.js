addEventListener("DOMContentLoaded", () => {
    document.querySelector("#addBtn").addEventListener("click", addNewSong);
});

// Add the song to the database
async function addNewSong() {
    // Create song object   
    let genreValue = document.querySelector("#genre").value;

    const song = {
        title: document.querySelector("#title").value,
        artist: document.querySelector("#artist").value,
        popularity: document.querySelector("#popularity").value,
        releaseDate: document.querySelector("#releaseDate").value,
        genre: genreValue ? genreValue.split(",").map(g => g.trim()) : []
    }
    
    const result = await addSong(song);

    if(result) {
        alert(`Added song with ID of: '${result.id}'`);

        document.querySelector("form").reset();
    } else {
        document.querySelector("#error").innerHTML = 'Cannot add song';
    }
}