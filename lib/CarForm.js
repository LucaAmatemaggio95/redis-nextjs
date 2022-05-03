export default function CarForm () {

    const handleSubmit = async (event) => {
        event.preventDefault();

        /**
         * 
         * converte i dati inseriti nella form in key:value pairs
         * attributo name deve essere esattamente uguale allo schema creato su REDIS
         * 
         */


        const form = new FormData(event.target);
        const formData = Object.fromEntries(form.entries());

        console.log(formData);

        const res = await fetch('/api/cars', {
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });

        const result = await res.json();
        console.log(result);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Make</label>
            <input name="make" type="text" />
            <br />
            <label>Model</label>
            <input name="model" type="text" />
            <br />
            <label>Image</label>
            <input name="image" type="text" />
            <br />
            <label>Description</label>
            <textarea name="description" type="text" />
            <br />
            <button type="submit">Create Car</button>
        </form>
    )
}