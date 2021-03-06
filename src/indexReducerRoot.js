import app from './app/appReducer';
import home from './app/pages/home/homeReducer';
// ex. import newReducer from './newReducer'

const indexReducerRoot = reducers => {
	const reducerKeys = Object.keys(reducers);
	const objInitState = {};
	reducerKeys.forEach(key => {
		const initState = reducers[key](undefined, { type: '' });
		if (initState === 'undefined') {
			throw new Error(`${key} does not return state.`);
		}
		objInitState[key] = initState;
	});

	return (state, action) => {
		if (action) {
			reducerKeys.forEach(key => {
				const previousState = objInitState[key];
				objInitState[key] = reducers[key](previousState, action);
			});
		}

		return { ...objInitState };
	};
};

// 將要用的reducer都放入下方object
const reducers = indexReducerRoot({
	app,
	home,
});

export default reducers;
