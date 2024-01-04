import { del, get, post, useRequest } from '@lib/request';

class EmailServiceClass {
  public SendCode(options?) {
    return post(`/api/email/send_code`, options);
  }
}

export const EmailService = new EmailServiceClass();
