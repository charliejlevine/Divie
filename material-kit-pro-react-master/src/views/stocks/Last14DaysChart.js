import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Card, CardContent, Typography, useTheme } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLast14Days } from '../../actions/dataActions';
import LoadingScreen from '../../components/LoadingScreen';
import { Box, LinearProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    minHeight: '100%',
    padding: theme.spacing(3)
  }
}));

function Last14DaysChart() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const classes = useStyles();

  // acts as a componentDidMount
  useEffect(() => {
    dispatch(fetchLast14Days('TSLA'));
  }, []);

  // getting isLoaded field from global state
  const isLoaded = useSelector(state => state.data.isLoaded);
  const data = useSelector(state => state.data.items);

  // show animation while data gets loaded
  if (!isLoaded)
    return (
      <Card>
        <CardContent>
          <div className={classes.root}>
            <Box width={400}>
              <LinearProgress />
            </Box>
          </div>
        </CardContent>
      </Card>
    );

  const chart = {
    options: {
      chart: {
        background: theme.palette.background.paper,
        stacked: false,
        toolbar: {
          show: false
        },
        zoom: false
      },
      colors: ['#1f87e6', '#ff5c7c'],
      dataLabels: {
        enabled: false
      },
      grid: {
        borderColor: theme.palette.divider,
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: theme.palette.text.secondary
        }
      },
      markers: {
        size: 4,
        strokeColors: ['#1f87e6', '#27c6db'],
        strokeWidth: 0,
        shape: 'circle',
        radius: 2,
        hover: {
          size: undefined,
          sizeOffset: 2
        }
      },
      stroke: {
        width: 3,
        curve: 'smooth',
        lineCap: 'butt',
        dashArray: [0, 3]
      },
      theme: {
        mode: theme.palette.type
      },
      tooltip: {
        theme: theme.palette.type
      },
      xaxis: {
        axisBorder: {
          color: theme.palette.divider
        },
        axisTicks: {
          show: true,
          color: theme.palette.divider
        },
        categories: [
          data[0].date,
          data[1].date,
          data[2].date,
          data[3].date,
          data[4].date,
          data[5].date,
          data[6].date,
          data[7].date,
          data[8].date,
          data[9].date,
          data[10].date,
          data[11].date,
          data[12].date,
          data[13].date
        ],
        labels: {
          style: {
            colors: theme.palette.text.secondary
          }
        }
      },
      yaxis: [
        {
          axisBorder: {
            show: true,
            color: theme.palette.divider
          },
          axisTicks: {
            show: true,
            color: theme.palette.divider
          },
          labels: {
            style: {
              colors: theme.palette.text.secondary
            }
          }
        },
        {
          axisTicks: {
            show: true,
            color: theme.palette.divider
          },
          axisBorder: {
            show: true,
            color: theme.palette.divider
          },
          labels: {
            style: {
              colors: theme.palette.text.secondary
            }
          },
          opposite: true
        }
      ]
    },
    series: [
      {
        name: 'Open',
        data: [
          data[0].open,
          data[1].open,
          data[2].open,
          data[3].open,
          data[4].open,
          data[5].open,
          data[6].open,
          data[7].open,
          data[8].open,
          data[9].open,
          data[10].open,
          data[11].open,
          data[12].open,
          data[13].open
        ]
      },
      {
        name: 'Close',
        data: [
          data[0].close,
          data[1].close,
          data[2].close,
          data[3].close,
          data[4].close,
          data[5].close,
          data[6].close,
          data[7].close,
          data[8].close,
          data[9].close,
          data[10].close,
          data[11].close,
          data[12].close,
          data[13].close
        ]
      }
    ]
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" color="textPrimary">
          Tesla
        </Typography>
        <Chart type="line" height="300" {...chart} />
      </CardContent>
    </Card>
  );
}

export default Last14DaysChart;
