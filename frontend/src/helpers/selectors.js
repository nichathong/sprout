
export const getCurrentUserPlants = state => {
    let currentUserId = state.session.user.id;
    let gardenPlants = Object.values(state.entities.gardenPlants);

    let plantIds = [];
    for (let i = 0; i < gardenPlants.length; i++) {
        if (gardenPlants[i].owner === currentUserId) {
            plantIds.push(gardenPlants[i].plant);
        }
    }


    let plants = Object.values(state.entities.plants);

    let userPlants = [];
    for (let i = 0; i < plantIds.length; i++) {
        for (let j = 0; j < plants.length; j++) {
            if (plantIds[i] === plants[j].id || plantIds[i] === plants[j]._id) {
                userPlants.push(plants[j]);
            }
        }
    }

    return userPlants;
}


export const getCurrentUserGardenPlants = state => {
    let currentUserId = state.session.user.id;
    let gardenPlants = Object.values(state.entities.gardenPlants);

    let userGardenPlants = [];
    for (let i = 0; i < gardenPlants.length; i++) {
        if (gardenPlants[i].owner === currentUserId) {
            userGardenPlants.push(gardenPlants[i]);
        }
    }

    return userGardenPlants;
}


export const getUserPlants = (state, userId) => {
    let gardenPlants = Object.values(state.entities.gardenPlants);

    let plantIds = [];
    for (let i = 0; i < gardenPlants.length; i++) {
        if (gardenPlants[i].owner === userId) {
            plantIds.push(gardenPlants[i].plant);
        }
    }


    let plants = Object.values(state.entities.plants);

    let userPlants = [];
    for (let i = 0; i < plantIds.length; i++) {
        for (let j = 0; j < plants.length; j++) {
            if (plantIds[i] === plants[j].id || plantIds[i] === plants[j]._id) {
                userPlants.push(plants[j]);
            }
        }
    }

    return userPlants;
}


export const getUserGardenPlants = (state, userId) => {
    let gardenPlants = Object.values(state.entities.gardenPlants);

    let userGardenPlants = [];
    for (let i = 0; i < gardenPlants.length; i++) {
        if (gardenPlants[i].owner === userId) {
            userGardenPlants.push(gardenPlants[i]);
        }
    }

    return userGardenPlants;
}
