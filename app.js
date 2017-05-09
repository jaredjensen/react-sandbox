const Card = (props) => {
    return (
        <div className="card">
            <img width="75" src={props.avatar_url} />
            <div className="card-info">
                <div className="card-name">{props.name}</div>
                <div className="card-company">{props.company}</div>
            </div>
        </div>
    );
};

const CardList = (props) => {
    return (
        <div>
            {props.cards.map(card => <Card key={card.id} {...card} />)}
        </div>
    );
};

class Form extends React.Component {
    state = { userName: "" };

    handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`https://api.github.com/users/${this.state.userName}`)
            .then(resp => {
                this.props.onSubmit(resp.data);
            });
        this.setState({ userName: '' });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Github username" required
                    value={this.state.userName}
                    onChange={(event) => this.setState({ userName: event.target.value })} />
                <button type="submit">Add Card</button>
            </form>
        );
    }
}

class App extends React.Component {
    state = {
        cards: [{
            name: "Jared Jensen",
            company: "Avanade",
            avatar_url: "https://avatars0.githubusercontent.com/u/2508197?v=3"
        }, {
            name: "Paul O'Shannessy",
            company: "Facebook",
            avatar_url: "https://avatars0.githubusercontent.com/u/8445?v=3"
        }]
    };

    addNewCard = (card) => {
        this.setState(prevState => ({
            cards: prevState.cards.concat(card)
        }));
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.addNewCard} />
                <CardList cards={this.state.cards} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));