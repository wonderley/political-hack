import React from 'react';
import PropTypes from 'prop-types';

class Rep extends React.Component {
  render() {
    const repData = this.props.location.state;
    const { name, address, party, phones, urls,
            photoUrl, emails, channels, officeName } = repData;
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'horizontal',
        padding: '15px',
      }}>
        <img src={photoUrl} alt="" style={{
          'max-height': '400px',
          'max-width': '50%',
          paddingRight: '15px',
        }}/>
        <div style={{
          flexDirection: 'vertical',
        }}>
          <div>{`Name: ${name}`}</div>
          <div>{`Party: ${party || 'Unknown'}`}</div>
          <div>Props: {JSON.stringify(repData)}</div>
        </div>
      </div>
    );

    // const url = encodeURI(`/candidatesForName/${repData.name}`);
    // const that = this;
    // fetch(url)
    //   .then(response => {
    //     debugger;
    //     if (response.status !== 200) {
    //       throw new Error(`Request for url ${url} failed with status ${response.status}.`);
    //     }
    //     return response.json();
    //   })
    //   .then(res => {
    //     debugger;
    //     console.log(`URL ${url} fetched successfully`);
    //     if (!res || !res.results || !res.results[0]) {
    //       throw new Error('No data was found');
    //     }
    //     if (res.results.length > 1) {
    //       console.error('WARNING: Multiple matches were found. The first result will be used.');
    //     }

    //     // go to profile page with this data
    //     const profileProps = {
    //       fecData: res.results[0],
    //       repData,
    //     };
    //     console.log(JSON.stringify(profileProps));
    //   })
    //   .catch(err => {
    //     console.error(err.toString());
    //     const profileProps = {
    //       repData,
    //     };
    //     console.log(JSON.stringify(profileProps));
    //   });
  }
}

Rep.propTypes = {
  location: PropTypes.object,
};

export default Rep;