package com.tmi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.*;

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
    private Long id;
    private String title;
    private String description;
    private Date regDate;
    private String gitUrl;
}
