import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDZJd5uin0GwkuJ8ColdRmOn1PxE8fKc2E",
    authDomain: "feedback-app-fca95.firebaseapp.com",
    databaseURL: "https://feedback-app-fca95.firebaseio.com",
})

const base = Rebase.createClass(firebase.database())

export { firebaseApp }

export default base