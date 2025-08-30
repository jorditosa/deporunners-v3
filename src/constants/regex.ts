// Regular expressions for common validation patterns
export const Regex = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^.{6,}$/, 
  INITIAL_PASSWORD: /\bdepoapp24\b/, // Password validation
  NAME: /^[a-zA-Z ]{2,30}$/, // Name validation (allowing alphabets and spaces)
  DAY: /^(([0]?[1-9])|([1-2][0-9])|(3[01]))$/, // Day validation (1-31)
  MONTH: /^(0?[1-9]|1[012])$/, // Month validation (1-12)
  YEAR: /^\d{4}$/, // Year validation (four digits)

  IMAGE: /<img.*?src=['"](.*?)['"]/
};

