/*
ᓚ₍ ^. .^₎


*/

// Edit below to customise...

const audios = [
    {file: 'https://files.catbox.moe/o5vvky.mp3', title: 'Battle! Subway Boss', artist: 'Pokemon Masters', album: 'https://files.catbox.moe/b520nh'},
    {file: 'https://files.catbox.moe/nzd61z.mp3', title: 'My Trains', artist: 'Lemon Demon', album: 'https://files.catbox.moe/idxbey.png'},
    {file: 'https://files.catbox.moe/3y11ur.mp3', title: 'Mechanical Rhythm', artist: 'Xenoblade Chronicles', album: 'https://files.catbox.moe/m4lltf.gif'},
    {file: 'https://files.catbox.moe/0da5o1.mp3', title: 'Light a Fire', artist: 'Dragalia Lost', album: 'https://files.catbox.moe/m4lltf.gif'},

]

const albumart = true
const autoplay = true
const volume = 0.2
const playingText = "Playing:"
const playingImage = 'https://files.catbox.moe/sill4z.webp' // would like to add album option
const hightlightColour = 'linear-gradient(to right, hotpink, white, coral)'
const background = 'white'
const fontColour = 'black'
const playlistHeight = "50px"

MUSICPLAYER = document.querySelector('.MUSICPLAYER'); // (or change class name here)

// CAN BE REMOVED AND DONE IN REGULAR CSS
function styling() {
    var styleElement = document.createElement('style');

  var cssRules = `
    .MUSICPLAYER {
      background-color: ${background};
      color: ${fontColour};
      border: 1px solid black;
      padding: 2px;
    }

    .playing {
        background: ${hightlightColour};
        color: white;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    }

    .musicList {
        max-height: ${playlistHeight};
        overflow-y: auto;
        font-size: small;
    }

  `;

  styleElement.appendChild(document.createTextNode(cssRules));
  document.head.appendChild(styleElement);
}

document.addEventListener('DOMContentLoaded', function() {
    createPlayer();
    createPlaylist();

    loadmusic(0);
    audiofile.volume = volume;
    if(autoplay){audiofile.play();}

    styling();

});

var audiofile = new Audio;
var music;
var shuffleVal = false;
var loopVal = false;
var albumArt;

function createPlayer() {

    if (albumart){
        albumArt = document.createElement('img');
        albumArt.classList.add('albumArt');
        albumArt.style.marginLeft = "auto";
        albumArt.style.marginRight = "auto";
        albumArt.style.display = "block";
        albumArt.style.height = "200px";
        albumArt.style.border = "solid black 1px"
        MUSICPLAYER.appendChild(albumArt);
    }
    
    var currentlyPlaying = document.createElement('div');
    
    currentlyPlaying.style.display = "flex";
    
    playingSpan = document.createElement('span');
        playingSpan.innerText = playingText;
        currentlyPlaying.appendChild(playingSpan);

        marquee = document.createElement('marquee');
            currentSong = document.createElement('div');
            currentSong.innerText = "placeholder...";
            currentSong.classList.add('displaySong');
        marquee.appendChild(currentSong);
        currentlyPlaying.appendChild(marquee);

        playingImg = document.createElement('img');
        playingImg.src = playingImage;
        currentlyPlaying.appendChild(playingImg);

        currentlyPlaying.addEventListener('click', togglePlay());

    MUSICPLAYER.appendChild(currentlyPlaying);

    musicList = document.createElement('div');
    musicList.classList.add('musicList');

    MUSICPLAYER.appendChild(musicList);

    controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.justifyContent = 'space-evenly'

    loopbtn = document.createElement('div');
    loopbtn.textContent = "LOOP";
    loopbtn.addEventListener('click', toggleLoop);
    loopbtn.classList.add('loopBtn');
        controls.appendChild(loopbtn);
    prevbtn = document.createElement('div');
    prevbtn.textContent = "<";
    prevbtn.addEventListener('click', prevsong);
        controls.appendChild(prevbtn);
    pause = document.createElement('div');
    pause.textContent = "PAUSE/PLAY";
    pause.addEventListener('click', togglePlay);
        controls.appendChild(pause);
    nextbtn = document.createElement('div');
    nextbtn.textContent = ">";
    nextbtn.addEventListener('click', nextsong);
        controls.appendChild(nextbtn);
    shufflebtn = document.createElement('div');
    shufflebtn.textContent = "SHUFFLE";
    shufflebtn.addEventListener('click', toggleShuffle);
    loopbtn.classList.add('shuffleBtn');
        controls.appendChild(shufflebtn);
        
    MUSICPLAYER.appendChild(controls);
        
}



// DANGER ZONE
function createPlaylist() {
    const musicList = document.querySelector('.musicList');
    audios.forEach(audio => {
          const div = document.createElement('div');
          div.id = audios.indexOf(audio);
          const track = document.createElement('div');
          track.textContent = audio.title;
          if (audio.title == null) {
            track.textContent = "";
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

function loadmusic(id) {
    music = audios[id];
    musictext = music.title + " - " + music.artist;
    document.querySelector('.displaySong').innerHTML = musictext;
    document.getElementById(audios.indexOf(music)).classList.add('playing');
    
    if(albumArt) { document.querySelector('.albumArt').src = music.album; }

    audiofile.src = music.file;
    audiofile.onended = function() {
        nextsong();
    };
    document.dispatchEvent(new Event('songLoaded'));
}

function song(trackID) {
    console.log("play song");
    audiofile.pause();
    document.getElementById(audios.indexOf(music)).classList.remove('playing');
    loadmusic(trackID);
    togglePlay();
    console.log("now playing: " + music.title)
}

function togglePlay() {
    return audiofile.paused ? audiofile.play() : audiofile.pause(); // CHANGE PAUSE/PLAY BTN
}

function toggleLoop() {
    loopVal = !loopVal;
    if ( loopVal == true) { document.querySelector('.loopBtn').style.color = "grey"; }
    else {document.querySelector('.loopBtn').style.color = "white"; }
    
    return loopVal;
}

function toggleShuffle() {
    shuffleVal = !shuffleVal;
    if ( shuffleVal == true) { document.querySelector('.shuffleBtn').style.color = "grey"; }
    else {document.querySelector('.shuffleBtn').style.color = "white"; }
    
    return shuffleVal;
}

function prevsong() {
    id = audios.indexOf(music);
    id --;
    if (id < 0) {
        id = audios.length - 1;
    }
    song(id);
}

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
