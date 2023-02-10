let audio = document.getElementById("audio");
let audioList;
let index = 0;
let progress = document.getElementById("music_progress");

// Update progress bar using timeupdate event of audio tag
audio.addEventListener("timeupdate",function () {
    try{
        progress.value = (audio.currentTime/audio.duration) * 100;
        if(progress.value == 100){
            next()
        }
    }
    catch(err){
        console.log(err)
    }
})


// Function to change the playing status of audio tag
function Play() {
    document.getElementById(index).style = "background-color:aqua;"
    if(audio.paused){
        audio.play();
        document.getElementById("play").innerHTML = "pause";
    }
    else{
        audio.pause();
        document.getElementById("play").innerHTML = "play_arrow";
    }
}

// Function to update audioList on loading audio files
document.getElementById("input").addEventListener("change", function () {
    audioList =  document.getElementById("input").files;
    audio.setAttribute("src",audioList[index].name);
    document.getElementById("songname").innerHTML = audioList[index].name
    let ol = document.getElementById("audlist");
    ol.innerHTML = "";
    for(let i = 0;i < audioList.length; i++){
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(audioList[i].name));
        li.id = i;
        ol.appendChild(li);
    }
    document.getElementById(index).style = "background-color:aqua;"
});


// switch to next song
function next() {
    document.getElementById(index).style = "background-color:transparent;"
    index++;
    index %= audioList.length;
    audio.setAttribute("src",audioList[index].name);
    document.getElementById("songname").innerHTML = audioList[index].name
    Play(); // call the play function to autoplay the song after switching
}


// switch to previous song
function previous() {
    document.getElementById(index).style = "background-color:transparent;"
    index--;
    index = (index % audioList.length + audioList.length) % audioList.length; // js modulo opereator is busted so fix it using this logic

    audio.setAttribute("src",audioList[index].name);
    document.getElementById("songname").innerHTML = audioList[index].name
    Play(); // call the play function to autoplay the song after switching
}


// Add event listeners
document.getElementById("play").addEventListener("click",Play)

document.getElementById("next").addEventListener("click",next)

document.getElementById("previous").addEventListener("click",previous)
