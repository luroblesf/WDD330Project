const API_KEY = "AIzaSyDS__TorhmIMOWrH2dctZpeG78amWizz3g";
const CHANNEL_ID = "UCLQUFR-AS9hE7NizVHx3B1g";
const MAX_RESULTS = 12;

async function getUploadsPlaylistId(channelId) {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.items[0].contentDetails.relatedPlaylists.uploads;
}

async function getRecentVideos(playlistId) {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${MAX_RESULTS}&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.items.map(item => ({
        title: item.snippet.title,
        videoId: item.snippet.resourceId.videoId
    }));
}

function renderVideos(videos) {
    const container = document.getElementById("channel-videos");
    container.innerHTML = videos.map(v => `
        <div class="video-card">
          <iframe src="https://www.youtube.com/embed/${v.videoId}?rel=0"
            frameborder="0" allowfullscreen></iframe>
          <h3>${v.title}</h3>
        </div>
      `).join("");
}

(async () => {
    try {
        const uploadsId = await getUploadsPlaylistId(CHANNEL_ID);
        const videos = await getRecentVideos(uploadsId);
        renderVideos(videos);
    } catch (err) {
        console.error(err);
        document.getElementById("channel-videos").textContent = "No se pudo cargar el canal.";
    }
})();






