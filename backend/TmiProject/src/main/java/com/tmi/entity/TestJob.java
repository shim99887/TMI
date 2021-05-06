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
@Table(name = "test_job")
@IdClass(TestJobId.class)
public class TestJob {
    
    @Id
    private long testjob_id;
    @Id
    private long project_id;

    
    private String testjob_name;
    private String testjob_desc;
    private Date testjob_regdate;
    private String testjob_tag;
}
