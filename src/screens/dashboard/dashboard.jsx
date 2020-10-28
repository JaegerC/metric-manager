import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// MUI Components
import { Paper } from '@material-ui/core';
// Styles
import { useStyles } from './dashboard.styles';
import moment from 'moment';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// Actions
import { getHistoricalByFilter } from '../../redux/device/actions';
import { GET_METRICS_HISTORICAL_BY_FILTER_RESET } from '../../redux/actionTypes';
// const DAY_MINUTES = 1440;
const DashBoard = () => {
    am4core.useTheme(am4themes_material);
    // am4core.useTheme(am4themes_animated);
    const chart = useRef(null);
    const chartPercents = useRef(null);
    const activityChart = useRef(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { isLoading, data } = useSelector(state => state.historicalData);
    const { realtime_devices, connected } = useSelector(state => state.realTimeDevices)
    const [user_devices, setUserDevices] = useState([]);
    const date_begin = moment().subtract(1, 'week').startOf('week').format();
    const date_end = moment().subtract(1, 'week').endOf('week').format();

    useEffect(() => {
        if (user && user.devices.length > 0) {
            dispatch(getHistoricalByFilter({ uuid: user.devices[0].uuid, type: '', fromDate: date_begin, toDate: date_end }))
        }
        return () => {
            dispatch({
                type: GET_METRICS_HISTORICAL_BY_FILTER_RESET
            });
        }
    }, [dispatch, user, date_begin, date_end]);

    useEffect(() => {
        const chart = am4core.create("percentsChart", am4charts.XYChart);
        const chartActivity = am4core.create("activityChart", am4charts.XYChart);
        if (!isLoading && data && data.id) {
            const { metrics } = data;
            if (metrics.length > 0) {
                const types = {};
                const percents = {};
                console.log(moment(date_end).days());
                let dates = {};
                for (let day = moment(date_begin).days(); day <= moment(date_end).days(); day++) {
                    const key = moment(date_begin).add(day, 'day').format('YYYY-MM-DD');
                    if (dates[key] === undefined) {
                        dates = {
                            ...dates,
                            [key]: []
                        }
                    }
                }

                metrics.forEach(metric => {
                    const key = moment(metric.createdAt).format("YYYY-MM-DD");
                    if (dates[key]) {
                        dates[key].push(1);
                    }
                    if (percents[metric.type] === undefined) {
                        percents[metric.type] = {};
                    }
                    if (types[key] !== undefined) {
                        if (types[key][metric.type] !== undefined) {
                            let current_value = types[key][metric.type].value;
                            let current_count = types[key][metric.type].count;
                            current_value += Number(metric.value);
                            current_count += 1;
                            types[key] = {
                                ...types[key],
                                [metric.type]: {
                                    value: current_value,
                                    count: current_count
                                }
                            };
                        } else {
                            types[key] = {
                                ...types[key],
                                [metric.type]: {
                                    value: Number(metric.value),
                                    count: 1
                                }
                            };
                        }
                    } else {
                        types[key] = {
                            ...types[key],
                            [metric.type]: {
                                value: Number(metric.value),
                                count: 1
                            }
                        }
                    }
                });


                const activity_data = Object.keys(dates).map(key => ({ day: key, activity: dates[key].length > 0 ? dates[key].length : 0 }));
                if (activity_data.length > 0) {
                    createActivityChart(chartActivity, activity_data);
                    activityChart.current = activityChart;
                }

                let days = 0;
                Object.keys(types).forEach(type => {
                    days += 1;
                    Object.keys(types[type]).forEach(metric_key => {
                        if (percents[metric_key]) {
                            const percent = types[type][metric_key].value / types[type][metric_key].count;
                            percents[metric_key] = percent;
                        }
                    })
                });

                Object.keys(percents).forEach(key => {
                    percents[key] = percents[key] / days;
                });
                const data = Object.keys(percents).map(key => ({ sensor: key, value: (percents[key] * 100) }))

                if (data.length > 0) {
                    createPercentsChart(chart, data);
                }
                chartPercents.current = chart;

            }
        }

        return () => {
            chart.dispose();
            chartActivity.dispose();
        }
    }, [isLoading, data, date_begin, date_end])
    useLayoutEffect(() => {
        const x = am4core.create("realTimeChart", am4charts.XYChart);
        if (!chart.current) {
            x.paddingRight = 20;
            x.dateFormatter.dateFormat = "yyyy-MM-dd";
            x.data = [{
                Luz: 0,
                Humedad: 0,
                Temperatura: 0,
                date: moment().toDate()
            }];

            let dateAxis = x.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.dateFormatter.dateFormat = "MM-dd";
            dateAxis.dateFormats.setKey("day", "MMMM dt");
            dateAxis.periodChangeDateFormats.setKey("day", "MMMM dt");
            dateAxis.baseInterval = {
                timeUnit: "seconds",
                count: 20
            }

            let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = false;
            valueAxis.renderer.minWidth = 35;
            x.legend = new am4charts.Legend();
            x.legend.position = "top";
            chart.current = x;
        }
        return () => {
            x.dispose();
        };
    }, [])
    useLayoutEffect(() => {
        for (const device of realtime_devices) {
            if (!user_devices.find(userd => userd.uuid === device.uuid)) {
                if (chart.current) {
                    for (const key in device.metrics[0]) {
                        if (key !== 'date') {
                            const series = chart.current.series.push(new am4charts.LineSeries());
                            series.name = key
                            series.dataFields.dateX = "date";
                            series.dataFields.valueY = key;
                            series.tooltipText = `[#000]Nivel de ${key}: {valueY.value}`;
                            series.tooltip.background.fill = am4core.color("#FFF");
                            series.tooltip.getStrokeFromObject = true;
                            series.tooltip.background.strokeWidth = 3;
                            series.tooltip.getFillFromObject = false;
                            series.fillOpacity = 0.6;
                            series.strokeWidth = 2;
                            series.stacked = true;

                            chart.current.cursor = new am4charts.XYCursor();

                            const scrollbarX = new am4charts.XYChartScrollbar();
                            scrollbarX.series.push(key);
                            chart.current.scrollbarX = scrollbarX;
                        }
                    }
                }
                setUserDevices(user_devices => [...user_devices, device]);
            } else {
                const currentIndex = user_devices.findIndex(userd => userd.uuid === device.uuid);
                if (currentIndex >= 0) {
                    if (user_devices[currentIndex].metrics) {
                        if (device.metrics) {
                            user_devices[currentIndex].metrics = device.metrics;
                        }
                    }
                }
            }
        }
    }, [realtime_devices, connected, user_devices])

    if (user_devices && user_devices[0] && user_devices[0].metrics) {
        const x = chart.current;
        x.data = user_devices[0].metrics;
        x.validateData();
    }

    const createActivityChart = (chart, data) => {
        chart.data = data;
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "day";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;

        categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
            if (target.dataItem && target.dataItem.index & 2 === 2) {
                return dy + 25;
            }
            return dy;
        });

        let valueAxis = chart.yAxes.push(new am4charts.DurationAxis());
        valueAxis.baseUnit = "minute"
        valueAxis.title.text = "Minutos"
        valueAxis.renderer.ticks.template.disabled = false;
        valueAxis.renderer.ticks.template.strokeOpacity = 1;
        valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
        valueAxis.renderer.ticks.template.strokeWidth = 2;
        valueAxis.renderer.ticks.template.length = 10;
        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "activity";
        series.dataFields.categoryX = "day";
        series.name = "Dia";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/] mins";
        series.columns.template.fillOpacity = .8;

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
    }

    const createPercentsChart = (chart, data) => {
        chart.padding(40, 40, 40, 40);
        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "sensor";
        categoryAxis.renderer.minGridDistance = 1;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.grid.template.disabled = true;

        let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;

        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryY = "sensor";
        series.dataFields.valueX = "value";
        series.tooltipText = `{valueX.value}%`
        series.columns.template.strokeOpacity = 0;
        series.columns.template.column.cornerRadiusBottomRight = 5;
        series.columns.template.column.cornerRadiusTopRight = 5;

        let labelBullet = series.bullets.push(new am4charts.LabelBullet())
        labelBullet.label.horizontalCenter = "left";
        labelBullet.label.dx = 10;
        labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
        labelBullet.locationX = 1;

        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        series.columns.template.adapter.add("fill", function (fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
        });

        categoryAxis.sortBySeries = series;
        chart.data = data;
    }

    return (
        <>
            <Paper elevation={10} className={classes.paper} >
                <div className={classes.title}>Dispositivo ACH-001 - {user_devices.length > 1 ? 'Conectado' : 'Desconectado'}</div>
                <div>
                    <div id="realTimeChart" style={{ width: '100%', height: '40vh' }} ></div>
                </div>

            </Paper>
            <div className={classes.bottom_container} >
                <div className={classes.botom1}>
                    <Paper elevation={10}>
                        <div style={{ padding: '15px', height: '300px' }}>
                            <div
                                style={{
                                    height: '34px',
                                    textAlign: 'center',
                                    font: 'normal normal normal 26px/34px Roboto',
                                    letterSpacing: '0px',
                                    color: '#576271',
                                    opacity: 1
                                }}
                            >Metricas semana anterior</div>
                            <div id="percentsChart" style={{ width: '100%', height: '90%' }} ></div>
                        </div>
                    </Paper>
                </div>
                <div className={classes.botom2}>
                    <Paper elevation={10}>
                        <div style={{ padding: '15px', height: '300px' }}>
                            <div
                                style={{
                                    height: '34px',
                                    textAlign: 'center',
                                    font: 'normal normal normal 26px/34px Roboto',
                                    letterSpacing: '0px',
                                    color: '#576271',
                                    opacity: 1
                                }}
                            >Actividad semana anterior</div>
                            <div id="activityChart" style={{ width: '100%', height: '90%' }} ></div>
                        </div>
                    </Paper>
                </div>
            </div>
        </>
    );
}

export default DashBoard;