import hash from 'hash.js';

const hashCodes = (input: string) => {
  return hash.sha256().update(input).digest('hex');
}

export default hashCodes