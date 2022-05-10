console.log("before");

//callback

//callback hell

// getUser(1,(user)=>{
//     console.log(user);
//     getRespositories(user.githubUsername,(repos)=>{
//         console.log(repos);
//         getCommits(repos[0],(commits)=>{
//             console.log(commits);

//             //nested xa
//             //we call it callback hell
//         })
//     })
// });


getUser(1)
.then(user=>getRespositories(user.githubUsername))  //consuming getUser promise
.then(repos=>getCommits(repos[0]))  //consuming getRepository promise
.then(commits=>console.log(commits))
.catch(err=>console.log(err.message)); //consuming getCommits promise
console.log('After'); 


function getUser(id){

    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Reading a user from a database");
            resolve({id: id, githubUsername:"aayussraut"});
        },2000);
    });
    
}

function getRespositories(username){

    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(['repo1','repo2','repo3']);
        },2000);
    })
    
}

function getCommits(repos){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve({commit1:"1st commit",commit2:"second commit "});
        }, 2000);
    })
} 

//Named function to rescure callback hell
// getUser(1,displayUsername);



// function displayCommits(commits){
//     console.log(commits);
// }

// function displayRepository(repository){
//     console.log(repository);
//     getCommits(repository,displayCommits);
// }
// function displayUsername(user){
//     console.log(user);
//     getRespositories(user.githubUsername,displayRepository);
// }

