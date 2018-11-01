package com.bluemsun.answerapp.controller;

import com.bluemsun.answerapp.entity.*;
import com.bluemsun.answerapp.service.QuesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by mafx on 2018/10/14.
 * @author mafx.
 */
@Controller
@RequestMapping(value = "/ques")
public class QuesHandler {
     @Autowired
     private QuesService quesService;

    @RequestMapping(value = "/teacher/addChoiceQues",method = RequestMethod.POST)
    @ResponseBody
    public String addChoiceQues(@RequestParam("questionImage")CommonsMultipartFile[] questionImage, ChoiceQues choiceQues, @RequestParam("chapterId")int chapterId, @RequestParam("sessionId")int sessionId, HttpServletRequest request){
        UserBean user=(UserBean) request.getSession().getAttribute("user");
        //测试
        if(user==null){
            user=new UserBean();
            user.setUserId(1);
            user.setCourseId(1);
        }
        int csId=quesService.getScId(user.getCourseId(),chapterId,sessionId);
        Date date=new Date();
        SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd");
        choiceQues.setSubordinate(csId);
        choiceQues.setSetQuesDate(formatter.format(date));
        choiceQues.setUserId(user.getUserId());
        int currentQuesId=quesService.addQuesService(choiceQues);
        boolean imageIsUpSuccesss=imageProcess(questionImage,request,currentQuesId,0);
        if(imageIsUpSuccesss){
            return "{\"status\":\"1\"}";
        }

        return "{\"status\":\"0\"}";
    }
    @RequestMapping(value = "/teacher/addJudgQues",method = RequestMethod.POST)
    @ResponseBody
    public String addJudgQues(@RequestParam("questionImage")CommonsMultipartFile[] questionImage, JudgmentQues judgmentQues, @RequestParam("chapterId")int chapterId, @RequestParam("sessionId")int sessionId, HttpServletRequest request){
        UserBean user=(UserBean) request.getSession().getAttribute("user");
        //测试
        if(user==null){
            user=new UserBean();
            user.setUserId(1);
            user.setCourseId(1);
        }
        int csId=quesService.getScId(user.getCourseId(),chapterId,sessionId);
        Date date=new Date();
        SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd");
        judgmentQues.setSubordinate(csId);
        judgmentQues.setSetQuesDate(formatter.format(date));
        judgmentQues.setUserId(user.getUserId());
        int currentQuesId=quesService.addJudgmentQuesService(judgmentQues);
        boolean imageIsUpSuccesss=imageProcess(questionImage,request,currentQuesId,1);
        if(imageIsUpSuccesss){
            return "{\"status\":\"1\"}";
        }

        return "{\"status\":\"0\"}";
    }
    private boolean saveFile(MultipartFile file, String path){
        if(!file.isEmpty()){
            File filepath=new File(path);
            if(!filepath.exists()){
                filepath.mkdirs();
            }
            try {
                file.transferTo(new File(path));
                return true;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return false;
    }
    private boolean imageProcess(CommonsMultipartFile[] questionImage,HttpServletRequest request,int currentQuesId,int quesType){
        Date date=new Date();
        String path=request.getSession().getServletContext().getRealPath("/imageUpload/");
        boolean imageIsUpSuccesss=false;
        if(questionImage!=null&&questionImage.length>0){
            for (CommonsMultipartFile file:questionImage) {
                SimpleDateFormat format=new SimpleDateFormat("yyyyMMddhhmmss");
                String fileName=format.format(date)+file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."),file.getOriginalFilename().length());
                path=path+fileName;
                imageIsUpSuccesss=saveFile(file,path);
                if(imageIsUpSuccesss){
                    quesService.saveImagePathToDb(fileName,currentQuesId,quesType);
                }
            }
        }
        return imageIsUpSuccesss;
    }

    @RequestMapping(value = "/teacher/getQuesByUserId",method = RequestMethod.GET)
    @ResponseBody
    public List<Object> getQuesByUserId(HttpServletRequest request){
        UserBean user=(UserBean) request.getSession().getAttribute("user");
        //测试
        if(user==null){
            user=new UserBean();
            user.setUserId(1);
            user.setCourseId(1);
        }
        List<Object> quesList=quesService.getQuesByUserIdService(user.getUserId());
        return quesList;
    }

    @RequestMapping(value = "/teacher/getQuesByUserIdAndSubordinate",method = RequestMethod.GET)
    @ResponseBody
    public List<Object> getQuesByUserIdAndSubordinate(HttpServletRequest request,@RequestParam("chapterId")int chapterId, @RequestParam("sessionId")int sessionId){
        UserBean user=(UserBean) request.getSession().getAttribute("user");
        //测试
        if(user==null){
            user=new UserBean();
            user.setUserId(1);
            user.setCourseId(1);
        }
        List<Object> quesList=quesService.getQuesByUserIdAndSubordinateService(user.getUserId(),chapterId,sessionId);
        return quesList;
    }

    @RequestMapping(value = "/teacher/getQuesByQuesIdAndType",method = RequestMethod.GET)
    @ResponseBody
    public Object getQuesByQuesIdAndType(HttpServletRequest request,@RequestParam("quesId")int quesId,@RequestParam("type")String type){
        UserBean user=(UserBean) request.getSession().getAttribute("user");
        //测试
        if(user==null){
            user=new UserBean();
            user.setUserId(1);
            user.setCourseId(1);
        }
        return quesService.getQuesByQuesIdAndTypeService(quesId,type);
    }


    @RequestMapping(value = "/teacher/deleteQues",method = RequestMethod.GET)
    @ResponseBody
    public String deleteQues(HttpServletRequest request,@RequestParam("quesId")int quesId,@RequestParam("type")String type){
        UserBean user=(UserBean) request.getSession().getAttribute("user");
        //测试
        if(user==null){
            user=new UserBean();
            user.setUserId(1);
            user.setCourseId(1);
        }
        quesService.deleteQuesService(quesId,type,user.getUserId());
        return "{\"status\":\"1\"}";
    }

    @RequestMapping(value = "/teacher/changeStatus",method = RequestMethod.GET)
    @ResponseBody
    public String changeStatus(@RequestParam("quesId")int quesId,@RequestParam("type")String type){
        quesService.changeStatusService(quesId,type);
        return "{\"status\":\"1\"}";
    }

    /**级联获取章和节*/
    @RequestMapping(value = "/getChapter",method = RequestMethod.GET)
    @ResponseBody
    public List<Chapter> getChapter(HttpServletRequest request){
        UserBean user=(UserBean) request.getSession().getAttribute("user");
        //测试
        if(user==null){
            user=new UserBean();
            user.setUserId(1);
            user.setCourseId(1);
        }
        return quesService.getChapterService(user.getCourseId());
    }
    @RequestMapping(value = "/student/getChapter",method = RequestMethod.GET)
    @ResponseBody
    public List<Chapter> getChapterStu(HttpServletRequest request){
       int courseId=Integer.parseInt(request.getSession().getAttribute("currentCourseId").toString());
       return quesService.getChapterService(courseId);
    }
    @RequestMapping(value = "/getSession",method = RequestMethod.GET)
    @ResponseBody
    public List<Session> getSession(HttpServletRequest request,@RequestParam("chapterId")int chapterId){
        return quesService.getSessionService(chapterId);
    }
}
