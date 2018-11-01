package com.bluemsun.answerapp.service;

import com.bluemsun.answerapp.entity.AnswerRecord;
import com.bluemsun.answerapp.entity.RecordSummary;
import org.springframework.stereotype.Service;

import java.util.List;

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

    List<RecordSummary> getRecordSummaryService(int userId);

    List<Object> getAllOpenQues(int courseId);
}
