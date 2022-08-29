import React from "react";

export default function Weather(props) {
   let data = props.data;

   console.log(data); 

	return (
		<div className="weather">
			<svg className="close" onClick={props.close} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
				<path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
			</svg>
			<div className="item temp grid-span-2">
				<div className="item-value temp-value">
					{Math.round(data.main.temp)}
				</div>
				<div className="item-name">{data.weather[0].description}</div>
			</div>
			<div className="item grid-span-2 item-img">
				<img
					src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
					alt="icon"
				/>
				<div className="item-name">{data.weather[0].description}</div>
			</div>
			<ul className="grid-span-4">
				<li>الضغط الجوي: {data.main.pressure}</li>
				<li>الرطوبة: {data.main.humidity}</li>
				<li>الضغط الجوي على مستوى سطح البحر: {data.main.sea_level}</li>
				<li>الضغط الجوي على مستوى سطح الأرض: {data.main.grnd_level}</li>
				<li>سرعة الرياح: {data.wind.speed}</li>
				<li>اتجاه الرياح: {data.wind.deg} deg</li>
				<li>هبوب الرياح: {data.wind.gust}</li>
			</ul>

			<h3 className="grid-span-4">معلومات عن المدينة</h3>
			<ul className="grid-span-4">
				<li>مدينة: {data.name}</li>
				<li>دائرة العرض: {data.coord.lat}</li>
				<li>خط الطول: {data.coord.lon}</li>
				<li>
					فرق التوقيت:{" "}
					{data.timezone / 60 / 60 >= 0
						? `+${data.timezone / 60 / 60}`
						: `-${data.timezone / 60 / 60}`}{" "}
					ساعة
				</li>
				<li>رمز الدولة: {data.sys.country}</li>
			</ul>
		</div>
	);
}
