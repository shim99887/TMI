import React, { useState } from "react";
import Markdown from "react-markdown";
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
      setModalTestDetailOpen(true);
    } else if (id == 3) {
      setModalCoverageDetailOpen(true);
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
      description:
        "빌드 도구 중 Maven에 대해서 플러그인을 개발하였습니다.\n플러그인을 통해 빌드 즉시 Jacoco와 테스트에 대한 리포트를\n분석하여 TMI 서버로 데이터를 전송합니다.",
    },
    {
      id: 1,
      url: "../assets/images/about/ProjectDetail.png",
      title: "프로젝트, App 관리",
      description:
        "사내에서 진행하고 있는 프로젝트, 그리고 해당 프로젝트 내에 속해\n있는 Application의 목록을 확인하고, 가장 최근 빌드에 대한 커버리지,\n테스트 데이터를 확인할 수 있습니다.",
    },
  ];
  const cardList2 = [
    {
      id: 2,
      url: "../assets/images/about/TestDetail.png",
      title: "테스트 수행 이력 / Detail 리포트",
      description:
        "Junit 단위 테스트 결과를 통한 Surefire report를 조회하여\n최근 빌드와 과거의 빌드에 대한 테스트 성공률과 테스트 실패 로그를\n조회할 수 있습니다.",
    },
    {
      id: 3,
      url: "../assets/images/about/CoverageDetail.png",
      title: "코드 커버리지 이력 / Detail 리포트",
      description:
        "JaCoCo 커버리지 결과 중\n Line Coverage, Branch Coverage의 수치를 최근 빌드와 과거 빌드에\n대해 조회할 수 있습니다.",
    },
  ];
  const cardList3 = [
    {
      url: "../assets/images/about/P1.jpg",
      title: "김영록",
      description: "백엔드\nshim99887@gmail.com",
    },
    {
      url: "../assets/images/about/P2.jpg",
      title: "백현오",
      description: "프론트엔드\nsss42850@gmail.com",
    },
    {
      url: "../assets/images/about/P3.jpg",
      title: "이병희",
      description: "프론트엔드\nbyeonghui1543@gmail.com",
    },
    {
      url: "../assets/images/about/P4.jpg",
      title: "전원표",
      description: "프론트엔드\njwp0530@gmail.com",
    },
    {
      url: "../assets/images/about/P5.jpg",
      title: "최낙훈",
      description: "백엔드\ncnh0214@hansung.ac.kr",
    },
    {
      url: "../assets/images/about/P6.jpg",
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
          <Markdown>TMI? Too Much Information? No!</Markdown>
          <br />
          <Markdown>테스트와 커버리지 결과를 관리하는 시스템입니다.</Markdown>
          <br />
          <Markdown>
            오픈소스인 JaCoCo를 통해 Spring project의 Line Coverage, Branch
            Coverage에 대한 정보를 얻어오고, Surefire Report를 통해 Junit, 단위
            테스트 결과를 얻어옵니다.
          </Markdown>
          <br />
          <br />

          <Markdown>
            {`
- Code Coverage 란? 테스트 케이스가 얼마나 충족되었는 지를 나타내는 지표 중 하나로, 코드 자체가 얼마나 실행되었는 지를 수치를 통해 확인할 수 있습니다.
    - 예를 들어, Line Coverage는 코드 전체 100줄 중 몇 줄에 접근했는 지를 나타내는 수치이고,
    - Branch Coverage는 소스의 조건문(분기문)의 조건이 true / false 전부 해당 되어 접근이 가능한 지를 나타내는 수치 입니다.
- 단위 테스트란? 소스 코드의 특정 메소드, 모듈이 의도된 대로 정확한 값을 도출해 내는 지 검증하는 절차로, 모든 메소드에 대해 테스트 케이스를 작성하여 확인하는 절차를 칭합니다. Java에서는 Junit을 이용하여 assertTMI() 등의 함수를 통해 테스트 되어집니다.
            `}
          </Markdown>
          <br />

          <Markdown>
            한번 빌드될 때마다 Jacoco와 단위 테스트 결과가 기록이 되며, 가장
            최근 빌드의 결과가 App list에서 보여집니다.
          </Markdown>
          <br />
          <br />

          <Markdown>
            ### 자, 여러분 프로젝트의 Code Coverage는 몇 %인가요?
          </Markdown>
          <br />
          <Markdown>
            *** 중요! 저희 서비스는 한 Repository 당 한개의 Application(Spring
            project)을 기준으로 하고 있습니다!
          </Markdown>
          <br />
          <Markdown>*** App = Spring Project 의 의미입니다.</Markdown>
          <br />
          <Markdown>
            *** App 에 대한 Github / Gitlab 주소를 가지고 구별하기 때문에 Git
            repository 주소가 바뀌면 다른 App으로 인식합니다.
          </Markdown>
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
            {/* <Grid item xs={12}>
              <br />
              <AboutCard
                cardList={cardList2}
                xs={6}
                detail={1}
                imageHeight={347.625}
              />
            </Grid> */}
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
