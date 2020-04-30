import React from 'react';
import CircuitBreaker from './CircuitBreaker';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import {Container} from "@material-ui/core";
import { useQuery } from '@apollo/react-hooks';
import { LOAD_BREAKERS } from './graphql'
import {Breaker, PercentageCircuitBreaker} from "./graphql/model";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: theme.spacing(2),
            backgroundColor: 'gray'
        },
    }),
);

export default function App() {
    const { loading, data } = useQuery<PercentageCircuitBreaker[]>(LOAD_BREAKERS, { });
    const classes = useStyles();
    return (
        <Container  className={clsx(classes.root)}>
            <Grid container spacing={2} direction="row" alignItems="center" justify="center">
                <Grid item xl={3}>
                    <CircuitBreaker service="Customer details" success={46} failure={4} tripped={false}/>
                </Grid>
                <Grid item xl={3}>
                    <CircuitBreaker service="Address lookup" success={92} failure={8} tripped={true}/>
                </Grid>
                <Grid item xl={3}>
                        <CircuitBreaker service="Payment details" success={92} failure={8} tripped={false}/>
                </Grid>
                <Grid item xl={3}>
                        <CircuitBreaker service="Place order" success={92} failure={8} tripped={false}/>
                </Grid>
            </Grid>
        </Container>
    );
}

