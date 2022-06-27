import React from "react";
import IceandfireApi from "../../servises/iceandfire";
import { Book } from "../../types/books";
type TProps = any;
type TState = {
  books: [] | Book[];
  isLoading: boolean;
  isError: boolean;
  page: number;
  pageSize: number;
};
export default class Books extends React.Component<TProps, TState> {
  state = {
    books: [],
    isLoading: false,
    isError: false,
    page: 1,
    pageSize: 5
  };

  getBooks = () => {
    const { page, pageSize } = this.state;
    this.setState({ isLoading: true });
    IceandfireApi.getBooks(page, pageSize)
      .then((res: Book[]) => {
        this.setState({ books: res, isLoading: false });
      })
      .catch((e: any) => {
        this.setState({ isLoading: false, isError: true });
      });
  };
  componentDidMount() {
    this.getBooks();
  }

  handlerPage = (type: "left" | "right") => {
    if (type === "left" && this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    } else {
      this.setState({ page: this.state.page + 1 });
    }
    this.getBooks();
  };
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  render() {
    console.log(this.state);
    const { books, isLoading, isError } = this.state;
    return (
      <div className="books">
        {isError && "Error"}
        {isLoading && "Loading"}
        {books &&
          !isError &&
          !isLoading &&
          this.state.books.map((el: Book) => (
            <div key={el.isbn}>
              {el.name} {el.country}
            </div>
          ))}
        {books && !isError && (
          <div className="books-nav">
            <button
              disabled={this.state.page === 1}
              onClick={(_e: any) => this.handlerPage("left")}
            >
              left
            </button>
            <button onClick={(_e: any) => this.handlerPage("right")}>
              right
            </button>
          </div>
        )}
      </div>
    );
  }
}