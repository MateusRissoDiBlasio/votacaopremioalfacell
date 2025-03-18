import {Component} from 'react';
import './App.css';
import './responsive.css'
import Chart from 'react-apexcharts'
import { Ananias, Joao, Thiago } from './svg/trofeu';
  
class Donut extends Component {

	constructor(props) {
	super(props);
  
	this.state = {
		options: {
			chart: {
				type: 'donut'
				},
			labels: ['Ananias Klein', 'João Marcos', 'Thiago Barba'],
			colors:['#FF4560','#F9C80E','#03a9f4' ],
			legend: { 
				labels: {
					useSeriesColors:true
				}
			},
			plotOptions:{
				pie:{
					donut:{
						labels:{
							show: true,
							value:{color:'#FFFFFF'}
							
						}
					}
				}
			},
			dataLabels:{
					enabled: true,
					show: true

				},
			
		},
		// eslint-disable-next-line react/prop-types
		series: [this.props.series[0],this.props.series[1],this.props.series[2]]
		
			
	}
	
	}
	
	render() {
  
	return (
		<div className="donut">
       <Chart options={this.state.options} series={this.state.series} type="donut" width="380" />
		</div>
		
  );
	}
  }

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			languages : [
				{name: "Ananias Klein", votes: 0},
				{name: "João Marcos", votes: 0},
				{name: "Thiago Barba", votes: 0}
			],
			count : 0,
			candidato1: 0,
			candidato2: 0,
			candidato3: 0,
			votoscandidato1: 0,
			votoscandidato2: 0,
			votoscandidato3: 0,
			result: false,
			vencedor: false,
			audio: ''
		}
		console.log(this.state.result)
	}

	

	increment(){
		
		this.setState({ count: this.state.count + 1});
	
	}
	
	handleClickAudio = () => {
		const audio = new Audio("imgs/urna.mp3")
		audio.play();
		setTimeout(() => { alert('Voto computado com sucesso'); 

		}, 800);
	}  

	// votoRecebido(){
		
		
		
	// }
	
	vote (i) {
		let newLanguages = [...this.state.languages];
		newLanguages[i].votes++;
		// eslint-disable-next-line no-unused-vars
		function swap(array, i, j) {
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		this.setState({languages: newLanguages});
		this.votosPie();
		this.increment();
		this.percentual();
		this.handleClickAudio();
		// this.votoRecebido();
		

	
    console.log(newLanguages);
    // console.log(languages);
    
    const apuracaoTotal = (newLanguages[0].votes + newLanguages[1].votes + newLanguages[2].votes);
	console.log(apuracaoTotal);

	const percentualCandidato1 = (newLanguages[0].votes / (this.state.count+1))*100
	console.log(percentualCandidato1)

	const percentualCandidato2 = (newLanguages[1].votes / (this.state.count+1))*100
	console.log(percentualCandidato2)

	const percentualCandidato3 = (newLanguages[2].votes / (this.state.count+1))*100
	console.log(percentualCandidato3)
	
	}

	votosPie()	{
		this.setState({ votoscandidato1: (this.state.languages[0].votes)});
		this.setState({ votoscandidato2: (this.state.languages[1].votes)});
		this.setState({ votoscandidato3: (this.state.languages[2].votes)});
		
			console.log(this.state.votoscandidato1)
			console.log(this.state.votoscandidato2)
			console.log(this.state.votoscandidato3)
	}


	percentual(){
		
		this.setState({ candidato1: (this.state.languages[0].votes / (this.state.count+1))*100});
		this.setState({ candidato2: (this.state.languages[1].votes / (this.state.count+1))*100});
		this.setState({ candidato3: (this.state.languages[2].votes / (this.state.count+1))*100});
		
	}

	handleClick = () => {
		this.setState(prevState => ({
      result: !prevState.result
		}));
	}

	vencedorClick = () => {
		this.setState(prevState => ({
			vencedor: !prevState.result
    }))
 
      window.scrollTo({ 
			top: 0,  
			behavior: 'smooth'
		});  
	}

	render(){
		return(
			<>
				<div id='base'>
					<video autoPlay loop id='backgroundVideo'>
						<source src='imgs/backgroundvideo.mp4' type='video/mp4' />
					</video>
					
					<h1>Prêmio ALFACELL!</h1>
					<img id='pilha' src='imgs/pilha.png' alt='pilha'></img>
					<div className="candidatos">
						{
						this.state.languages.map((lang, i) => 
							<div key={i} className="language">
							
							{/* <div className="voteCount">
										<h3> VOTOS </h3>
										{lang.votes}
							</div> */}
							
								<div onClick={this.vote.bind(this, i)} className="candidato">
											<img key={i} src={`imgs/${lang.name}.png`} alt={`${lang.name}`}></img>
											<h4>{lang.name}</h4>

								</div>
								<button onClick={this.vote.bind(this, i)}>Vote aqui</button>
								
											
							</div>
			
					)}
						<div className='resultados'>
							<button id='parcial' onClick={this.handleClick}>Resultado Parcial</button>
							


							
								{/* <div className='parcial'>
											
									<h3>{this.state.count}</h3>

									<h6>{this.state.languages[0].name} - {this.state.candidato1.toFixed(1)} %</h6>
									<h6>{this.state.languages[1].name} - {this.state.candidato2.toFixed(1)} %</h6>
									<h6>{this.state.languages[2].name} - {this.state.candidato3.toFixed(1)} %</h6>
									

								</div> */}
								{this.state.result ? <Donut series={[this.state.votoscandidato1, this.state.votoscandidato2, this.state.votoscandidato3]} /> : ''}
								{this.state.result ? '' : <div className='emptyMarker'> </div>}
								{this.state.result ? '' : <button id='vencedor' onClick={this.vencedorClick}>Vencedor</button>}
								{!this.state.vencedor ? '' : <div id='trofeu-vencedor'>

									<div className='showvencedor'>
										<div className='winnerbackground'>
											<video autoPlay loop id='trophybackground'>
												<source src='imgs/trophybackground.mp4' type='video/mp4' />
											</video>
										</div>	
										<div className='trofeu'>
											{ (this.state.votoscandidato1 > this.state.votoscandidato2) && (this.state.votoscandidato1 > this.state.votoscandidato3) ? 
											<div className='candidato1vencedor'><Ananias /> <img src='imgs/ananias-winner.png' alt='Ananias Vencedor'></img> </div> : ''}
											{ (this.state.votoscandidato2 > this.state.votoscandidato1) && (this.state.votoscandidato2 > this.state.votoscandidato3) ?
											<div className='candidato2vencedor'><Joao /> <img src='imgs/João Marcos.png' alt='Ananias Vencedor'></img> </div> : ''}
											{ (this.state.votoscandidato3 > this.state.votoscandidato1) && (this.state.votoscandidato3 > this.state.votoscandidato2) ? 
											<div className='candidato3vencedor'><Thiago /> <img src='imgs/barba-winner.png' alt='Ananias Vencedor'></img> </div> : ''}
										</div>	
									</div>

								</div> }


						</div>
					</div>
				</div>
				
				
        </>
	);
	}
}
export default App;

