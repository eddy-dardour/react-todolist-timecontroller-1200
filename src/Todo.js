/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
  useRef,
} from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
/* STYLED COMPONENTS START*/
/* STYLED COMPONENTS START*/
/* STYLED COMPONENTS START*/
/* STYLED COMPONENTS START*/
/* STYLED COMPONENTS START*/
const Button = styled.button`
  font-family: "Outfit", sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 16px;
  background-color: ${({ theme }) => (theme === "DARK" ? "black" : "white")};
  border: none;
  outline: none;
  white-space: wrap;
  width: clamp(50px, 110px, 110px);
  color: purple;
  text-decoration: none;
  height: 100%;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: purple;
    color: white;
  }
`;
const ButtonInversed = styled(Button)`
  background-color: purple;
  color: white;
  &:hover {
    background-color: white;
    color: purple;
  }
`;
const HeaderWrapper = styled.header`
  background-color: black;
  width: 100%;
  height: 50px;
  border-bottom: 2px black;
  display: flex;
  justify-content: space-between;
  transition: all 0.3s ease-in-out;
`;
const MainBGAnim = keyframes`
    from {
        background-position : 0 0;
    }
    to{
        background-position: 100% 100%;
    }
`;
const MainBG = styled.main`
  background-size: 200% 200%;
  background-image: linear-gradient(
    to right,
    purple 0%,
    pink 50%,
    orange 100%
  );
  animation: ${MainBGAnim} 8s linear infinite alternate-reverse;
  width: 100%;
  display: inline-block;
  padding-bottom: 100vh;
  transition: all 0.3s ease-in-out;
`;
const MainContent = styled.main`
  transition: all 0.3s ease-in-out;
  backdrop-filter: blur(5px);
  background-color: ${({ themeAssigned }) =>
    themeAssigned === "DARK" ? "rgba(0,0,0, .6)" : "rgba(255,255,255, .6)"};
  color: ${({ themeAssigned }) =>
    themeAssigned === "DARK" ? "white" : "black"};
  width: 70%;
  padding: 20px;
  border-bottom: 60px solid
    ${({ themeAssigned }) => (themeAssigned === "DARK" ? "black" : "white")};
  margin: auto;
  margin-top: 100px;
  text-align: center;
  font-family: "Livvic", sans-serif;
  font-weight: bolder;
  .todolist {
    .todolist-button {
      margin: auto;
      height: 80px;
    }
  }
`;
const ClassicUL = styled.ul`
  background-color: purple;
  color: white;
  font-family: "Outfit", sans-serif;
  font-weight: bold;
  transform: translateY(-15%);
  li {
    &:hover {
      list-style-type: none;
      width: 100%;
      color: purple;
      background-color: white;
    }
    transition: 0.3s;
    padding: 20px;
  }
`;
const TodoItem = styled.div`
  @media screen and (width < 500px) {
    height: 50px;
  }
  color: ${({ themeAssigned }) =>
    themeAssigned === "DARK" ? "purple" : "white"};
  background-color: ${({ themeAssigned }) =>
    themeAssigned === "DARK" ? "rgba(255,255,255, .7)" : "purple"};
  height: 200px;
  padding: 10px;
  font-weight: bolder;
  margin-top: clamp(5px, 10px, 15px);
`;

const TodoInput = styled.textarea`
  background-color: ${({ theme }) => (theme === "DARK" ? "purple" : "white")};
  color: ${({ theme }) => (theme === "DARK" ? "white" : "purple")};
  width: 100%;
  border: none;
  outline: none;
  height: 30%;
  font-size: 15px;
  margin-top: 10px;
  word-break: break-word;
  white-space: pre-wrap;
  max-width: 100%;
  max-height: 50%;
  text-overflow: ellipsis;
  font-family: "Outfit", sans-serif;
  font-weight: 1200;
  transition: 0.3s all ease-in-out;
  &:focus {
    outline: 2px solid
      ${({ themeAssigned }) => (themeAssigned === "DARK" ? "white" : "purple")};
  }
`;

