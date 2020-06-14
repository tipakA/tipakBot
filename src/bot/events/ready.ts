import { Event } from '../util/interfaces'; // eslint-disable-line no-unused-vars
import tipakBot from '../tipakBot'; // eslint-disable-line no-unused-vars

function readyEvent(client: tipakBot) {
  console.log(`Logged in as ${client.user!.tag}`);
}

export = {
  run: readyEvent,
  type: 'ready',
} as Event;