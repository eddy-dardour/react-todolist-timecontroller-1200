/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from "react";
import styled from "styled-components";
import * as data from "./data.json";
import work from './images/icon-work.svg'
import play from './images/icon-play.svg'
import study from './images/icon-study.svg'
import exercise from './images/icon-exercise.svg'
import social from './images/icon-social.svg'
import selfcare from './images/icon-self-care.svg'
import pfp from './images/image-jeremy.png'
import { Link } from "react-router-dom";


const Button = styled.button`
  background: linear-gradient(
    262deg,
    rgba(253, 118, 203, 1) 0%,
    rgba(255, 172, 48, 1) 79%
  );
  filter: grayscale(60%);
  border-radius: 20px 5px;
  outline: none;
  font-weight: bold;
  font-size: 15px;
  border: none;
  padding: 10px;
  transition: 0.2s;
  &:hover {
    filter: grayscale(0%);
    padding: 12px;
  }
`;

export const ThemeContext = createContext();
const Header = styled.header`
  width: 100%;
  height: 10%;
  border-bottom: 2px solid
    ${({ themed }) => (themed === true ? "#BBBBBB" : "#888888")};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export function ThemeProvider({ children }) {
  const [isDark, setDark] = useState(true);
  function toggleDark() {
    setDark(!isDark);
  }
  return (
    <ThemeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Home() {
  const { toggleDark, isDark } = useContext(ThemeContext);
  const ThemeWrapper = styled.main`
    * {
      font-family: "Outfit", serif;
    }
    width: 100%;
    position: absolute;
    height: 100%;
    background-color: ${({ themed }) =>
      themed === true ? "#222222" : "#FFFEFD"};
    header,
    div {
      background-color: ${({ themed }) =>
        themed === true ? "#000000" : "#FFFEFD"};
      color: ${({ themed }) => (themed === true ? "#FFFEFD" : "#000000")};
    }
  `;

  return (
    <ThemeWrapper themed={isDark}>
      <HeaderBlock>
        <p>Time Controller</p>
        <Link to="/todo"><Button>Todo List</Button></Link>
        <Button onClick={toggleDark}>Toggle Dark Mode</Button>
      </HeaderBlock>
      <Main />
    </ThemeWrapper>
  );
}
function HeaderBlock({ children }) {
  const { isDark } = useContext(ThemeContext);
  return <Header themed={isDark}>{children}</Header>;
}

function Main() {
  const [timestate, setPrevOrCurr] = useState("current");
  const [currentType, setCurrentType] = useState(undefined);
  function reducer(state, action) {
    setCurrentType(action.type);
    const {
      0: work,
      1: play,
      2: study,
      3: exercise,
      4: social,
      5: selfcare,
    } = data;
    switch (action.type) {
      case "DAYS": {
        if (timestate === "current") {
          return (state = [
            work.timeframes.daily.current,
            play.timeframes.daily.current,
            study.timeframes.daily.current,
            exercise.timeframes.daily.current,
            social.timeframes.daily.current,
            selfcare.timeframes.daily.current,
          ]);
        } else {
          return (state = [
            work.timeframes.daily.previous,
            play.timeframes.daily.previous,
            study.timeframes.daily.previous,
            exercise.timeframes.daily.previous,
            social.timeframes.daily.previous,
            selfcare.timeframes.daily.previous,
          ]);
        }
      }
      case "WEEKS": {
        if (timestate === "current") {
          return (state = [
            work.timeframes.weekly.current,
            play.timeframes.weekly.current,
            study.timeframes.weekly.current,
            exercise.timeframes.weekly.current,
            social.timeframes.weekly.current,
            selfcare.timeframes.weekly.current,
          ]);
        } else {
          return (state = [
            work.timeframes.weekly.previous,
            play.timeframes.weekly.previous,
            study.timeframes.weekly.previous,
            exercise.timeframes.weekly.previous,
            social.timeframes.weekly.previous,
            selfcare.timeframes.weekly.previous,
          ]);
        }
      }
      case "MONTHS": {
        if (timestate === "current") {
          return (state = [
            work.timeframes.monthly.current,
            play.timeframes.monthly.current,
            study.timeframes.monthly.current,
            exercise.timeframes.monthly.current,
            social.timeframes.monthly.current,
            selfcare.timeframes.monthly.current,
          ]);
        } else {
          return (state = [
            work.timeframes.monthly.previous,
            play.timeframes.monthly.previous,
            study.timeframes.monthly.previous,
            exercise.timeframes.monthly.previous,
            social.timeframes.monthly.previous,
            selfcare.timeframes.monthly.previous,
          ]);
        }
      }

      default:
        return state;
    }
  }

  const { isDark } = useContext(ThemeContext);
  const [scale, dispatch] = useReducer(reducer);

  const MainContent = styled.div`
    margin: auto;
    width: 75%;
    height: 80%;
    background: none !important;
    border-radius: 10px 20px;
    font-weight: bold;
    .title {
      text-align: center;
    }
  `;

  const MainContentGrid = styled.div`
    #pfp {
      width : 100px;
      height : 100px;
      border-radius : 50%;
    }
    .card-images {
      height : 50px;
      width : 50px;
      margin : 0;
      padding : 0;
      z-index : 2;
      transform : translateZ(-50%)
    }
    .scale {
      margin : 0;
      padding : 0;
    }
    .select-timescale {
        border : none;
        background : none;
        color : white;
        text-decoration : underline;
        font-weight : bold;
        &:hover {
          color : grey;
          text-decoration: none;
        }
        &:active {
          color : #444444;
        }
        margin : 10px;
    };
    display: grid;
    background: none !important;
    grid-template-areas:
      "a b c d"
      "a e f g";
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(4, 1fr);
    height: 70%;
    grid-gap: 10px;
    .top {
      z-index : 3;
      box-shadow: 2px 2px
        ${({ themed }) => (themed === true ? "10px #111111" : "2px grey")};
    }
    div {
      div {
        z-index : 3;
        &:hover {
          transform: translateY(-20%);
        }
        transform: translateY(-25%);
        transition: 0.2s;
        height: 80%;
        border-radius: 10px;
        p {
          padding-top: 20px;
          font-size: 20px;
        }
      }
      color: white;
      text-indent: 2vh;
      background-color: #1a0342;
      border-radius: 10px;
    }
    .top:nth-child(2) {
      background-color: orange;
    }
    .top:nth-child(3) {
      background-color: blue;
    }
    .top:nth-child(4) {
      background-color: red;
    }
    .top:nth-child(5) {
      background-color: green;
    }
    .top:nth-child(6) {
      background-color: purple;
    }
    .top:nth-child(7) {
      background-color: yellow;
    }
    .top:nth-child(1) {
      div {
        transform: translateY(-7%);
        transition: 0.2s;
        height: 80%;
        border-radius: 10px;
      }
      background-color: purple;
    }

    .a {
      grid-area: a;
    }
    .buttons {
      transform: translateY(-20%);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      transition: 0.2s;
      button:hover {
        color: grey;
        text-decoration: none;
      }
    }
  `;

  const HrefButton = styled.button`
    background: none;
    outline: none;
    border: none;
    font-size: 15px;
    text-align: left;
    text-decoration: underline solid white 2px;
    font-weight: bold;
    color: white;
  `;
  return (
    <MainContent>
      <h1 className='title'>Time Tracking Dashboard</h1>
      <MainContentGrid themed={isDark}>
        <div className='a top'>
          <div>
            <p>Profile Data</p>
            <img id="pfp" src={pfp} alt='pfp'/>
          </div>
          <section className='buttons'>
            <HrefButton onClick={() => dispatch({ type: "DAYS", payload: "" })}>
              Days
            </HrefButton>
            <HrefButton
              onClick={() => dispatch({ type: "WEEKS", payload: "" })}
            >
              Weeks
            </HrefButton>
            <HrefButton
              onClick={() => dispatch({ type: "MONTHS", payload: "" })}
            >
              Months
            </HrefButton>
          </section>
        </div>
        <div className='b top'>
          <group>
            <img className='card-images' src={work} alt=""/>
          </group>
          <div>
            <p>Work</p>
            <p className="scale">{scale === undefined ? "Select timescale" : scale[0] + " Hours"}</p>
            <span>
              <button
                className='select-timescale'
                onClick={() => {
                  setPrevOrCurr(null);
                  dispatch({ type: currentType, payload: "" });
                }}
              >
                Previous
              </button>
              <button
                className='select-timescale'
                onClick={() => {
                  setPrevOrCurr("current");
                  dispatch({ type: currentType, payload: "" });
                }}
              >
                Current
              </button>
            </span>
          </div>
        </div>
        <div className='c top'>
          <group>
            <img className='card-images' src={play} alt=""/>
          </group>
          <div>
            <p>Play</p>
            <p className="scale">{scale === undefined ? "Select timescale" : scale[1] + " Hours"}</p>
            <span>
              <button
                className='select-timescale'
                onClick={() => {
                  setPrevOrCurr(null);
                  dispatch({ type: currentType, payload: "" });
                }}
              >
                Previous
              </button>
              <button
                className='select-timescale'
                onClick={() => {
                  setPrevOrCurr("current");
                  dispatch({ type: currentType, payload: "" });
                }}
              >
                Current
              </button>
            </span>
          </div>
        </div>
        <div className='d top'>
          <group>
            <img className='card-images' src={study} alt=""/>
          </group>
          <div>
            <p>Study</p>
            <p className="scale">{scale === undefined ? "Select timescale" : scale[2] + " Hours"}</p>
            <span>
              <button
                className='select-timescale'
                onClick={() => {
                  setPrevOrCurr(null);
                  dispatch({ type: currentType, payload: "" });
                }}
              >
                Previous
              </button>
              <button
                className='select-timescale'
                onClick={() => {
                  setPrevOrCurr("current");
                  dispatch({ type: currentType, payload: "" });
                }}
              >
                Current
              </button>
            </span>
          </div>
        </div>
        <div className='e top'>
          <group>
            <img className='card-images' src={exercise} alt=""/>
          </group>
          <div>
            <p>Exercise</p>
            <p className="scale">{scale === undefined ? "Select timescale" : scale[3] + " Hours"}</p>
            <span>
              <button
                className='select-timescale'
                onClick={() => {
                  setPrevOrCurr(null);
                  dispatch({ type: currentType, payload: "" });
                }}
              >
                Previous
              </button>
              <button
                className='select-timescale'
                onClick={() => {
                  setPrevOrCurr("current");
                  dispatch({ type: currentType, payload: "" });
                }}
              >
                Current
              </button>
            </span>
          </div>
        </div>
        <div className='f top'>
          <group>
            <img className='card-images' src={social} alt=""/>
          </group>
          <div>
            <p>Social</p>
            <p className="scale">{scale === undefined ? "Select timescale" : scale[4] + " Hours"}</p>
            <span>
              <button
                className='select-timescale'
                onClick={() => {
                  setPrevOrCurr(null);
                  dispatch({ type: currentType, payload: "" });
                }}
              >
                Previous
              </button>
              <button
                className='select-timescale'
                onClick={() => {
                  setPrevOrCurr("current");
                  dispatch({ type: currentType, payload: "" });
                }}
              >
                Current
              </button>
            </span>
          </div>
        </div>
        <div className='g top'>
          <group>
            <img className='card-images' src={selfcare} alt=""/>
          </group>
          <div>
            <p>Self Care</p>
            <p className="scale">{scale === undefined ? "Select timescale" : scale[5] + " Hours"}</p>
            <span>
              <button
                className='select-timescale'
                onClick={() => {
                  setPrevOrCurr(null);
                  dispatch({ type: currentType, payload: "" });
                }}
              >
                Previous
              </button>
              <button
                className='select-timescale'
                onClick={() => {
                  setPrevOrCurr("current");
                  dispatch({ type: currentType, payload: "" });
                }}
              >
                Current
              </button>
            </span>
          </div>
        </div>
      </MainContentGrid>
    </MainContent>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}
