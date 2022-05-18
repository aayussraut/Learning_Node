module.exports = function (handler) {
  return async (req, res, next) => {
    //return garda kina reference pass gareko bhanda handler(router.get,...) ma hamile reference pass garxan so ...
    try {
      await handler(req,res);
    } catch (ex) {
      next(ex);
    }
  };
};

// module.exports=asyncMiddleware;
// module.exports = function (handler) {
//     return async (req, res, next) => {
//       try {
//         await handler(req, res);
//       }
//       catch(ex) {
//         next(ex);
//       }
//     };  
//   }