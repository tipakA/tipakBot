import { Event } from '../util/interfaces'; // eslint-disable-line no-unused-vars
import tipakBot from '../tipakBot'; // eslint-disable-line no-unused-vars

function readyEvent(client: tipakBot) {
  console.log(`Logged in as ${client.user!.tag}`);
}

export const event: Event = {
  run: readyEvent,
  type: 'ready',
}