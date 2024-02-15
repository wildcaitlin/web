// more songs so id 

const audios = [
    {file: 'https://files.catbox.moe/w96obx.mp3', title: 'Dire Dire Docks', artist: 'Super Mario 64'},
    {file: 'https://files.catbox.moe/jtn7kn.mp3', title: 'Surf', artist: 'Pokemon DPPt'},
    {file: 'https://files.catbox.moe/tz184e.mp3', title: 'Lake', artist: 'Pokemon DPPt'},
    {file: 'https://files.catbox.moe/kuo26z.mp3', title: 'Serene Shores', artist: 'Pikmin 4'},
    {file: 'https://files.catbox.moe/grvsux.mp3', title: 'Port Puerto', artist: 'Fantasy Life'},
    {file: 'https://files.catbox.moe/sq4k23.mp3', title: 'Ocean', artist: 'Terraria'},
    {file: 'https://files.catbox.moe/m925kr.mp3', title: 'Island Theme (Day)', artist: 'ACNL'},
    {file: 'https://files.catbox.moe/wyd8kx.mp3', title: 'Jellyfloat', artist: 'Pikmin 2'}

]

var audiofile = new Audio;
var music;
var shuffleVal = false;
var loopVal = false;

function loadmusic(id) {
    music = audios[id];
    musictext = music.title + " - " + music.artist;
    document.getElementById("musicplayer").innerHTML = musictext;
    document.getElementById(audios.indexOf(music)).classList.add('playing');
    
    audiofile.src = music.file;
    audiofile.onended = function() {
        nextsong();
    };
    document.dispatchEvent(new Event('songLoaded'));
}

window.addEventListener('load', function() {
    createPlaylist();
    loadmusic(0);   
    audiofile.volume = 0.2;
    audiofile.play();
});;

function createPlaylist() {
    const musicList = document.getElementById('musiclist');
    audios.forEach(audio => {
          const div = document.createElement('div');
          div.id = audios.indexOf(audio);
          const track = document.createElement('div');
          track.textContent = audio.title;
          if (audio.title == null) {
            track.textContent = "placeholder";
          };
          
          const trackArtist = document.createElement('div');
          trackArtist.textContent = audio.artist;
          if (audio.artist == null) {
            trackArtist.textContent = "";
          };
          div.style.display = "grid";
          div.style.gridTemplateColumns = '1fr 1fr';
          trackArtist.style.textAlign = "right";
          
          div.appendChild(track);
          div.appendChild(trackArtist);

          div.setAttribute("onclick", `song(this.id)`);
          musicList.appendChild(div);
      });
}

function togglePlay() {
    return audiofile.paused ? audiofile.play() : audiofile.pause();
};
function toggleShuffle() {
    shuffleVal = !shuffleVal;
    if ( shuffleVal == true) { document.getElementById('shuffleBtn').style.color = "grey"; }
    else {document.getElementById('shuffleBtn').style.color = "white"; }
    
    return shuffleVal;
};
function toggleLoop() {
    loopVal = !loopVal;
    if ( loopVal == true) { document.getElementById('loopBtn').style.color = "grey"; }
    else {document.getElementById('loopBtn').style.color = "white"; }
    
    return loopVal;
};

function song(trackID) {
    console.log("play song");
    audiofile.pause();
    document.getElementById(audios.indexOf(music)).classList.remove('playing');
    loadmusic(trackID);
    togglePlay();
    console.log("now playing: " + music.title)
};

function nextsong() {
    id = audios.indexOf(music);
    if (loopVal == false) {
        id ++;
    if (id >= audios.length) {
        id = 0;
    }
    if (shuffleVal == true) {
        id = shuffle();
    }
    }
    song(id);
}

function prevsong() {
    id = audios.indexOf(music);
    id --;
    if (id < 0) {
        id = audios.length - 1;
    }
    song(id);
}
function shuffle() {
    console.log("shuffle");
    id = Math.floor(Math.random() * audios.length);
    if (id == audios.indexOf(music)) {
        id++;
        if (id >= audios.length){ shuffle() }  
    }
    return id;
};


var playlistToggle = false;

function togglePlaylist() {
    console.log("function called");
    if (playlistToggle == false) {
        var playlist = document.getElementById('playlist').innerHTML;
        document.getElementById('pL').innerHTML = playlist;
        playlistToggle = true;
    } else {
        document.getElementById('pL').innerHTML = "";
        playlistToggle = false;
    }
}

document.addEventListener('songLoaded', function () {
    if ( playlistToggle == true ) {
        var playlist = document.getElementById('playlist').innerHTML;
        document.getElementById('pL').innerHTML = playlist;
    }
});
