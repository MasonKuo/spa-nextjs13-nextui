import { del, get, post, useRequest } from "@lib/request";

class UserServiceClass {
  public UserList(options?) {
    return useRequest("/api/users", options);
  }
  public CreateUser(options?) {
    return post(`/api/users`, options);
  }
  public DelUser(id, options?) {
    return del(`/api/users/${id}`, options);
  }
}

export const UserService = new UserServiceClass();
