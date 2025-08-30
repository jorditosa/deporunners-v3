import hash from 'hash.js';

export const hashNames = (name: string) => {
  return hash.sha256().update(name).digest('hex');
}

