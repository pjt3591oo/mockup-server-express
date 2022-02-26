class AuthService {
  users = [{
    id: 'admin', pw: 'admin', name: '관리자'
  }, {
    id: 'test0', pw: 'test0', name: '테스터0',
  }, {
    id: 'test1', pw: 'test1', name: '테스터0',
  }]
  
  constructor() {}

  find(id, pw) {
    const user = this.users.find(u => u.id === id && u.pw === pw);
    return user;
  }

  save(id, pw, name) {
    const user = { id, pw, name };
    this.users.push(user);
    return user
  }
}

module.exports = new AuthService();