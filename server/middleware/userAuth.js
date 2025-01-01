import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const {token} = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default userAuth;


// import jwt from "jsonwebtoken";

// const userAuth = async (req, res, next) => {
//   // Extract the token from cookies
//   const token = req.cookies?.token;

//   // Check if the token exists
//   if (!token) {
//     return res.json({ success: false, message: "Not Authorized. Login Again." });
//   }

//   try {
//     // Verify the token
//     const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

//     // Check if the token contains the user ID
//     if (tokenDecode?.id) {
//       req.body.userId = tokenDecode.id;
//       next();
//     } else {
//       return res.json({
//         success: false,
//         message: "Not Authorized. Login Again.",
//       });
//     }
//   } catch (error) {
//     // Handle token verification errors
//     return res.json({ success: false, message: error.message });
//   }
// };

// export default userAuth;
