import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Modal,
} from "@material-ui/core";
import Plugin from "../components/about/Plugin";
import ProjectDetail from "../components/about/ProjectDetail";
import CoverageDetail from "../components/about/CoverageDetail";
import TestDetail from "../components/about/TestDetail";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  learnMore: {
    position: "absolute",
    width: "35vw",
    height: "90vh",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
  },
}));

function AboutCard(props) {
  const [modalPluginOpen, setModalPluginOpen] = useState(false);
  const [modalProjectDetailOpen, setModalProjectDetailOpen] = useState(false);
  const [modalCoverageDetailOpen, setModalCoverageDetailOpen] = useState(false);
  const [modalTestDetailOpen, setModalTestDetailOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();

  const modalPlugin = (
    <div style={modalStyle} className={classes.learnMore}>
      <Plugin />
    </div>
  );

  const modalProjectDetail = (
    <div style={modalStyle} className={classes.learnMore}>
      <ProjectDetail />
    </div>
  );
  const modalCoverageDetail = (
    <div style={modalStyle} className={classes.learnMore}>
      <CoverageDetail />
    </div>
  );
  const modalTestDetail = (
    <div style={modalStyle} className={classes.learnMore}>
      <TestDetail />
    </div>
  );

  function modalOpen(id) {
    if (id == 0) {
      setModalPluginOpen(true);
    } else if (id == 1) {
      setModalProjectDetailOpen(true);
    } else if (id == 2) {
      setModalCoverageDetailOpen(true);
    } else if (id == 3) {
      setModalTestDetailOpen(true);
    }
  }

  return (
    <>
      <Grid container spacing={3}>
        {props.cardList.map((data) => (
          <Grid item xs={props.xs}>
            <Card hegiht={400}>
              <CardMedia
                component="img"
                height={props.imageHeight}
                image={data.url}
              />
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
              {props.detail ? (
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => modalOpen(data.id)}
                  >
                    Learn More
                  </Button>
                </CardActions>
              ) : (
                <></>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={
          modalPluginOpen ||
          modalProjectDetailOpen ||
          modalTestDetailOpen ||
          modalCoverageDetailOpen
        }
        onClose={() => {
          setModalPluginOpen(false);
          setModalProjectDetailOpen(false);
          setModalTestDetailOpen(false);
          setModalCoverageDetailOpen(false);
        }}
      >
        {modalPluginOpen ? (
          modalPlugin
        ) : modalProjectDetailOpen ? (
          modalProjectDetail
        ) : modalTestDetailOpen ? (
          modalTestDetail
        ) : modalCoverageDetailOpen ? (
          modalCoverageDetail
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
}

export default function About() {
  const cardList1 = [
    {
      id: 0,
      url: "../assets/images/about/Logo.png",
      title: "테스트 결과 수집 / 전송 플러그인",
      description: "nnnnnnnnnnn\nnnnnnnnnnnnn\nnnnnnnnnnn",
    },
    {
      id: 1,
      url: "../assets/images/about/ProjectDetail.png",
      title: "프로젝트, App 관리",
      description: "nnnnnnnnnnn\nnnnnnnnnnnnn\nnnnnnnnnnn",
    },
  ];
  const cardList2 = [
    {
      id: 2,
      url: "../assets/images/about/TestDetail.png",
      title: "테스트 수행 이력 / Detail 리포트",
      description: "nnnnnnnnnnn\nnnnnnnnnnnnn\nnnnnnnnnnn",
    },
    {
      id: 3,
      url: "../assets/images/about/CoverageDetail.png",
      title: "코드 커버리지 이력 / Detail 리포트",
      description: "nnnnnnnnnnn\nnnnnnnnnnnnn\nnnnnnnnnnn",
    },
  ];
  const cardList3 = [
    {
      url: "../assets/images/about/P1.jpg",
      title: "김영록",
      description: "백엔드",
    },
    {
      url: "../assets/images/about/P2.jpg",
      title: "백현오",
      description: "프론트엔드",
    },
    {
      url: "../assets/images/about/P3.jpg",
      title: "이병희",
      description: "프론트엔드",
    },
    {
      url: "../assets/images/about/P4.jpg",
      title: "전원표",
      description: "프론트엔드",
    },
    {
      url: "../assets/images/about/P5.jpg",
      title: "최낙훈",
      description: "백엔드",
    },
    {
      url: "u",
      title: "강세준",
      description: "-",
    },
  ];
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Typography variant="h4" color="primary">
            Introduce
          </Typography>
          <br />
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
            설명글설명글설명글설명글설명글설명글설명글설명글설명글
            <br />
            설명글설명글설명글설명글설명글설명글설명글설명글설명글
            <br />
            설명글설명글설명글설명글설명글설명글설명글설명글설명글
            <br />
            설명글설명글설명글설명글설명글설명글설명글설명글설명글
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <br />
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" color="primary">
                Feature
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <AboutCard
                cardList={cardList1}
                xs={6}
                detail={1}
                imageHeight={347.625}
              />
            </Grid>
            <Grid item xs={12}>
              <br />
              <AboutCard
                cardList={cardList2}
                xs={6}
                detail={1}
                imageHeight={347.625}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <br />
          <br />
          <Typography variant="h4" color="primary">
            About Us
          </Typography>
          <Grid item xs={12}>
            <br />
            <AboutCard
              cardList={cardList3}
              xs={2}
              detail={0}
              imageHeight={250}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
