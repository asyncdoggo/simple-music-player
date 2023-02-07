let audio = document.getElementById("audio");
let audioList;
let index = 0;


audio.addEventListener("timeupdate",function () {
    try{
        let progress = document.getElementById("music_progress");
  progress.value = (audio.currentTime/audio.duration) * 100;
  
    }
    catch{}
})


function ChangeAudio() {
    audioList =  document.getElementById("input").files;
    audio.setAttribute("src",audioList[index].name);
    document.getElementById("songname").innerHTML = `Song Name:${audioList[index].name}`
    let ol = document.getElementById("audlist");
    for(let i = 0;i < audioList.length; i++){
        console.log(i);
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(audioList[i].name));
        ol.appendChild(li);
    }
    
}

function Play() {
    if(audio.paused){
        audio.play();
        document.getElementById("play").innerHTML = "pause";
    }
    else{
        audio.pause();
        document.getElementById("play").innerHTML = "play";
    }
}


document.getElementById("input").addEventListener("change", ChangeAudio);


document.getElementById("play").addEventListener("click",Play)

document.getElementById("next").addEventListener("click",function () {
    index++;
    index %= audioList.length;
    ChangeAudio();
    audio.play();
    Play();
    document.getElementById("songname").innerHTML = `Song Name:${audioList[index].name}`
})

document.getElementById("previous").addEventListener("click",function () {
    index--;
    index %= audioList.length;
    ChangeAudio();
    audio.play();
    Play();
    document.getElementById("songname").innerHTML = `Song Name:${audioList[index].name}`
})

