const message = [
  {
    id: 1,
    createdOn: '03/07/2019',
    subject: 'BootCamp Reminder',
    message: 'This is to remind you all that boocamp commences on 11th of this month',
    status: 'sent',
    senderId: 1,
    recipients: ['lily@epicmail.com'],
    receiverId: [2],
  },

  {
    id: 2,
    createdOn: '03/09/2019',
    subject: 'Notice',
    message: 'This is to remind you all that',
    status: 'unread',
    senderId: 2,
    recipients: ['princechekwas@epicmail.com'],
    receiverId: [1],
  },

  {
    id: 3,
    createdOn: '03/05/2019',
    subject: 'word',
    message: 'Legendary',
    status: 'sent',
    senderId: 1,
    recipients: ['lily@epicmail.com'],
    receiverId: [2],
  },

  {
    id: 4,
    createdOn: '03/08/2019',
    subject: 'April 14th',
    message: 'Winter is coming',
    status: 'read',
    senderId: 2,
    recipients: ['princechekwas@epicmail.com'],
    receiverId: [1],
  },

  {
    id: 5,
    createdOn: '03/08/2019',
    subject: 'Webinar',
    message: 'Webinar coming up on the 18th of April 2019',
    status: 'read',
    senderId: 1,
    recipients: ['lily@epicmail.com'],
    receiverId: [2],
  },
  {
    id: 6,
    createdOn: '03/09/2019',
    subject: 'Strike Back',
    message: 'This ain\'t no place for no hero',
    status: 'sent',
    senderId: 2,
    recipients: ['princechekwas@epicmail.com'],
    receiverId: [1],
  },
];

export default message;
