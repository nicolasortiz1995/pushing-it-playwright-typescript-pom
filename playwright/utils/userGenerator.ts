import { faker } from '@faker-js/faker'

/**
 * Generates a random user with a username and a password.
 * The generated password will always include at least one special character and one digit.
 *
 * @returns An object containing a username and a password.
 */
export function generateRandomUser(): { username: string, password: string } {
  // Generate a random username and remove any special characters.
  const rawUsername = faker.internet.username();
  const username = rawUsername.replace(/[^a-zA-Z0-9]/g, "");

  // Generate a base password consisting only of letters.
  let password = faker.internet.password({ length: 8, memorable: false, pattern: /[A-Za-z]/ });
  
  // Pick a random special character from a predefined list.
  const specialChar = faker.helpers.arrayElement(['!', '@', '#', '$', '%', '^', '&', '*']);

  // Generate a random digit between 0 and 9.
  const digit = faker.number.int({ min: 0, max: 9 }).toString();

  // Append the special character and the digit to ensure they are present in the password.
  password = password + specialChar + digit;

  // Optionally shuffle the characters of the password to mix them randomly.
  password = shuffleString(password);

  return { username, password };
}

/**
 * Shuffles the characters of a string randomly.
 *
 * @param str - The string to shuffle.
 * @returns The shuffled string.
 */
function shuffleString(str: string): string {
  const arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}
