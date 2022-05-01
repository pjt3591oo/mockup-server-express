const nameDom = document.getElementById('name');
const redirectUriDom = document.getElementById('redirectUri');
const allowUrlDom = document.getElementById('allowUrl');
const messageBoxTitle = document.getElementById('msg-title');
const clientIdDom = document.getElementById('clientId');
const clientSecretDom = document.getElementById('clientSecret');

const messageBox = document.getElementById('message-box');

document.getElementById('submit-btn').addEventListener('click', async () => {
  if (!nameDom.value || !redirectUriDom.value || !allowUrlDom.value) {
    messageBoxTitle.innerText = '입력 오류';
    messageBox.showModal();
    return
  }

  try {
    const f = await fetch('http://localhost:3000/auth2.0/console', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameDom.value,
        redirectUrl: redirectUriDom.value,
        allowUrl: allowUrlDom.value
      })
    })
    const data = await f.json();
    clientIdDom.innerText = `clientId: ${data.clientId}`;
    clientSecretDom.innerText = `clientSecret: ${data.clientSecret}`;
  } catch(err) {
    messageBoxTitle.innerText = 'Error';
  }
  messageBox.showModal();

  // console.log(nameDom.value, redirectUriDom.value, allowUrlDom.value);
})

