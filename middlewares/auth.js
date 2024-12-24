module.exports = (req, res, next) => {
    // Extract the Authorization header (e.g., "Basic <base64-encoded-credentials>")
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).send('Access denied. Missing or invalid Authorization header.');
    }
  
    // Decode the Base64-encoded credentials
    const base64Credentials = authHeader.replace('Basic ', '');
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    
    // Extract username and password (format: "username:password")
    const [username, password] = credentials.split(':');
    
    // Validate the username and password
    const validUsername = 'testuser';
    const validPassword = 'testpassword';
  
    if (username !== validUsername || password !== validPassword) {
      return res.status(401).send('Access denied. Invalid credentials.');
    }
  
    // If credentials are valid, proceed to the next middleware or route
    next();
  };
  
