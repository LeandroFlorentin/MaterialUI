import React from 'react'
import Landing from './components/Landing/Landing.js'
import { connect } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
    palette: {
        secondary: {
            main: '#fff',
            dark: '#fff'
        }
    }
})

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        secondary: {
            main: '#444'
        }
    }
})

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ThemeProvider theme={this.props.modo ? theme : darkTheme}>
                <Landing />
            </ThemeProvider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        modo: state.modo
    }
}

export default connect(mapStateToProps, null)(App);