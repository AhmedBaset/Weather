import React from "react";
import Starting from "./components/Starting";
import Weather from "./components/Weather";

export default function App() {
	// useState
	const [error, setError] = React.useState({
		haveError: false,
		message: "",
	});

	const [city, setCity] = React.useState(localStorage.getItem("city"));
	const [latLon, setLatLon] = React.useState({ lan: 0, lon: 0 });
	const [option, setOption] = React.useState(city);

	const [weather, setWeather] = React.useState();
	const [isChoose, setIsChoose] = React.useState(false);

	// Search by city name
	function checkCity() {
		const cityInput = document.getElementById("city").value;
		if (!cityInput) {
			setError({
				haveError: true,
				message: "من فضلك أدخل اسم مدينة صالح",
			});
		} else {
			fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=1a3c133621b83be570472de71b2d1463&lang=ar&units=metric`
			)
				.then((res) => res.json())
				.then((data) => {
					if (data.cod === 200) {
						setOption(data.name);
						setError({ haveError: false, message: "" });
						setWeather(data);
					} else {
						setError({
							haveError: true,
							message: "رجاء أدخل اسم مدينة صالح، باللغة الإنجليزية",
						});
					}
				});
		}
	}

	function optionSelected() {
		if (!weather) {
			fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1a3c133621b83be570472de71b2d1463&lang=ar&units=metric`
			)
				.then((res) => res.json())
				.then((data) => {
					if (data.cod === 200) {
						setOption(data.name);
						setError({ haveError: false, message: "" });
						setWeather(data);
						setIsChoose(true);
						setCity(data.name);
					} else {
						setError({
							haveError: true,
							message: "رجاء أدخل اسم مدينة صالح، باللغة الإنجليزية",
						});
					}
				});
		}
		setCity(weather.name);
		setIsChoose(true);
	}

	// Search by lat and lon
	function findUserLocation() {
		if (navigator.geolocation) {
			var options = { timeout: 60000 };
			navigator.geolocation.getCurrentPosition(
				showLocation,
				errorHandler,
				options
			);
		} else {
			setError({
				haveError: true,
				message:
					"المتصفح لا يدعم تحديد الموقع تلقائيا, برجاء تحديد المدينة يدويا.",
			});
		}
	}

	function showLocation(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		setLatLon({ lat: latitude, lon: longitude });
	}

	function errorHandler(err) {
		if (err.code == 1) {
			setError({
				haveError: true,
				message:
					"برجاء الموافقة على إذن تحديد الموقع، نتعهد بألا نشارك بياناتك مع طرف ثالث",
			});
		} else if (err.code == 2) {
			alert("Error: Position is unavailable!");
			setError({
				haveError: true,
				message: "هذا الموقع غير متاح، الرجاء اختيار مدينة أخرى.",
			});
		}
	}

	if (error.haveError) {
		setTimeout(() => {
			setError({
				haveError: false,
				message: "",
			});
		}, 3000);
	}


	React.useEffect(() => {
		if (latLon.lan !== 0 && latLon.lon !== 0) {
			
				fetch(
					`https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lan}&lon=${latLon.lon}&appid=1a3c133621b83be570472de71b2d1463&lang=ar&units=metric`
				)
					.then((response) => response.json())
					.then((data) => {
						if (data.cod === 200) {
							setCity(data.name);
							setError({ haveError: false });
							setWeather(data);
						} else {
							setError({
								haveError: true,
								message: "رجاء أدخل اسم مدينة صالح، باللغة الإنجليزية",
							});
						}
					});
			
			setCity(weather.name);
			setIsChoose(true);
		}
	}, []);

	// Work with local storage
	if (city) {
		localStorage.setItem("city", city);
	}

	function close() {
		setIsChoose(false);
	}

	// Render
	return (
		<main className="p-2 rounded flex-center flex-column">
			{!isChoose && (
				<Starting
					error={error}
					option={option}
					optionSelected={optionSelected}
					checkCity={checkCity}
					findUserLocation={findUserLocation}
				/>
			)}
			{isChoose && <Weather data={weather} close={close} />}
		</main>
	);
}
