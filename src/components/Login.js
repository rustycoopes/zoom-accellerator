import { GoogleLogin } from 'react-google-login';


const clientId = process.env.GOOGLE_LOGIN_CLIENT_ID || "471520477628-8bvcn7rj40su8gu7sk92sv1nfugibprf.apps.googleusercontent.com"

function Login({onSuccess, onFailure}) {
    const responseGoogleSuccess = (response) => {
        console.log('[Login Success] ',response.profileObj);
        const name = response.profileObj.name;
        const email = response.profileObj.email;
        const img = response.profileObj.imageUrl;
        const accountid=response.profileObj.googleId
        onSuccess({name, email, img, accountid})
        //.name
        //.email
        //imageUrl
      }
      const responseGoogleFail = (response) => {
         console.log('[Login Fail] ',response);
        if(response.error === "idpiframe_initialization_failed")
            onFailure('Cookies not enabled.  Add accounts.google.com as an entry to the allowed domains in chrome://settings/content/cookies.', 'https://developers.google.com/identity/sign-in/web/troubleshooting#third-party_cookies_and_data_blocked')
        else     
            onFailure(response.error, '')
              //https://developers.google.com/identity/sign-in/web/troubleshooting#third-party_cookies_and_data_blocked
        }//Sites that can
    return( 
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFail}
                cookiePolicy={'single_host_origin'}
                className="btn"
                isSignedIn={true}
            />,
    </div>
    )
}
// client id = 471520477628-8bvcn7rj40su8gu7sk92sv1nfugibprf.apps.googleusercontent.com
// client secret = 9Z58tAzq32jkxi0rVOFXFfzf
export default Login

