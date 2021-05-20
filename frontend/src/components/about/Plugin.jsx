import React, { useEffect } from "react";
import Markdown from "react-markdown";
import { Button, Box } from "@material-ui/core";
import FileDownloadOutlinedIcon from "@material-ui/icons/FileDownloadOutlined";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Plugin() {
  const codeString = `
  <properties>
	  <jacoco.version>0.8.5</jacoco.version>
	  <maven.test.failure.ignore>true</maven.test.failure.ignore>
	  <!-- other properties -->
  </properties>
  
  <dependencies>
	  <dependency>
			  <groupId>org.springframework.boot</groupId>
			  <artifactId>spring-boot-starter-test</artifactId>
			  <scope>test</scope>
			  <exclusions>
				  <exclusion>
					  <groupId>org.junit.vintage</groupId>
					  <artifactId>junit-vintage-engine</artifactId>
				  </exclusion>
			  </exclusions>
	  </dependency>
	  <dependency>
			  <groupId>org.apache.maven.plugins</groupId>
			  <artifactId>maven-resources-plugin</artifactId>
			  <version>2.4.3</version>
	  </dependency>
  <!-- other dependencies... -->
  </dependencies>
  
  <!-- junit report를 받기 위한 surefire report plugin report 설정 -->
  <reporting>
		  <plugins>
			  <plugin>
				  <groupId>org.apache.maven.plugins</groupId>
				  <artifactId>maven-surefire-report-plugin</artifactId>
				  <version>2.5</version>
				  <configuration>
					  <skipTests>true</skipTests> <!-- 테스트를 모두 스킵 -->
					  <testFailureIgnore>true</testFailureIgnore> <!-- 테스트가 실패하더라도 다음단계 빌드 -->
				  </configuration>
			  </plugin>
		  </plugins>
	  </reporting>
  <build>
	  <plugins>
			  <plugin>
				  <groupId>org.apache.maven.plugins</groupId>
				  <artifactId>maven-surefire-report-plugin</artifactId>
				  <version>2.5</version>
				  <executions>
					  <execution>
						  <id>report</id>
						  <phase>test</phase><!-- The phase of the life cycle to be bound to -->
						  <goals>
							  <goal>report</goal><!-- The target of the plug-in to be bound -->
						  </goals>
					  </execution>
				  </executions>
			  </plugin>
			  <plugin>
				  <groupId>org.jacoco</groupId>
				  <artifactId>jacoco-maven-plugin</artifactId>
				  <version>0.8.5</version>
				  <executions>
					  <execution>
						  <goals>
							  <goal>prepare-agent</goal>
						  </goals>
					  </execution>
					  <!-- attached to Maven test phase -->
					  <execution>
						  <id>report</id>
						  <phase>package</phase>
						  <goals>
							  <goal>report</goal>
						  </goals>
					  </execution>
				  </executions>
			  </plugin>
			  <!-- 중요! tmi 팀에서 만든 플러그인! -->
			  <plugin>
				  <groupId>com.tmi</groupId>
				  <artifactId>tmi-maven-plugin</artifactId>
				  <version>0.0.1-SNAPSHOT</version>
				  <executions>
					  <execution>
						  <phase>package</phase>
						  <goals>
							  <goal>tmi-dependency</goal>
						  </goals>
					  </execution>
				  </executions>
			  </plugin>
			  <!-- other plugins... -->
	  </plugins>
	  <pluginManagement>
			  <plugins>
				  <!--This plugin's configuration is used to store Eclipse m2e settings 
					  only. It has no influence on the Maven build itself. -->
				  <plugin>
					  <groupId>org.eclipse.m2e</groupId>
					  <artifactId>lifecycle-mapping</artifactId>
					  <version>1.0.0</version>
					  <configuration>
						  <lifecycleMappingMetadata>
							  <pluginExecutions>
								  <pluginExecution>
									  <pluginExecutionFilter>
										  <groupId>
											  io.spring.javaformat
										  </groupId>
										  <artifactId>
											  spring-javaformat-maven-plugin
										  </artifactId>
										  <versionRange>
											  [0.0.25,)
										  </versionRange>
										  <goals>
											  <goal>validate</goal>
										  </goals>
									  </pluginExecutionFilter>
									  <action>
										  <ignore></ignore>
									  </action>
								  </pluginExecution>
							  </pluginExecutions>
						  </lifecycleMappingMetadata>
					  </configuration>
				  </plugin>
			  </plugins>
		  </pluginManagement>
  </build>
  `;
  const codeString2 = `
    <properties>
  	  <jacoco.version>0.8.5</jacoco.version>
  	  <maven.test.failure.ignore>true</maven.test.failure.ignore>
  	  <!-- other properties -->
    </properties>

    <dependencies>
  	  <dependency>
  			  <groupId>org.springframework</groupId>
  			  <artifactId>spring-test</artifactId>
  			  <version></version>
  			  <scope>test</scope>
  			  <exclusions>
  				  <exclusion>
  					  <groupId>org.junit.vintage</groupId>
  					  <artifactId>junit-vintage-engine</artifactId>
  				  </exclusion>
  			  </exclusions>
  	  </dependency>
  	  <dependency>
  			  <groupId>org.apache.maven.plugins</groupId>
  			  <artifactId>maven-resources-plugin</artifactId>
  			  <version>2.4.3</version>
  	  </dependency>
    <!-- other dependencies... -->
    </dependencies>

    <!-- junit report를 받기 위한 surefire report plugin report 설정 -->
    <reporting>
  		  <plugins>
  			  <plugin>
  				  <groupId>org.apache.maven.plugins</groupId>
  				  <artifactId>maven-surefire-report-plugin</artifactId>
  				  <version>2.5</version>
  				  <configuration>
  					  <skipTests>true</skipTests> <!-- 테스트를 모두 스킵 -->
  					  <testFailureIgnore>true</testFailureIgnore> <!-- 테스트가 실패하더라도 다음단계 빌드 -->
  				  </configuration>
  			  </plugin>
  		  </plugins>
  	  </reporting>
    <build>
  	  <plugins>
  			  <plugin>
  				  <groupId>org.apache.maven.plugins</groupId>
  				  <artifactId>maven-surefire-report-plugin</artifactId>
  				  <version>2.5</version>
  				  <executions>
  					  <execution>
  						  <id>report</id>
  						  <phase>test</phase><!-- The phase of the life cycle to be bound to -->
  						  <goals>
  							  <goal>report</goal><!-- The target of the plug-in to be bound -->
  						  </goals>
  					  </execution>
  				  </executions>
  			  </plugin>
  			  <plugin>
  				  <groupId>org.jacoco</groupId>
  				  <artifactId>jacoco-maven-plugin</artifactId>
  				  <version>0.8.5</version>
  				  <executions>
  					  <execution>
  						  <goals>
  							  <goal>prepare-agent</goal>
  						  </goals>
  					  </execution>
  					  <!-- attached to Maven test phase -->
  					  <execution>
  						  <id>report</id>
  						  <phase>package</phase>
  						  <goals>
  							  <goal>report</goal>
  						  </goals>
  					  </execution>
  				  </executions>
  			  </plugin>
  			  <!-- 중요! tmi 팀에서 만든 플러그인! -->
  			  <plugin>
  				  <groupId>com.tmi</groupId>
  				  <artifactId>tmi-maven-plugin</artifactId>
  				  <version>0.0.1-SNAPSHOT</version>
  				  <executions>
  					  <execution>
  						  <phase>package</phase>
  						  <goals>
  							  <goal>tmi-dependency</goal>
  						  </goals>
  					  </execution>
  				  </executions>
  			  </plugin>
  			  <!-- other plugins... -->
  	  </plugins>
  	  <pluginManagement>
  			  <plugins>
  				  <!--This plugin's configuration is used to store Eclipse m2e settings
  					  only. It has no influence on the Maven build itself. -->
  				  <plugin>
  					  <groupId>org.eclipse.m2e</groupId>
  					  <artifactId>lifecycle-mapping</artifactId>
  					  <version>1.0.0</version>
  					  <configuration>
  						  <lifecycleMappingMetadata>
  							  <pluginExecutions>
  								  <pluginExecution>
  									  <pluginExecutionFilter>
  										  <groupId>
  											  io.spring.javaformat
  										  </groupId>
  										  <artifactId>
  											  spring-javaformat-maven-plugin
  										  </artifactId>
  										  <versionRange>
  											  [0.0.25,)
  										  </versionRange>
  										  <goals>
  											  <goal>validate</goal>
  										  </goals>
  									  </pluginExecutionFilter>
  									  <action>
  										  <ignore></ignore>
  									  </action>
  								  </pluginExecution>
  							  </pluginExecutions>
  						  </lifecycleMappingMetadata>
  					  </configuration>
  				  </plugin>
  			  </plugins>
  		  </pluginManagement>
    </build>`;

  const imageStyle = {};

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {};
  }, []);

  return (
    <>
      <Box width="330px" margin="0 auto" marginBottom="5%" fontSize="150%">
        <Markdown># Plug-in 사용법</Markdown>
      </Box>
      <div style={imageStyle}>
        <Box display="flex" justifyContent="space-between" marginBottom="1%">
          <Markdown>
            ## 1. JAR 파일을 다운받아 Spring project 내 폴더에 넣는다.
          </Markdown>
          <Button
            style={{
              backgroundColor: "#FF8843",
              color: "inherit",
            }}
            href="https://k4a201.p.ssafy.io/api/download"
          >
            <FileDownloadOutlinedIcon></FileDownloadOutlinedIcon> JAR File
            Download
          </Button>
        </Box>
        <img src="./assets/images/plugin/Plugin1.png" style={imageStyle} />
        <Markdown>
          ex) spring-petclinic(spring boot project) 아래 lib 폴더 안에 jar
          파일을 넣는다.
        </Markdown>
        <br />
        <br></br>
        <br></br>
        <Markdown>
          ## 2. pom.xml에 설정을 위한 plugin, dependency를 추가한다.
        </Markdown>
        <br />
        <Markdown> \- spring boot project의 경우 pom.xml 설정</Markdown>
        <SyntaxHighlighter language="xml" style={vs}>
          {codeString}
        </SyntaxHighlighter>

        <br />
        <Markdown>\- spring legacy project 의 경우 pom.xml 설정</Markdown>
        <SyntaxHighlighter language="xml" style={vs}>
          {codeString2}
        </SyntaxHighlighter>
        <br />
        <br></br>
        <br></br>
        <Markdown>
          ## 3. app(spring project)을 등록하기 위해 git repo url과 app name을
          조회한다.
        </Markdown>
        <br />
        <br />
        <Markdown>### [GitUrl]</Markdown>
        <Markdown>
          프로젝트 폴더 아래에 .git 폴더 아래의 config 파일을 에디터로 조회한다.
        </Markdown>
        <br></br>
        <Markdown>\- .git 폴더</Markdown>
        <br></br>
        <img src="./assets/images/plugin/Plugin2.png" style={imageStyle} />
        <br></br>
        <br></br>
        <Markdown>\- .git 폴더 안의 config 파일 및 내용</Markdown>
        <br></br>
        <img src="./assets/images/plugin/Plugin3.png" style={imageStyle} />
        <br></br>
        <br></br>
        <Markdown>\- git repo url에 입력할 config 파일의 url</Markdown>
        <br></br>
        <img src="./assets/images/plugin/Plugin4.png" style={imageStyle} />
        <br></br>
        <br></br>
        <Markdown>### [app name]</Markdown>
        <Markdown>\- app name에 입력할 pom.xml의 name</Markdown>
        <br></br>
        <img src="./assets/images/plugin/Plugin5.png" style={imageStyle} />
        <br />
        <br />
        <br></br>
        <br></br>
        <br></br>

        <Markdown>
          ## 4. PROJECT 상세 페이지에서 CREATE NEW APP을 클릭하고 app name과 git
          repo url을 입력한다.
        </Markdown>
        <br></br>
        <img src="./assets/images/plugin/Plugin6.png" style={imageStyle} />
        <img src="./assets/images/plugin/Plugin7.png" style={imageStyle} />
        <br></br>
        <br></br>
        <br></br>
        <Markdown>
          ## 5. 프로젝트 디렉토리에 lib 폴더를 생성 후 다운받은 jar 파일을
          넣는다.
        </Markdown>
        <br></br>
        <img src="./assets/images/plugin/Plugin8.png" style={imageStyle} />
        <br />
        <br />
        <br></br>
        <br></br>
        <Markdown>
          ## 6. 프로젝트 디렉토리에서 git bash를 켠 후 아래 명령어를 통해
          플러그인을 설치한다.
        </Markdown>
        <br></br>
        <SyntaxHighlighter language="Shell" type={vs}>
          bash mvn install:install-file
          -Dfile=lib/tmi-maven-plugin-0.0.1-SNAPSHOT.jar -DgroupId=com.tmi
          -DartifactId=tmi-maven-plugin -Dversion=0.0.1-SNAPSHOT -Dpackaging=jar
        </SyntaxHighlighter>
        <img src="./assets/images/plugin/Plugin9.png" style={imageStyle} />
        <br></br>
        <br />
        <br />
        <br></br>

        <Markdown>
          ## 7. 해당 프로젝트에서 빌드 시, TMI에서 현재 프로젝트의 자바
          커버리지를 볼 수 있다.
        </Markdown>
        <br></br>
        <SyntaxHighlighter language="Shell" type={vs}>
          bash mvn clean package
        </SyntaxHighlighter>
        <img src="./assets/images/plugin/Plugin10.png" style={imageStyle} />
        <br />

        <img src="./assets/images/plugin/Plugin11.png" style={imageStyle} />
      </div>
    </>
  );
}
