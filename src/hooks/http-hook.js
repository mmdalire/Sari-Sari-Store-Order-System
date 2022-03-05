import { useState, useCallback, useEffect, useRef } from "react";

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [httpErrors, setHttpErrors] = useState(null);

	const activeHttpRequests = useRef([]);

	const sendRequest = useCallback(
		async (url, method = "GET", body = null, headers = {}) => {
			setIsLoading(true);
			const httpAbortController = new AbortController(); //Used to abort network requests
			activeHttpRequests.current.push(httpAbortController);

			try {
				const response = await fetch(url, {
					method,
					headers,
					body,
					signal: httpAbortController.signal,
				});

				const data = await response.json();

				//Remove the current request once the request is finished
				activeHttpRequests.current = activeHttpRequests.current.filter(
					(reqCtrl) => {
						return reqCtrl !== httpAbortController;
					}
				);

				//Check if there are any errors encountered in the backend
				if (!response.ok) {
					throw new Error(data.message);
				}

				setIsLoading(false);
				return data;
			} catch (err) {
				setIsLoading(false);
				setHttpErrors(err.message || "Something went wrong!");

				throw new Error(err.message);
			}
		},
		[]
	);

	const clearError = () => {
		setHttpErrors(null);
	};

	//Fetch cleanup after every unmount or every time this hook will be used again
	useEffect(() => {
		return () => {
			activeHttpRequests.current.forEach((abortCtrl) => {
				abortCtrl.abort();
			});
		};
	}, []);

	return { isLoading, httpErrors, sendRequest, clearError };
};
