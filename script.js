const canvas = document.getElementById('canvas');
const btn = document.getElementById('play');
const audio = document.getElementById('audio');


const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = 0.95*innerHeight;
let coloroffset  = 0;


let barsNumber = 1024;
let gap = 1;
let width = canvas.width/(barsNumber*gap*0.05), height = 6;

window.onresize = ()=>{
    canvas.width = innerWidth;
    canvas.height = 0.95*innerHeight;
    width = canvas.width/(barsNumber*gap*0.05)
}



btn.onclick = () => {
    audio.play();

    const audioctx = new AudioContext();
    const audioSource = audioctx.createMediaElementSource(audio);
    const analyser = audioctx.createAnalyser(); 

    audioSource.connect(analyser);
    analyser.connect(audioctx.destination)
    analyser.fftSize = barsNumber;
    const bufferlength  = analyser.frequencyBinCount
    let dataArray = new Uint8Array(bufferlength);

    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        analyser.getByteFrequencyData(dataArray)
        drawVisualiser(dataArray)
        requestAnimationFrame(animate);

         let amount = 1
         coloroffset -= 0.2*amount

        if(coloroffset> 256){
            coloroffset = 0;
        }
    }

    animate();

}

function drawVisualiser(dataArray){


    for(i=0;i<dataArray.length;i++){
        ctx.fillStyle = 'hsl('+ (coloroffset+i)*4 +',100%,50%)';
        ctx.fillRect(i*(width+gap),canvas.height,width,canvas.height - height*dataArray[i])
    }

}