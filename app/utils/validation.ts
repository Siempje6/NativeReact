export const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0/9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const valid = password.length >= minLength && hasUpper && hasLower && hasNumber && hasSpecial;

    let strength = 0;
    if (password.length >= minLength) strength++;
    if (hasUpper) strength++;
    if (hasLower) strength++;
    if (hasNumber) strength++;
    if (hasSpecial) strength++;

    return { valid, strength };
}