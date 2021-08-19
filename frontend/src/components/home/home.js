import React from 'react';
import NavbarContainer from '../nav/navbar_container';
import './home.css'


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showUpdateForm: false,
            _id: '',
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
            plant: this.state.plant,
            nickname: this.state.nickname,
            waterDate: this.state.waterDate,
            date: this.state.date,
        })
    }

    update(field){
        return e =>  this.setState({ [field]: e.currentTarget.value });
    }

    // renderDetail(gardenPlant){
    //     return(
    //         <div>
    //            <ul>
    //                <li>Nickname: {gardenPlant.nickname}</li>
    //                <li>Date: {gardenPlant.date}</li>
    //                <li>WaterDate: {gardenPlant.waterDate}</li>
    //            </ul>
    //         </div>
    //     )
    // }

    showUpdate(gardenPlant){

        this.setState({
            showUpdateForm: true,
            _id: gardenPlant._id,
            plant: gardenPlant.plant,
            nickname: gardenPlant.nickname,
            waterDate:gardenPlant.waterDate,
            date: gardenPlant.date,
        })
    }

    renderUpdateForm(gardenPlant){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Nickname
                         <input  type="text" value={this.state.nickname} onChange={this.update("nickname")} />
                    </label>
                    <label>Date
                         <input  type="text" value={this.state.date} onChange={this.update("date")} />
                    </label>
                    <label>WaterDate
                         <input  type="text" value={this.state.date} onChange={this.update("waterDate")} />
                    </label>
                    <input type="submit" value="Update Plant" />
                </form>
            </div>

        )
    }
    

    render() {
        const { plants, gardenPlants } = this.props;

        return (
            <div>
                <div className="navbar-container">
                    <NavbarContainer/>
                </div>
                <div className = "home-page-container">
                <h1 className="hello">Welcome to your garden!</h1>
                <img className = "dirt" src="dirt.jpeg"/>

                

                <ul className = "plantList">
                    {gardenPlants.map((plant, idx) => {
                        return <li className = "individual-sprout" key={idx}>
                            <img src="plant-5.png"/>
                            <button onClick={()=>this.showUpdate(plant)}>update</button>
                             {this.state.showUpdateForm ? this.renderUpdateForm(plant):null }
                            <button onClick={() => {this.handleClick(plant._id)}}>Delete</button>                           
                            </li>
                    })}
                </ul>
                </div>
            </div>
        )
    }
}


export default Home;

