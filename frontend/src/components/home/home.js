import React from 'react';
import NavbarContainer from '../nav/navbar_container';
import './home.css'
import { Link } from 'react-router-dom';


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showUpdateForm: false,
            showWaterDone: false,
            _id: '',
            owner:'',
            plant:'',
            nickname:'',
            waterDate:'',
            date:'',
        };

        this.handleSubmit=this.handleSubmit.bind(this)
        
    }


    componentDidMount() {
        this.props.fetchCurrentUserGardenPlants();

    }

    handleClick(plantId) {
        this.props.deleteGardenPlant(plantId);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.updateGardenPlant({
            id: this.state._id,
            owner: this.state.owner,
            plant: this.state.plant,
            nickname: this.state.nickname,
            waterDate: this.state.waterDate,
            date: this.state.date,
        }).then(()=>this._restForm())
    }

    _restForm(){
        this.setState({
            showUpdateForm: false,
            showWaterDone: false,
            _id: '',
            owner:'',
            plant:'',
            nickname:'',
            waterDate:'',
            date:'',
        })
    }
    update(field){
        return e =>  this.setState({ [field]: e.currentTarget.value });
    }


   

    showUpdate(gardenPlant){
        let gardenPlantId
        if(gardenPlant._id === undefined){
            gardenPlantId = gardenPlant.id
        }else{
            gardenPlantId = gardenPlant._id
        }
       
        this.setState({
            showUpdateForm: true,
            showWaterDone: false,
            _id: gardenPlantId,
            owner: gardenPlant.owner,
            plant: gardenPlant.plant,
            nickname: gardenPlant.nickname,
            waterDate:gardenPlant.waterDate.slice(0,10),
            date: gardenPlant.date.slice(0,10),
        })
    }

    renderUpdateForm(gardenPlant){
        return(
            <div className = "render-update-form">
                <div className="update-garden-form-close" onClick={()=>this._restForm()}>x</div>
                <form onSubmit={this.handleSubmit}>
                    <label className = "nickname">Nickname
                        <input  type="text" value={this.state.nickname} onChange={this.update("nickname")} />
                    </label>
                    <label className="date">Date
                        <input  type="text" value={this.state.date} onChange={this.update("date")} />
                    </label>
                    <label className="waterdate">WaterDate
                        <input  type="text" value={this.state.waterDate} onChange={this.update("waterDate")} />
                    </label>
                    <input className="update-garden-form-submit" type="submit" value="Update" />
                </form>
            </div>
        )
    }

    renderPlantDetail(gardenPlant){
        const {plants} = this.props 
        for( let i=0;i< plants.length;i++){
            if(plants[i]._id === gardenPlant.plant){
                return(
                    <Link className = "picture-link" to={`/plants/${gardenPlant.plant}`}><img className="garden-plant-image" src={plants[i].photoUrls[0]}/></Link>
                )
            }
        }
    }

    handleWatering(myplant){
        let gardenPlant = myplant;
        const {plants} = this.props 
        let numberOfDaysToAdd;
        for( let i=0;i< plants.length;i++){
            if(plants[i]._id === gardenPlant.plant){ 
                numberOfDaysToAdd = plants[i].waterFrequency
            }
        }
        var newWaterDate = new Date();
        newWaterDate.setDate(newWaterDate.getDate() + numberOfDaysToAdd);
        let month = '' + (newWaterDate.getMonth() + 1);
        let day = '' + newWaterDate.getDate();
        let year = newWaterDate.getFullYear();

            if (month.length < 2){
                month = '0' + month;
            }
            if (day.length < 2) {
                day = '0' + day;
            }

        let gardenPlantId
        if(gardenPlant._id === undefined){
            gardenPlantId = gardenPlant.id
        }else{
            gardenPlantId = gardenPlant._id
        }
        
        this.setState({
            showUpdateForm:false,
            showWaterDone: true,
            _id: gardenPlantId,
            owner: gardenPlant.owner,
            plant: gardenPlant.plant,
            nickname: gardenPlant.nickname,
            waterDate: `${year}-${month}-${day}`,
            date: gardenPlant.date,
        })

    }

    renderWaterDone(){
        return(
            <div className="water-done-form" >
                
                Thank you for watering your plant!  <br />  <br />  <br />
                <button className = "anytime" onClick={this.handleSubmit}>Anytime!</button>
            </div>
        )
    }
    

    render() {
        const { plants, gardenPlants } = this.props;
        var today = new Date();
        var days = 0;
        return (
            <div>
                <div className="navbar-container">
                    <NavbarContainer/>
                </div>
                <div className = "home-page-container">
                
                

                <ul className = "plantList">
                    {gardenPlants.map((plant, idx) => {
                        return (
                            <li className = "individual-sprout" key={idx}>
                            
                                <div className="plantName2"> {plant.nickname} </div> 
                                Days alive: {(days = Math.round(Math.ceil(new Date() - new Date(plant.date.split("T")[0])) / (1000 * 60 * 60 * 24)))} <br />
                                {Math.round(Math.ceil(new Date() - new Date(plant.waterDate.split("T")[0])) / (1000 * 60 * 60 * 24)) >= 1 ? <img className="watering-can" src="https://sprout-app.s3.us-east-2.amazonaws.com/watering-can.png" onClick={()=> this.handleWatering(plant)}/> : <div></div>}                            
                                {days < 3 ? <img className="sprout-image" src="https://sprout-app.s3.us-east-2.amazonaws.com/plant-10.png" /> : (days < 6 ? <img className="sprout-image" src="https://sprout-app.s3.us-east-2.amazonaws.com/plant-20.png" /> : (days < 9 ? <img className="sprout-image" src="https://sprout-app.s3.us-east-2.amazonaws.com/plant-3.png" /> : (days < 12 ? <img className="sprout-image" src="https://sprout-app.s3.us-east-2.amazonaws.com/plant-4.png" /> : <img className="sprout-image" src="https://sprout-app.s3.us-east-2.amazonaws.com/plant-5.png" />)))}
                                <br/>
                                {this.renderPlantDetail(plant)}
                                <button className = "update-button" onClick={()=>this.showUpdate(plant)}>update</button>

                                <button className = "delete-button" onClick={() => {this.handleClick(plant._id || plant.id)}}>Delete</button>                           
                                {(this.state.showUpdateForm && (this.state._id === plant._id || this.state._id === plant.id)) ? this.renderUpdateForm(plant) : null}
                            </li>
                        );
                    })}
                </ul>
                </div>
                {this.state.showWaterDone? this.renderWaterDone() : null }
            </div>
        )
    }
}


export default Home;

