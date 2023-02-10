export const validateName = (name: string) => {
  return name.length >= 3;
};

export const validateEmail = (email: string) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return false;
  }
  return true;
};

export const validatePassword = (password: string) => {
  let totalCharacters = password.length,
    specialCharacters = 0,
    lowerCase = 0,
    upperCase = 0,
    numbers = 0;
  for (let i = 0; i < password.length; i++) {
    const asciiCode = password.charCodeAt(i);

    if (
      (asciiCode >= 32 && asciiCode <= 47) ||
      (asciiCode >= 58 && asciiCode <= 64) ||
      (asciiCode >= 91 && asciiCode <= 96) ||
      (asciiCode >= 123 && asciiCode <= 126)
    ) {
      specialCharacters++;
    } else if (asciiCode > 48 && asciiCode <= 57) {
      numbers++;
    } else if (asciiCode >= 65 && asciiCode <= 90) {
      upperCase++;
    } else if (asciiCode >= 65 && asciiCode <= 90) {
      upperCase++;
    } else if (asciiCode >= 97 && asciiCode <= 122) {
      lowerCase++;
    }
  }

  return (
    totalCharacters >= 8 &&
    totalCharacters <= 100 &&
    upperCase >= 1 &&
    lowerCase >= 1 &&
    specialCharacters >= 1 &&
    numbers >= 1
  );
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  return password === confirmPassword;
};
