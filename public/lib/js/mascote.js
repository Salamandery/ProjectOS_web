class Mascote {
    constructor(){
        this.timeWait = 5000;
        this.state = 1;
        this.lastMsgtoTalk = "";
        this.MsgtoTalk = "";
        this.timeTalk = 60;
        this.delayMsg = 0;
        this.TalkInteraction = {
            greet: ["Olá"],
            howare: ["Como vai??"]
        };
        this.Wink = 0;
        this.name = "Sesin";
        this.yo = 1;
        this.popper = $('#popperintra');
        this.elemPopper = document.getElementById("popperintra");
        this.me = document.getElementById('ballomHelperintra');
    }
    thisSetup(){
        socketServer('mascote_intra');
        this.popper.hide();
        this.setState(1);
        console.log("Preparando tudo..");
        console.log("Tudo ok.");
        console.log(this.getName());
        console.log(this.getYearOld());
    }
    thisStart(){
        setInterval(() => {
            console.log("Rodando...");
            this.doIdle();
            if (this.toTalk(this.MsgtoTalk)) {
                this.doTalk("toInteract");
            } else {
                this.defineTalk(
                    this.TalkInteraction.greet[Math.floor(Math.random() * 
                        (this.TalkInteraction.greet.length))]
                );
            }
            
        }, this.timeWait);
    }
    getName(){
        return this.name;
    }
    getYearOld(){
        return this.yo;
    }
    defineTalk(msg){
        console.log(msg);
        this.MsgtoTalk = msg;
    }
    addTalkInteraction(type, msg){
        switch(type) {
            case "greet":
                this.TalkInteraction.greet.push(msg);
            break;
            case "howare":
                this.TalkInteraction.howare.push(msg);
            break;
        }
    }
    doIdle(){
        this.Wink++;
        if (this.Wink == 1) {
            if (this.state === 1) {
                this.setState(0);
            } else {
                this.setState(1);
            }
            this.Wink = 0;
        }
    }
    doTalk(type){
        let i = 0;
        let lastMsg;
        let elem;
        let toMsg;
        switch(type) {
            case 'toInteract':
                i = 0;
                lastMsg = this.lastMsgtoTalk;
                toMsg = "<p>";
                elem = this.popper;
                this.setState(2);
                this.popper.show();
                var talking = setInterval(() =>{
                    toMsg += lastMsg[i];
                    elem.html(toMsg);
                    if (i == lastMsg.length-1) {
                        toMsg += "</p><input type='text'/>";
                        elem.html(toMsg);
                        clearInterval(talking);
                        this.setState(1);
                    }
                    i++;
                },this.timeTalk);
            break;
            default:
                i = 0;
                lastMsg = this.lastMsgtoTalk;
                toMsg = "";
                elem = this.popper;
                this.setState(2);
                this.popper.show();
                var talking = setInterval(() =>{
                    if (i == lastMsg.length-1) {
                        clearInterval(talking);
                        this.setState(1);
                    }
                    toMsg += lastMsg[i];
                    elem.html(toMsg);
                    i++;
                },this.timeTalk);
            break;
        }
    }
    toTalk(msg){
        if (this.lastMsgtoTalk === msg) {
            if (this.delayMsg === 4) {
                this.delayMsg = 0;
                this.popper.hide();
            }
            this.delayMsg++;
            return false;
        } else {
            this.lastMsgtoTalk = msg;
            return true;
        }
    }
    setTimeLoop(time){
        this.timeWait = time;
    }
    setTimeTalk(time){
        this.timeTalk = time;
    }
    setState(state){
        switch(state){
            case 0:
                this.state = 0;
            break;
            case 1:
                this.state = 1;
            break;
            case 2:
                this.state = 2;
            break;
        }
        this.getState();
    }
    getState(){
        switch(this.state) {
            case 0:
                this.me.src='/img/mascoteses.png';
            break; 
            case 1:
                this.me.src='/img/mascotewink.gif';
            break; 
            case 2:
                this.me.src='/img/mascotetalk.gif';
            break; 
        }
    }
}