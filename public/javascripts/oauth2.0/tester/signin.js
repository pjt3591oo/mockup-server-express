const submitBtnDom = document.getElementById('submit-btn');
const clientIdDom = document.getElementById('clientId');

submitBtnDom.addEventListener('click', () => {
  const url = `http://localhost:3000/auth2.0/signin?client_id=${clientIdDom.value}&redirect_url=http://127.0.0.1/`
  console.log(123)
  window.open(url, '멍개 인증서버', "width=500, height=700, scrollbars=yes, resizable=no");
})