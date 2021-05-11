package com.tmi.entity;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String regDate;
    private String user;

    private String javaVersion; // java.version
    private String branch; // git.branch
    private String commitId; // git.commit.id (e2fbc561309d03d92a0958f3cf59219b1fc0d985)
    private String commitUserName; // git.commit.user.name
    // private String commitMessage; //git.commit.message.short

    @OneToMany
    @JoinColumn(name = "projectId")
    private List<App> app;
}
