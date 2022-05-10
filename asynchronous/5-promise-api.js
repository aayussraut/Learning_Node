// const p=Promise.resolve({id:1});
// p.then(result=>console.log(result));

// const p1=Promise.reject(new Error('reason for rejection...'));
// p1.catch(error=>console.log(error.message))

const p1=new Promise ((resolve,reject)=>{
    setTimeout(() => {
        console.log('Async operation 1....');
        resolve(1);
        // reject(new Error("something failed!"));
    }, 2000);
})
const p2=new Promise ((resolve)=>{ 
    setTimeout(() => {
        console.log('Async operation 2....');
        resolve(2);
    }, 2000);
})

//both async operation started nearly at same time

// Promise.all([p1,p2]) //duita promise resolve bhaye paxe yesma kaam hunxa //if any prmise is rejected then final promise is rejected
// .then(result=>console.log(result))
// .catch(error=>console.log(error.message));


Promise.race([p1,p2]) //if any one of the promise is resolved then 
.then(result=>console.log(result))
.catch(error=>console.log(error.message));