const requirements = {
    password: [
        {
            regex: /[A-Z]/,
            message: 'La contraseña debe contener al menos una letra mayúscula'
        },
        {
            regex: /[0-9]/,
            message: 'La contraseña debe contener al menos un número'
        }
    ]
}

document.addEventListener('DOMContentLoaded', () => {
    // const button = document.querySelector('#btn-login')
    const form = document.querySelector('#form-login')
    const passwordInput = document.querySelector('input[name="password"]')

    // Load requirements in HTML
    const ul = document.querySelector('#password-requirements ul')
    requirements.password.forEach(requirement => {
        const li = document.createElement('li')
        li.textContent = requirement.message
        ul.appendChild(li)
    })

    passwordInput.addEventListener('input', (event) => {
        const password = event.target.value
        const passwordRequirements = requirements.password

        const ul = document.querySelector('#password-requirements ul')
        ul.innerHTML = ''

        passwordRequirements.forEach(requirement => {
            const li = document.createElement('li')
            li.textContent = requirement.message
            li.className = requirement.regex.test(password) ? 'met' : 'unmet'
            ul.appendChild(li)
        })
    })

    form.addEventListener('submit', (event) => {
        event.preventDefault()

        // if (!form.checkValidity()) {
        //     form.reportValidity();
        //     return;
        // }

        const data = new FormData(form);
        const email = data.get('correo')
        const password = data.get('pin')

        login(email, password)
    })
})


const login = (email, password) => {
    if (email === 'admin@example.com' && password === '123456') {
        alert('Login exitoso')
    } else {
        alert('Login fallido')
    }
}