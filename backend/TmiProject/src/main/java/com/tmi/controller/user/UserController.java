package com.tmi.controller.user;

import com.tmi.entity.Department;
import com.tmi.entity.User;
import com.tmi.repository.DeptRepository;
import com.tmi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository repo;

    @Autowired
    private DeptRepository deptRepo;

    @GetMapping
    public List<User> getAllUser(){
        return repo.findAll();
    }

    @GetMapping("/dept")
    public List<Department> getAllDepartment(){
        return deptRepo.findAll();
    }

    @PostMapping("/login")
    public User login(@RequestBody Map<String, String> map){
        return repo.findUser(map.get("id"), map.get("pwd"));
    }

    @DeleteMapping("/{uid}")
    public void deleteUser(@PathVariable String uid){
        repo.deleteUser(uid);
    }

    @DeleteMapping("/dept/{id}")
    public void deleteDept(@PathVariable int id){deptRepo.deleteById(id);}
}
