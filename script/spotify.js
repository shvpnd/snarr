// spotify.js
function initializeSpotify() {
    const spotifyIframe = document.querySelector('.spotify-widget iframe');
    const playlistLinkInput = document.getElementById('playlistLink');
    const updatePlaylistButton = document.getElementById('updatePlaylist');
    const feedbackMessage = document.getElementById('feedbackMessage'); // This should now work

    // Add event listener to the update button
    updatePlaylistButton.addEventListener('click', () => {
        console.log('Update button clicked'); // Debugging line
        updateSpotifyPlaylist(spotifyIframe, playlistLinkInput, feedbackMessage);
    });
}


// Function to update the Spotify playlist
function updateSpotifyPlaylist(spotifyIframe, playlistLinkInput, feedbackMessage) {
    const playlistLink = playlistLinkInput.value.trim();
    console.log('Playlist Link:', playlistLink); // Debugging line
    if (playlistLink) {
        const playlistIdMatch = playlistLink.match(/(?:https?:\/\/)?(?:www\.)?spotify\.com\/playlist\/([a-zA-Z0-9]+)/);
        console.log('Playlist ID Match:', playlistIdMatch); // Debugging line
        if (playlistIdMatch) {
            const playlistId = playlistIdMatch[1];
            spotifyIframe.src = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=black`;
            feedbackMessage.textContent = 'Playlist updated successfully!';
            feedbackMessage.style.color = 'green';
            console.log('Updated Iframe Source:', spotifyIframe.src); // Debugging line
        } else {
            feedbackMessage.textContent = 'Please enter a valid Spotify playlist link.';
            feedbackMessage.style.color = 'red';
        }
    } else {
        feedbackMessage.textContent = 'Please enter a playlist link.';
        feedbackMessage.style.color = 'red';
    }
}

// Initialize Spotify functionality on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeSpotify);
