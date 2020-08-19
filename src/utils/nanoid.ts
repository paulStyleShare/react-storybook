import { v4 as uuidv4 } from 'uuid';

export function nanoid(length = 10): string {
  return uuidv4().substr(0, length);
}
