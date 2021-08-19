import React from "react";
import { Link } from "react-router-dom";
import NavbarContainer from "../nav/navbar_container";
import './plant_index.css'
import { capitalizeName } from "../../helpers/random_helpers";


class PlantIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      showPopup: false,
      showPopupId: false,
      errors: {},

      name: "",
      level: "Intermediate",
      waterLevel: 1,
      waterFrequency: 4,
      light: 1,
      temperatureMin: 0,
      temperatureMax: 0,
      photoUrls: [],
      file: null,
      url: null,

      tags: {
        isIndoor: false,
        isOutdoor: false,
        isSucculent: false,
        isFlowering: false,
        isPoisonous: false,
        isExotic: false,
        isMultiColored: false,
        isHanging: false,
      },
    };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this._resetForm = this._resetForm.bind(this);
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }


  componentDidMount() {
    this.props.fetchAllPlants();
  }

  
  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors });
  }


  _resetForm() {
    this.setState({
      showForm: false,
      errors: {},

      name: "",
      level: "Intermediate",
      waterLevel: 1,
      waterFrequency: 4,
      light: 1,
      temperatureMin: 0,
      temperatureMax: 0,
      photoUrls: [],
      file: null,

      tags: {
        isIndoor: false,
        isOutdoor: false,
        isSucculent: false,
        isFlowering: false,
        isPoisonous: false,
        isExotic: false,
        isMultiColored: false,
        isHanging: false,
      },
    });
  }

  update(field) {
    return (e) => {
      if (field === "waterLevel" || field === "sunlight") {
        this.setState({ [field]: parseInt(e.currentTarget.value) });
      } else if (field === "level") {
        this.setState({ [field]: e.target.value });
      } else if (
        field === "isIndoor" ||
        field === "isOutdoor" ||
        field === "isSucculent" ||
        field === "isFlowering" ||
        field === "isPoisonous" ||
        field === "isExotic" ||
        field === "isMultiColored" ||
        field === "isHanging"
      ) {
        let tags = this.state.tags;
        tags[field] ? (tags[field] = false) : (tags[field] = true);
        this.setState({ tags });
      } else {
        this.setState({ [field]: e.currentTarget.value });
      }
      this.setState({ errors: {} });
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("author", this.props.currentUser.id);
    formData.append("name", this.state.name);
    formData.append("level", this.state.level);
    formData.append("waterLevel", this.state.waterLevel);
    formData.append("waterFrequency", this.state.waterFrequency);
    formData.append("light", this.state.light);
    formData.append(
      "temperature",
      `${this.state.temperatureMin}-${this.state.temperatureMax}`
    );
    formData.append("photoUrls", this.state.photoUrls);
    formData.append("file", this.state.file);

    let tags = this.state.tags;
    let selectedTags = [];
    for (let i in tags) {
      if (tags[i]) selectedTags.push(i);
    }

    formData.append("tags", selectedTags);

    // if(selectedTags!==null){
    //     for (let i = 0; i < tags.length; i++) {
    //         formData.append("tags[]", selectedTags[i]);
    //       }
    // }

    // this.props.createPlant({
    //     author: this.props.currentUser.id,
    //     name: this.state.name,
    //     level: this.state.level,
    //     waterLevel: this.state.waterLevel,
    //     waterFrequency: this.state.waterFrequency,
    //     light: this.state.light,
    //     temperature: `${this.state.temperatureMin}-${this.state.temperatureMax}`,
    //     photoUrls: this.state.photoUrls,
    //     tags: selectedTags,
    // }).then(() => (this._resetForm()));

    this.props.createPlant(formData).then(() => this.handleError());
  }

  handleError() {
    if (Object.keys(this.state.errors).length === 0) {
      this._resetForm();
      this.stateChange();
    }
}

    renderErrors() {
        return (
          <ul>
            {Object.keys(this.state.errors).map((error, i) => (
              <li key={`error-${i}`}>{this.state.errors[error]}</li>
            ))}
          </ul>
        );
      }



    handleAdd(plant) {
        return e => {
            e.preventDefault();
            this.props.addGardenPlant(plant._id ? plant._id : plant.id);
            this.setState({ showPopup: true, popupId: e.currentTarget.id });
            setTimeout(() => this.setState({ showPopup: false, popupId: undefined }), 1500);
        }
  }

  stateChange() {
    setTimeout(function () {
      window.location.reload();
    }, 1500);
  }

  handleClose(e) {
    e.preventDefault();
    this._resetForm();
  }

  handleSelectedFile(e) {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ file: file, url: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  handleAdd(plant) {
    return (e) => {
        e.preventDefault();
        this.props.addGardenPlant(plant._id ? plant._id : plant.id);
        this.setState({ showPopup: true, popupId: plant._id ? plant._id : plant.id });
        setTimeout(() => this.setState({ showPopup: false, popupId: plant._id ? plant._id : plant.id }), 1500);

    };
  }

  renderImg(plant){
    if(plant.photoUrls===undefined){
      return null
    }else{
      return(
        <img
        className="plantPhoto"
        src={plant.photoUrls[0]}
        alt=""
    />
      )
    }

  }

  renderName(plant){
    if(plant.name===undefined){
      return null
    }else{
      return(
         <div className="plantName">{capitalizeName(plant.name)}</div>
      )
    }
  }

  render() {
    const { plants } = this.props;
    const preview = this.state.url ? <img src={this.state.url} /> : null;
    const plantForm = (
          <div className="create-plant-form-anchor">
              <form className="create-plant-form" onSubmit={this.handleSubmit}>
                  <div className="create-plant-form-close" onClick={this.handleClose}>x</div>
                  <div className="create-plant-form-header-anchor">
                      <h1 className="create-plant-form-header">Create a Plant</h1>
                  </div>

                  {/* {this.renderErrors()} */}
                  <div className="create-plant-form-left">
                      <label className="name">Name
                          <input className="nameText" type="text" value={this.state.name} onChange={this.update("name")} />
                      </label> <br /> <br />

                      <label className="difficulty">Difficulty
                          <select className="difficultyText" onChange={this.update("level")} value={this.state.level}>
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                          </select>
                      </label> <br /> <br />

                      <label className="sunlight">Amount of Sunlight <br />
                          <input type="radio" name="sunlight" value={1} onChange={this.update("sunlight")} defaultChecked />{1}
                          <input type="radio" name="sunlight" value={2} onChange={this.update("sunlight")} />{2}
                          <input type="radio" name="sunlight" value={3} onChange={this.update("sunlight")} />{3}
                          <input type="radio" name="sunlight" value={4} onChange={this.update("sunlight")} />{4}
                          <input type="radio" name="sunlight" value={5} onChange={this.update("sunlight")} />{5}
                      </label> <br /> <br />

                      <label className="wateringFrequency">Watering Frequency <br />
                          <input className="wateringFrequencyInput" type="radio" name="watering-frequency" value={1} onChange={this.update("waterLevel")} defaultChecked />{1}
                          <input type="radio" name="watering-frequency" value={2} onChange={this.update("waterLevel")} />{2}
                          <input type="radio" name="watering-frequency" value={3} onChange={this.update("waterLevel")} />{3}
                          <input type="radio" name="watering-frequency" value={4} onChange={this.update("waterLevel")} />{4}
                          <input type="radio" name="watering-frequency" value={5} onChange={this.update("waterLevel")} />{5}
                      </label> <br /> <br />

                      <label className="days">How often should the plant be watered (in days)?
                          <input className="daysBox" type="numbers" min="0" max="1000" value={this.state.waterFrequency} onChange={this.update("waterFrequency")} />
                      </label> <br /> <br />

                      <label className="temperature">Ideal Temperature Range (Fahrenheit) <br />
                          <input className="temperature-input" type="numbers" min="0" max="300" value={this.state.temperatureMin} onChange={this.update("temperatureMin")} />
                          -
                          <input className="temperature-input" type="numbers" min="0" max="300" value={this.state.temperatureMax} onChange={this.update("temperatureMax")} />
                      </label> <br /> <br />
                  </div>

                  <div className="create-plant-form-right">
                      {/* upload photo here*/}
                      {preview}
                      <input type="file" onChange={this.handleSelectedFile} />

                      <label className="tags">Select all that apply! <br />
                          <input className="tags-checkboxes" type="checkbox" name="tags" onChange={this.update("isIndoor")} />Indoor
                          <input className="tags-checkboxes" type="checkbox" name="tags" onChange={this.update("isOutdoor")} />Outdoor
                          <input className="tags-checkboxes" type="checkbox" name="tags" onChange={this.update("isSucculent")} />Succulent
                          <input className="tags-checkboxes" type="checkbox" name="tags" onChange={this.update("isFlowering")} />Flowering <br />
                          <input className="tags-checkboxes" type="checkbox" name="tags" onChange={this.update("isPoisonous")} />Poisonous
                          <input className="tags-checkboxes" type="checkbox" name="tags" onChange={this.update("isExotic")} />Exotic
                          <input className="tags-checkboxes" type="checkbox" name="tags" onChange={this.update("isMultiColored")} />Multi-colored
                          <input className="tags-checkboxes" type="checkbox" name="tags" onChange={this.update("isHanging")} />Hanging
                      </label> <br /> <br />

                      <input className="submit-create-plant" type="submit" value="Create Plant" />
                  </div>
              </form>
          </div>
      );

      const plantAddedPopup = (
          <div className="plant-added-popup-anchor">
              <div className="plant-added-popup">Added!</div>
              <div className="plant-added-popup-arrow"></div>
          </div>
      );

    return (
      <div>
        <div className="plant-index-item-mega-container">
          <div className="navbar-contianer">
            <NavbarContainer />
          </div>
          <div className="background-contiainer-plant-index">
            <img className="plantsBackground" src="wallpaper.png" alt="" />
          </div>

        {this.state.showForm ? plantForm : null}

          <div className="main-content-plant-index-container">

            <div
              className="create-plant-button"
              onClick={() => this.setState({ showForm: true })}
            >
              +
            </div>

                <div className="each-plant-index-container">
                <h1 className="plant-index-header">Types of Plants</h1>

                  <div className="plant-index-list">
                    {plants.map((plant, idx) => (
                        <li className="plant-index-item-container" key={idx}>
                            <Link className="plant-index-item" to={`/plants/${plant._id}`}>
                                <div className="plant-content-index"key={plant._id}>
                                    {/* <img
                                        className="plantPhoto"
                                        src={plant.photoUrls[0]}
                                        alt=""
                                    /> */}
                                    {this.renderImg(plant)}
                                    {this.renderName(plant)}
                                    {/* <div className="plantName">{capitalizeName(plant.name)}</div> */}
                                </div>
                            </Link>
                            <button className="add-plant-button" id={plant._id} onClick={this.handleAdd(plant)}>Add</button>
                            {this.state.showPopup && this.state.popupId === plant._id ? plantAddedPopup : null}
                        </li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
  }
}

export default PlantIndex;
