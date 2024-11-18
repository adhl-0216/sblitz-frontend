'use client'
import React, { useEffect } from 'react'

const TestConnection = () => {
    useEffect(() => {
        const fetchHelloAuth = async () => {
            try {
                // Call /auth/hello endpoint
                const authResponse = await fetch('/auth/hello');
                const authData = await authResponse.json();
                console.log('Response from /auth/hello:', authData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchHelloAuth();
    }, []); // Empty dependency array to ensure it runs only once on mount
    return (
        <div></div>
    )
}

export default TestConnection