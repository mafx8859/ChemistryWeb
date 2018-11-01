package com.bluemsun.answerapp.entity;

import java.util.List;

/**
 * Created by mafx on 2018/10/14.
 * @author mafx.
 */
public class JudgmentQues {
    private int judgmentQuesId;
    private String judgQuesDescription;
    private int userId;
    private String judgRealAnswer;
    private int subordinate;
    private String setQuesDate;
    private String status;
    private List<String> photoList;
    private int type=1;

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
    public List<String> getPhotoList() {
        return photoList;
    }

    public void setPhotoList(List<String> photoList) {
        this.photoList = photoList;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getJudgmentQuesId() {
        return judgmentQuesId;
    }

    public void setJudgmentQuesId(int judgmentQuesId) {
        this.judgmentQuesId = judgmentQuesId;
    }
    public String getSetQuesDate() {
        return setQuesDate;
    }

    public void setSetQuesDate(String setQuesDate) {
        this.setQuesDate = setQuesDate;
    }

    public int getSubordinate() {
        return subordinate;
    }

    public void setSubordinate(int subordinate) {
        this.subordinate = subordinate;
    }
    public String getJudgQuesDescription() {
        return judgQuesDescription;
    }

    public void setJudgQuesDescription(String judgQuesDescription) {
        this.judgQuesDescription = judgQuesDescription;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getJudgRealAnswer() {
        return judgRealAnswer;
    }

    public void setJudgRealAnswer(String judgRealAnswer) {
        this.judgRealAnswer = judgRealAnswer;
    }
}
