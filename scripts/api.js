const hostURL = 'http://localhost:3000'; // 'https://m04-tutorial-backend.onrender.com';
const apiUrl = `${hostURL}/api/`;
const songsApiURL = `${apiUrl}songs/`;

async function getAllSongs() {
    const response = await fetch(songsApiURL);

    if (response.ok) {
        return await response.json();
    } else {
        console.error('encountered error getting all songs', e)
        return null;
    }
}

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

async function deleteSongWithId(id) {
    const url = `${songsApiURL}${id}`;

    console.log(url);

    const request = {
        method: 'DELETE'
    }

    const response = await fetch(url, request);

    if (response.ok) {
        return true;
    } else {
        console.log('Failed to delete song with status', response.statusText);
        return false;
    }
}

async function authenticate(username, password) {
    const url = `${apiUrl}auth`;

    console.log('auth endpoint', url);

    const loginCredentials = {
        username, password
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginCredentials)
    });

    if(response.ok) {
        const authResponse = await response.json();

        console.log('auth response', authResponse)

        if(!authResponse.token) {
            console.error('OK auth response, but no token retrieved.')
            throw new Error('Failed to authenticate');
        }

        localStorage.setItem('token', authResponse.token);
        localStorage.setItem('uname', authResponse.uname);
        localStorage.setItem('auth', 1);

        return true;
    } else {
        console.error('failed to authenticate with status', response.status);
        
        const json = await response.json();

        if(json.error) {
            throw json.error;
        } else {
            throw new Error('Failed to authenticate');
        }
    }
}