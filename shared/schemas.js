// Validation schemas that can be used in both client and server
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;

export const validateEmail = (email) => {
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  return phoneRegex.test(phone);
};
