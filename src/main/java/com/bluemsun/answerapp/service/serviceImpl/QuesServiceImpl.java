package com.bluemsun.answerapp.service.serviceImpl;

import com.bluemsun.answerapp.dao.QuesDao;
import com.bluemsun.answerapp.entity.Chapter;
import com.bluemsun.answerapp.entity.ChoiceQues;
import com.bluemsun.answerapp.entity.JudgmentQues;
import com.bluemsun.answerapp.entity.Session;
import com.bluemsun.answerapp.service.QuesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by mafx on 2018/10/14.
 * @author mafx.
 */
@Service
public class QuesServiceImpl implements QuesService {
    @Autowired
    private QuesDao quesDao;

    @Override
    public int getScId(int courseId,int chapterId, int sessionId) {

        return  quesDao.getScIdDao(courseId,chapterId,sessionId);
    }

    @Override
    public int addQuesService(ChoiceQues choiceQues) {
        quesDao.addQuesDao(choiceQues);
        return quesDao.getCurrentQuesId(0);
    }

    @Override
    public void saveImagePathToDb(String fileName, int currentQuesId,int quesType) {
        String type=quesType+"";
        quesDao.saveImagePathToDbDao(fileName,currentQuesId,type);
    }

    @Override
    public int addJudgmentQuesService(JudgmentQues judgmentQues) {
        quesDao.addJudgmentQuesDao(judgmentQues);
        return quesDao.getCurrentQuesId(1);
    }

    @Override
    public List<Object> getQuesByUserIdService(int userId) {
        //选择题集合
        List<ChoiceQues> choiceQuesList=quesDao.getChoiceQuesByUserIdDao(userId);
        //判断题集合
        List<JudgmentQues> judgmentQuesList=quesDao.getJudgQuesByUserIdDao(userId);
        //选择题图片集合
        for(ChoiceQues choiceQues:choiceQuesList) {
            List<String> choiceImageList = quesDao.getQuesImage(choiceQues.getChoiceQuesId(),"0");
            if(choiceImageList.size()>0){
                choiceQues.setPhotoList(choiceImageList);
            }
        }
        //判断题图片集合
        for (JudgmentQues judgmentQues:judgmentQuesList) {
            List<String> judgmentImageList = quesDao.getQuesImage(judgmentQues.getJudgmentQuesId(),"1");
            if(judgmentImageList.size()>0){
                judgmentQues.setPhotoList(judgmentImageList);
            }
        }
        List<Object> objectList=new ArrayList<Object>();
        objectList.addAll(choiceQuesList);
        objectList.addAll(judgmentQuesList);
        return objectList;
    }

    @Override
    public List<Object> getQuesByUserIdAndSubordinateService(int userId, int chapterId, int sessionId) {
        List<ChoiceQues> choiceQuesList=quesDao.getChoiceQuesByUserIdAndSubordinateDao(userId,chapterId,sessionId);
        List<JudgmentQues> judgmentQuesList=quesDao.getJudgmentQuesByUserIdAndSubordinateDao(userId,chapterId,sessionId);
        //选择题图片集合
        for(ChoiceQues choiceQues:choiceQuesList) {
            List<String> choiceImageList = quesDao.getQuesImage(choiceQues.getChoiceQuesId(),"0");
            if(choiceImageList.size()>0){
                choiceQues.setPhotoList(choiceImageList);
            }
        }
        //判断题图片集合
        for (JudgmentQues judgmentQues:judgmentQuesList) {
            List<String> judgmentImageList = quesDao.getQuesImage(judgmentQues.getJudgmentQuesId(),"1");
            if(judgmentImageList.size()>0){
                judgmentQues.setPhotoList(judgmentImageList);
            }
        }
        List<Object> objectList=new ArrayList<Object>();
        objectList.addAll(choiceQuesList);
        objectList.addAll(judgmentQuesList);
        return objectList;
    }

    @Override
    public Object getQuesByQuesIdAndTypeService(int quesId, String type) {
        if(type.equals("0")){
            ChoiceQues choiceQues=quesDao.getChoiceQuesByQuesIdAndTypeDao(quesId);
            List<String> list=quesDao.getQuesImage(quesId,type);
            choiceQues.setPhotoList(list);
            return  choiceQues;
        }else {
           JudgmentQues judgmentQues=quesDao.getJudgmentQuesQuesByQuesIdAndTypeDao(quesId);
            List<String> list=quesDao.getQuesImage(quesId,type);
            judgmentQues.setPhotoList(list);
            return judgmentQues;
        }

    }

    @Override
    public void deleteQuesService(int quesId, String type, int userId) {
        if(type.equals("0")){
            quesDao.deleteChoiceQuesDao(quesId,userId);
        }else {
            quesDao.deleteJudgmentQuesDao(quesId,userId);
        }
    }

    @Override
    public void changeStatusService(int quesId, String type) {
        if(type.equals("0")){
            String status=quesDao.getChoiceStatus(quesId);
            if (status.equals("0")){
                quesDao.updateChoiceStatus("1",quesId);
            }else {
                quesDao.updateChoiceStatus("0",quesId);
            }
        }else {
            String status=quesDao.getJudgmentStatus(quesId);
            if (status.equals("0")){
                quesDao.updateJudgmentStatus("1",quesId);
            }else {
                quesDao.updateJudgmentStatus("0",quesId);
            }
        }
    }

    @Override
    public List<Chapter> getChapterService(int courseId) {
        return quesDao.getChapterDao(courseId);
    }

    @Override
    public List<Session> getSessionService(int chapterId) {
        return quesDao.getSessionDao(chapterId);
    }
}
