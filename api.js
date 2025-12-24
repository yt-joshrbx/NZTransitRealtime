// JavaScript Example: Reading Entities
// Filterable fields: 
async function fetchEntityNameEntities() {
    const response = await fetch(`https://app.base44.com/api/apps/694a18d610447f259dff4404/entities/EntityName`, {
        headers: {
            'api_key': 'a2303ee941fd454fa514fe8cf0a04913', // or use await User.me() to get the API key
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);
}

// JavaScript Example: Updating an Entity
// Filterable fields: 
async function updateEntityNameEntity(entityId, updateData) {
    const response = await fetch(`https://app.base44.com/api/apps/694a18d610447f259dff4404/entities/EntityName/${entityId}`, {
        method: 'PUT',
        headers: {
            'api_key': 'a2303ee941fd454fa514fe8cf0a04913', // or use await User.me() to get the API key
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    });
    const data = await response.json();
    console.log(data);
}
