class Conversa {
    constructor() {
        this.chat = createInput("").attribute("placeholder", "Digite");this.chat.style('font-size', Math.sqrt(width/4.25 , height/16*2).toFixed(0)+'px');this.chat.size(width/4.25 , height/16);this.chat.position(width/2 - width/4/2, height/2 - height/16*2.5);this.chat.class("customInput");
        this.enterButton = createButton("Enter");
        this.enterButton.style('font-size', '50px')
        this.enterButton.size(width/4 , height/16)
        this.enterButton.position(width/2 - width/4/2+width/4.25, height/2 - height/16*2.5);
        this.enterButton.class("customButton");
        this.enterButton.mousePressed(() => {this.create();this.remove();Conversa.getChatInfo()})
      }
remove(){
  this.chat.remove();this.chat=undefined
  this.enterButton.remove()
}




    create() {
      //this.increase()
        this.x
        if(allChats==undefined||allChats==""){this.x=0}
        else{this.x=this.Chatslet()}console.log(this.x)
        var chatIndex = "chat/" + this.x;
    database.ref(chatIndex).set({
         texto: player.name+":"+this.chat.value(),
         tempo: 300,
         posição:0,
         })


       }
       systemMessage(Texto){
        this.x
        if(allChats==undefined||allChats==""){this.x=0}
        else{this.x=this.Chatslet()}console.log(this.x)
        var chatIndex = "chat/" + this.x;
    database.ref(chatIndex).set({
         texto: "Sistema:"+Texto,
         tempo: 301,
         posição:0,
         })
       }

       async increase(x){
        for(var plr in allChats){if(plr<=x){this.update(plr,allChats[plr].tempo+1,1)}}
       }

       update(x, t, p){
        var chatIndex = "chat/" + x;
        database.ref(chatIndex).update({
             tempo: t-1,
            posição: allChats[x].posição+p
                })
             if(t-1<=0){
                this.destroy(x)
             }

       }
       
      
       destroy(x){
        Chatstexts[allChats[x].posição].remove();Chatstexts.splice(allChats[x].posição,1);var ref = database.ref("chat/" + x);ref.remove();
        //Conversa.getChatInfo()
       }


        Chatslet(){
        var ac = -1,acm,acac=-1
        for(var plr in allChats){
          if(plr>ac){ac = plr}
        }
        return(Number(ac)+1)
          /*for(var pp in allChats){
            if(acac==-1){
              
            if(pp==ac){
        ac+=1
            }
            else{acac=pp;return(ac)}}
            }
            if(acac==-1){return(ac)}*/
          }

static getChatInfo(){
  var chatInfoRef=database.ref("chat");
  chatInfoRef.on("value", data=>{
    allChats=data.val()
  })
  }

  read(){
  var paae
for(var plr in allChats){
if(paae!=undefined&&allChats[paae]!=undefined){if(allChats[plr].posição==allChats[paae].posição){Chat.increase(paae)}}
  var con = allChats[plr].texto;con = String(con)
  var fontSize = Math.sqrt(Math.pow((Math.sqrt(width/4.25)*2),2)+Math.pow((Math.sqrt(height/16)*2),2))
  
if(con.length*fontSize.width>width*3/4){console.log(con.length*fontSize/2+" "+width*3/4);stroke("red");point(con.length*fontSize/2,height/2)}
  //Adicionar ESPAÇOS
  for(var t = 0;t<con.length; t++){
      con=con.replace(" ","&nbsp")
  }



  var tem = allChats[plr].tempo
  var pos = allChats[plr].posição
  
  if(Chatstexts[pos]==undefined){Chatstexts.unshift(createElement("h2"));Chatstexts[0].style('font-size', fontSize+'px');Chatstexts[0].size(1,height/4);Chatstexts[0].class("greeting");}
  if(con!=undefined){Chatstexts[pos].html(con)}

//Chatstexts[pos].position(p[plca][0].position.x-width/2,p[plca][0].position.y+(height/2.5)-((pos)*(Math.ceil(fontSize))))//Chatstexts[plr].elt.innerText.length
    Chatstexts[pos].position(0,windowHeight/2+(height/2.5)-((pos)*(Math.ceil(fontSize))))

Chat.update(plr,tem,0)
paae=plr
}
  }
    
   
}
