# TMI ( Test automation Management Infrastucture )

## SSAFY X SAMSUNG SDS (기업연계 프로젝트 )

- [TMI Notion](https://www.notion.so/longnh214/d13c839d33b94377b138427b4d743a7a?v=4ba79c8783a9492c864e3f640ead7cde)
- [TMI UCC](https://youtu.be/3215TBTZJ1I)
## 프로젝트 개요

- **진행기간** : 2021.04.12 ~ (ing)
- **만든이** : 강세준, 김영록, 백현오, 이병희, 전원표, 최낙훈
- **기획 배경** : 
  - 테스트 자동화란, 테스트 과정 일부 또는 전체를 수작업이 아닌 자동화된 프로그램을 통해서 수행하는 기법
  - 현업에서는 이런 테스트 자동화를 거치고 난 후에 배포가 이뤄짐

## Document

<details>
    <summary> Wireframe</summary>
    <ul>
      
![ProjectList.png](docs/Wireframe/ProjectList.png)
      
![ProjectDetail.png](docs/Wireframe/ProjectDetail.png)

![image](https://github.com/shim99887/TMI/assets/31751611/ee7fea0b-b36d-4046-82e7-ee5b2a399f6f)

![TestJobList.png](docs/Wireframe/TestJobList.png)
    </ul>
</details>
<details>
    <summary> Architecture </summary>
    <ul>
      
![architecture.png](docs/Architecture/architecture.png)
    </ul>
</details>
<details>
    <summary> Sequence Diagram </summary>
    <ul>
      
![image](https://github.com/shim99887/TMI/assets/31751611/70783105-9589-4cac-860e-34756480fc3a)

![image](https://github.com/shim99887/TMI/assets/31751611/1fdf5e2e-cbeb-4be5-9b68-8297c4624ac4)

  </ul>
</details>

<details>
    <summary> Milestone</summary>
    <ul>
      
![MileStone](docs/MileStone/MileStone.png)
    </ul>
</details>

<details>
    <summary> ERD Diagram</summary>
    <ul>
      
![erd](docs/ERD_diagram/erd.png)
    </ul>
</details>





## Tech Stack

![tech_stack](docs/Tech_stack/tech_stack.png)





## Capture Image

프로젝트 목록

![projectlist](docs/Capture/projectlist.png)




프로젝트 내 App 목록

![projectdetail](docs/Capture/projectdetail.png)




App history 화면

![projecthistory](docs/Capture/apphistory.png)



Unit Test 결과

![testhistory](docs/Capture/testhistory.png)




커버리지 상세 화면 및 클래스 별 커버리지 화면

![coveragehistory](docs/Capture/coveragehistory.png)

![coveragedetail](docs/Capture/coveragedetail.png)







# Build Guideline



## Plug-in

### 

### Maven Project

* Path : `/backend/tmi-maven-plugin`



```
mvn clean package
```



* 빌드 이후에 나온 jar 파일을 확인하고 싶은 프로젝트 아래 lib 폴더에 저장





## Main Server





### Spring Project

* Path : `/backend/TmiProject`

```shell
mvn clean package
cd target
nohup java -jar *.jar &
```





## Data Server



### Spring Project

* Path : `/backend/TMI`

```
mvn clean package
cd target
nohup java -jar *.jar &
```





## Frontend React

* Path : `/frontend`

```shell
npm i
npm run build
```
