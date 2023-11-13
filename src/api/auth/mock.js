import users from "../__mock__/users.js";

export function mockLogin(mock) {
  mock.onPost("/login").reply(({ data }) => {
    const { email, password } = JSON.parse(data);
    const me = users.find((user) => user.email === email);
    if (me) {
      if (me.password === password) {
        return [200, { token: `AUTH_TOKEN_${email}` }];
      }
      return [401, { message: "Password does not match" }];
    }
    return [404, { message: "User not found" }];
  });
}

export function mockResetPassword(mock) {
  mock.onPost("/forgot-password").reply(({ data }) => {
    const { email } = JSON.parse(data);
    const me = users.find((user) => user.email === email);
    if (me) {
      return [200, { message: "Email has been sent!" }];
    }
    return [404, { message: "User not found" }];
  });
}

export function mockUpdatePassword(mock) {
  mock.onPost("/reset-password").reply(200, { message: "Password updated!" });
}

export function mockCodeVerify(mock) {
  mock.onGet(/\/verify-code\?code=\d{6}/).reply(200, { message: "Verified" });
}
