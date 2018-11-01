package com.bluemsun.answerapp.service;

import com.bluemsun.answerapp.entity.AnswerRecord;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by mafx on 2018/10/18.
 * @author mafx.
 */
@Service
public interface AnswerService {
    List<Object> getOpenQuesService(int courseId, int chapterId, int sessionId);

    int isCorrectService(int type, int quesId, String stuAnswer);

    void saveRecord(List<AnswerRecord> answerRecordList);

    List<AnswerRecord> getAnswerRecordService(int quesId, int type);

    Map<String,Object> getRecordSummaryService(int userId);

    List<Object> getAllOpenQues(int courseId);
}
