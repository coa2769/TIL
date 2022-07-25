exports.isLoggedIn = (req, res, next)=>{
  //로그인 되어 있는가?
  if(req.isAuthenticated()){
    next();
  }else{
    res.status(403).send('로그인 필요');
  }
};
//로그인 되지 않았는가?
exports.isNotLoggedIn = (req, res, next)=>{
  if(!req.isAuthenticated()){
    next();
  }else{
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.direct(`/?error=${message}`);
  }
};