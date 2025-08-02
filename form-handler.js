async function enviarFormulario(formId, endpointUrl) {
    const form = document.getElementById(formId);
    const mensaje = document.createElement('div');
    mensaje.id = 'mensaje-formulario';
    form.appendChild(mensaje);

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        mensaje.textContent = '';
        mensaje.style.color = '';
        // Validación básica
        let valido = true;
        const campos = form.querySelectorAll('input, textarea, select');
        campos.forEach(campo => {
            if (campo.hasAttribute('required') && !campo.value.trim()) {
                valido = false;
                campo.style.borderColor = 'red';
            } else {
                campo.style.borderColor = '';
            }
        });
        if (!valido) {
            mensaje.textContent = 'Por favor, complete todos los campos obligatorios.';
            mensaje.style.color = 'red';
            return;
        }
        // Estado de carga
        const boton = form.querySelector('button[type="submit"], input[type="submit"]');
        const textoOriginal = boton ? boton.textContent : '';
        if (boton) boton.textContent = 'Enviando...';
        // Enviar datos
        const datos = new FormData(form);
        try {
            const respuesta = await fetch(endpointUrl, {
                method: 'POST',
                body: datos,
            });
            if (respuesta.ok) {
                mensaje.textContent = '¡Formulario enviado con éxito!';
                mensaje.style.color = 'green';
                form.reset();
            } else {
                mensaje.textContent = 'Error al enviar el formulario. Inténtelo de nuevo.';
                mensaje.style.color = 'red';
            }
        } catch (error) {
            mensaje.textContent = 'Error de conexión. Inténtelo más tarde.';
            mensaje.style.color = 'red';
        }
        if (boton) boton.textContent = textoOriginal;
    });
}