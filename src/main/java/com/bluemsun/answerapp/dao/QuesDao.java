package com.bluemsun.answerapp.dao;

import com.bluemsun.answerapp.entity.Chapter;
import com.bluemsun.answerapp.entity.ChoiceQues;
import com.bluemsun.answerapp.entity.JudgmentQues;
import com.bluemsun.answerapp.entity.Session;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by mafx on 2018/10/14.
 * @author mafx.
 */
@Repository
public interface QuesDao {
    int getScIdDao(@Param("courseId") int courseId,@Param("chapterId") int chapterId,@Param("sessionId") int sessionId);

    void addQuesDao(ChoiceQues choiceQues);

    int getCurrentQuesId(@Param("type") int type);

    void saveImagePathToDbDao(@Param("fileName") String fileName, @Param("currentQuesId")int currentQuesId,@Param("type")String type);

    void addJudgmentQuesDao(JudgmentQues judgmentQues);

    List<Object> getQuesByUserIdDao(int userId);

    List<ChoiceQues> getChoiceQuesByUserIdDao(int userId);

    List<JudgmentQues> getJudgQuesByUserIdDao(int userId);

    List<ChoiceQues> getChoiceQuesByUserIdAndSubordinateDao(@Param("userId") int userId, @Param("chapterId") int chapterId, @Param("sessionId") int sessionId);

    List<JudgmentQues> getJudgmentQuesByUserIdAndSubordinateDao(@Param("userId") int userId, @Param("chapterId") int chapterId, @Param("sessionId") int sessionId);

    List<String> getQuesImage(@Param("quesId")int quesId, @Param("type") String type);

    ChoiceQues getChoiceQuesByQuesIdAndTypeDao(@Param("quesId")int quesId);

    JudgmentQues getJudgmentQuesQuesByQuesIdAndTypeDao(@Param("quesId")int quesId);

    void deleteChoiceQuesDao(@Param("quesId") int quesId, @Param("userId")int userId);

    void deleteJudgmentQuesDao(@Param("quesId")int quesId, @Param("userId")int userId);

    String getChoiceStatus(int quesId);

    void updateChoiceStatus(@Param("status") String status,@Param("quesId")int quesId);

    String getJudgmentStatus(int quesId);

    void updateJudgmentStatus(@Param("status") String status,@Param("quesId")int quesId);

    List<Chapter> getChapterDao(int courseId);

    List<Session> getSessionDao(int chapterId);

}
