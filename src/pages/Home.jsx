import axios from 'axios';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { BallTriangle } from 'react-loader-spinner';

import { locationData } from '../utils/APIRoutes';
import MultiLineChart from '../components/MultiLineChart';
import Cover from "../assets/Weather Prediction-logo/cover.png";

import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const [input, setInput] = useState("");
  const [data, setData] = useState(undefined);
  const [chartData, setChartData] = useState([]);
  const [apiState, setApiState] = useState(false);
  const [loader, setLoader] = useState(false);

  const toastOptions = {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };

  const updateInput = (e) => {
    setInput(e.target.value);
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoader(true);
      const response = await axios.get(locationData, {
        params: {
          "location": input
        }
      });
      setApiState(response?.data?.development);
      setData(response?.data?.data);
    }
    catch (err) {
      toast.error(err.message, toastOptions);
    }
    finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (data?.response) {
      setChartData([
        ['x', 'Training', 'Testing', 'Predicting'],
        ...data.response
      ]);
    }
  }, [data]);

  return (
    <>
      <Container>
        <div className='image-container'>
          <img src={Cover} alt="logo" />
        </div>
        <div className='input-container mb-5'>
          <form className='form-container' onSubmit={formSubmit}>
            <input
              type={"text"}
              value={input}
              onChange={updateInput}
              placeholder="Enter City Name"
            />
            <button type={"submit"}>
              Search
            </button>
          </form>
        </div>
        {
          loader ?
            <BallTriangle
              wrapperClassName="mt-3"
              height={100}
              width={100}
              radius={5}
              color="#4fa94d"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={loader}
            /> :
            (
              chartData.length !== 0 ?
                <>
                  <h3> {apiState ? "Saved Data" : "Live Data"} </h3>
                  <MultiLineChart data={chartData} />
                </>
                : <></>
            )
        }
      </Container>
      <ToastContainer />
    </>
  )
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    height: 250px;
    width: 500px;
    box-shadow: 0 0 10px #777;
    border-radius: 20px;
    margin: 2rem 0;
  }

  .form-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    input {
      text-transform: uppercase;
      padding: 5px 10px;
      font-size: 1.2rem;
      font-weight: bold;
      font-family: 'Josefin Sans', sans-serif;
      color: #2A2F1F;
      text-align: center;
      border: none;
      border-bottom: 1px solid #2A2F1F;
      background-color: transparent;

      &:focus {
        outline: none;
      }
    }

    button {
      font-size: 1.2rem;
      border: 1px solid #2A2F1F;
      padding: 5px 10px;
      color: #2A2F1F;
      background-color: transparent;
      border-radius: 10px 0 10px 0;
      cursor: pointer;
    }
  }

`;
