package com.tmi.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@ToString
@Data
@Table(name = "app")
public class App {
    @Id
    private String id;
    private String title;
    private String description;
    private Date regDate;
    private String gitUrl;
    private Long projectId;

    @OneToMany
    @JoinColumn(name = "appId")
    private List<Report> reports;
}
