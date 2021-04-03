// getting plant id and connecting it to the user 
const savePlant = (plant) => {
    return fetch('/api/greenhouse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(plant),
    });
}

//when "Add Me" is clicked, send the plant we want to save to our POST route /api/greenhouse
document.querySelectorAll('.save-plant').forEach(btn => {
    btn.addEventListener('click', async function () {
        try {

            const plantId = this.getAttribute('data-id');
            if (plantId) {
                const result = await savePlant({
                    plant_id: parseInt(plantId)
                });
                console.log(result);
            }
        }
        catch (e) {
            console.log(e);
        }
    });
})

console.log("hello from houseplants.js")