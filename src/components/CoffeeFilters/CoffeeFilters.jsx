import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveFilter, changeSearchValue, fetchFilters, selectAll } from "../../store/filters/filtersSlice";

import Spinner from "../../layouts/Spinner/Spinner";

import "./CoffeeFilters.scss";

const CoffeeFilters = () => {
	const dispatch = useDispatch();
	const { filtersLoadingStatus, activeFilter, searchValue } = useSelector(state => state.filters);
	const filters = useSelector(state => selectAll(state));

	useEffect(() => {
		if (!filters.length) {
			dispatch(fetchFilters());
		}
	}, []);

	const onChangeValue = e => {
		dispatch(changeSearchValue(e.target.value));
	};

	const renderFilters = items => {
		if (!items.length) {
			return <p className="error">Filters not found</p>;
		}

		return items.map(({ id, label }) => {
			const activeClass = label === activeFilter ? "filters__button_active" : "";

			return (
				<button
					key={id}
					className={`filters__button ${activeClass}`}
					id="filters__button"
					onClick={() => dispatch(changeActiveFilter(label))}>
					<span>{label}</span>
				</button>
			);
		});
	};

	const elements = renderFilters(filters);

	return (
		<div className="filters">
			<div className="filters__search">
				<label htmlFor="filters__input">Lookiing for</label>
				<input
					type="text"
					className="filters__input"
					id="filters__input"
					placeholder="start typing here..."
					value={searchValue}
					onChange={onChangeValue}
				/>
			</div>
			<div className="filters__countries">
				<label>Or filter</label>
				<div className="filters__list">
					{filtersLoadingStatus === "loading" ? <Spinner /> : ""}

					{filtersLoadingStatus === "error" ? <p className="error">(Failed to load filters)</p> : ""}

					{filtersLoadingStatus === "idle" ? elements : ""}
				</div>
			</div>
		</div>
	);
};

export default CoffeeFilters;
