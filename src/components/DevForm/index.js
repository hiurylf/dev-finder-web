import React, {useState, useEffect} from 'react';


function DevForm( {onSubmit}) {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTchs] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);
            },
            (err) => {
                console.log(err);
            },
            {}
        )
    }, []); // [] para rodar apenas uma vez

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });

        setTchs('');
        setGithubUsername('');
    }

    return (
        <form onSubmit={handleSubmit}>

            <div className="input-block">
                <label htmlFor="github_username"> Usuário do GitHub</label>
                <input
                    name="github_username"
                    id="github_username"
                    required
                    value={github_username}
                    onChange={event => setGithubUsername(event.target.value)}
                />
            </div>

            <div className="input-block">
                <label htmlFor="techs"> Tecnologias </label>
                <input
                    name="techs"
                    id="techs"
                    required
                    value={techs}
                    onChange={event => setTchs(event.target.value)}
                />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        type="number"
                        name="latitude"
                        id="latitude"
                        required
                        value={latitude}
                        onChange={event => setLatitude(event.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="longitude"> Longitude</label>
                    <input
                        type="number"
                        name="longitude"
                        id="longitude"
                        required
                        value={longitude}
                        onChange={event => setLongitude(event.target.value)}
                    />
                </div>
            </div>

            <button type="submit">Salvar</button>
        </form>
    );
}


export default DevForm;