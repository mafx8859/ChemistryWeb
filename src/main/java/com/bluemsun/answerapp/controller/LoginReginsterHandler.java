package com.bluemsun.answerapp.controller;

import com.bluemsun.answerapp.entity.UserBean;
import com.bluemsun.answerapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by mafx on 2018/10/18.
 * @author mafx.
 */
@Controller
@RequestMapping("/loginReginster")
public class LoginReginsterHandler {
    @Autowired
    UserService userService;

    @RequestMapping(value = "/selectCourse",method = RequestMethod.GET)
    @ResponseBody
    public String selectCourse(HttpServletRequest request, @RequestParam("courseId")int courseId){
        request.getSession().setAttribute("currentCourseId",courseId);
        return "{\"status\":\"1\"}";
    }
    /**手机端登录*/
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Integer> login(HttpServletRequest request, @RequestParam("username") String username, @RequestParam("password")String pwd){
        UserBean user=userService.getUserByPwdAndUsername(username,pwd);
        ServletContext application=request.getServletContext();
        HashMap<String, HttpSession> sessionMap=(HashMap<String, HttpSession>)application.getAttribute("sessionMap");
        if (user!=null){
            HttpSession userSession=request.getSession();
            userSession.setAttribute("user",user);
            sessionMap.put(username,userSession);
            Map<String,Integer> result=new HashMap<String,Integer>();
            result.put("status",1);
            result.put("level",user.getLevel());
            return result;
        }else {
            Map<String,Integer> result=new HashMap<String,Integer>();
            result.put("status",0);
            return result;
        }
    }
    /**老师网页端登录*/
    @RequestMapping(value = "/teacher/login",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Integer> teacherLogin(HttpServletRequest request, @RequestParam("username") String username, @RequestParam("password")String pwd) {
        UserBean user = userService.getUserByPwdAndUsername(username, pwd);
        ServletContext application=request.getServletContext();
        HashMap<String, HttpSession> sessionMap=(HashMap<String, HttpSession>)application.getAttribute("sessionMap");
        if(user!=null&&user.getLevel()==1){
            HttpSession userSession=request.getSession();
            userSession.setAttribute("user",user);
            sessionMap.put(username,userSession);
            Map<String,Integer> result=new HashMap<String,Integer>();
            result.put("status",1);
            return result;
        }else {
            Map<String,Integer> result=new HashMap<String,Integer>();
            result.put("status",0);
            return result;
        }
    }
}
