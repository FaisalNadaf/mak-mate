import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  // Check if authorization header is missing or does not start with "Bearer"
  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    // If authentication fails, call next with an error message
    next("Authentication failed");
  }

  // Extract the token from the authorization header
  const token = authHeader?.split(" ")[1];

  try {
    // Verify the token using the JWT_SECRET_KEY
    const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);

    // If the token is valid, attach the user's ID to the request body
    req.body.user = {
      userId: userToken.userId,
    };

    // Call next middleware or route handler
    next();
  } catch (error) {
    // If there's an error during token verification, log the error and call next with an error message
    console.log(error);
    next("Authentication failed");
  }
};

export default userAuth;
