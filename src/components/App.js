import React from "react";
import '../styles/index.css'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            repos: null,
        }
    }

    getUser(username) {
        return fetch(`https://api.github.com/users/${username}`)
            .then(response => response.json())
            .then(response => {
                return response
            })
    }

    getRepo(username) {
        return fetch(`https://api.github.com/users/${username}/repos`)
            .then(response => response.json())
            .then(response => {
                return response
            })
    }

    async handleSubmit(e) {
        e.preventDefault()

        const { value } = this.refs.username
        let user = await this.getUser(value)
        let repos = await this.getRepo(value)

        this.setState({
            user: {
                avatar_url: user.avatar_url,
                username: user.login,
            },
            repos,
        })
    }

    Repos(repos) {
        return repos.map(item => {
            return <div key={item.id} className="repoResults" href="#">
                <p>
                    {item.name}
                </p>
            </div>
        })
    }

    User(user) {
        return (
            <div className="resultBadge">
                <img src={user.avatar_url} height="150" />
                <p className="userInfo">
                    <strong>Username:</strong> <br />
                    {user.username}
                </p>
            </div>
        )
    }

    render() {
        const { user, repos } = this.state

        return (
            <div>
                <div className="card">
                    <header className="search">
                        <h1>Search Github Users </h1>
                    </header>
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <input ref='username' type='text' placeholder='username' required />
                    </form>
                    <div className="Search-intro">
                        <h4> User info: </h4>
                        {user && this.User(user)}
                    </div>
                    <div>
                        <h4>Repos: </h4>
                        {repos && this.Repos(repos)}
                    </div>
                </div>

            </div>
        )
    }
}

export default App;