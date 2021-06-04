console.log('helloo-main');
const socket = io('http://localhost:3000')

// socket.on('connected')
// socket.on('user-joined')

const form = document.getElementById('send-form')
const msgInput = document.getElementById('msgInput')
const msgContainer = document.querySelector('.container')

const msgAppend = (message, position) => {
    const msgElement = document.createElement('div')
    msgElement.innerText = message; // here, message mean param of func.
    msgElement.classList.add('message') //here, message mean css class
    msgElement.classList.add(position) //here, message mean position param offunc   
    msgContainer.append(msgElement)
}

const names = prompt('Enter Name')
socket.emit('new-user-joined', names)

socket.on('user-joined', (userName) => {
    msgAppend(`${userName} joined the chat`, 'center')
})

socket.on('received', (data) => {
    msgAppend(`${data.user} :  ${data.message} `, 'left')
})

socket.on('leave', (LeftUser) => {
    msgAppend(`${LeftUser} leave the chat`, 'center')
})


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const msg = msgInput.value;
    msgAppend(`You:${msg}`, 'right')
    socket.emit('send', msg)
    msgInput.value = ''

})