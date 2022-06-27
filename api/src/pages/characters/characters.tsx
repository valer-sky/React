import React from "react";
import IceandfireApi from "../../servises/iceandfire";
import { Characters } from "../../types/characters";
type TProps = any;
type TState = {
  characters: [] | Characters[];
  isLoading: boolean;
  isError: boolean;
  page: number;
  pageSize: number;
};
export default class Character extends React.Component<TProps, TState> {
  state = {
    characters: [],
    isLoading: false,
    isError: false,
    page: 1,
    pageSize: 10
  };

  getCharacters = () => {
    const { page, pageSize } = this.state;
    this.setState({ isLoading: true });
    IceandfireApi.getCharacters(page, pageSize)
      .then((res: Characters[]) => {
        this.setState({ characters: res, isLoading: false });
      })
      .catch((e: any) => {
        this.setState({ isLoading: false, isError: true });
      });
  };
  componentDidMount() {
    this.getCharacters();
  }

  handlerPage = (type: "left" | "right") => {
    if (type === "left" && this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    } else {
      this.setState({ page: this.state.page + 1 });
    }
    this.getCharacters();
  };
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  render() {
    console.log(this.state);
    const { characters, isLoading, isError } = this.state;
    return (
      <div className="characters">
        {isError && "Error"}
        {isLoading && "Loading"}
        {characters &&
          !isError &&
          !isLoading &&
          this.state.characters.map((el: Characters) => (
            <div key={el.name}>
              {el.name} {el.died}
            </div>
          ))}
        {characters && !isError && (
          <div className="characters-nav">
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