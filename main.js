array_1= ['apple','book','eye','bird','clock','snowflake','ball','umbrella','vase','parrot','spider','mic','pen','tornado','mug','moon','circle','bulb','flower']
var random_number = Math.floor((Math.random()*array_1.length)+1)
console.log(array_1[random_number])

var sketch1= array_1[random_number]
 document.getElementById('draw').innerHTML = "Sketch to be drawn: " + sketch1;

 var timer_counter=0
 var timer_check=""
 var drawn_sketch=""
 var answer_holder=""
 var score=0
 var sketch2=""

  function draw(){
    check_sketch()
    strokeWeight(5);
    stroke(0);
    if (mouseIsPressed){
      line ( pmouseX , pmouseY , mouseX , mouseY);
    }
    if (drawn_sketch==sketch2){
      answer_holder="set"
      score=score + 1
      document.getElementById('score').innerHTML = "Score: " + score;
    }
  }

  function check_sketch(){
    timer_counter=timer_counter + 1
    document.getElementById('time').innerHTML = "Timer: " + timer_counter;
    console.log(timer_counter)
    if (timer_counter > 600){
      timer_counter=0
      timer_check= "completed"
    }

    if(timer_check=="completed"||answer_holder=="set"){
      timer_check=""
      answer_holder=""
      update_canvas()
    }
    
  }

  function update_canvas(){
   background("white");
   random_n=  Math.floor((Math.random()*array_1.length)+1)
   console.log(array_1[random_n])
   sketch2 = array_1[random_n]
   document.getElementById('draw').innerHTML = "Sketch to be drawn: " + sketch2;
  }

  function setup(){
    canvas=createCanvas(280 , 280);
    canvas.center()
    background("white")
    canvas.mouseReleased(classifyCanvas);
  }

  function preload(){
    classifier=ml5.imageClassifier("DoodleNet");
  }

  function classifyCanvas(){
    classifier.classify(canvas , gotResult)
  }

  function gotResult(error,result){
    if (error){
      console.log(error);
    }
    else{
      console.log(result);
      drawn_sketch=result[0].label;
      document.getElementById('label').innerHTML = "Your Skech: " + drawn_sketch;
      document.getElementById('confidence').innerHTML = "Confidence: " + Math.round(result[0].confidence*100)+ "%";
    }
  }