const config = require("config");
module.exports=function(){

    if(!config.get('jwtPrivateKey')){
        console.log(Hi);
        throw new Error("FATAL ERROR: jwtPrivateKey is not defined .");
    }
}