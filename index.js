let audio = document.getElementById("audio");
let audioList;
let blobList;
let index = 0;
let progress = document.getElementById("music_progress");
let time = document.getElementById("time")

var canvas,
    ctx,
    source,
    context,
    analyser,
    fbc_array,
    bar_count,
    bar_pos,
    bar_width,
    bar_height;


    




function secondsToMinutes(s){return(s-(s%=60))/60+(9<s?':':':0')+s}





// Update progress bar using timeupdate event of audio tag
audio.addEventListener("timeupdate",function () {
    try{
        progress.value = (audio.currentTime/audio.duration) * 100;
        time.innerHTML = `${secondsToMinutes(Math.ceil(audio.currentTime))}/${secondsToMinutes(Math.ceil(audio.duration))}`
        if(progress.value == 100){
            next()
        }
    }
    catch(err){
        console.log(err)
    }
})

// Add event Listener to progress bar
progress.addEventListener("input",function (event) {
    audio.currentTime = (event.target.value/100) * audio.duration
})


// Function to change the playing status of audio tag
function Play() {
    document.title = audioList[index].name
    document.getElementById(index).style = "background-color:rgba(233, 32, 112, 0.693);"
    if(audio.paused){
        audio.play();
        document.getElementById("play").innerHTML = "pause";
    }
    else{
        audio.pause();
        document.getElementById("play").innerHTML = "play_circle";
    }


    if (typeof(context) === "undefined") {
        context = new AudioContext();
        analyser = context.createAnalyser();
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        source = context.createMediaElementSource(audio);

        // canvas.width = window.innerWidth * 0.80;
        // canvas.height = window.innerHeight * 0.60;

        source.connect(analyser);
        analyser.connect(context.destination);
    }
    
    FrameLooper();
}

// Function to update audioList on loading audio files
document.getElementById("input").addEventListener("change", function () {
    audioList =  document.getElementById("input").files;
    
    audio.src = URL.createObjectURL(audioList[index])

    document.getElementById("songname").innerHTML = audioList[index].name
    let ol = document.getElementById("audlist");
    ol.innerHTML = "";
    for(let i = 0;i < audioList.length; i++){
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(audioList[i].name));
        li.id = i;
        li.setAttribute("onclick",`playSelected(${i})`);
        li.addEventListener
        ol.appendChild(li);
    }
    document.getElementById(index).style = "background-color: rgba(233, 32, 112, 0.693);"
});


// switch to next song
function next() {
    document.getElementById(index).style = "background-color:transparent;"
    index++;
    index %= audioList.length;
    audio.src = URL.createObjectURL(audioList[index])
    document.getElementById("songname").innerHTML = audioList[index].name
    Play(); // call the play function to autoplay the song after switching
}


// switch to previous song
function previous() {
    document.getElementById(index).style = "background-color:transparent;"
    index--;
    index = (index % audioList.length + audioList.length) % audioList.length; // js modulo operator is busted so fix it using this logic

    audio.src = URL.createObjectURL(audioList[index])

    document.getElementById("songname").innerHTML = audioList[index].name
    Play(); // call the play function to autoplay the song after switching
}



function playSelected(item) {
    document.getElementById(index).style = "background-color:transparent;"
    index = item;
    audio.src = URL.createObjectURL(audioList[index]);
    document.getElementById("songname").innerHTML = audioList[index].name
    Play()
}



// Add event listeners
document.getElementById("play").addEventListener("click",Play)

document.getElementById("next").addEventListener("click",next)

document.getElementById("previous").addEventListener("click",previous)


function FrameLooper() {
    window.RequestAnimationFrame =
        window.requestAnimationFrame(FrameLooper) ||
        window.msRequestAnimationFrame(FrameLooper) ||
        window.mozRequestAnimationFrame(FrameLooper) ||
        window.webkitRequestAnimationFrame(FrameLooper);

    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    bar_count = window.innerWidth / 2;

    analyser.getByteFrequencyData(fbc_array);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";

    for (var i = 0; i < bar_count; i++) {
        bar_pos = i * 4;
        bar_width = 2;
        bar_height = -(fbc_array[i] / 2);

        ctx.fillRect(bar_pos, canvas.height, bar_width, bar_height);
    }
}