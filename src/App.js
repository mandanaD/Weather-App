import React from "react";
import "./App.css"
import Wrapper from "./hoc/Wrapper";
import Weather from "./Component/Weather/Weather";

class App extends React.Component {
    state = {}

    render() {
        return (
            <Wrapper>
                <Weather/>
            </Wrapper>
        );
    }
}

export default App;