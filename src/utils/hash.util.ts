const bcrypt = require('bcrypt');

// Function to hash password
export async function hashPassword(password) {
    
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    const hash = await bcrypt.hash(password, salt);
    return hash;

}

// Function to verify password
export async function verifyPassword(password, hashedPassword) {
    
    const match = await bcrypt.compare(password, hashedPassword);
    return match;

}