/* eslint-disable */
async function foo() {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#pw').value;
  const b = await axios.post('/user/login', {
    password,
    email,
  });
  console.log(b);
}
