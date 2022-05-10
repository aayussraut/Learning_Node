const p= new Promise(function(resolve,reject){ 
    //kick off some async work
    //async work complete we have either reesult or error

    setTimeout(() => {
        // resolve(1); 

        //error message
         reject(new Error('message')); //Error object has a message property
    }, 2000);
  //result
   

});


//consume promise     
p.then(result=>console.log(result)).catch(err=>console.log(err.message)); //accessing message property in catch
