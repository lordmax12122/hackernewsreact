import { Component } from "react";

class NewsList extends Component {
  state = {
    randomArticle: null,
    posts: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const randomId = Math.floor(Math.random() * 1000);
      const randomResponse = await fetch(
        `https://hn.algolia.com/api/v1/items/${randomId}`
      );
      const randomData = await randomResponse.json();

      const postsResponse = await fetch(
        "https://hn.algolia.com/api/v1/search?tags=front_page"
      );
      const postsData = await postsResponse.json();

      this.setState({
        randomArticle: randomData,
        posts: postsData.hits,
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { randomArticle, posts, isLoading } = this.state;

    if (isLoading) {
      return <p>Завантаження...</p>;
    }

    return (
      <>
        {randomArticle && (
          <div>
            <h2>Random Article</h2>
            <h3>{randomArticle.title}</h3>
            <p>Автор: {randomArticle.author}</p>
            {randomArticle.url && (
              <a href={randomArticle.url} target="_blank" rel="noreferrer">
                перейти
              </a>
            )}
          </div>
        )}
        <div>
          <h1>Hacker News</h1>

          <ul>
            {posts.map((post) => (
              <li key={post.objectID}>
                <h3>
                  <a
                    href={post.url || "#"}
                  >
                    {post.title}
                  </a>
                </h3>
                <p>Автор: {post.author}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default NewsList;
