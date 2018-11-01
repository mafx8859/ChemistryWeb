package com.bluemsun.answerapp.controller;

import com.bluemsun.answerapp.entity.CourseBean;
import com.bluemsun.answerapp.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by mafx on 2018/10/25.
 * @author mafx.
 */
@Controller
@RequestMapping("/course")
public class CourseHandler {
    @Autowired
    CourseService courseService;

    @RequestMapping(value = "/getAllCourse",method = RequestMethod.GET)
    @ResponseBody
    public List<CourseBean> getAllCourse(){
        return courseService.getAllCourseService();
    }
}
