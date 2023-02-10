import { Gender } from '../../pages/author/create';

export const validateName = (name: string) => {
  const nameLength = name.length;
  return nameLength >= 3 && nameLength <= 100;
};

export const validateDate = (date: string) => {
  return date !== '';
};

export const validateBio = (bio: string) => {
  const bioLength = bio.length;
  return bioLength >= 50 && bioLength <= 1000;
};
export const validateGender = (gender: string) => {
  return gender !== '';
};
