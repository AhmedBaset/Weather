import React from "react";

export default function Starting(props) {
	return (
		<>
			<h1 className="m-b-150">أخبار الطقس</h1>

			{props.error.haveError && (
				<div className="alert-danger m-y-1">{props.error.message}</div>
			)}
			<div className="input-box w-100 m-y-05">
				<input
					type="text"
					id="city"
					placeholder="أدخل اسم المدينة"
					onChange={props.checkCity}
				/>
				<img
					src="src/images/search.png"
					className="input-icon"
					onClick={props.checkCity}
				/>
			</div>
			{props.option && (
				<div className="w-100">
					هل تقصد...؟
					<div
						className="btn-primary w-100"
						onClick={props.optionSelected}
					>
						{props.option}
					</div>
				</div>
			)}
			<div className="hr-or m-y-05">or</div>
			<a
				href="#"
				onClick={props.findUserLocation}
				className="w-100 btn-secondary"
			>
				تحديد الموقع تلقائيا
			</a>
		</>
	);
}
