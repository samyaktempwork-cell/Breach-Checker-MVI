export function validatePhone(phone) {
  return /^[6-9]\d{9}$/.test(phone); // India example
}
