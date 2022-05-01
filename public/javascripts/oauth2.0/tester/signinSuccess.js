const submitBtnDom = document.getElementById('submit-btn');
const clientIdDom = document.getElementById('clientId');
const clientSecretDom = document.getElementById('clientSecret');
const accessTokenDom = document.getElementById('accessToken');
const codeDom = document.getElementById('code');

submitBtnDom.addEventListener('click', async () => {
  const res = await fetch('http://localhost:3000/auth2.0/exchange', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clientId: clientIdDom.value,
      clientSecret: clientSecretDom.value,
      code: codeDom.value,
    }),
  })

  const data = await res.json();
  console.log(data);
  accessTokenDom.value = data.accessToken;
})