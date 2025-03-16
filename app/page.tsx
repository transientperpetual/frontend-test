'use client'
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [response, setResponse] = useState(null);
  const [postResponse, setPostResponse] = useState(null);
  const [otpResponse, setOTPResponse] = useState(null);
  const [tokenResponse, setTokenResponse] = useState(null);
  const [accessResponse, setAccessResponse] = useState(null);

  const handleClick = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePostRequest = async () => {
    try {
      const res = await fetch("http://localhost:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: "Latexa",
          email: "laxibex559@oziere.com",
          password: "ankit18",
        }),
      });

      const data = await res.json();
      console.log("DATA: ", data);
      setPostResponse(data);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await fetch("http://localhost:8000/verify-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "laxibex559@oziere.com",
          otp: "450731"
        }),
      });

      const data = await res.json();
      setOTPResponse(data);
    } catch (error) {
      console.log("Error making POST request:", error);
    }
  };


  // LOGIN REQUEST
  const get_tokens = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "laxibex559@oziere.com",
          password: "ankit18"
        }),
      });

      const data = await res.json();
      console.log("token response : ", data)
      setTokenResponse(data);
    } catch (error) {
      console.log("Error making POST request:", error);
    }
  };


  const access_list = async () => {
    try {
      const res = await fetch("http://localhost:8000/user/", {
        method: "GET",
        credentials: "include",  // Ensure cookies are sent
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP Error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Authenticated response:", data);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  // useEffect(() => {
  //   fetchTokenAndUser();
  // }, []);


  async function fetchTokenAndUser() {
    try {
      // 1. Fetch the token (and get the cookie)
      const tokenResponse = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "laxibex559@oziere.com",
          password: "ankit18"
        }),
      });
      if (!tokenResponse.ok) {
        throw new Error(`Token request failed: ${tokenResponse.status}`);
      }
  
      // You might need to parse the token response body here
      // const tokenData = await tokenResponse.json();
      // console.log("Token response:", tokenData);
  
      // 2. Fetch the user data (using the cookie)
      const userResponse = await fetch('http://localhost:8000/user/', {
        credentials: 'include', // Crucial: Send cookies from the same origin
      });
  
      if (!userResponse.ok) {
        throw new Error(`User request failed: ${userResponse.status}`);
      }
  
      const userData = await userResponse.json();
      console.log('User data:', userData);
  
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // const access_list = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:8000/user/", {
  //       withCredentials: true,  // ✅ Ensures cookies are sent
        
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  
  //     console.log("Response Data:", res.data);
  //   } catch (error) {
  //     console.error("Error making GET request:");
  //   }
  // };

  // Function to Refresh Access Token
  const refreshAccessToken = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/token/refresh/", {
        method: "POST",
        credentials: "include", // Send stored refresh token
      });

      if (!res.ok) {
        throw new Error("Failed to refresh token");
      }

      console.log("Token refreshed successfully.");
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div className="flex">
        <button onClick={handleClick} className="px-4 py-2 text-lg bg-green-500 text-white rounded hover:bg-green-600">
          Get Request
        </button>

        <button
          onClick={handlePostRequest}
          className="px-4 py-2 m-2 text-lg bg-green-500 text-white rounded hover:bg-green-600"
        >
          Make POST Request
        </button>


        <button
          onClick={verifyOTP}
          className="px-4 py-2 m-2 text-lg bg-green-500 text-white rounded hover:bg-green-600"
        >
          Verify OTP
        </button>

        <button
          onClick={get_tokens}
          className="px-4 py-2 m-2 text-lg bg-green-500 text-white rounded hover:bg-green-600"
        >
          Get Token pair
        </button>

        <button
          onClick={access_list}
          className="px-4 py-2 m-2 text-lg bg-green-500 text-white rounded hover:bg-green-600"
        >
          Access Data
        </button>
      </div>
      {response && <p className="pt-4" >Response: {JSON.stringify(response)}</p>}
      {postResponse && <p>POST Response: {JSON.stringify(postResponse)}</p>}
      {otpResponse && <p>OTP Response: {JSON.stringify(otpResponse)}</p>}
      {tokenResponse && <p>Login Response: {JSON.stringify(tokenResponse)}</p>}
      {accessResponse && <p>Access Response: {JSON.stringify(accessResponse)}</p>}

    </div>
  );
}
