var url="http://mylogger.io/log";

const EventEmitter=require('events');


class Logger extends EventEmitter{
    log(message){
        console.log(message);
        this.emit('messageLogged',{id:1,url:'https://'})
    }
}


// module.exports.log=log

//alternavtive
module.exports=Logger;