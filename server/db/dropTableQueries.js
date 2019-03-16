const dropUsers = 'DROP TABLE IF EXISTS users CASCADE;';
const dropMessages = 'DROP TABLE IF EXISTS messages CASCADE;';
const dropInbox = 'DROP TABLE IF EXISTS inbox CASCADE;';
const dropSent = 'DROP TABLE IF EXISTS users CASCADE;';

const createTableQueries = `${dropUsers}${dropMessages}${dropInbox}${dropSent}`;
export default createTableQueries;
