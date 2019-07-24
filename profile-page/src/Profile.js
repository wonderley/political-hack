import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fecData: [],
      repData: {
        name:"David Perdue",
        address: [
          {"line1":"United States Senate","line2":"383 Russell Senate Office Building","line3":"","city":"Washington","state":"DC","zip":"20510"},
          {"line1":"191 Peachtree Street NE","line2":"Suite 3250","line3":"","city":"Atlanta","state":"GA","zip":"30303"}
        ],
        party:"Republican Party",
        phones:["(202) 224-3521"],
        urls:["http://www.perdue.senate.gov/"],
        photoUrl:"http://bioguide.congress.gov/bioguide/photo/P/P000612.jpg",
        channels:[
          {"type":"Facebook","id":"SenatorDavidPerdue"},
          {"type":"Twitter","id":"sendavidperdue"},
          {"type":"YouTube","id":"UCXHsrkPP4TAm0s0qB1C31Lw"}
        ]
      },
      error: '',
      // isLoading: false,
    };
  }
  componentDidMount() {
    this.fetchRepData();
  }
  render() {
    const data = JSON.stringify(this.state.fecData[0]);
    return (
        <div>Profile page! {data}</div>
    );
  }
  fetchRepData() {
    //this.setState({ isLoading: true });
    const url = encodeURI(`/candidatesForName/David Perdue`);
    const that = this;
    fetch(url)
      .then(response => {
        debugger;
        if (response.status !== 200) {
          throw new Error(`Request for url ${url} failed with status ${response.status}.`);
        }
        return response.json();
      })
      .then(res => {
        debugger;
        console.log(`URL ${url} fetched successfully`);
        if (!res || !res.results || !res.results[0]) {
          throw new Error('No data was found');
        }
        this.setState({ fecData: res.results });
        // that.setState({
        //   reps,
        //   error: '',
        //   isLoading: false
        // });
      })
      .catch(err => {
        debugger;
        console.error(err.toString());
        // that.setState({
        //   error: 'No reps were found for that address. Make sure you enter a full address including city and zip code.',
        //   isLoading: false
        // });
      });
  }
}

export default Profile;