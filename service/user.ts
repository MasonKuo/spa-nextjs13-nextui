import { del, get, post, useRequest } from "@lib/request";

class UserServiceClass {
  public UserList(options?) {
    return useRequest("/api/hello", options);
  }
  public CreateUser(options?) {
    return post(`/api/hello`, options);
  }
  public DelUser(id, options?) {
    return del(`/api/hello/${id}`, options);
  }
}

export const UserService = new UserServiceClass();
