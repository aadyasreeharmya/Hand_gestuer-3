Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach ('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML= '<img id="capture_image" src="'+ data_uri+'"/>';

    });
}

console.log('ml5 version', ml5.version);
classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/7MPAwJJ0p/model.json",modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}


function check() {
    img = document.getElementById('capture_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
   if (error) {
       console.error(error);
   }else{
       console.log(results);
       document.getElementById("result_gesture_name").innerHTML = results[0].label;
       document.getElementById("result_gesture_name2").innerHTML = results[1].label;
       predicaton_1 = results[0].label;
       predicaton_2 = results[1].label;
       speak();
       if(results[0].label == "super"){
document.getElementById("update_gesture").innerHTML = "&#128076;";
       }
       if(results[0].label == "victory"){
        document.getElementById("update_gesture").innerHTML = "&#9996;";
 }
     if(results[0].label == "best"){
      document.getElementById("update_gesture").innerHTML = "&#128077;";
}
    if(results[1].label == "super"){
     document.getElementById("update_gesture2").innerHTML = "&#128076;";
                               }
      if(results[1].label == "victory"){
     document.getElementById("update_gesture2").innerHTML = "&#9996;";
 }          
    if(results[1].label == "best"){
    document.getElementById("update_gesture2").innerHTML = " &#128077;";
 }
   }
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is"+ predicaton_1;
    speak_data_2 = "The second prediction is"+ predicaton_2;
 var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
 utterThis.rate = 0.7;
 synth.speak(utterThis);

}