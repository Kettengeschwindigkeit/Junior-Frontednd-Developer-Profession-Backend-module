console.log('Hello from app.js')

document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    } else if (event.target.dataset.type === 'update') {
        const id = event.target.dataset.id
        const title = prompt('Введите новое название')

        if (title !== null) {
            update(id, title).then(() => {
                event.target.closest('li').firstElementChild.innerText = title
            })
        }
    }
})

async function remove(id) {
    await fetch(`/${id}`, { method: 'DELETE' })
}

async function update(id, title) {
    await fetch(`/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title }) })
}
