import { del, get, post, useRequest } from '@lib/request';

class UserServiceClass {
  public UserList(options?) {
    return useRequest('/be_api/users', options);
  }
  public CreateUser(options?) {
    return post(`/be_api/users`, options);
  }
  public DelUser(id, options?) {
    return del(`/be_api/users/${id}`, options);
  }
}

export const UserService = new UserServiceClass();
