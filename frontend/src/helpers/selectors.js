
export const getCurrentUserPlants = state => {
    const users = Object.values(state.entities.users);
    const currentUserId = state.session.user.id;

    let currentUserPlantIds;
    users.forEach(user => {
        if (user.id === currentUserId) {
            currentUserPlantIds = user.garden;
        }
    })

    
    const plants = Object.values(state.entities.plants);

    let currentUserPlants = [];
    plants.forEach(plant => {
        if (currentUserPlantIds.includes(plant.id)) {
            currentUserPlants.push(plant);
        }
    });

    return currentUserPlants;
}
