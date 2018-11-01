package com.bluemsun.answerapp.service;

import com.bluemsun.answerapp.entity.Chapter;
import com.bluemsun.answerapp.entity.ChoiceQues;
import com.bluemsun.answerapp.entity.JudgmentQues;
import com.bluemsun.answerapp.entity.Session;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by mafx on 2018/10/14.
 * @author mafx.
 */
@Service
public interface QuesService {
    public int getScId(int courseId,int chapterId, int sessionId);

    int addQuesService(ChoiceQues choiceQues);

    void saveImagePathToDb(String fileName, int currentQuesId,int quesType);

    int addJudgmentQuesService(JudgmentQues judgmentQues);

    List<Object> getQuesByUserIdService(int userId);

    List<Object> getQuesByUserIdAndSubordinateService(int userId, int chapterId, int sessionId);

    Object getQuesByQuesIdAndTypeService(int quesId, String type);

    void deleteQuesService(int quesId, String type, int userId);

    void changeStatusService(int quesId, String type);

    List<Chapter> getChapterService(int courseId);

    List<Session> getSessionService(int chapterId);
}
