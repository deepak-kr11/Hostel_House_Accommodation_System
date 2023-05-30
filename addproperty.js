const sub = async (event) => {
    console.log("Submit");
    const body = await `{
        "address":"${document.getElementById("location").value}",
        "price":"${document.getElementById("price").value}",
        "rooms":"${document.getElementById("rooms").value}",
        "types":"${document.getElementById("types").value}",
        "allowed":"${document.getElementById("allowed").value}",
        "facilities":"${document.getElementById("facilities").value}",
        "avilabiltiy": true
    }`;
    const response = await fetch(`http://localhost:4000/addproperty`, {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: body,
    })
    const data = await response.json();
    if(data)
    {
        alert("Property Added.")
    }
}