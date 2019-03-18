import React from 'react'
import '../Css/PageInformations.css';
import Header from './Header'
//Firebase
import base from '../base'

class PageInformations extends React.Component {
    state = {
        feedbacks: {},
        employés: {},
    }

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
    
      aLePlusAidé = () => {
        const tableau = Object
        .keys(this.state.employés)
        .map(key => this.state.employés[key].tokens)
        tableau.sort(function(a, b){return b-a})
        const number = tableau[0]
        let personne
        Object
        .keys(this.state.employés)
        .map(key => this.state.employés[key].tokens === number ? (personne = this.state.employés[key].nom) : 0)
        return (<p className='text-podium'>{personne}</p>)
      }

      quiEstLeplusAidé = () => {
        const tableau = Object
        .keys(this.state.employés)
        .map(key => this.state.employés[key].aidé)
        tableau.sort(function(a, b){return b-a})
        const number = tableau[0]
        let personne
        Object
        .keys(this.state.employés)
        .map(key => this.state.employés[key].aidé === number ? (personne = this.state.employés[key].nom) : 0)
        return (<p className='text-podium'>{personne}</p>)
      }

      quiEstLePlusAutonome = () => {
        const tableau = Object
        .keys(this.state.employés)
        .map(key => this.state.employés[key].aidé)
        tableau.sort(function(a, b){return b-a})
        tableau.reverse()

        const number = tableau[0]
        let personne
        Object
        .keys(this.state.employés)
        .map(key => this.state.employés[key].aidé === number ? (personne = this.state.employés[key].nom) : 0)
        return (<p className='text-podium'>{personne}</p>)
      }

    render () {
        const tableau = Object
        .keys(this.state.employés)
        .map(key => (
            <tr key={key}>
                <td value={this.state.employés[key].nom}>{this.state.employés[key].nom}</td>
                <td value={this.state.employés[key].tokens}>{this.state.employés[key].tokens}</td>
            </tr>
        ))

        const feedbacks = Object
        .keys(this.state.feedbacks)
        .slice(0).reverse().map(key => (
            <tr key={key}>
                <td  value={this.state.feedbacks[key].dequi}>{this.state.feedbacks[key].dequi}</td>
                <td  value={this.state.feedbacks[key].pourqui}>{this.state.feedbacks[key].pourqui}</td>
                <td  value={this.state.feedbacks[key].description}>{this.state.feedbacks[key].description}</td>
                <td  value={this.state.feedbacks[key].tokens}>{this.state.feedbacks[key].tokens}</td>
            </tr>
        ))
        return (
            <div className="App">
                <Header/>
                <div className='row'>
                    <div className='column'>
                        <div className="col-sm-6">
                            <div className='classement'>
                                <h3 className='titre-categorie'>Classement :</h3>
                                <table id="customers">
                                    <tr>
                                        <th>Nom</th>
                                        <th>Total Tokens</th>
                                    </tr>
                                    { tableau }
                                </table>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className='stats'>
                            <h3 className='titre-categorie'>Stats :</h3>
                            <div className='informations-catégorie'>
                                <ul>La personne qui a le plus aidé : {this.aLePlusAidé()}</ul>
                                <ul>La personne qui a été le plus aidé : {this.quiEstLeplusAidé()}</ul>
                                <ul>La personne la plus autonome : {this.quiEstLePlusAutonome()}</ul>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className='histo-feedback'>
                        <h3 className='titre-categorie'>Historique :</h3>
                        <table id="customers">
                                <tr>
                                    <th>De</th>
                                    <th>Pour</th>
                                    <th>Description</th>
                                    <th>Tokens gagnés</th>
                                </tr>
                                { feedbacks }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageInformations