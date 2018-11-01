package com.bluemsun.answerapp.controller;

import com.bluemsun.answerapp.entity.AnswerRecord;
import com.bluemsun.answerapp.entity.RecordSummary;
import com.bluemsun.answerapp.entity.UserBean;
import com.bluemsun.answerapp.service.AnswerService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by mafx on 2018/10/17.
 * @author mafx.
 */
@Controller
@RequestMapping("/answer")
public class AnswerHandler {
    @Autowired
    AnswerService answerService;

    /**通过章节查询当前开启的题*/
    @RequestMapping(value = "/student/searchOpenQues",method = RequestMethod.GET)
    @ResponseBody
    public List<Object> searchOpenQues(HttpServletRequest request, @RequestParam("chapterId")int chapterId, @RequestParam("sessionId")int sessionId){
        int courseId=Integer.parseInt(request.getSession().getAttribute("currentCourseId").toString());
        List<Object> quesList=answerService.getOpenQuesService(courseId,chapterId,sessionId);
        return quesList;
    }
     /**获取当前课程的所有开启的题目*/
     @RequestMapping(value = "/student/getOpenQues",method = RequestMethod.GET)
     @ResponseBody
     public List<Object> getOpenQues(HttpServletRequest request){
         int courseId=Integer.parseInt(request.getSession().getAttribute("currentCourseId").toString());
         List<Object> quesList=answerService.getAllOpenQues(courseId);
         return quesList;
     }
    /**判题模块*/
    @RequestMapping(value = "/student/submitAnswer",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Integer> submitAnswer(HttpServletRequest request, @RequestBody List<JSONObject> subDataList){
        UserBean user=(UserBean) request.getSession().getAttribute("user");
        //测试
        if(user==null){
            user=new UserBean();
            user.setUserId(1);
        }
        System.out.println(subDataList.get(0).toString());
        Map<String,Integer> judgQuesResult=new HashMap<String,Integer>();
        Date date=new Date();
        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd");
        String dateString=format.format(date);
        List<AnswerRecord> answerRecordList=new ArrayList<AnswerRecord>();
        for (int i = 0; i <subDataList.size() ; i++) {
            AnswerRecord answerRecord=new AnswerRecord();
            answerRecord.setSubDate(dateString);
            JSONObject jsonObject=subDataList.get(i);
            int type=jsonObject.getInt("type");
            int quesId=jsonObject.getInt("quesId");
            String stuAnswer=jsonObject.getString("stuAnswer");
            int isCorrect;
            if(stuAnswer==null||stuAnswer.equals("")){
                //0-错误 1-正确
                isCorrect=0;
                judgQuesResult.put(quesId+" "+type,isCorrect);
            }else {
                isCorrect=answerService.isCorrectService(type,quesId,stuAnswer);
                judgQuesResult.put(quesId+" "+type,isCorrect);
            }
            answerRecord.setJudgeResult(isCorrect+"");
            answerRecord.setQuesId(quesId);
            answerRecord.setStuAnswer(stuAnswer);
            answerRecord.setStuId(user.getUserId());
            answerRecord.setType(type);
            answerRecordList.add(answerRecord);
        }
        System.out.println(answerRecordList.get(0));
        answerService.saveRecord(answerRecordList);
        return judgQuesResult;
    }
    /**查找当前开启的题目的做题记录*/
    @RequestMapping(value = "/teacher/getAnswerRecord",method = RequestMethod.GET)
    @ResponseBody
    public List<AnswerRecord> getAnswerRecord(HttpServletRequest request,@RequestParam("quesId")int quesId,@RequestParam("type")int type){
        UserBean user=(UserBean) request.getSession().getAttribute("user");
        //测试
        if(user==null){
            user=new UserBean();
            user.setUserId(2);
        }
        List<AnswerRecord> answerRecords=answerService.getAnswerRecordService(quesId,type);
        return answerRecords;
    }
    /**生成某一道题的结果摘要*/
    @RequestMapping(value = "/teacher/getRecordSummary",method = RequestMethod.GET)
    @ResponseBody
    public List<RecordSummary> getRecordSummary(HttpServletRequest request){
        UserBean user=(UserBean) request.getSession().getAttribute("user");
        //测试
        if(user==null){
            user=new UserBean();
            user.setUserId(2);
        }
        List<RecordSummary> recordSummaries=answerService.getRecordSummaryService(user.getUserId());
        return recordSummaries;
    }

}
