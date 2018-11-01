package com.bluemsun.answerapp.entity;

/**
 * Created by mafx on 2018/10/23.
 * @author mafx.
 */
public class RecordSummary {
    private int subCount;
    private int quesId;
    private String type;
    private String CorrectRate;

    public String getCorrectRate() {
        return CorrectRate;
    }

    public void setCorrectRate(String correctRate) {
        CorrectRate = correctRate;
    }

    public int getSubCount() {
        return subCount;
    }

    public void setSubCount(int subCount) {
        this.subCount = subCount;
    }

    public int getQuesId() {
        return quesId;
    }

    public void setQuesId(int quesId) {
        this.quesId = quesId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

}
