import { Component } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
// import { toast } from 'react-toastify';
import { Header, Form, Button, Input, ButtonLabel } from './Searchbar.styled';
export class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleSearchNameChange = event => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchName.trim() === '') {
      return alert('Wow so easy!');
    }
    this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button>
            <ButtonLabel>
              <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
              />
            </ButtonLabel>
          </Button>

          <Input
            type="text"
            name="searchName"
            value={this.state.searchName}
            onChange={this.handleSearchNameChange}
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}