/* STYLED COMPONENTS END */
/* STYLED COMPONENTS END */
/* STYLED COMPONENTS END */
/* STYLED COMPONENTS END */
/* STYLED COMPONENTS END */

const ThemeContext = createContext();
const LangContext = createContext();

function Provider({ children }) {
  const [lang, dispatch] = useReducer(putLang);
  const [theme, defTheme] = useState("WHITE");
  function putLang(state, action) {
    switch (action.type) {
      case "FR":
        return (state = {
          HEADER_BUTTON_TTD: "PCT",
          HEADER_BUTTON_SELECTLANG: "Choisir une langue",
          HEADER_BUTTON_CHANGETHEME: "Changer le thème",
        });
      default:
        return (state = {
          HEADER_BUTTON_TTD: "TTD",
          HEADER_BUTTON_SELECTLANG: "Select Language",
          HEADER_BUTTON_CHANGETHEME: "Change theme",
        });
    }
  }
  function setLang(lang) {
    dispatch({ type: lang });
  }
  function setTheme(theme) {
    defTheme(theme);
  }
  useEffect(() => {
    setLang("EN");
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </LangContext.Provider>
  );
}

function Header() {
  const [langSelecOpen, openLangSelector] = useState(false);
  const { lang, setLang } = useContext(LangContext);
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <HeaderWrapper>
      <Link to='/'>
        <Button theme={theme}>{lang?.HEADER_BUTTON_TTD}</Button>
      </Link>
      <div>
        <ButtonInversed
          onClick={() => {
            theme === "DARK" ? setTheme("WHITE") : setTheme("DARK");
          }}
        >
          {lang?.HEADER_BUTTON_CHANGETHEME}
        </ButtonInversed>
        <ButtonInversed onClick={() => openLangSelector(!langSelecOpen)}>
          {lang?.HEADER_BUTTON_SELECTLANG}
        </ButtonInversed>
        <ClassicUL>
          {langSelecOpen === true ? (
            <>
              <li onClick={() => setLang("EN")}>English</li>
              <li onClick={() => setLang("FR")}>French</li>
            </>
          ) : (
            ""
          )}
        </ClassicUL>
      </div>
    </HeaderWrapper>
  );
}

function Main() {
  const { theme } = useContext(ThemeContext);
  const [todo, setTodo] = useReducer(manageTodo);
  function manageTodo(state, action) {
    switch (action.type) {
      case "ADD": {
        let arr = [{ identifier: null, keyID: null }];
        if (state === undefined) {
          return (state = [...arr]);
        } else {
          state = [...state];
          state.push({ identifier: null, keyID: null });
          return state;
        }
      }
      case "DELETE": {
        return (state = [...state].filter((el) => el.identifier === el.keyID));
      }
      case "LOG":
        console.log(state);
        return state;
      case "UPDATE": {
        if (state === undefined) {
          return state;
        }
        let arr = [...state];
        return (state = arr);
      }
      default:
        return state;
    }
  }

  useEffect(() => {
    setTodo({ type: "UPDATE" });
  }, [theme]);
  return (
    <MainBG>
      <MainContent themeAssigned={theme}>
        <p>TODO</p>
        <div className='todolist'>
          <Button
            theme={theme}
            className='todolist-button'
            onClick={() => setTodo({ type: "ADD" })}
          >
            Add a Todo
          </Button>
        </div>
        <div>
          {todo?.map((el, i) => {
            el.identifier = i;
            el.keyID = i;
            const style = {
              "width ": "40px",
              height: "40px",
            };
            return (
              <TodoItem themeAssigned={theme} key={i}>
                <div style={style}>
                  <Button
                    onClick={() => {
                      setTodo({ type: "DELETE" });
                      el.identifier = "";
                    }}
                  >
                    DELETE
                  </Button>
                </div>
                <TodoInput type='text' themeAssigned={theme} />
              </TodoItem>
            );
          })}
        </div>
      </MainContent>
    </MainBG>
  );
}

export default function Todo() {
  return (
    <>
      <Provider>
        <Header />
        <Main />
      </Provider>
    </>
  );
}
