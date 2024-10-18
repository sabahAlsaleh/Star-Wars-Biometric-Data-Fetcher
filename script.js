function getApi() {
    const name = document.getElementById('characterName').value;
    const fullUri = `https://www.swapi.tech/api/people/?name=${name}`;

    fetch(fullUri)
        .then(resopnse => {
            if (resopnse.ok) return resopnse.json();
            throw new Error('Failed to get response');
        })
        .then(data => {
            console.log(data); 
            const output = document.getElementById('output');
            output.value = ''; // Clear previous output

            // Check if data and results exist
            if (data && data.result && data.result.length > 0) {
                data.result.forEach(characterData => {
                    const character = characterData.properties; // Access properties

                    // Build the output string in plain text format
                    let outputString = `Name: ${character.name}\n` +
                                       `Height: ${character.height}\n` +
                                       `Mass: ${character.mass}\n` +
                                       `Gender: ${character.gender}\n` +
                                       `Hair Color: ${character.hair_color}\n\n`;
                    output.value += outputString; // Append the output
                });
            } else {
                output.value = "Character not found.";
            }
        })
        .catch(err => {
            console.error(err);
            document.getElementById('output').value = "An error occurred. Please try again.";
        });
}

document.getElementById('fetchDataButton').addEventListener('click', getApi);
