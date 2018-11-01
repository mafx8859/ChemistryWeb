package com.bluemsun.answerapp.service;

import com.bluemsun.answerapp.entity.CourseBean;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by mafx on 2018/10/25.
 * @author mafx.
 */
@Service
public interface CourseService {
    public List<CourseBean> getAllCourseService();
}
