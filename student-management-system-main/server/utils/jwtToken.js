const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();
    let cookieName = user.role; // Changed to let for reassignment

    // Adjusting cookie name based on user role
    if (user.role === 'admin') {
        cookieName = 'adminToken';
    } else if (user.role === 'hod') {
        cookieName = 'hodToken';
    } else if (user.role === 'faculty') {
        cookieName = 'facultyToken';
    } else if (user.role === 'student') {
        cookieName = 'studentToken';
    }else if(user.role === 'staff'){
        cookieName = 'staffToken';
    }else if(user.role === 'user'){
        cookieName = 'userToken';
    }
    
    res.status(statusCode).cookie(cookieName, token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    }).json({
        success: true,
        message,
        user,
        token,
    });
};

module.exports = generateToken;
