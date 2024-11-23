console.log("Welcome to Modified Spotify");
// Taking Variables
let songIndex = 0;
let audioElement = new Audio('Songs/s0.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// Song Listing
let song = [
    { songName: "Mortals", filePath: "Songs/s0.mp3", coverPath: "Assets/c1.jpg" },
    { songName: "Cielo Huma-Huma", filePath: "Songs/s1.mp3", coverPath: "Assets/c2.png" },
    { songName: "Invincible", filePath: "Songs/s2.mp3", coverPath: "Assets/c3.jpg" },
    { songName: "My Heart", filePath: "Songs/s3.mp3", coverPath: "Assets/c4.jpg" },
    { songName: "Heros Tonight", filePath: "Songs/s4.mp3", coverPath: "Assets/c5.jpg" },
    { songName: "Big Dawgs", filePath: "Songs/s5.mp3", coverPath: "Assets/c6.jpg" },
    { songName: "Darkside", filePath: "Songs/s6.mp3", coverPath: "Assets/c7.jpg" },
    { songName: "Living Hell", filePath: "Songs/s7.mp3", coverPath: "Assets/c8.jpg" },
    { songName: "Havana", filePath: "Songs/s8.mp3", coverPath: "Assets/c9.jpg" },
    { songName: "We don't Talk Anymore", filePath: "Songs/s9.mp3", coverPath: "Assets/c10.jpg" },
]

// Cover Image and Song Name According to The Song
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = song[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = song[i].songName;
})

// For Handling Play/Pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;

    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// For Cghange Of Progress Bar According to The Song 
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

// For Change Of Song Beats When We Change The Progress Bar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

// For Transition Of Play/Pause Button
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');

    })
}

// For Playing Songs Which The User Selects
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `Songs/s${songIndex}.mp3`;
        masterSongName.innerText = song[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

// For Playing Next Song
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `Songs/s${songIndex}.mp3`;
    masterSongName.innerText = song[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

// For Playing Previous Song
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `Songs/s${songIndex}.mp3`;
    masterSongName.innerText = song[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})