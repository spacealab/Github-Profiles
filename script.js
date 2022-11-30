const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')


async function getUser(USERNAME) {

    try {
        const {data} = await axios(APIURL + USERNAME)

        createUserCard(data);
        getRepos(USERNAME)
    } catch(err) {
        if(err.response.status == 404) {
            createErrorCard('No profile with this username')
        }
    }

}

async function getRepos(USERNAME) {
    try {
        const {data} = await axios(APIURL + USERNAME + '/repos?sort=created')

        addReposToCard(data);

    } catch(err) {
            createErrorCard('Problem fetching repos')
    }
}

function createErrorCard(msg) {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `

    main.innerHTML = cardHTML
}

function createUserCard(user) {
    const cardHTML = `
    <div class="card">
        <div>
            <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        </div>
        <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul>
                    <li>${user.followers} <strong>followers</strong></li>
                    <li>${user.following} <strong>following</strong></li>
                    <li>${user.public_repos} <strong>Repos</strong></li>

                </ul>

                <div id="repos"></div>
        </div>
    </div>
    `
    main.innerHTML = cardHTML

}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')


    repos
        .slice(0, 5)
        .forEach(repo => {
            const repoEl = document.createElement('a')

            reposEl.classList.add('repos')
            reposEl.href = repos.html_url
            reposEl.target = '_blank'
            reposEl.innerText = repo.name
        
            reposEl.appendChild(repoEl)
        })

}

form.addEventListener('submit', (e) => {
    e.preventDefault()

        const user = search.value

        if(user) {
            getUser(user)

            search.value = ''
        }
})