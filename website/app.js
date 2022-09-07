let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

const server = "http://127.0.0.1:3500";

const generateData = () => { 
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  GetData(zip).then((data) => {
    if (data) {
      const {
        main: { temp },
        name: city,
        weather: [{ description }],
      } = data;

      const info = {
        newDate,
        city,
        temp: temp,
        description,
        feelings,
      };

      PostData(server + "/add", info).then(function(){DisplayData();})
    }
  });
};


const GetData = async (zip) => {
  try {
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},&appid=647d0d1c6fd67a5a9873ee5c55c01f0b&units=metric`);
	
    const data = await result.json();

    if (data.cod != 200) {
	  document.getElementById("date").innerHTML = '';
    document.getElementById("city").innerHTML = '';
    document.getElementById("temp").innerHTML = '';
    document.getElementById("description").innerHTML = '';
    document.getElementById("content").innerHTML = '';
    document.getElementById("error").innerHTML = data.message;

    }

    return data;
  } catch (error) {
    console.log(error);
  }
};


const PostData = async (url = "", info = {}) => {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  try {
    const newData = await result.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};


const DisplayData = async () => {
  const res = await fetch(server + "/all");
  try {
    const savedData = await res.json();
    document.getElementById("error").innerHTML = '';
    document.getElementById("date").innerHTML = savedData.newDate;
    document.getElementById("city").innerHTML = savedData.city;
    document.getElementById("temp").innerHTML = savedData.temp + '&degC';
    document.getElementById("description").innerHTML = savedData.description;
    document.getElementById("content").innerHTML = savedData.feelings;
  } catch (error) {
    console.log(error);
  }
};
