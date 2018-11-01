package com.bluemsun.answerapp.service.serviceImpl;

import com.bluemsun.answerapp.dao.AnswerDao;
import com.bluemsun.answerapp.dao.QuesDao;
import com.bluemsun.answerapp.entity.*;
import com.bluemsun.answerapp.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by mafx on 2018/10/18.
 * @author mafx.
 */
@Service
public class AnswerServiceImpl implements AnswerService{
    @Autowired
    private AnswerDao answerDao;

    @Autowired
    private QuesDao quesDao;

    @Override
    public List<Object> getOpenQuesService(int courseId, int chapterId, int sessionId) {
        List<ChoiceQues> choiceQuesList=null;
        List<JudgmentQues> judgmentQuesList=null;
        if(chapterId<0&&sessionId<0){
            choiceQuesList=answerDao.getAllChoiceQuesDao(courseId);
            judgmentQuesList=answerDao.getAllJudgQuesDao(courseId);
        }else {
            choiceQuesList=answerDao.getChoiceQuesBySubordinateDao(courseId,chapterId,sessionId);
            judgmentQuesList=answerDao.getJudgmentQuesSubordinateDao(courseId,chapterId,sessionId);
        }
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
    public int isCorrectService(int type, int quesId, String stuAnswer) {
        String answer=answerDao.getAnswerDao(type,quesId);
        if(answer.equals(stuAnswer)){
            return 1;
        }
        return 0;
    }

    @Override
    public void saveRecord(List<AnswerRecord> answerRecordList) {
        answerDao.saveRecordDao(answerRecordList);
    }

    @Override
    public List<AnswerRecord> getAnswerRecordService(int quesId, int type) {
        return answerDao.getAnswerRecordDao(quesId,type);
    }

    @Override
    public Map<String,Object> getRecordSummaryService(int userId) {
        List<ChoiceRecordSummary> recordSummariesChoice=answerDao.getChoiceRecordSummaryDao(userId);
        List<RecordSummary> recordSummariesJudg=answerDao.getRecordSummaryDao(userId,1);
        List<RecordSummary> recordSummaries=new ArrayList<RecordSummary>();
        Map<String,Object> recordMap=new HashMap<String,Object>();
        for (ChoiceRecordSummary choiceRecordSummary:recordSummariesChoice) {
            int countA=answerDao.getItemCount(choiceRecordSummary.getQuesId(),choiceRecordSummary.getType(),'A');
            int countB=answerDao.getItemCount(choiceRecordSummary.getQuesId(),choiceRecordSummary.getType(),'B');
            int countC=answerDao.getItemCount(choiceRecordSummary.getQuesId(),choiceRecordSummary.getType(),'C');
            int countD=answerDao.getItemCount(choiceRecordSummary.getQuesId(),choiceRecordSummary.getType(),'D');
            choiceRecordSummary.setCountA(countA);
            choiceRecordSummary.setCountB(countB);
            choiceRecordSummary.setCountC(countC);
            choiceRecordSummary.setCountD(countD);
        }
        recordSummaries.addAll(recordSummariesChoice);
        recordSummaries.addAll(recordSummariesJudg);
        for (RecordSummary record:recordSummaries) {
            int subCount=answerDao.getSubCountDao(record.getQuesId(),record.getType());
            record.setSubCount(subCount);
            double rightRate;
            if(subCount!=0) {
                rightRate= (float)answerDao.getSubRightDao(record.getQuesId(), record.getType()) / (float)subCount;
                record.setCorrectRate(rightRate*100+"%");
            }else {
                record.setCorrectRate("没有提交");
            }

        }
        recordMap.put("choiceRecord",recordSummariesChoice);
        recordMap.put("judgRecord",recordSummariesJudg);
        return recordMap;
    }

    @Override
    public List<Object> getAllOpenQues(int courseId) {
        return getOpenQuesService(courseId,-1,-1);
    }
}
