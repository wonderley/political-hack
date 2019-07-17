import React from 'react';
import './App.css';
import Reps from './Reps';

class App extends React.Component {
  constructor(props) {
    super(props);
    const address = '3423 Piedmont Rd NE, Atlanta, GA 30305';
    this.state = {
      address,
      reps: [],
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
       address: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ reps: [] });
    this.fetchReps();
  }

  componentDidMount() {
    this.fetchReps();
  }

  render() {
    let content;
    if (this.state.error) {
      content = (
        <div>
          {this.state.error}
        </div>
      );
    } else {
      content = (
        <Reps reps={this.state.reps}/>
      );
    }
    return (
      <div className="App">
        <h1>Representatives at
          <form onSubmit={this.handleSubmit}>
            <input type="text"
                   onChange={this.handleChange}
                   defaultValue={this.state.address}
                   style={{'line-height': '4em'}}/>
          </form>
        </h1>
        {content}
      </div>
    );
  }

  fetchReps() {
    debugger;
    const repsForAddressUrl = encodeURI(`/beta/repsForAddress/${this.state.address}`);
    const that = this;
    fetch(repsForAddressUrl)
    .then(response => {
      debugger;
      if (response.status !== 200) {
        throw new Error(`Request for url ${repsForAddressUrl} failed with status ${response.status}.`);
      }
      return response.json();
    })
    .then(res => {
      debugger;
      console.log(`URL ${repsForAddressUrl} fetched successfully`);
      const reps = res.data.officials;
      // Assign office names to the appropriate reps
      res.data.offices.forEach(office => {
        office.officialIndices.forEach(officialIdx => {
          reps[officialIdx] = {
            ...reps[officialIdx],
            officeName: office.name,
          }
        }); 
      });
      that.setState({ reps, error: '' });
    })
    .catch(err => {
      console.error(err.toString());
      that.setState({ error: 'No reps were found for that address. Make sure you enter a full address including city and zip code.' });
    });
  }
}

export default App;