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

interface CircuitBreakersData {
    circuitBreakers: [PercentageCircuitBreaker]
}

export default function App() {
    const { loading, data } = useQuery<CircuitBreakersData>(LOAD_BREAKERS, { });
    const classes = useStyles();
    if (data && data.circuitBreakers && data.circuitBreakers.length > 0) {
        return (
            <Container  className={clsx(classes.root)}>
                <Grid container spacing={2} direction="row" alignItems="center" justify="center">
                    { data.circuitBreakers.map( breaker => {
                        return (
                            <Grid item xl={3}>
                                <CircuitBreaker service={breaker.service} success={breaker.values.successCount} failure={breaker.values.failedCount} tripped={breaker.status == "TRIPPED"}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        )
    } else {
        return (
            <Container  className={clsx(classes.root)}>
                <Grid container spacing={2} direction="row" alignItems="center" justify="center">
                    <Grid item xl={3}>
                        No breakers to display
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

