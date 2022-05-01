const submitBtnDom  = document.getElementById('submit-btn');
const emailDom = document.getElementById('email');

submitBtnDom.addEventListener('click', async () => {

  const f = await fetch('http://localhost:3000/auth2.0/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: emailDom.value
    })
  })

  const data = await f.json();
  if (window.opener) {
    window.opener.location.href = `http://localhost:3000/auth2.0/test/signin/success/callback?code=${data.code}`
    window.close()
  } else {
    window.location.href = `http://localhost:3000/auth2.0/test/signin/success/callback?code=${data.code}`  
  }
})