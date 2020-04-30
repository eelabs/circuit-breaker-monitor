import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import React, {FunctionComponent} from "react";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Chart from "react-apexcharts";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 280,
            textAlign: "center",
            height: 340,
        },
        error: {
            backgroundColor: "#f8aeae"
        },
        success: {
            backgroundColor: "#acf3be"
        }
    }));

type BreakerProps = {
    success: number,
    failure: number,
    service: string,
    tripped: boolean
}

const CircuitBreaker: FunctionComponent<BreakerProps> = ({success, failure, service, tripped}) => {
    const state = {
        options: {
            tooltip: {
                enabled: false
            },
            labels: ['Success', 'Failure'],
            fill: {
                colors: ['#145a14', '#a50505']
            },
            legend: {
                show: false
            },
            plotOptions: {
                pie: {
                    expandOnClick: false,
                    donut: {
                        labels: {
                            show: true,

                        }
                    }
                }
            }

        },
        series: [success,failure],
    };
    const classes = useStyles();
    return (
        <Card className={clsx(classes.root, tripped && classes.error, !tripped && classes.success)}>
            <CardHeader title={`${tripped ? "Tripped" : "Closed"}`} subheader={service}/>
            <CardContent>
                <Chart options={state.options} series={state.series} type="donut" width="250"/>
            </CardContent>
        </Card>
    )
};

export default CircuitBreaker;