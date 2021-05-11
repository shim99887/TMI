package com.tmi.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import java.util.Date;

@Entity
@ToString
@Data
@Table(name = "app")
public class App {
    @Id
    private Long id;
    private String title;
    private String description;
    private Date regDate;
    private String gitUrl;
    private Long projectId;
}
