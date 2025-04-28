const sendToken = (shop, statusCode, res) => {
    //creating jwt token
    const token = shop.getJwtToken();
  
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      token,
      shop,
    });
  };
  
  module.exports = sendToken;