const message = [
  {
    id: 1,
    createdOn: '03/04/2019',
    subject: 'BootCamp Reminder',
    message: 'This is to remind you all that boocamp commences on 11th of this month',
    status: 'read',
    senderId: 1,
    recipients: ['lily@epicmail.com'],
    receiverId: [2],
  },

  {
    id: 2,
    createdOn: '03/09/2019',
    subject: 'Notice',
    message: 'This is to remind you all that',
    status: 'draft',
    senderId: 1,
  },

  {
    id: 3,
    createdOn: '03/05/2019',
    subject: 'Andela Developer Challenge',
    message: 'This is to remind you all that your week2 challenge is supposed to be submitted on friday 8th march 2019.',
    status: 'sent',
    senderId: 1,
    recipients: ['lily@epicmail.com'],
    receiverId: [2],
  },

  {
    id: 4,
    createdOn: '03/08/2019',
    subject: 'Strike Back',
    message: 'This ain\'t no place for no hero, this ain\'t no place for no better man',
    status: 'unread',
    senderId: 2,
    recipients: ['princechekwas@epicmail.com'],
    receiverId: [1],
  },
];

export default message;
