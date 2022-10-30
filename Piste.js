const { Console } = require('console');

var fs = require('fs');
try {  
    const prompt = require('prompt-sync')();
    const param = prompt('What is your rnd?');


    var data = fs.readFileSync('./DATA.txt', 'utf8');
    console.log("\n Your Input Is \n")
/*     console.log(data.toString());  */  
    var Points=[]
    var Droites=[]
    var Rayon=[]
    var dataNewLine=data.toString().split("\n");
    var Pindex=0
    var Dindex=0
    var Rindex=0
    console.log("<-------------------------------------->")
    console.log(dataNewLine)

    dataNewLine.forEach(element => {
       if(element.includes("point")){
        var words=element.split(" ");
        console.log(words)
        for(var i=0;i<words.length;i++){
           
            if(words[i][0]=="X" && words[i][1]=="="){
                if( words[i+2]==""){
                   
                    var x=words[i+1];
                }
                else{
                    var x=words[i].substring(2,words[i].length);
                }
            }
            if(words[i][0]=="Y" && words[i][1]=="="){
                if( words[i+2]==""){
                    var y=words[i+1];
                }
                else{
                    var y=words[i].substring(2,words[i].length);
                }
            }
                 
        }
        Pindex++;
                Points.push(
                    {name:`P${Pindex}`,
                    X:x,
                    Y:y
                    }
                    )
       } 
    });
    console.log(Points);
    for(var j=0;j<Points.length;j+=2){
        Dindex++
        Droites.push(
            {name:`D${Dindex}`,
            firstPoint:Points[j].name,
            secondPoint:Points[j+1].name,
            }
        )
    }
    dataNewLine.forEach(element => {
        if(element.includes("bulge")){
            
            var bulgeArray=element.split(" ");
            bulgeArray.forEach((element,index) => {
                if(element!=""){
                    Rayon.push(element)
                }
                
            });    
        }
    });
    console.log(Droites)
    var bulges =[]
    var radius =[]
    for(var i=1;i<Rayon.length;i+=2){
        bulges.push(Rayon[i].substring(0,Rayon[i].length-2))
    }
    console.log(bulges)
    dataNewLine.forEach((element )=> {
        if(element.includes("radius")){
            
            var radiusArray=element.split(" ");
            radiusArray.forEach((element,index) => {
                if(element!="" && element!="radius"){
                    
                    radius.push(element.substring(0,element.length-2))
                }
                
            });
        
        }
    });
    console.log(radius)
var R=[]
bulges.forEach((element,index) => {
    if(element<0){
        radius[index]=radius[index]*-1
    } 
    Rindex++
    R.push( {name:`R${Rindex}`,value:parseInt(radius[index])})
});
console.log(R)
//cloto8
var L=[]
var Lindex=0
R.forEach(element => {
    if(Math.abs(parseInt(element.value))<param){
        var cloto= Math.min(67, 6* (Math.pow(Math.abs(element.value),0.4)))
        Lindex++
        L.push({name:`L${Lindex}`,value:cloto})
    }
    else{
        Lindex++
        L.push({name:`L${Lindex}`,value:"a"})
    }
});
var Cindex=0;
var C=[]
R.forEach((element,index) => {
    if(Math.abs(parseInt(element.value))<param){
        Cindex++
        C.push({name:`C${Cindex}`,Droite1:Droites[index].name,Droite2:Droites[index+1].name,option:"a"});
    }
    else{
        Cindex++
        C.push({name:`C${Cindex}`,Droite1:Droites[index].name,Droite2:Droites[index+1].name,option:element.value});  
    }
}
    )
    console.log(C)
//affichage
var result=""
Points.forEach(element => {
    result+=`POI ${element.name} ${element.X} ${element.Y} \n`
});
Droites.forEach(element => {
    result+=`DRO ${element.name} ${element.firstPoint} ${element.secondPoint} \n`
});

R.forEach(element => {
    result+=`DIS ${element.name} ${element.value} \n`
});

L.forEach(element => {
    result+=`DIS ${element.name} ${element.value} \n`
});
C.forEach(element => {
    result+=`CER ${element.name} ${element.Droite1} ${element.Droite2} ${element.option}\n`
});

var LineIndex=0
for(var i=0;i<R.length;i++){
    LineIndex++
    result+=`LIA CL${LineIndex} D${LineIndex} D${LineIndex+1} LONG L${LineIndex} R${LineIndex} LONG L${LineIndex} \n`
}
result+="AXE A1 P1 AUTO \nZON A1 0 25 \nTAB A1 PIS"

console.log( result)


fs.writeFile('HamzaBouzriba.txt', result, (err) => {
    if (err) throw err;
})
} catch(e) {
    console.log('Error:', e.stack);
}





