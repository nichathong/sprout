import React from 'react';
import NavbarContainer from '../nav/navbar_container';
import './home.css'


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showUpdateForm: false,
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
        console.log(this.props.gardenPlants);
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
        }).then(()=>this.setState({showUpdateForm: false}))
    }

    update(field){
        return e =>  this.setState({ [field]: e.currentTarget.value });
    }


   

    showUpdate(gardenPlant){

        this.setState({
            showUpdateForm: true,
            _id: gardenPlant._id,
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
                <button onClick={()=>this.setState({showUpdateForm: false})}>x</button>
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
                    <input type="submit" value="Update" />
                </form>
            </div>

        )
    }

    // renderPlantDetail(plants,gardenPlant){
    //     for( let plant in plants){
    //         console.log(plant._id)
    //         if(plant.id === gardenPlant.plant){
    //             return(
    //                 <div>
    //                     <p>there is the detail</p>
    //                     <ul>
    //                     <li>Name: {plant.name}</li>
    //                     <li>Nickname: {gardenPlant.nickname}</li>
    //                     <li>level: {plant.level}</li>
    //                     <li>Amount of Sunlight: {plant.light}</li>
    //                     <li>Date: {gardenPlant.date}</li>
    //                     <li>WaterDate: {gardenPlant.waterDate}</li>
    //                     </ul>
    //                     {plant.tags.length < 1 ? null : 
    //                     <div className = "plant-tags"> Tags: 
    //                         {plant.tags.map((tag, idx) => <div key={idx}>{tag.slice(2)} </div>)}
    //                     </div>
    //                 }
    //                 </div>
    //             )
    //         }
    //     }
    // }
    

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
                
                <img className = "dirt" src="dirt.jpeg"/>

                <ul className = "plantList">
                    {gardenPlants.map((plant, idx) => {
                        return <li className = "individual-sprout" key={idx}>
                            <div className="plantName2"> {plant.nickname} </div> 
                            Days alive: {(days = Math.round(Math.ceil(new Date() - new Date(plant.date.split("T")[0])) / (1000 * 60 * 60 * 24)))} <br />
                            {Math.round(Math.ceil(new Date() - new Date(plant.waterDate.split("T")[0])) / (1000 * 60 * 60 * 24)) === 1 ? <img className="watering-can" src="watering-can.png"/> : <div></div>}
                            {days < 3 ? <img className="sprout-image" src="plant-10.png" /> : (days < 6 ? <img className="sprout-image" src="plant-20.png" /> : (days < 9 ? <img className="sprout-image" src="plant-3.png" /> : (days < 12 ? <img className="sprout-image" src="plant-4.png" /> : <img className="sprout-image" src="plant-5.png" />)))}

                            <button className = "update-button" onClick={()=>this.showUpdate(plant)}>update</button>
                             {(this.state.showUpdateForm && this.state._id===plant._id) ? this.renderUpdateForm(plant):null }
{/* 
                             {this.renderPlantDetail(plants,plant)} */}

                            <button className = "delete-button" onClick={() => {this.handleClick(plant._id)}}>Delete</button>                           
                            </li>
                    })}
                </ul>
               
                </div>
            </div>
        )
    }
}


export default Home;

