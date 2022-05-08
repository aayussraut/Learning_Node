//  event is basically a signal that indicates that something has happened

const EventEmitter =require('events'); // EventEmitter is a class

const emitter =new EventEmitter(); //emitter is obj

//listner is a function that will be called when an event is raised

//register a listener
// emitter.on('messageLogged',function(arg){
    // console.log('Listner Called');
    // console.log(arg);
// })
emitter.on('messageLogged',(arg)=>{
    console.log('Listner Called');
    console.log(arg);
})


//raise an event
emitter.emit('messageLogged',{id:1,url:'http://'}); //id and url is argument send as an object 
//emits signals that an event has happened 


