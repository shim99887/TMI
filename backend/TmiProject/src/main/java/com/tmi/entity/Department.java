package com.tmi.entity;

import lombok.Generated;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@ToString
@Entity
@Table(name = "department")
public class Department {
    @Id
    int id;
    String name;

    @OneToMany
    @JoinColumn(name = "department_id")
    private List<User> user;
}
