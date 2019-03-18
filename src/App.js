import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';
import Header from './Components/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//Firebase
import base from './base'

class App extends Component {
    state= {
      feedbacks: {},
      employés: {},
      feedback: {
        dequi: '',
        pourqui: '',
        description: '',
        tokens: '',
      }
    }

    notifySend = () => toast.success( this.state.feedback.dequi + " vous avez gagné " + this.state.feedback.tokens + " tokens. Félicitations !");
    notifyError = () => toast.error('Le formulaire est incomplet. Veuillez renseigner les champs vides.');


    componentDidMount (){
      base.syncState('/feedbacks', {
        context: this,
        isArray: true,
        state: 'feedbacks',
      })
      base.syncState('/employés', {
        context: this,
        state: 'employés',
      })
    }
  

  handleClick = () =>{
    console.log("click")
  }

  handleChange = event => {
    const {name, value } = event.target
    const feedback = {...this.state.feedback}
    feedback[name] = value
    this.setState({ feedback })
  }

  handleSubmit = event => {
    event.preventDefault()
    const feedback = { ...this.state.feedback}
    if (feedback.dequi !== '' && feedback.pourqui !== '' && feedback.description !== '' && feedback.tokens !== '') {
      this.ajouterFeedback(feedback)
      this.notifySend()
      //reset
      Object.keys(feedback).forEach(item => {
        feedback[item] = ''
      })
      this.setState({ feedback })
    }
    else
      this.notifyError()
  }

  ajouterFeedback = feedback => {
    const feedbacks = {...this.state.feedbacks}
    const employés = {...this.state.employés}
    feedbacks['feedback-'+ Date.now()] = feedback
    Object
    .keys(employés)
    .map(key => (employés[key].nom === feedback.dequi ? (employés[key].tokens = parseFloat(employés[key].tokens) + parseFloat(feedback.tokens)) : employés[key].tokens))
    Object
    .keys(employés)
    .map(key => (employés[key].nom === feedback.pourqui ? (employés[key].aidé = parseFloat(employés[key].aidé) + parseFloat(feedback.tokens)) : employés[key].aidé))
    this.setState({ feedbacks, employés })

  }

  render() {
    const employés = Object
    .keys(this.state.employés)
    .map(key => (
      <option key={key} value={this.state.employés[key].nom}>{this.state.employés[key].nom}</option>
    ))

    return (
      <div className="App">
        <Header />
        <ToastContainer autoClose={3000} className='toastPopup'/>
        <div className='row'>
          <div className="col-sm-6">
            <form className='form' onSubmit={this.handleSubmit}>
            <p></p>
              <div className="field">
                <label>Vous :</label>
                <select name='dequi' onChange={this.handleChange} value={this.state.feedback.dequi}>
                  <option></option>
                  { employés }
                </select>
              </div>
              <div className="field">
                <label>La personne que vous avez aidé :</label>
                <select name='pourqui' onChange={this.handleChange} value={this.state.feedback.pourqui}>
                  <option></option>
                  { employés }
                </select>
              </div>
              <div className="field">
                <textarea value={this.state.feedback.description} placeholder='description de la tâche effectuée...' name='description' onChange={this.handleChange}></textarea>
              </div>
              <div className="field">
                <label>Temps passé :</label>
                  <div className='radio-form' name="tokens" onChange={this.handleChange}>
                  <div className='group-radio-form'>
                    <input type="radio" id="10min" name="tokens" value={1}/>
                    <label for="huey">10min</label>
                  </div>
                  <div className='group-radio-form'>
                    <input type="radio" id="30min" name="tokens" value={3}/>
                    <label for="dewey">30min</label>
                  </div>
                  <div className='group-radio-form'>
                    <input type="radio" id="1h" name="tokens" value={6}/>
                    <label for="louie">1h</label>
                  </div>
                  </div>
              </div>
              <div className="field">
                <button type='input'>Envoyer!</button>
              </div>
            </form>
          </div>
          <Link style={{ textDecoration: 'none' }} to={{ pathname: '/rank' }}>
            <div className="col-sm-6">
              <div className='case-continuer'>
                <h2 className='text-continuer'>Cliquer ici pour voir le classement du mois et l'historique des feedbacks</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default App;
