document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    } else if (event.target.dataset.type === 'update') {
        const id = event.target.dataset.id
        const value = event.target.closest('li').firstElementChild.innerText

        getById(id)
            .then(() => {
                event.target.closest('li').innerHTML = `
                <input type="text" value="${value}">
                <div>
                    <button class="btn btn-success" data-type="save" data-id="${id}">Сохранить</button>
                    <button class="btn btn-danger" data-type="cancel" data-id="${id}">Отменить</button>
                </div>
        `
            })
    } else if (event.target.dataset.type === 'save') {
        const id = event.target.dataset.id
        const title = event.target.closest('li').firstElementChild.value

        if (title !== null) {
            update(id, title).then(() => {
                event.target.closest('li').innerHTML = `
                <span data-type="title">${title}</span>
                <div>
                    <button class="btn btn-primary" data-type="update" data-id="${id}">Обновить</button>
                    <button class="btn btn-danger" data-type="remove" data-id="${id}">&times;</button>
                </div>
        `
            })
        }
    } else if (event.target.dataset.type === 'cancel') {
        const id = event.target.dataset.id
        const title = event.target.closest('li').firstElementChild.value
        const value = ''

        update(id, value).then(() => {
            event.target.closest('li').innerHTML = `
            <span data-type="title">${title}</span>
            <div>
                <button class="btn btn-primary" data-type="update" data-id="${id}">Обновить</button>
                <button class="btn btn-danger" data-type="remove" data-id="${id}">&times;</button>
            </div>
    `
        })
    }
})

async function getById(id) {
    await fetch(`/${id}`, { method: 'GET' })
}

async function remove(id) {
    await fetch(`/${id}`, { method: 'DELETE' })
}

async function update(id, title) {
    await fetch(`/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title }) })
}
