import { del, get, post, useRequest } from "@lib/request";

class UserServiceClass {
  public UserList(options?) {
    return useRequest("/eapi/users", options);
  }
  public CreateUser(options?) {
    return post(`/eapi/users`, options);
  }
  public DelUser(id, options?) {
    return del(`/eapi/users/${id}`, options);
  }
}

export const UserService = new UserServiceClass();
