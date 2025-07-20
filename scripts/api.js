const apiUrl = 'http://localhost:3000/api/';
const songsApiURL = `${apiUrl}songs/`;

async function fetchSongWithId(songId) {
    const fetchURL = `${songsApiURL}${songId}`;

    const response = await fetch(fetchURL);

    if (response.ok) {
        return await response.json();
    } else {
        console.error('Error fetching song:', response.statusText);
        return null;
    }
}

async function addSong(song) {
    const response = await fetch(songsApiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(song)
    })

    if (response.ok) {
        return await response.json();
    } else {
        console.error('Error adding song:', response.statusText);
        return null;
    }
}

async function updateSong(song) {
    const songID = song._id;
    const fetchURL = `${songsApiURL}${songID}`;
    console.log(song);
    const request = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(song)
    };
    
    console.log('Updating song with ID:', songID, 'url', fetchURL, 'request', request);
    const response = await fetch(fetchURL, request);

    if (response.ok) {
        return response.status;
    } else {
        console.error('Error updating song:', response.statusText);
        return null;
    }
}