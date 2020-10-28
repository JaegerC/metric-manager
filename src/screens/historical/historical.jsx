import React, { useState, useRef, useLayoutEffect } from 'react';
import { Paper, FormControl, InputLabel, Select, MenuItem, Grid, Button, Typography } from '@material-ui/core';
import { useStyles } from './historical.styles';
// import { Chart } from "react-google-charts";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import moment from 'moment';
import 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { getHistoricalByFilter } from '../../redux/device/actions';
import CircularLoading from '../../components/loading/circularLoading';

const Historical = () => {
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    const chart = useRef(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const { isLoading, success, data } = useSelector(state => state.historicalData);
    const [type, setType] = useState('');
    const [fromDate, setFromDate] = useState(moment().format());
    const [toDate, setToDate] = useState(moment().format());

    useLayoutEffect(() => {
        const x = am4core.create("chartDiv", am4charts.XYChart);
        if (success && data && data.id !== undefined) {
            x.paddingRight = 20;
            x.dateFormatter.dateFormat = "yyyy-MM-dd";
            chart.current = x;
            const chart_data = [];

            chart.current.paddingRight = chart_data.length;
            let series_type = [];
            let group_data = {}
            for (const item of data.metrics) {
                if (!series_type.includes(item.type)) {
                    series_type.push(item.type);
                }
            }

            if (series_type.length > 1) {
                for (const item of data.metrics) {
                    const key = moment(item.createdAt).format('YYYY-MM-DD hh:mm:ss');
                    if (group_data[key] !== undefined) {
                        group_data[key].push(item);
                    } else {
                        group_data[key] = [item];
                    }
                }

                let aux_Obj = {};
                series_type.forEach(type => {
                    aux_Obj = {
                        ...aux_Obj,
                        [type]: 0
                    }
                });
                Object.keys(group_data).forEach(key => {
                    let base_copy = Object.assign(aux_Obj, {});
                    base_copy = {
                        ...base_copy,
                        date: moment(key).toDate()
                    }
                    for (const it of group_data[key]) {
                        base_copy[it.type] = Number(it.value);
                    }
                    chart_data.push(base_copy)
                });
            } else {
                for (const item of data.metrics) {
                    chart_data.push({ date: moment(item.createdAt).toDate(), [item.type]: Number(item.value) });
                }
            }

            x.data = chart_data;
            x.dataProvider = chart_data;

            let dateAxis = x.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.dateFormatter.dateFormat = "MM-dd";
            dateAxis.dateFormats.setKey("day", "MMMM dt");
            dateAxis.periodChangeDateFormats.setKey("day", "MMMM dt");
            dateAxis.baseInterval = {
                timeUnit: "minute",
                count: 1
            }

            let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = false;
            valueAxis.renderer.minWidth = 35;

            for (const serie of series_type) {
                const series = x.series.push(new am4charts.LineSeries());
                series.name = serie
                series.dataFields.dateX = "date";
                series.dataFields.valueY = serie;
                series.tooltipText = `[#000]Nivel de ${serie}: {valueY.value}`;
                series.tooltip.background.fill = am4core.color("#FFF");
                series.tooltip.getStrokeFromObject = true;
                series.tooltip.background.strokeWidth = 3;
                series.tooltip.getFillFromObject = false;
                series.fillOpacity = 0.6;
                series.strokeWidth = 2;
                series.stacked = true;

                x.cursor = new am4charts.XYCursor();

                const scrollbarX = new am4charts.XYChartScrollbar();
                scrollbarX.series.push(series);
                x.scrollbarX = scrollbarX;
            }


            x.legend = new am4charts.Legend();
            x.legend.position = "top";

            x.validateData();
        }

        return () => {
            x.dispose();
        }
    }, [success, data]);

    const handleChange = (event) => {
        setType(event.target.value);
    };

    const handleToDate = (date) => {
        setToDate(date)
    };

    const handleFromDate = (date) => {
        setFromDate(date);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getHistoricalByFilter({ uuid: "fceb22fb-dbd8-4069-8919-e7dbccf65c44", type, fromDate, toDate }))
    }

    if (isLoading) {
        return <CircularLoading isLoading={isLoading} />
    }

    return (
        <>
            <Paper elevation={10} className={classes.paper}  >
                <div className={classes.title}>Historicos</div>
                <div className={classes.filters} >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Tipo</InputLabel>
                                <Select
                                    color="primary"
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={type}
                                    onChange={handleChange}
                                    label="Tipo"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"Humedad"}>Humedad</MenuItem>
                                    <MenuItem value={"Luz"}>Luz</MenuItem>
                                    <MenuItem value={"Temperatura"}>Temperatura</MenuItem>
                                </Select>
                            </FormControl>
                            <KeyboardDatePicker
                                disableToolbar={false}
                                autoOk={true}
                                variant="inline"
                                format="YYYY/MM/DD"
                                margin="normal"
                                id="date-picker-inline-from"
                                label="Desde"
                                value={fromDate}
                                onChange={handleFromDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                disableToolbar={false}
                                autoOk={true}
                                variant="inline"
                                format="YYYY/MM/DD"
                                margin="normal"
                                id="date-picker-inline-to"
                                label="Hasta"
                                value={toDate}
                                onChange={handleToDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <Button onClick={handleSubmit} >Buscar</Button>
                        </Grid>
                    </MuiPickersUtilsProvider>
                </div>
                <div>{
                    data && data.id &&
                    <>
                        <div className={classes.title}>{data.hostname} - {data.name}</div>
                        {
                            data.metrics && data.metrics.length > 0 ?
                                <div id="chartDiv" style={{ width: '100%', height: '500px' }} ></div>
                                :
                                <Typography>No hay elementos disponibles</Typography>

                        }
                    </>
                }
                </div>
            </Paper>
        </>
    );
};

export default Historical;