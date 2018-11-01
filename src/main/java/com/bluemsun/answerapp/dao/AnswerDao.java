package com.bluemsun.answerapp.dao;

import com.bluemsun.answerapp.entity.AnswerRecord;
import com.bluemsun.answerapp.entity.ChoiceQues;
import com.bluemsun.answerapp.entity.JudgmentQues;
import com.bluemsun.answerapp.entity.RecordSummary;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by mafx on 2018/10/18.
 * @author mafx.
 */
@Repository
public interface AnswerDao {
    List<ChoiceQues> getChoiceQuesBySubordinateDao(@Param("courseId") int courseId, @Param("chapterId")int chapterId, @Param("sessionId")int sessionId);

    List<JudgmentQues> getJudgmentQuesSubordinateDao(@Param("courseId") int courseId, @Param("chapterId")int chapterId, @Param("sessionId")int sessionId);

    String getAnswerDao(@Param("type") int type,@Param("quesId") int quesId);

    void saveRecordDao(@Param("answerRecordList") List<AnswerRecord> answerRecordList);

    List<AnswerRecord> getAnswerRecordDao(@Param("quesId")int quesId, @Param("type")int type);

    List<RecordSummary> getRecordSummaryDao(@Param("userId")int userId, @Param("type")int type);
    int getSubCountDao(@Param("quesId")int quesId, @Param("type") String type);

    int getSubRightDao(@Param("quesId")int quesId, @Param("type") String type);


    List<ChoiceQues> getAllChoiceQuesDao(int courseId);

    List<JudgmentQues> getAllJudgQuesDao(int courseId);
}
