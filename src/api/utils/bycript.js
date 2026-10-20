import bcrypt from "bcrypt";

const salt = 14;

export async function hashPassword(password){
        if(password.length < 5)
            throw new Error("Minimo 5 caracteres en la password");

        return bcrypt.hash(password, salt);
}

export async function comparePassword(password, hashsedPassword){
    return bcrypt.compare(password, hashsedPassword);
}