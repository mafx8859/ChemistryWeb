package com.bluemsun.answerapp.entity;

import java.util.List;

/**
 * Created by mafx on 2018/10/14.
 * @author mafx.
 */
public class ChoiceQues {
    private int choiceQuesId;
    private String quesDescription;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private char relAnswer;
    private String setQuesDate;
    private int userId;
    private int subordinate;
    private String status;
    private List<String> photoList;
    private int type=0;

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

    public int getChoiceQuesId() {
        return choiceQuesId;
    }

    public void setChoiceQuesId(int choiceQuesId) {
        this.choiceQuesId = choiceQuesId;
    }
    public int getSubordinate() {
        return subordinate;
    }

    public void setSubordinate(int subordinate) {
        this.subordinate = subordinate;
    }

    public String getQuesDescription() {
        return quesDescription;
    }

    public void setQuesDescription(String quesDescription) {
        this.quesDescription = quesDescription;
    }

    public String getOptionA() {
        return optionA;
    }

    public void setOptionA(String optionA) {
        this.optionA = optionA;
    }

    public String getOptionB() {
        return optionB;
    }

    public void setOptionB(String optionB) {
        this.optionB = optionB;
    }

    public String getOptionC() {
        return optionC;
    }

    public void setOptionC(String optionC) {
        this.optionC = optionC;
    }

    public String getOptionD() {
        return optionD;
    }

    public void setOptionD(String optionD) {
        this.optionD = optionD;
    }

    public char getRelAnswer() {
        return relAnswer;
    }

    public void setRelAnswer(char relAnswer) {
        this.relAnswer = relAnswer;
    }

    public String getSetQuesDate() {
        return setQuesDate;
    }

    public void setSetQuesDate(String setQuesDate) {
        this.setQuesDate = setQuesDate;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

}
