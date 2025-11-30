import { Component } from "react";

class NewsList extends Component {
    state = {
        posts: [],
        isLoading: false,
        randomArticle: {
            title: "",
            author: "",
            url: ""
        }
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        const randomId = Math.floor(Math.random() * 20) - 1
        const rresponse = await fetch(
            `http://hn.algolia.com/api/v1/items/${randomId}`
        ).then(data => data.json())
            .then((data) => {
                // console.log(data.title)
                this.setState({ randomArticle: data })
                // console.log(this.state.randomArticle)
            })
        const  presponse = await fetch(
            `https://hn.algolia.com/api/v1/search?tags=front_page`
        ).then(data => data.json())
        .then(data => {
            console.log(data.hits)
        })     
    }

    render() {
        // console.log(this.state.post)
        // const { posts, randomArticle, isLoading } = this.state
        // console.dir(randomArticle)
        return (
            <>
                <div>
                    <h2>Random Article</h2>
                    <h3>{this.state.randomArticle.title}</h3>
                    <p>Автор: {this.state.randomArticle.author}</p>
                    <a href={this.state.randomArticle.url}>перейти</a>
                </div>
                <div>
                    <h1>Hacker News</h1>
                    <ul>
                        <li>
                            <h3>title</h3>
                            <p>author</p>
                            <a href=""></a>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}

export default NewsList