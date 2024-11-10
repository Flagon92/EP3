async function acces(data) {
  try {
  const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error('Error al autenticar');

  const result = await response.json();
  console.log('Usuario Autenticado:', result);

  return result.user

  } catch (error) {
  console.error('Error:', error);
  alert('Error autenticacion');
  window.location.pathname = '/EP3/views/index.html';
  }
}



document.addEventListener('DOMContentLoaded', async () => {
  let load 
  const cookieUser = document.cookie.slice(5)

  if(!cookieUser) window.location.pathname = '/EP3/views/index.html';
  
  const {auth, user, ...data } = JSON.parse(cookieUser)
  
  load = user

  if(!auth) {
    load = await acces(data)
  } 

  document.getElementById('username').textContent = load;

  //Elimina la cookie y redireciona al index.html
  document.getElementById('cerrar-sesion').addEventListener('click', () => {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.pathname = '/EP3/views/index.html';
  })
})


