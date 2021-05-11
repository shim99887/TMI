package com.tmi.entity;

import lombok.*;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@ToString
@Data
@Table(name = "app")
public class App {

    @OneToMany(mappedBy = "app")
    @JsonIgnore
    private List<Report> reports = new ArrayList<>();

    @ManyToOne
    @JsonIgnore
    private Project project;

    @Id
    private String id;
    private String title;
    private String description;
    private Date regDate;
    private String gitUrl;
}
