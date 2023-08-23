import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    );
}



//https://www.npmjs.com/package/@react-oauth/google?activeTab=readme

