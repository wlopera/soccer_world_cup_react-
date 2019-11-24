import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      cups: [],
      show: false,
      year: '',
      winners: '',
      message: ''
    });
    this.changeYear = this.changeYear.bind(this);
    this.changeWinners = this.changeWinners.bind(this);
    this.getCups = this.getCups.bind(this);
    this.getCupsByYear = this.getCupsByYear.bind(this);
    this.getCupsByWinners = this.getCupsByWinners.bind(this);
  }
  componentWillMount() {
    this.getCups();
  }

  getCups() {
    fetch('http://localhost:8080/wordlcup/cups')
      .then(result => {
        console.log("Resultado de la consulta: ", result);
        return result.json();
      })
      .then(scores => {
        console.log("Copas: ", scores);
        this.setState({
          cups: scores,
          year: '',
          winners: '',
          show: true,
          message: 'Copas Mundiales'
        });
      })
  }

  getCupsByYear() {
    fetch('http://localhost:8080/wordlcup/cupsYear/' + this.state.year)
      .then(result => {
        console.log("Campeon del año: ", result);
        return result.json();
      })
      .then(score => {
        console.log("Copa: ", score);
        this.setState({
          cups: [
            score
          ],
          year: '',
          winners: '',
          show: true,
          message: 'Campeón del año: ' + this.state.year
        });
      })
  }

  getCupsByWinners() {
    fetch('http://localhost:8080/wordlcup/cupsWinner/' + this.state.winners)
      .then(result => {
        console.log("Campeones 1 o mas copas: ", result);
        return result.json();
      })
      .then(scores => {
        console.log("Copas: ", scores);
        this.setState({
          cups: scores,
          year: '',
          winners: '',
          show: true,
          message: 'Ganadores de : ' + this.state.winners + ' copas'
        });
      })
  }

  changeYear(event) {
    this.setState({
      year: event.target.value
    })
  }

  changeWinners(event) {
    this.setState({
      winners: event.target.value
    })
  }

  render() {
    if (this.state.show) {
      return this.showCups();
    } else {
      return (<div>Consultando datos...</div>)
    }
  }

  showCups() {
    return (
      <div>
        <h3>COPAS MUNDIALES DE FUTBOL</h3>
        <hr />
        <p>Todos los campeonatos:
          <button onClick={this.getCups}>Buscar</button>
        </p>
        <p>Campeón del año:
          <input type="text" value={this.state.year} onChange={this.changeYear} />
          <button onClick={this.getCupsByYear}>Buscar</button>
        </p>
        <p>Cantidad de campeonatos ganados:
          <input type="text" value={this.state.winners} onChange={this.changeWinners} />
          <button onClick={this.getCupsByWinners}>Buscar</button>
        </p>
        <hr />
        <h4>{this.state.message}</h4>
        <table border="1">
          <thead>
            <tr>
              <td>AÑO</td>
              <td>CAMPEON</td>
              <td></td>
              <td>SUB-CAMPEON</td>
              <td>SEDE</td>
            </tr>
          </thead>
          <tbody>
            {this.state.cups.map(cup => {
              return (
                <tr key={cup.year}>
                  <td>{cup.year}</td>
                  <td>{cup.champion}</td>
                  <td>{cup.score}</td>
                  <td>{cup.subChampion}</td>
                  <td>{cup.headquarter}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

}

export default App;