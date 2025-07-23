document.addEventListener('DOMContentLoaded', async () => {
    document.querySelector('#deleteBtn').addEventListener('click', deleteSongBtnClick);

    await addSongsToForm();
});

async function deleteSongBtnClick() {
    const songId = document.querySelector('#songDropDown option:checked').value;
    
    if(!songId) {
        console.error('failed to delete song: no song id!')
        return
    }

    const deleted = await deleteSongWithId(songId);

    console.log(songId)

    if(deleted) {
        addSongsToForm();
    } else {
        document.querySelector('#error').innerHTML = "Cannot delete song"
    }
}

async function addSongsToForm() {
    const songs = await getAllSongs();

    if (!songs) {
        console.error('failed to update song drop down with list of songs');
        return
    }

    let html = ''
    for (let song of songs) {
        html += `<option value="${song._id}">${song.title}</option>`
    }

    document.querySelector('#songDropDown').innerHTML = html

}