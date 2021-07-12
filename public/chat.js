const socket = io()//dentro deberia ir el dominio al separar front de back

//DOM elements
let message = document.getElementById('message')
let username = document.getElementById('username')
let btn = document.getElementById('send')
let output = document.getElementById('output')
let actions = document.getElementById('actions')


btn.addEventListener('click', () => {
    console.log(`${
        {
            username: username.value,
            message: message.value
        }
    }`)

    socket.emit('chat:message',{
        username: username.value,
        message: message.value
    })
})

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', {username: username.value})
})

socket.on('chat:message', (data) => {
    actions.innerHTML = ''
    output.innerHTML += `<p> 
        <strong>${data.username}</strong>: ${data.message}
    </p>`
})

socket.on('chat:typing', (data) => {
    actions.innerHTML = `<p><em> ${data.username} is typing </em> </p>`
})