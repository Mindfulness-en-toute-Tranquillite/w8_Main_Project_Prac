import React from 'react'
import axios from "axios";

    // Set up the API endpoint and API key
    const endpoint = "https://dapi.kakao.com/v2/local/search/address.json";
    const apiKey = `cddd7225860e85f1583005ae2e564fc5`;
    // Define a function to get address information
    export const getKakaoAddress = async (query) => {
        try {
            // Send a GET request to the API endpoint with the query and API key as parameters
            const response = await axios.get(endpoint, {
                params: {
                    query: query,
                },
                headers: {
                    Authorization: `KakaoAK cddd7225860e85f1583005ae2e564fc5`,
                },
            });
    // Return the data from the response
    return response.data;
    } catch (error) {
    // Log any errors
    console.error(error);
    }
};