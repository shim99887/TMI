import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Divider,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: 400,
  },
});

function AboutCard(props) {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3}>
        {props.cardList.map((data) => (
          <Grid item xs={4}>
            <Card className={classes.root}>
              <CardMedia component="img" height="227.25" image={data.url} />
              <CardContent style={{ padding: 12 }}>
                <Typography gutterBottom variant="h6">
                  {data.title.split("\n").map((line) => {
                    return (
                      <span>
                        {line}
                        <br />
                      </span>
                    );
                  })}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {data.description.split("\n").map((line) => {
                    return (
                      <span>
                        {line}
                        <br />
                      </span>
                    );
                  })}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default function About() {
  const cardList1 = [
    {
      url: "u",
      title: "테스트 결과 수집 / 전송 플러그인",
      description: "nnnnnnnnnnn\nnnnnnnnnnnnn\nnnnnnnnnnn",
    },
    {
      url: "u",
      title: "프로젝트, App 관리",
      description: "nnnnnnnnnnn\nnnnnnnnnnnnn\nnnnnnnnnnn",
    },
  ];
  const cardList2 = [
    {
      url: "u",
      title: "테스트 수행 이력 리포트",
      description: "nnnnnnnnnnn\nnnnnnnnnnnnn\nnnnnnnnnnn",
    },
    {
      url: "u",
      title: "테스트 Detail 리포트",
      description: "nnnnnnnnnnn\nnnnnnnnnnnnn\nnnnnnnnnnn",
    },
    {
      url: "u",
      title: "코드 커버리지 리포트",
      description: "nnnnnnnnnnn\nnnnnnnnnnnnn\nnnnnnnnnnn",
    },
  ];
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h4" color="primary">
              Introduce
            </Typography>
            <Typography variant="h4" display="inline" color="primary">
              T
            </Typography>
            <Typography variant="h5" display="inline">
              est automation{" "}
            </Typography>
            <Typography variant="h4" display="inline" color="primary">
              M
            </Typography>
            <Typography variant="h5" display="inline">
              anagement{" "}
            </Typography>
            <Typography variant="h4" display="inline" color="primary">
              I
            </Typography>
            <Typography variant="h5" display="inline">
              nfrastructure
            </Typography>
            <br />
            <br />
            <Typography>
              테스트 결과를 수집/분석하는 테스트 자동화 관리 시스템
              <br />
              aaaaaaaaaaaaaaaaaaa
              <br />
              bbbbbbbbbbbbbbbbb
              <br />
              ccccccccccccc
              <br />
              dddddddddddd
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4" color="primary">
                  Feature
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <AboutCard cardList={cardList1} />
              </Grid>
              <Grid item xs={12}>
                <AboutCard cardList={cardList2} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" color="primary">
            About Us
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
