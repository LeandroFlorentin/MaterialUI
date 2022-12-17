import React from 'react'
import { connect } from 'react-redux'
import { sumar, restar, traerPersonajes } from '../../redux/actions/index.js'
import {
    CardContent,
    Card,
    CardMedia,
    Typography,
    CardActionArea,
    Container,
    Grid,
    Skeleton,
    Zoom,
    Box,
    Toolbar,
    IconButton,
    AppBar,
    Stack,
    Pagination,
    TextField,
    Slide,
    Switch
} from '@mui/material';

import { Menu } from '@mui/icons-material'

class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            palabra: "",
            numero: 0
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ palabra: "bienvenido" })
            this.props.traerPersonajes()
        }, 1000)
    }

    render() {
        const handleChange = () => {
            this.props.sumar(this.props.modo)
        }
        return (
            <>
                {
                    this.props.personajes.length ?
                        <Grid container spacing={2} backgroundColor='secondary.dark'>
                            <Grid item xs={12}>
                                <Slide direction='dowm' in={this.props.personajes.length} style={{ transitionDelay: '.2s' }}>
                                    <AppBar
                                        position="fixed"
                                        color="secondary"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Toolbar>
                                            <IconButton edge="start" color="inherit" aria-label="menu" /* sx={{ mr: 2 }} */>
                                                <Menu />
                                            </IconButton>
                                        </Toolbar>
                                        <TextField
                                            id='standard-basic'
                                            label='Buscar personaje'
                                            variant='standard'
                                            sx={{ marginRight: '10px' }}
                                        />
                                        <Switch
                                            onClick={handleChange}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </AppBar>
                                </Slide>
                            </Grid>
                            <Grid item xs={12}>
                                <Box>
                                    <Container maxWidth="xl" sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        justifyContent: 'space-between',
                                        marginTop: '50px'
                                    }}>
                                        {
                                            this.props.personajes?.slice(0, 9).map((perso, ubi) => {
                                                return (
                                                    <Zoom in={true} style={{ transitionDelay: `${200 * ubi + 1}ms` }}>
                                                        <Card sx={{ maxWidth: 325, marginBottom: '20px', backgroundColor: 'primary.dark' }} key={ubi}>
                                                            <CardActionArea>
                                                                <div style={{ overflow: 'hidden' }}>
                                                                    <CardMedia
                                                                        component="img"
                                                                        height="200"
                                                                        src={perso.imagen}
                                                                        alt="green iguana"
                                                                        sx={{
                                                                            transition: '.5s all',
                                                                            "&:hover": {
                                                                                transform: 'scale(1.2)'
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                                <CardContent>
                                                                    <Typography gutterBottom variant="h5" component="div" color='secondary'>
                                                                        {perso.name}
                                                                    </Typography>
                                                                    <Typography variant="body2" color='secondary'>
                                                                        {perso.blurb}
                                                                    </Typography>
                                                                </CardContent>
                                                            </CardActionArea>
                                                        </Card>
                                                    </Zoom>
                                                )
                                            })
                                        }
                                    </Container>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Stack>
                                    <Pagination
                                        onClick={(e) => cambiarPagina(e)}
                                        variant="outlined"
                                        shape="rounded"
                                        count={this.props.personajes?.length / 9}
                                        color="primary"
                                    />
                                </Stack>
                            </Grid>
                        </Grid>
                        :
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Skeleton variant='rectangular' xs={{ width: '100%' }} height={50} />
                            </Grid>
                            <Grid item xs={12}>
                                <Container maxWidth="xl" sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between'
                                }}>
                                    {
                                        new Array(100).fill(0).map((ele, ubi) => {
                                            return (
                                                <Card sx={{ maxWidth: 325, height: "412px", marginBottom: '20px' }} key={ubi}>
                                                    <CardActionArea>
                                                        <Skeleton variant='rectangular' width={325} height={200} />
                                                        <Skeleton variant='rectangular' width={315} height={20} sx={{ margin: '30px 5px' }} />
                                                        <Skeleton variant='rectangular' width={315} height={100} sx={{ margin: '30px 5px' }} />
                                                    </CardActionArea>
                                                </Card>
                                            )
                                        })
                                    }
                                </Container>
                            </Grid>
                        </Grid>
                }
            </>
        )
    }
}

export const mapStateToProps = (state) => {
    return {
        numero: state.numero,
        personajes: state.personajes,
        modo: state.modo
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        sumar: (modo) => dispatch(sumar(modo)),
        restar: () => dispatch(restar()),
        traerPersonajes: () => dispatch(traerPersonajes()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Landing)