class BlackList {
  data = []

  constructor() { }

  find(id) {
    return this.data.find(item => item.id === id)
  }

  add(data) {
    this.data.push(data)
  }
}

class Console {
  data = []
  constructor() { }

  add(name, allowUrl, redirectUrl) {
    const temp = {
      ...this.gererateCreditentials(),
      id: this.data.length,
      name,
      allowUrl,
      redirectUrl,
    }
    this.data.push(temp)
    return temp;
  }

  gererateCreditentials() {
    return {
      clientId: parseInt(new Date().getTime() / 1024).toString(),
      clientSecret: parseInt(new Date().getTime() / 2048).toString()
    }
  }

  findByClientId(clientId) {
    console.log(clientId)
    console.log(this.data)
    return this.data.find(item => item.clientId === clientId)
  }
}

class Auth2Service {
  users = [
    { id: 1, name: 'mung1', email: 'mung1@mung.com', },
    { id: 2, name: 'mung2', email: 'mung2@mung.com', },
    { id: 3, name: 'mung3', email: 'mung3@mung.com', },
    { id: 4, name: 'mung4', email: 'mung4@mung.com' },
  ];

  userBlacks = new BlackList();
  codeBlacks = new BlackList();

  constructor() {

  }

  findUserByEmail(email) {
    console.log(this.users, email)
    return this.users.find(item => item.email === email)
  }
}
module.exports = {
  consoleService: new Console(),
  auth2Service: new Auth2Service(),
}