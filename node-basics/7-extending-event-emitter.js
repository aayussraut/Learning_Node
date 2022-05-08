

const Logger=require('./2-1-logger');
const logger=new Logger();
logger.on('messageLogged',(arg)=>{
    console.log('Listner Called'); 
    console.log(arg);
})
logger.log('message');



