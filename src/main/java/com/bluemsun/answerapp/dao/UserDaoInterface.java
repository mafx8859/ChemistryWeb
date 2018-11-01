package com.bluemsun.answerapp.dao;

import com.bluemsun.answerapp.entity.UserBean;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * Created by mafx on 2018/10/11.
 * @author mafx.
 */
@Repository
public interface UserDaoInterface {
    public UserBean getUserById(int id);

    UserBean getUserByPwdAndUsernameDao(@Param("username") String username, @Param("pwd") String pwd);
}
