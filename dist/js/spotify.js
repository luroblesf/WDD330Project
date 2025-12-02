const clientId = "cce165c1ba6f4647802b93ffae385c39";
const clientSecret = "e9938257c0484ba8aec7c0b35b1651ac";

async function getToken() {
    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + btoa(clientId + ":" + clientSecret)
        },
        body: "grant_type=client_credentials"
    });

    const data = await result.json();
    return data.access_token;
}

async function getArtist() {
    const token = await getToken();
    const artistId = "4rDoDo039ieQ0DP7F2tKGk"; 


    const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: { "Authorization": "Bearer " + token }
    });
    const artist = await result.json();

    const container = document.getElementById("spotify-artist");
    container.innerHTML = `
    <h2>${artist.name}</h2>
    <img src="${artist.images[0].url}" width="200"/>
    <h3>Top Tracks</h3>
    <ul id="top-tracks"></ul>
  `;


    const tracksRes = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
        headers: { "Authorization": "Bearer " + token }
    });
    
    const tracksData = await tracksRes.json();
    const tracksList = document.getElementById("top-tracks");

    tracksData.tracks.forEach(track => {
        const li = document.createElement("li");

        const audioPlayer = track.preview_url 
            ? `<audio controls src="${track.preview_url}"></audio>` 
            : "";

        li.innerHTML = `
          <strong>${track.name}</strong><br>
          ${audioPlayer}
          <iframe style="border-radius:12px;margin-top:8px"
                  src="https://open.spotify.com/embed/track/${track.id}" 
                  width="300" height="80" frameBorder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"></iframe>
        `;
        tracksList.appendChild(li);
    });
}

getArtist();
