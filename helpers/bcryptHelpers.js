import bcrypt from 'bcrypt'

export async function comparePassword(password1, password2)
{
    const isValid = await bcrypt.compare(password1, password2);
    return isValid;
}

export async function hashPassword(password){
    const hash = await bcrypt.hash(password, 10)
    return hash;
}