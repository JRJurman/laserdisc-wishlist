import React, { Component } from 'react';

class FacebookAuth extends Component {
  componentWillReceiveProps(nextProps) {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : 220266361753640,
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
      });

      var js, fjs = document.getElementsByTagName('script')[0];
      if (document.getElementById('facebook-jssdk')) {return;}
      js = document.createElement('script'); js.id = 'facebook-jssdk';
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);

      window.FB.getLoginStatus(function(response) {
        nextProps.onFacebookStatusChange(response);
      });
    }
  }

  render() {
    return (
      <span />
    );
  }
}

export default FacebookAuth;
