export const validateInputLength = (
  inputName: string, inputString: string, requiredLength: number): string => {
  if (!inputString || inputString.length < requiredLength) {
    return `${inputName} must be at least ${requiredLength} characters.`
  }
  return ""
}