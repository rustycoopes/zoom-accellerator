


import { GoogleLogout } from 'react-google-login';

const clientId = process.env.GOOGLE_LOGIN_CLIENT_ID || "471520477628-8bvcn7rj40su8gu7sk92sv1nfugibprf.apps.googleusercontent.com"

function Logout({onSuccess}) {
    const responseGoogleSuccessLogout = () => {
        console.log('logout clicked')
        onSuccess()
      }

      return( 
            <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={responseGoogleSuccessLogout} ></GoogleLogout>
    )
}

export default Logout

