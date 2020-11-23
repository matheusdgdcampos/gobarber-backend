interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ses',

  defaults: {
    from: {
      email: 'YOUR_EMAIL_HERE',
      name: 'YOUR_NAME_HERE',
    },
  },
} as IMailConfig;
