import React from 'react';
import { ShowIfLoggedIn } from '../../business/LoginManager';
import { signOut } from '../../data/FirebaseHandler';
import ConfirmationPage from '../../components/Confirmation';
import { SafeAreaView } from 'react-native';
import { global_style } from '../../constants/style';


const Logout = ({ navigation }) => {

    return (
        <ShowIfLoggedIn pageSupplier={
            (user) => {
                var message = ""
                signOut().then((value) => message = value)
                console.log(message)
                //This message is currently not displayed because as soon as the user is logged out
                //The page will be re-rendered and the orElse case will be displayed
                //return(<ConfirmationPage message={message} />)
            }
            } orElse={
                <SafeAreaView style={global_style.container}>
                    <ConfirmationPage message="You are currently signed out, would you like to sign in?" 
                    buttonText='Go to Login'
                    buttonAction={() => navigation.navigate('Restaurant Portal')}/>
                </SafeAreaView>
            } />
    )
}

export default Logout