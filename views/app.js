document.addEventListener('DOMContentLoaded', () => {

    // forms switch
    const tabs = document.querySelectorAll('.tab a');
    const tabContents = document.querySelectorAll('.tab-content > div');
  
    const switchTab = (e) => {
      e.preventDefault();
      tabs.forEach(tab => tab.parentElement.classList.toggle('active', tab === e.target));
      tabContents.forEach(content => content.style.display = (content.id === e.target.getAttribute('href').substring(1)) ? 'block' : 'none');
    };
  
    tabs.forEach(tab => tab.addEventListener('click', switchTab));
  
    // Inicialización: activamos la primera pestaña y su contenido
    if (tabs.length > 0) {
      tabs[0].parentElement.classList.add('active');
      document.querySelector(tabs[0].getAttribute('href')).style.display = 'block';
    }

    // peticiones http
    document.getElementById('signup-form').addEventListener('submit', handleSignup);
    document.getElementById('login-form').addEventListener('submit', handleLogin);

    async function handleSignup(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Error en el registro');

        const result = await response.json();
        console.log('Registro exitoso:', result);

        } catch (error) {
        console.error('Error:', error);
        alert('Error en el registro');
        }
    }

    async function handleLogin(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Error al iniciar sesión');

        const result = await response.json();
        console.log('Inicio de sesión exitoso:', result);

        } catch (error) {
        console.error('Error:', error);
        alert('Error al iniciar sesión');
        }
    }    

  });



  